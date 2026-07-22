import test from "node:test";
import assert from "node:assert/strict";
import { fetchLatestRepositoryCommits } from "../src/services/githubActivityService.js";

test("returns one latest commit per repository ordered by date", async () => {
  const responses = new Map([
    ["/users/S-Padiyar/repos", [{ owner: { login: "S-Padiyar" }, name: "older" }, { owner: { login: "S-Padiyar" }, name: "newer" }]],
    ["/repos/S-Padiyar/older/commits", [{ html_url: "https://github.test/older", commit: { message: "Older commit\nDetails", author: { date: "2025-01-01" } } }]],
    ["/repos/S-Padiyar/newer/commits", [{ html_url: "https://github.test/newer", commit: { message: "Newer commit", author: { date: "2025-02-01" } } }]]
  ]);
  const fetchMock = async url => {
    const path = [...responses.keys()].find(candidate => url.includes(candidate));
    return { ok: true, json: async () => responses.get(path) };
  };

  const commits = await fetchLatestRepositoryCommits("S-Padiyar", { fetchImpl: fetchMock });
  assert.deepEqual(commits.map(commit => commit.repository), ["newer", "older"]);
  assert.equal(commits[1].message, "Older commit");
});

test("keeps other repositories when one commit endpoint fails", async () => {
  const fetchMock = async url => {
    if (url.includes("/users/")) {
      return { ok: true, json: async () => [
        { owner: { login: "owner" }, name: "available" },
        { owner: { login: "owner" }, name: "empty" }
      ] };
    }
    if (url.includes("/empty/")) return { ok: false, status: 409 };
    return { ok: true, json: async () => [{
      html_url: "https://github.test/commit",
      commit: { message: "Works", author: { date: "2025-01-01" } }
    }] };
  };

  const commits = await fetchLatestRepositoryCommits("owner", { fetchImpl: fetchMock });
  assert.equal(commits.length, 1);
  assert.equal(commits[0].repository, "available");
});
