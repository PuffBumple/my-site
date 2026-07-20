// src/middleware.js
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // Read environment variables directly from Cloudflare's runtime context
  const BLOG_PASSWORD = context.locals.runtime?.env?.BLOG_PASSWORD || process.env.BLOG_PASSWORD;

  // Ensure security logic only triggers on /blog or child paths (e.g., /blog/my-post)
  if (url.pathname.startsWith('/blog')) {
    
    // 1. Handle incoming password form submissions (POST)
    if (context.request.method === "POST") {
      try {
        const formData = await context.request.formData();
        const passwordInput = formData.get("password");

        if (passwordInput === BLOG_PASSWORD) {
          // Success! Drop a secure HttpOnly cookie valid for 7 days
          const response = new Response(null, { status: 302, headers: { "Location": url.pathname } });
          response.headers.append("Set-Cookie", "blog_auth=authenticated; Path=/blog; HttpOnly; Max-Age=604800; SameSite=Strict; Secure");
          return response;
        } else {
          // Fail: Re-render lock page with error feedback
          return new Response(renderLockPage("Incorrect password. Please try again!"), {
            headers: { "Content-Type": "text/html" }
          });
        }
      } catch (e) {
        // Handle malformed form body parsing errors safely
      }
    }

    // 2. Validate current session against existing cookies
    const cookies = context.request.headers.get("cookie") || "";
    const isAuthenticated = cookies.includes("blog_auth=authenticated");

    // If no valid session, halt execution and serve the secure lock screen
    if (!isAuthenticated) {
      return new Response(renderLockPage(), {
        headers: { "Content-Type": "text/html" }
      });
    }
  }

  // Session is fine or route is safe; execute next page logic
  return next();
});

// Standalone lock UI rendered directly on Cloudflare Edge Worker
function renderLockPage(error = "") {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Locked Content</title>
      <style>
        body { background: #13151a; color: #fff; font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .box { background: #1c1f26; padding: 2.5rem; border-radius: 12px; text-align: center; max-width: 380px; width: 90%; box-shadow: 0 10px 25px rgba(0,0,0,0.4); border: 1px solid #2e3440; }
        h2 { margin-top: 0; font-size: 1.5rem; }
        p { color: #9ca3af; font-size: 0.95rem; line-height: 1.5; }
        input { width: 100%; padding: 12px; margin: 15px 0 10px; box-sizing: border-box; background: #2c313c; border: 1px solid #4b5563; color: #fff; border-radius: 6px; font-size: 1rem; }
        input:focus { outline: 2px solid #3b82f6; border-color: transparent; }
        button { width: 100%; padding: 12px; background: #3b82f6; border: none; color: #fff; font-weight: bold; cursor: pointer; border-radius: 6px; font-size: 1rem; transition: background 0.2s; }
        button:hover { background: #2563eb; }
        .error { color: #f87171; font-size: 0.85rem; margin-bottom: 10px; font-weight: 500; }
      </style>
    </head>
    <body>
      <div class="box">
        <h2>🔒 Private Content</h2>
        <p>This section is locked. Please enter your authorization key to proceed.</p>
        ${error ? `<p class="error">${error}</p>` : ""}
        <form method="POST">
          <input type="password" name="password" placeholder="Enter password" autofocus required />
          <button type="submit">Unlock Blog</button>
        </form>
      </div>
    </body>
    </html>
  `;
}
