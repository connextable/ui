const url = process.env.DOCS_URL;

if (!url) {
  throw new Error("DOCS_URL is required");
}

try {
  const response = await fetch(url, { signal: AbortSignal.timeout(2_000) });
  await response.body?.cancel();
  process.exitCode = response.ok ? 0 : 1;
} catch {
  process.exitCode = 1;
}
