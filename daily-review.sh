#!/bin/zsh

# Daily Review Script
# Basic daily reflection and planning

echo "🌙 DAILY REVIEW"
echo "==============="

# Simple daily reflection
echo "📝 How did today go?"
echo "What went well today?"
read -r WHAT_WENT_WELL

echo ""
echo "What could be improved tomorrow?"
read -r WHAT_TO_IMPROVE

echo ""
echo "What's your priority for tomorrow?"
read -r TOMORROW_PRIORITY

# Log the review
TODAY=$(date '+%Y-%m-%d')
REVIEW_FILE="./daily-logs/review-$TODAY.md"

mkdir -p ./daily-logs
cat > "$REVIEW_FILE" << EOF
# Daily Review - $TODAY

## What went well:
$WHAT_WENT_WELL

## What to improve:
$WHAT_TO_IMPROVE

## Tomorrow's priority:
$TOMORROW_PRIORITY

---
Generated on $(date)
EOF

echo ""
echo "✅ Daily review complete"
echo "✅ Review saved to: $REVIEW_FILE"
echo "🎯 Tomorrow's priority: $TOMORROW_PRIORITY"
