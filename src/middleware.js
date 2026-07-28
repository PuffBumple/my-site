import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // 1. Bypass validation immediately if loading the login layout route
  if (url.pathname === '/blog-login') {
    return next();
  }

  // 2. Multilayer variable collection strategy (Production Cloudflare Bindings)
  let BLOG_PASSWORD;
  try {
    // Attempt A: Direct execution extraction from Astro's active context block
    BLOG_PASSWORD = context.locals.runtime?.env?.BLOG_PASSWORD;
    
    // Attempt B: Fallback check against the native platform module if contextual parsing flags out
    if (!BLOG_PASSWORD) {
      const { env } = await import("cloudflare:workers");
      BLOG_PASSWORD = env.BLOG_PASSWORD;
    }
  } catch (e) {
    // Attempt C: Local development fallbacks
    BLOG_PASSWORD = import.meta.env.BLOG_PASSWORD || process.env.BLOG_PASSWORD;
  }

  // 3. Prevent loop if the key variable failed to load to production edge memory entirely
  if (!BLOG_PASSWORD) {
    console.error("CRITICAL ERROR: BLOG_PASSWORD is not defined in Cloudflare dashboard settings.");
  }

  // 4. Handle blog path validation gates
  if (url.pathname.startsWith('/blog')) {
    const cookies = context.request.headers.get("cookie") || "";
    const isAuthenticated = cookies.includes("blog_auth=authenticated");

    if (!isAuthenticated) {
      return context.redirect("/blog-login");
    }
  }

  return next();
});