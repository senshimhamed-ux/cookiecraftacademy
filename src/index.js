export default {
  async fetch(request, env, ctx) {
    const upstream = env.UPSTREAM_URL || "https://excellent-gourmet-cookie-craft.base44.app";
    const url = new URL(request.url);
    const targetUrl = new URL(url.pathname + url.search, upstream);

    const headers = new Headers(request.headers);
    headers.set("Host", targetUrl.host);
    headers.set("Referer", upstream);
    headers.delete("Accept-Encoding");

    return await fetch(targetUrl.toString(), {
      method: request.method,
      headers: headers,
      body: request.body,
      redirect: "follow",
    });
  }
};