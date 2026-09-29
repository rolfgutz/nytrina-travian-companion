(function initGitHubSync(global) {
  "use strict";

  const root = (global.NytrinA = global.NytrinA || {});
  const TOKEN_KEY = "nytrina:github-sync-token";
  const API_BASE = "https://api.github.com";

  function encodeContent(value) {
    const bytes = new TextEncoder().encode(String(value || ""));
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return global.btoa(binary);
  }

  function decodeContent(value) {
    const binary = global.atob(String(value || "").replace(/\n/g, ""));
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  class GitHubSyncService {
    constructor({ storage, getSettings }) {
      this.storage = storage;
      this.getSettings = getSettings;
      this.syncing = false;
    }

    tokenKey() {
      const host = String(root.Server?.getContext?.().host || "default");
      return TOKEN_KEY + ":" + host;
    }

    getToken() {
      try {
        return String(global.localStorage.getItem(this.tokenKey()) || "").trim();
      } catch (_error) {
        return "";
      }
    }

    setToken(token) {
      try {
        const value = String(token || "").trim();
        if (value) global.localStorage.setItem(this.tokenKey(), value);
        else global.localStorage.removeItem(this.tokenKey());
      } catch (_error) {
        return;
      }
    }

    config() {
      const settings = this.getSettings() || {};
      return {
        enabled: Boolean(settings.githubSyncEnabled),
        owner: String(settings.githubSyncOwner || "").trim(),
        repo: String(settings.githubSyncRepo || "").trim(),
        branch: String(settings.githubSyncBranch || "main").trim() || "main",
        path: String(settings.githubSyncPath || "nytrina/reports.json").trim() || "nytrina/reports.json",
        token: this.getToken(),
      };
    }

    isConfigured(config = this.config()) {
      return Boolean(
        config.enabled &&
        config.owner &&
        config.repo &&
        config.branch &&
        config.path &&
        config.token,
      );
    }

    async validateToken() {
      const token = this.getToken();
      if (!token) {
        return { tokenPresent: false, valid: false, syncConfigured: false };
      }

      const config = this.config();
      const controller =
        typeof global.AbortController === "function"
          ? new global.AbortController()
          : null;
      const timeoutId = controller
        ? global.setTimeout(() => controller.abort(), 10000)
        : null;

      try {
        const response = await global.fetch(API_BASE + "/user", {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: "Bearer " + token,
            "X-GitHub-Api-Version": "2022-11-28",
          },
          ...(controller ? { signal: controller.signal } : {}),
        });

        if (response.status === 401) {
          return {
            tokenPresent: true,
            valid: false,
            status: response.status,
            syncConfigured: this.isConfigured(config),
          };
        }

        if (!response.ok) {
          return {
            tokenPresent: true,
            valid: null,
            status: response.status,
            syncConfigured: this.isConfigured(config),
          };
        }

        const user = await response.json();
        return {
          tokenPresent: true,
          valid: true,
          login: String(user?.login || ""),
          syncConfigured: this.isConfigured(config),
        };
      } catch (error) {
        return {
          tokenPresent: true,
          valid: null,
          reason: error?.name === "AbortError" ? "timeout" : "network",
          syncConfigured: this.isConfigured(config),
        };
      } finally {
        if (timeoutId !== null) global.clearTimeout(timeoutId);
      }
    }

    async request(url, options = {}) {
      const response = await global.fetch(url, {
        ...options,
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: "Bearer " + this.config().token,
          "X-GitHub-Api-Version": "2022-11-28",
          ...(options.headers || {}),
        },
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error("GitHub " + response.status + ": " + detail.slice(0, 240));
      }

      return response.json();
    }

    contentsUrl(config) {
      return (
        API_BASE +
        "/repos/" +
        encodeURIComponent(config.owner) +
        "/" +
        encodeURIComponent(config.repo) +
        "/contents/" +
        config.path.split("/").map(encodeURIComponent).join("/") +
        "?ref=" +
        encodeURIComponent(config.branch)
      );
    }

    async readRemote(config) {
      try {
        const file = await this.request(this.contentsUrl(config));
        const content = JSON.parse(decodeContent(file.content));
        return {
          sha: String(file.sha || ""),
          reports: Array.isArray(content?.reports) ? content.reports : [],
        };
      } catch (error) {
        if (String(error?.message || "").includes("GitHub 404")) {
          return { sha: "", reports: [] };
        }
        throw error;
      }
    }

    mergeReports(localReports, remoteReports) {
      const merged = new Map();
      const add = (report) => {
        const id = String(report?.reportId || "").trim();
        if (!id) return;
        const current = merged.get(id);
        const currentTime = new Date(current?.date || 0).getTime();
        const nextTime = new Date(report?.date || 0).getTime();
        if (!current || nextTime >= currentTime) merged.set(id, report);
      };

      (remoteReports || []).forEach(add);
      (localReports || []).forEach(add);

      return Array.from(merged.values()).sort(
        (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime(),
      );
    }

    async writeRemote(config, reports, sha) {
      const body = JSON.stringify(
        {
          version: "1",
          updatedAt: new Date().toISOString(),
          source: String(global.location.hostname || "unknown"),
          reports,
        },
        null,
        2,
      );

      return this.request(this.contentsUrl(config).split("?")[0], {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "sync: reports " + new Date().toISOString(),
          content: encodeContent(body),
          branch: config.branch,
          ...(sha ? { sha } : {}),
        }),
      });
    }

    async sync() {
      if (this.syncing) return { skipped: true };
      const config = this.config();
      if (!this.isConfigured(config)) return { configured: false };

      this.syncing = true;
      try {
        const localReports = await this.storage.getAll(root.Constants.STORES.REPORTS);
        let remote = await this.readRemote(config);
        let merged = this.mergeReports(localReports, remote.reports);

        for (let attempt = 0; attempt < 3; attempt += 1) {
          try {
            await this.writeRemote(config, merged, remote.sha);
            break;
          } catch (error) {
            if (!String(error?.message || "").includes("GitHub 409") || attempt === 2) {
              throw error;
            }
            remote = await this.readRemote(config);
            merged = this.mergeReports(merged, remote.reports);
          }
        }

        const localById = new Map(localReports.map((report) => [String(report.reportId), report]));
        let added = 0;
        for (const report of merged) {
          if (!localById.has(String(report.reportId))) added += 1;
          await this.storage.put(root.Constants.STORES.REPORTS, report);
        }

        return { configured: true, reports: merged.length, added };
      } finally {
        this.syncing = false;
      }
    }
  }

  root.GitHubSyncService = GitHubSyncService;
})(window);
