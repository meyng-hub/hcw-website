/**
 * Thin GitHub Contents API client — the admin's write path.
 * Every save is a commit on main; CI then deploys it (~2-3 min).
 * See docs/ADMIN-ARCHITECTURE.md.
 */

const REPO = "meyng-hub/hcw-website";
const BRANCH = "main";
const API = "https://api.github.com";

function headers(): Record<string, string> {
  const pat = process.env.GITHUB_CONTENT_PAT;
  if (!pat) throw new Error("GITHUB_CONTENT_PAT is not configured");
  return {
    Authorization: `Bearer ${pat}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export interface RepoFile {
  contentBase64: string;
  sha: string;
}

export async function getFile(path: string): Promise<RepoFile> {
  const res = await fetch(
    `${API}/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    { headers: headers(), cache: "no-store" },
  );
  if (!res.ok) throw new Error(`GitHub GET ${path} → ${res.status}`);
  const json = (await res.json()) as { content: string; sha: string };
  return { contentBase64: json.content.replace(/\n/g, ""), sha: json.sha };
}

export async function getJsonFile<T>(path: string): Promise<{ data: T; sha: string }> {
  const file = await getFile(path);
  const text = Buffer.from(file.contentBase64, "base64").toString("utf8");
  return { data: JSON.parse(text) as T, sha: file.sha };
}

async function putOnce(
  path: string,
  contentBase64: string,
  message: string,
  sha?: string,
): Promise<Response> {
  return fetch(`${API}/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
}

/**
 * Create or update a file. On a sha conflict (someone else committed in
 * between) the sha is re-fetched once and the write retried.
 */
export async function putFile(
  path: string,
  contentBase64: string,
  message: string,
  sha?: string,
): Promise<void> {
  let res = await putOnce(path, contentBase64, message, sha);
  if (res.status === 409 || res.status === 422) {
    let freshSha: string | undefined;
    try {
      freshSha = (await getFile(path)).sha;
    } catch {
      freshSha = undefined; // file may not exist yet (new upload)
    }
    res = await putOnce(path, contentBase64, message, freshSha);
  }
  if (!res.ok) {
    const detail = await res.text();
    console.error(`GitHub PUT ${path} → ${res.status}: ${detail.slice(0, 200)}`);
    throw new Error(`GitHub PUT ${path} → ${res.status}`);
  }
}

export async function putJsonFile(
  path: string,
  data: unknown,
  message: string,
  sha?: string,
): Promise<void> {
  const text = JSON.stringify(data, null, 2) + "\n";
  await putFile(path, Buffer.from(text, "utf8").toString("base64"), message, sha);
}

export interface RepoDirEntry {
  name: string;
  path: string;
  size: number;
  sha: string;
}

export async function listDir(path: string): Promise<RepoDirEntry[]> {
  const res = await fetch(
    `${API}/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    { headers: headers(), cache: "no-store" },
  );
  if (!res.ok) throw new Error(`GitHub LIST ${path} → ${res.status}`);
  const json = (await res.json()) as Array<{
    name: string;
    path: string;
    size: number;
    sha: string;
    type: string;
  }>;
  return json
    .filter((e) => e.type === "file")
    .map(({ name, path: p, size, sha }) => ({ name, path: p, size, sha }));
}
