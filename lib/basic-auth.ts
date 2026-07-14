const REALM = "SmartFlowAlgo Admin";

export function isAuthorized(req: Request): boolean {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  if (!user || !pass) {
    console.warn("[admin-auth] ADMIN_USER / ADMIN_PASSWORD not set — admin routes are locked.");
    return false;
  }

  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;

  try {
    const decoded = atob(header.slice("Basic ".length));
    const separator = decoded.indexOf(":");
    if (separator === -1) return false;

    const providedUser = decoded.slice(0, separator);
    const providedPass = decoded.slice(separator + 1);

    return providedUser === user && providedPass === pass;
  } catch {
    return false;
  }
}

/** 401 with a WWW-Authenticate header, which makes the browser show its
 *  native login prompt when a page (not a fetch call) hits this. */
export function unauthorizedResponse(): Response {
  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${REALM}"` },
  });
}