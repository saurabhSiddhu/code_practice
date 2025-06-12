#!/bin/zsh

# End-of-Day Review Automation
# Run this at end of workday to capture progress and prep tomorrow

# Get script directory to work with relative paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$SCRIPT_DIR"

echo "🌅 END-OF-DAY REVIEW STARTING..."
echo "================================="

# Get today's date
TODAY=$(date '+%Y-%m-%d')
TOMORROW=$(date -v+1d '+%Y-%m-%d')

# Create daily review log directory if it doesn't exist
mkdir -p "$WORKSPACE_DIR/daily-logs"

# Daily review file
REVIEW_FILE="$WORKSPACE_DIR/daily-logs/review-$TODAY.md"

echo "# End-of-Day Review - $TODAY" > "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"

# Check git commits today (change to workspace directory first)
echo "## Code Progress Today" >> "$REVIEW_FILE"
echo "Git commits made today:" >> "$REVIEW_FILE"
cd "$WORKSPACE_DIR"
git log --oneline --since="today" --author="$(git config user.name)" >> "$REVIEW_FILE" 2>/dev/null || echo "No git commits found" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"

# Generate and show todo completion report
echo "📋 Generating today's task completion report..."
node scripts/todo-tracker.js report

echo ""
echo "📊 Today's Todo Summary:"
node scripts/todo-tracker.js dashboard | tail -n 10

echo ""
echo "📄 Daily report saved to daily-logs/ folder"
echo ""

# Ask about wins
echo "🏆 What was your biggest win today?"
read -r WIN
echo "**Today's Win:** $WIN" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"

# Ask about challenges
echo "🔧 What blocked you or felt difficult?"
read -r CHALLENGE
echo "**Challenge:** $CHALLENGE" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"

# Check if yesterday's priority was completed
YESTERDAY=$(date -v-1d '+%Y-%m-%d')
YESTERDAY_REVIEW="$WORKSPACE_DIR/daily-logs/review-$YESTERDAY.md"

# Get today's todo completion data for accountability
echo "📊 Analyzing today's task completion data..."
TODO_JSON=$(node scripts/todo-tracker.js report --json 2>/dev/null)

if [[ -n "$TODO_JSON" ]]; then
  # Extract key metrics using jq
  COMPLETION_RATE=$(echo "$TODO_JSON" | jq -r '.completion_rate // 0')
  PENDING_TASKS=$(echo "$TODO_JSON" | jq -r '.pending_count // 0')
  TIME_ACCURACY=$(echo "$TODO_JSON" | jq -r '.time_estimation_accuracy // 100')
  MISSED_CATEGORIES=$(echo "$TODO_JSON" | jq -r '.missed_categories | length')
  
  echo "📈 Today's Performance:"
  echo "  Task Completion: $COMPLETION_RATE%"
  echo "  Pending Tasks: $PENDING_TASKS"
  echo "  Time Accuracy: $TIME_ACCURACY%"
else
  # Fallback values if todo data unavailable
  COMPLETION_RATE=50
  PENDING_TASKS=5
  TIME_ACCURACY=70
  MISSED_CATEGORIES=2
fi

