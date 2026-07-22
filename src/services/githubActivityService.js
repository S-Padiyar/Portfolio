const GITHUB_API_URL = "https://api.github.com";
const REQUEST_HEADERS = { Accept: "application/vnd.github+json" };

async function fetchJson(url, signal, fetchImpl) {
  const response = await fetchImpl(url, { headers: REQUEST_HEADERS, signal });
  if (!response.ok) throw new Error(`GitHub request failed with ${response.status}.`);
  return response.json();
}

/** Fetch one latest commit per public repository for the Quest Log. */
export async function fetchLatestRepositoryCommits(username, {
  signal,
  fetchImpl = fetch
} = {}) {
  const repositories = await fetchJson(
    `${GITHUB_API_URL}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
    signal,
    fetchImpl
  );

  const commitGroups = await Promise.all(repositories.map(async repository => {
    try {
      const commits = await fetchJson(
        `${GITHUB_API_URL}/repos/${encodeURIComponent(repository.owner.login)}/${encodeURIComponent(repository.name)}/commits?per_page=1`,
        signal,
        fetchImpl
      );
      return commits.map(commit => ({
        repository: repository.name,
        message: commit.commit.message.split("\n")[0],
        date: commit.commit.author?.date || "",
        url: commit.html_url
      }));
    } catch (error) {
      if (error.name === "AbortError") throw error;
      return [];
    }
  }));

  return commitGroups.flat().sort((left, right) => right.date.localeCompare(left.date));
}
