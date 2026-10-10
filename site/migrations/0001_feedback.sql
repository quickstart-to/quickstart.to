PRAGMA foreign_keys = ON;
CREATE TABLE users (
  id TEXT PRIMARY KEY, github_id TEXT NOT NULL UNIQUE, display_name TEXT NOT NULL,
  email TEXT, created_at INTEGER NOT NULL
);
CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  csrf TEXT NOT NULL, expires_at INTEGER NOT NULL
);
CREATE INDEX sessions_expiry ON sessions(expires_at);
CREATE TABLE oauth_states (
  state_hash TEXT PRIMARY KEY, verifier TEXT NOT NULL, return_path TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE TABLE rate_limits (key TEXT PRIMARY KEY, hits INTEGER NOT NULL, expires_at INTEGER NOT NULL);
CREATE TABLE feedback (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  request_id TEXT NOT NULL, request_hash TEXT NOT NULL,
  path TEXT NOT NULL, content_sha TEXT NOT NULL,
  exact TEXT NOT NULL, prefix TEXT NOT NULL, suffix TEXT NOT NULL,
  kind TEXT NOT NULL CHECK(kind IN ('outdated','incorrect','supplement','confused')),
  body TEXT NOT NULL, notify_email INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open','triaged','accepted','resolved','rejected')),
  visibility TEXT NOT NULL DEFAULT 'pending' CHECK(visibility IN ('pending','public','hidden')),
  created_at INTEGER NOT NULL, UNIQUE(user_id, request_id)
);
CREATE INDEX feedback_page ON feedback(path, visibility, created_at);
CREATE INDEX feedback_queue ON feedback(status, created_at);
CREATE TABLE resolutions (
  feedback_id TEXT PRIMARY KEY REFERENCES feedback(id) ON DELETE CASCADE,
  outcome TEXT NOT NULL CHECK(outcome IN ('updated','confirmed','rejected')),
  summary TEXT NOT NULL, sources TEXT NOT NULL, pr_url TEXT,
  request_hash TEXT NOT NULL, created_at INTEGER NOT NULL
);
CREATE TABLE email_outbox (
  feedback_id TEXT PRIMARY KEY REFERENCES feedback(id) ON DELETE CASCADE,
  attempts INTEGER NOT NULL DEFAULT 0, next_attempt INTEGER NOT NULL,
  sent_at INTEGER, created_at INTEGER NOT NULL
);
