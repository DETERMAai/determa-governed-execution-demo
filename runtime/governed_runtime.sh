#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE_DIR="$ROOT_DIR/runtime/state"
TARGET_FILE="$STATE_DIR/repo.txt"
RECEIPTS_FILE="$STATE_DIR/receipts.jsonl"
USED_RELEASES_FILE="$STATE_DIR/used_releases.txt"

hash_file() {
  local file_path="$1"
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$file_path" | awk '{print $1}'
    return
  fi

  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$file_path" | awk '{print $1}'
    return
  fi

  echo "Missing hash utility (sha256sum or shasum)." >&2
  exit 1
}

reset_state() {
  mkdir -p "$STATE_DIR"
  printf "repo-base\n" > "$TARGET_FILE"
  : > "$RECEIPTS_FILE"
  : > "$USED_RELEASES_FILE"
}

build_release() {
  local release_id="$1"
  local approved_hash
  approved_hash="$(hash_file "$TARGET_FILE")"
  printf "%s;%s;%s" "$release_id" "$approved_hash" "runtime/state/repo.txt"
}

mark_release_used() {
  local release_id="$1"
  printf "%s\n" "$release_id" >> "$USED_RELEASES_FILE"
}

is_release_used() {
  local release_id="$1"
  grep -qxF "$release_id" "$USED_RELEASES_FILE"
}

recompute_legitimacy() {
  local release="$1"
  local release_id approved_hash approved_path current_hash

  IFS=';' read -r release_id approved_hash approved_path <<< "$release"

  if is_release_used "$release_id"; then
    printf "DENY;replay"
    return
  fi

  if [[ "$approved_path" != "runtime/state/repo.txt" ]]; then
    printf "DENY;scope_violation"
    return
  fi

  current_hash="$(hash_file "$TARGET_FILE")"
  if [[ "$current_hash" != "$approved_hash" ]]; then
    printf "DENY;repository_drift"
    return
  fi

  printf "ALLOW;witness_match"
}

append_receipt() {
  local scenario="$1"
  local release_id="$2"
  local decision="$3"
  local reason="$4"
  local before_hash="$5"
  local after_hash="$6"

  printf '%s|%s|%s|%s|%s|%s\n' \
    "$scenario" "$release_id" "$decision" "$reason" "$before_hash" "$after_hash" >> "$RECEIPTS_FILE"
}

execute_release() {
  local scenario="$1"
  local release="$2"
  local mutation_line="$3"
  local release_id approved_hash approved_path
  local before_hash after_hash decision reason

  IFS=';' read -r release_id approved_hash approved_path <<< "$release"
  before_hash="$(hash_file "$TARGET_FILE")"

  IFS=';' read -r decision reason <<< "$(recompute_legitimacy "$release")"

  if [[ "$decision" == "ALLOW" ]]; then
    printf "%s\n" "$mutation_line" >> "$TARGET_FILE"
    mark_release_used "$release_id"
  fi

  after_hash="$(hash_file "$TARGET_FILE")"
  append_receipt "$scenario" "$release_id" "$decision" "$reason" "$before_hash" "$after_hash"

  printf "%s|%s|%s|%s|%s" "$release_id" "$decision" "$reason" "$before_hash" "$after_hash"
}

count_receipts() {
  if [[ ! -f "$RECEIPTS_FILE" ]]; then
    echo "0"
    return
  fi

  wc -l < "$RECEIPTS_FILE" | tr -d ' '
}
