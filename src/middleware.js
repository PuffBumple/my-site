// src/middleware.js
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // 1. If the user is ALREADY on the login page, let them through immediately!
  if (url.pathname === '/blog-login') {
    return next();
  }

  // 2. Only process routes inside the /blog directory
  if (url.pathname.startsWith('/blog')) {
    
    // 3. Read existing authentication cookies
    const cookies = context.request.headers.get("cookie") || "";
    const isAuthenticated = cookies.includes("blog_auth=authenticated");

    // 4. If unauthorized, redirect them to the dedicated login route
    if (!isAuthenticated) {
      return context.redirect("/blog-login");
    }
  }

  // User is authenticated or visiting a public page; proceed normally
  return next();
});
