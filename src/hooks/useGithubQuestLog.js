import { useEffect, useState } from "react";

export default function useGithubQuestLog(username) {
  const [commits, setCommits] = useState(null);
  const [commitsError, setCommitsError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const headers = { Accept: "application/vnd.github+json" };

    // Load the profile's repositories first so every repository can contribute one row.
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers })
      .then(response => {
        if (!response.ok) throw new Error("Unable to load GitHub repositories");
        return response.json();
      })
      .then(repos => {
        return Promise.all(repos.map(repo =>
          fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=1`, { headers })
            .then(response => response.ok ? response.json() : [])
            .then(items => items.map(item => ({
              repo: repo.name,
              msg: item.commit.message.split("\n")[0],
              date: item.commit.author?.date || "",
              url: item.html_url
            })))
        ));
      })
      .then(results => {
        if (cancelled) return;
        // Each request returns at most one commit, preserving one entry per repository.
        const latest = results.flat()
          .sort((a, b) => b.date.localeCompare(a.date));
        setCommits(latest);
      })
      .catch(() => {
        if (!cancelled) setCommitsError(true);
      });

    return () => { cancelled = true; };
  }, [username]);

  return { commits, commitsError };
}
