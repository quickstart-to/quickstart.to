-- Additive upgrade: existing feedback IDs, moderation, resolutions and outbox stay intact.
CREATE TABLE annotations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  request_id TEXT NOT NULL, request_hash TEXT NOT NULL,
  path TEXT NOT NULL, content_sha TEXT NOT NULL,
  exact TEXT NOT NULL, prefix TEXT NOT NULL, suffix TEXT NOT NULL,
  kind TEXT NOT NULL CHECK(kind IN ('highlight','discussion')),
  body TEXT NOT NULL DEFAULT '',
  visibility TEXT NOT NULL DEFAULT 'pending' CHECK(visibility IN ('pending','public','hidden')),
  created_at INTEGER NOT NULL, UNIQUE(user_id,request_id)
);
CREATE INDEX annotations_page ON annotations(path,visibility,created_at,id);
CREATE TABLE annotation_replies (
  id TEXT PRIMARY KEY,
  annotation_id TEXT REFERENCES annotations(id) ON DELETE CASCADE,
  feedback_id TEXT REFERENCES feedback(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reply_to TEXT REFERENCES annotation_replies(id) ON DELETE SET NULL,
  body TEXT NOT NULL, visibility TEXT NOT NULL DEFAULT 'pending' CHECK(visibility IN ('pending','public','hidden')),
  request_id TEXT NOT NULL, request_hash TEXT NOT NULL, created_at INTEGER NOT NULL,
  CHECK((annotation_id IS NULL) != (feedback_id IS NULL)), UNIQUE(user_id,request_id)
);
CREATE INDEX annotation_replies_root ON annotation_replies(annotation_id,feedback_id,visibility,created_at,id);
CREATE TABLE annotation_reactions (
  id TEXT PRIMARY KEY,
  annotation_id TEXT REFERENCES annotations(id) ON DELETE CASCADE,
  feedback_id TEXT REFERENCES feedback(id) ON DELETE CASCADE,
  reply_id TEXT REFERENCES annotation_replies(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  CHECK((annotation_id IS NOT NULL) + (feedback_id IS NOT NULL) + (reply_id IS NOT NULL) = 1)
);
CREATE UNIQUE INDEX reaction_annotation ON annotation_reactions(user_id,annotation_id) WHERE annotation_id IS NOT NULL;
CREATE UNIQUE INDEX reaction_feedback ON annotation_reactions(user_id,feedback_id) WHERE feedback_id IS NOT NULL;
CREATE UNIQUE INDEX reaction_reply ON annotation_reactions(user_id,reply_id) WHERE reply_id IS NOT NULL;
CREATE TABLE annotation_reports (
  id TEXT PRIMARY KEY,
  annotation_id TEXT REFERENCES annotations(id) ON DELETE CASCADE,
  feedback_id TEXT REFERENCES feedback(id) ON DELETE CASCADE,
  reply_id TEXT REFERENCES annotation_replies(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open','reviewed')),
  created_at INTEGER NOT NULL,
  CHECK((annotation_id IS NOT NULL) + (feedback_id IS NOT NULL) + (reply_id IS NOT NULL) = 1)
);
CREATE UNIQUE INDEX report_annotation ON annotation_reports(user_id,annotation_id) WHERE annotation_id IS NOT NULL;
CREATE UNIQUE INDEX report_feedback ON annotation_reports(user_id,feedback_id) WHERE feedback_id IS NOT NULL;
CREATE UNIQUE INDEX report_reply ON annotation_reports(user_id,reply_id) WHERE reply_id IS NOT NULL;
CREATE TABLE interaction_version (id INTEGER PRIMARY KEY CHECK(id=1), version INTEGER NOT NULL);
INSERT INTO interaction_version VALUES(1,1);
-- Separate metadata keeps the seven-column legacy resolution insert compatible
-- with the previous Worker during an additive rollout.
CREATE TABLE resolution_versions (
  feedback_id TEXT PRIMARY KEY REFERENCES feedback(id) ON DELETE CASCADE,
  merged_sha TEXT NOT NULL, changelog_path TEXT NOT NULL
);
