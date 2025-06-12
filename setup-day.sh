#!/bin/zsh

# Enhanced Morning Setup
# Run: ./setup-day.sh

echo "🌅 GOOD MORNING! Setting up your day..."
echo "================================================="

# Get current date
TODAY=$(date '+%Y-%m-%d')
WEEKDAY=$(date '+%A')

echo "Today is $WEEKDAY, $TODAY"

# Create today's daily focus log
mkdir -p ~/Documents/Study/code_practice/daily-logs
DAILY_LOG=~/Documents/Study/code_practice/daily-logs/focus-$TODAY.md

echo "# Daily Focus Log - $TODAY ($WEEKDAY)" > "$DAILY_LOG"   
echo "" >> "$DAILY_LOG"
echo "## Morning Intention" >> "$DAILY_LOG"
echo "**Time:** $(date '+%H:%M')" >> "$DAILY_LOG"
echo "" >> "$DAILY_LOG"

# Check yesterday's progress if available
YESTERDAY=$(date -v-1d '+%Y-%m-%d')
YESTERDAY_LOG=~/Documents/Study/code_practice/daily-logs/focus-$YESTERDAY.md

if [[ -f "$YESTERDAY_LOG" ]]; then
    echo "📈 Yesterday's Progress:"
    grep -A 3 "## Wins" "$YESTERDAY_LOG" 2>/dev/null || echo "No wins logged yesterday"
    echo ""
fi

# Set morning intention
echo "🎯 What's your main focus for today?"
read -r MAIN_FOCUS
echo "**Main Focus:** $MAIN_FOCUS" >> "$DAILY_LOG"

# Initialize todo tracker with daily goal
echo "📝 Setting up today's todo tracker..."
node scripts/todo-tracker.js goal "$MAIN_FOCUS"

echo ""
echo "📋 Let me show you the suggested daily tasks for today..."

# Show preview and interactive setup (using default energy level of 7)
node scripts/todo-tracker.js preview 7
echo "" >> "$DAILY_LOG"

# Today's tracker setup
TODAY_TRACKER=~/Documents/Study/code_practice/daily-logs/tracker-$TODAY.md
if [[ ! -f "$TODAY_TRACKER" ]]; then
    cp ~/Documents/Study/code_practice/SIMPLE_DAILY_TRACKER.md "$TODAY_TRACKER"
    sed -i '' "s/Today's Date: ___________/Today's Date: $TODAY/" "$TODAY_TRACKER"
    sed -i '' "s/One main priority: ________________________________/One main priority: $MAIN_FOCUS/" "$TODAY_TRACKER"
fi

# Open essential tools
echo "🛠️  Opening tools..."
echo ""

# Start VS Code with today's tracker
echo "Opening VS Code with today's tracker..."
open -a "Visual Studio Code" "$TODAY_TRACKER" ~/Documents/Study/code_practice/

# Give time for apps to load
sleep 2

echo "✅ Morning setup complete!"
echo "📝 Daily log: $DAILY_LOG"
echo "📋 Today's tracker: $TODAY_TRACKER"
echo ""
echo "📋 Your Daily Todo Plan:"
echo "========================"
node scripts/todo-tracker.js dashboard
echo ""
echo "🎯 Available commands:"
echo "   npm run todo           - Quick todo dashboard"
echo "   npm run todo-add       - Add more tasks"
echo "   ./focus-timer.sh       - Start 2-hour deep work block"
echo "   ./energy-tracker.sh    - Log current energy level"
echo "   ./quick-problem.sh     - Set up new coding problem"
echo "   ./end-day-review.sh    - Evening wrap-up"
echo ""
echo "Remember: Focus on progress, not perfection!"
echo "🚀 Have a great day!"
