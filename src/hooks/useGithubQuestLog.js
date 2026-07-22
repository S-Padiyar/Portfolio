import { useEffect, useState } from "react";
import { fetchLatestRepositoryCommits } from "../services/githubActivityService";

export default function useGithubQuestLog(username) {
  const [commits, setCommits] = useState(null);
  const [commitsError, setCommitsError] = useState(false);

  useEffect(() => {
    const requestController = new AbortController();
    fetchLatestRepositoryCommits(username, { signal: requestController.signal })
      .then(setCommits)
      .catch(error => {
        if (error.name !== "AbortError") setCommitsError(true);
      });

    // Abort repository and commit requests when the owner changes or the app unmounts.
    return () => requestController.abort();
  }, [username]);

  return { commits, commitsError };
}
