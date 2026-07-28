// src/middleware.js
import { defineMiddleware } from "astro:middleware";
import { BLOG_PASSWORD } from "astro:env/server";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  if (url.pathname === '/blog-login') {
    return next();
  }

  // Safety fallback tracking for dashboard logging
  if (!BLOG_PASSWORD) {
    console.error("CRITICAL ERROR: BLOG_PASSWORD could not be retrieved from the environment schema.");
  }

  if (url.pathname.startsWith('/blog')) {
    const cookies = context.request.headers.get("cookie") || "";
    const isAuthenticated = cookies.includes("blog_auth=authenticated");

    if (!isAuthenticated) {
      return context.redirect("/blog-login");
    }
  }

  return next();
});
