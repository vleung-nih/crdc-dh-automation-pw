#!/usr/bin/env bash
# Run full regression (all tests). Use on schedule or pre-release.
set -e
cd "$(dirname "$0")/.."
export TEST_ENV="${TEST_ENV:-local}"
npx playwright test "$@"
