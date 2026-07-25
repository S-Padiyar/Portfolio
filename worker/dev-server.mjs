import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import worker from "./src/index.js";

const workerRoot = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(workerRoot, ".dev.vars");
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 8787);

/**
 * Read Wrangler-style local variables without printing secret values.
 * This lets local development bypass Cloudflare's workerd binary while keeping
 * the production Worker source as the single request handler.
 */
function loadDevVars(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Missing ${filePath}. Copy worker/.dev.vars.example to worker/.dev.vars first.`);
  }

  return readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"))
    .reduce((env, line) => {
      const separatorIndex = line.indexOf("=");
      if (separatorIndex === -1) return env;

      const key = line.slice(0, separatorIndex).trim();
      const rawValue = line.slice(separatorIndex + 1).trim();
      env[key] = rawValue.replace(/^["']|["']$/g, "");
      return env;
    }, {});
}

async function readRequestBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

async function handleNodeRequest(nodeRequest, nodeResponse, env) {
  try {
    const body = nodeRequest.method === "GET" || nodeRequest.method === "HEAD"
      ? undefined
      : await readRequestBody(nodeRequest);
    const requestUrl = `http://${nodeRequest.headers.host || `${host}:${port}`}${nodeRequest.url}`;
    const request = new Request(requestUrl, {
      method: nodeRequest.method,
      headers: nodeRequest.headers,
      body
    });

    const response = await worker.fetch(request, env, fetch);
    nodeResponse.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    nodeResponse.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error("Local Botmay dev server error:", error);
    nodeResponse.writeHead(500, { "Content-Type": "application/json" });
    nodeResponse.end(JSON.stringify({ error: "Local Botmay dev server failed." }));
  }
}

const env = loadDevVars(envPath);

createServer((request, response) => {
  handleNodeRequest(request, response, env);
}).listen(port, host, () => {
  console.log(`Botmay local server ready on http://${host}:${port}`);
  console.log(`Allowed origin: ${env.ALLOWED_ORIGIN || "(missing)"}`);
  console.log("Press Ctrl+C to stop.");
});
