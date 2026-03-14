#!/usr/bin/env bash
# Run smoke suite only. Use in CI on every commit.
set -e
cd "$(dirname "$0")/.."
export TEST_ENV="${TEST_ENV:-local}"
npx playwright test tests/smoke "$@"
