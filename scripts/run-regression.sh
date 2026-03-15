#!/usr/bin/env bash
# Run full regression (all tests). Use on schedule or pre-release.
# Usage: ./scripts/run-regression.sh [--headed] [extra playwright args]
set -euo pipefail
cd "$(dirname "$0")/.."

export TEST_ENV="${TEST_ENV:-prod}"

echo "🧪 Running full regression (env: ${TEST_ENV})"
npx playwright test "$@"
echo "✅ Regression complete"
