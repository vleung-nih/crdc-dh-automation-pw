#!/usr/bin/env bash
# Run smoke suite only. Use in CI on every commit.
# Usage: ./scripts/run-smoke.sh [--headed] [extra playwright args]
set -euo pipefail
cd "$(dirname "$0")/.."

export TEST_ENV="${TEST_ENV:-prod}"

echo "🔥 Running smoke tests (env: ${TEST_ENV})"
npx playwright test tests/smoke "$@"
echo "✅ Smoke tests complete"
