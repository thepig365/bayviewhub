#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

check_no_match() {
  local pattern="$1"
  local target="$2"
  local label="$3"

  if rg -n "${pattern}" "${target}" >/dev/null 2>&1; then
    echo "FAIL: ${label}"
    rg -n "${pattern}" "${target}"
    return 1
  fi

  echo "PASS: ${label}"
}

check_no_match "New South Wales" "${ROOT_DIR}/app/terms/page.tsx" "terms does not mention New South Wales"
check_no_match "\\+61 \\(0\\)X" "${ROOT_DIR}/app/privacy/page.tsx" "privacy has no placeholder phone"
check_no_match "/second-home" "${ROOT_DIR}/public/llms.txt" "llms.txt has no /second-home"
check_no_match "/backyard-second-home/feasibility-checklist" "${ROOT_DIR}/public/llms.txt" "llms.txt has no legacy checklist URL"
