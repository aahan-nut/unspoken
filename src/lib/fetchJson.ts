export class FetchTimeoutError extends Error {
  constructor() {
    super("Request timed out.");
    this.name = "FetchTimeoutError";
  }
}

/** POSTs JSON with a bounded timeout; throws FetchTimeoutError on abort, or an Error with the server's message on a non-2xx response. */
export async function postJSON<T>(url: string, body: unknown, timeoutMs = 15_000): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new FetchTimeoutError();
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}.`;
    try {
      const data: unknown = await response.json();
      if (typeof data === "object" && data !== null && typeof (data as { error?: unknown }).error === "string") {
        message = (data as { error: string }).error;
      }
    } catch {
      // Non-JSON error body — keep the generic status message.
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
