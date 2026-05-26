#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=../runtime/governed_runtime.sh
source "$ROOT_DIR/runtime/governed_runtime.sh"

print_divider() {
  printf '\n%s\n' "------------------------------------------------------------"
}

run_and_show() {
  local scenario="$1"
  local release="$2"
  local mutation_line="$3"
  local marker="$4"
  local before_marker_count after_marker_count result release_id decision reason before_hash after_hash

  before_marker_count="$(grep -cF "$marker" "$TARGET_FILE" || true)"
  result="$(execute_release "$scenario" "$release" "$mutation_line")"
  IFS='|' read -r release_id decision reason before_hash after_hash <<< "$result"
  after_marker_count="$(grep -cF "$marker" "$TARGET_FILE" || true)"

  printf 'scenario=%s\n' "$scenario"
  printf 'release_id=%s\n' "$release_id"
  printf 'decision=%s\n' "$decision"
  printf 'reason=%s\n' "$reason"
  printf 'target_hash_before=%s\n' "$before_hash"
  printf 'target_hash_after=%s\n' "$after_hash"

  if [[ "$decision" == "ALLOW" ]]; then
    printf 'mutation_executed=yes\n'
  else
    if [[ "$before_marker_count" == "$after_marker_count" ]]; then
      printf 'mutation_blocked=yes\n'
    else
      printf 'mutation_blocked=no\n'
    fi
  fi

  printf 'receipts_total=%s\n' "$(count_receipts)"
  printf 'latest_receipt=%s\n' "$(tail -n 1 "$RECEIPTS_FILE")"
}

reset_state

printf 'DETERMA governed execution demo (minimal runtime slice)\n'
printf 'Execution gap: approval time != execution time\n'

print_divider
printf '1) VALID EXECUTION\n'
release_valid="$(build_release "release-valid-001")"
run_and_show "valid" "$release_valid" "mutation:valid" "mutation:valid"

print_divider
printf '2) REPOSITORY DRIFT DENIAL\n'
release_drift="$(build_release "release-drift-001")"
printf 'external-drift\n' >> "$TARGET_FILE"
run_and_show "drift" "$release_drift" "mutation:drift-should-not-run" "mutation:drift-should-not-run"

print_divider
printf '3) REPLAY DENIAL\n'
release_replay="$(build_release "release-replay-001")"
run_and_show "replay-first" "$release_replay" "mutation:replay" "mutation:replay"
run_and_show "replay-second" "$release_replay" "mutation:replay" "mutation:replay"

print_divider
printf 'FINAL TARGET STATE\n'
cat "$TARGET_FILE"

print_divider
printf 'ALL RECEIPTS (append-only log)\n'
cat "$RECEIPTS_FILE"