if [[ -f "$YESTERDAY_REVIEW" ]]; then
  YESTERDAY_PRIORITY=$(grep "Tomorrow's Priority:" "$YESTERDAY_REVIEW" | sed 's/\*\*Tomorrow'\''s Priority:\*\* //')
  if [[ -n "$YESTERDAY_PRIORITY" ]]; then
    echo ""
    echo "⏳ ACCOUNTABILITY CHECK:"
    echo "Yesterday you committed to: '$YESTERDAY_PRIORITY'"
    echo ""
    echo "Did you complete yesterday's priority? (y/n/partial)"
    read -r COMPLETED
    
    echo "## Yesterday's Accountability" >> "$REVIEW_FILE"
    echo "**Yesterday's Commitment:** $YESTERDAY_PRIORITY" >> "$REVIEW_FILE"
    echo "**Status:** $COMPLETED" >> "$REVIEW_FILE"
    
    case $COMPLETED in
      n|N|no|No|NO)
        echo ""
        echo "🚨 PRIORITY NOT COMPLETED - ANALYZING TASK DATA..."
        
        # Enhanced failure analysis with todo completion data
        echo "📊 Today's task completion context:"
        echo "  - Task Completion Rate: $COMPLETION_RATE%"
        echo "  - Pending Tasks: $PENDING_TASKS"
        echo "  - Time Estimation Accuracy: $TIME_ACCURACY%"
        echo ""
        
        # Record task completion metrics for improvement
        if [[ $COMPLETION_RATE -lt 50 ]]; then
          echo "📈 LOW TASK COMPLETION: Focus on better planning tomorrow"
        elif [[ $COMPLETION_RATE -lt 60 ]]; then
          echo "📈 MODERATE TASK COMPLETION: Room for improvement in task management"
        else
          echo "📈 GOOD TASK COMPLETION: Priority missed but daily tasks completed well"
        fi
        
        # Count failure streak by checking previous reviews
        FAILURE_STREAK=1
        for i in {2..7}; do
          PAST_DATE=$(date -v-${i}d '+%Y-%m-%d')
          PAST_REVIEW="$WORKSPACE_DIR/daily-logs/review-$PAST_DATE.md"
          if [[ -f "$PAST_REVIEW" ]] && grep -q "Consequence:" "$PAST_REVIEW"; then
            FAILURE_STREAK=$((FAILURE_STREAK + 1))
          else
            break
          fi
        done
        
        # Record failure for reflection
        echo "**Failure Streak:** $FAILURE_STREAK" >> "$REVIEW_FILE"
        echo "**Task Reflection:** Consider better time management and priority setting" >> "$REVIEW_FILE"
        echo ""
        echo "📝 Priority not completed - Focus on better planning for tomorrow"
        ;;
      partial|Partial|PARTIAL|p|P)
        echo "**Partial completion noted** - No major consequence, but aim for 100% tomorrow!" >> "$REVIEW_FILE"
        echo "🤔 Partial completion - You get a pass this time, but aim for 100% tomorrow!"
        ;;
      y|Y|yes|Yes|YES)
        echo "**✅ COMPLETED** - Well done!" >> "$REVIEW_FILE"
        echo "🎉 Excellent! You kept your commitment!"
        ;;
    esac
    echo "" >> "$REVIEW_FILE"
  fi
fi

# Tomorrow's priority
echo "🎯 What's the ONE thing you want to accomplish tomorrow?"
read -r PRIORITY
echo "**Tomorrow's Priority:** $PRIORITY" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"

# Make the commitment binding
echo ""
echo "🤝 MAKING A COMMITMENT:"
echo "By setting this priority, you're making a commitment to yourself."
echo "If you don't complete '$PRIORITY' tomorrow, you'll face a consequence."
echo ""
echo "Do you commit to completing this task tomorrow? (y/n)"
read -r COMMIT

if [[ "$COMMIT" == "y" || "$COMMIT" == "Y" || "$COMMIT" == "yes" || "$COMMIT" == "Yes" ]]; then
  echo "**Commitment Level:** COMMITTED ✅" >> "$REVIEW_FILE"
  echo "**Consequence if not completed:** Will be assigned during tomorrow's review" >> "$REVIEW_FILE"
  echo ""
  echo "✅ Commitment locked in! Tomorrow you'll be held accountable."
else
  echo "**Commitment Level:** Soft goal (no consequences)" >> "$REVIEW_FILE"
  echo ""
  echo "📝 Noted as a soft goal. Consider making a stronger commitment next time."
fi
echo "" >> "$REVIEW_FILE"

# Update simple tracker for tomorrow
SIMPLE_TRACKER="$WORKSPACE_DIR/SIMPLE_DAILY_TRACKER.md"
TOMORROW_TRACKER="$WORKSPACE_DIR/daily-logs/tracker-$TOMORROW.md"

if [[ -f "$SIMPLE_TRACKER" ]]; then
  cp "$SIMPLE_TRACKER" "$TOMORROW_TRACKER"
  sed -i '' "s/Today's Date: ___________/Today's Date: $TOMORROW/" "$TOMORROW_TRACKER"
  sed -i '' "s/One main priority: ________________________________/One main priority: $PRIORITY/" "$TOMORROW_TRACKER"
  echo "✅ Tomorrow's tracker ready: daily-logs/tracker-$TOMORROW.md"
else
  echo "⚠️  SIMPLE_DAILY_TRACKER.md not found, skipping tracker setup"
fi

echo "✅ Review saved to: $REVIEW_FILE"
echo ""
echo "🌙 Good work today! Rest well."

# Quick daily stats
RECENT_REVIEWS=$(ls "$WORKSPACE_DIR/daily-logs/review-"*.md 2>/dev/null | wc -l | xargs)
echo "📈 You've completed $RECENT_REVIEWS daily reviews so far!"
