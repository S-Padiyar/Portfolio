import { useEffect, useState } from "react";

export default function useGithubQuestLog(username) {
  const [commits, setCommits] = useState(null);
  const [commitsError, setCommitsError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const headers = { Accept: "application/vnd.github+json" };

    fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, { headers })
      .then(response => {
        if (!response.ok) throw new Error("Unable to load GitHub events");
        return response.json();
      })
      .then(events => {
        const repos = [...new Set(events
          .filter(event => event.type === "PushEvent")
          .map(event => event.repo.name))];

        return Promise.all(repos.map(repo =>
          fetch(`https://api.github.com/repos/${repo}/commits?author=${username}&per_page=5`, { headers })
            .then(response => response.ok ? response.json() : [])
            .then(items => items.map(item => ({
              repo: repo.split("/")[1],
              msg: item.commit.message.split("\n")[0],
              date: item.commit.author?.date || ""
            })))
        ));
      })
      .then(results => {
        if (cancelled) return;
        const latest = results.flat()
          .sort((a, b) => b.date.localeCompare(a.date))
          .slice(0, 5);
        setCommits(latest);
      })
      .catch(() => {
        if (!cancelled) setCommitsError(true);
      });

    return () => { cancelled = true; };
  }, [username]);

  return { commits, commitsError };
}
