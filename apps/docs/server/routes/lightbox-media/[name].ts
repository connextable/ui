export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method !== "GET" && method !== "HEAD") {
    return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  const name = getRouterParam(event, "name");
  if (name !== "flower" && name !== "bunny-excerpt") throw createError({ statusCode: 404 });

  const asset = await useStorage("assets:server").getItemRaw<Uint8Array>(`lightbox/${name}.mp4`);
  if (!asset?.byteLength) throw createError({ statusCode: 404 });
  const video = Uint8Array.from(asset);
  const headers = new Headers({
    "Accept-Ranges": "bytes",
    "Content-Type": "video/mp4",
    "Content-Length": String(video.byteLength),
  });

  if (method === "HEAD") return new Response(null, { headers });

  // The local example files need single-range responses for native video seeking.
  const range = /^bytes=(\d*)-(\d*)$/.exec(getHeader(event, "range") ?? "");
  if (!range || (!range[1] && !range[2]) || getHeader(event, "if-range")) {
    return new Response(video, { headers });
  }

  const [, first, last] = range;
  const size = video.byteLength;
  const start = first ? Number(first) : Math.max(0, size - Number(last));
  const end = first && last ? Math.min(Number(last), size - 1) : size - 1;
  if (start >= size || end < start) {
    headers.set("Content-Range", `bytes */${size}`);
    headers.set("Content-Length", "0");
    return new Response(null, { status: 416, headers });
  }

  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(video.subarray(start, end + 1), { status: 206, headers });
});
