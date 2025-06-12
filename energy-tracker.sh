#!/bin/zsh

# Energy Tracking System
# Helps identify your peak energy hours

echo "⚡ ENERGY TRACKING SYSTEM"
echo "========================="

# Create energy logs directory
mkdir -p ~/Documents/Study/code_practice/energy-logs

TODAY=$(date '+%Y-%m-%d')
HOUR=$(date '+%H')
TIME_LABEL=$(date '+%H:%M')

ENERGY_FILE=~/Documents/Study/code_practice/energy-logs/energy-$TODAY.csv

# Create header if file doesn't exist
if [[ ! -f "$ENERGY_FILE" ]]; then
    echo "Time,Energy,Activity,Notes" > "$ENERGY_FILE"
fi

echo "Current time: $TIME_LABEL"
echo "Rate your current energy level (1-10):"
read -r ENERGY

echo "What are you about to do? (code/meeting/email/break/other):"
read -r ACTIVITY

echo "Any notes? (optional - press enter to skip):"
read -r NOTES

# Log the entry
echo "$TIME_LABEL,$ENERGY,$ACTIVITY,$NOTES" >> "$ENERGY_FILE"

echo "✅ Energy logged!"

# Show today's pattern if we have entries
ENTRY_COUNT=$(tail -n +2 "$ENERGY_FILE" 2>/dev/null | wc -l | xargs)
if [[ $ENTRY_COUNT -gt 0 ]]; then
    echo ""
    echo "📊 Today's Energy Pattern:"
    echo "Time    | Energy | Activity"
    echo "--------|--------|----------"
    tail -n +2 "$ENERGY_FILE" | awk -F',' '{printf "%-7s | %-6s | %s\n", $1, $2, $3}'
fi

# Weekly analysis (if we have data)
WEEKLY_FILES=$(ls ~/Documents/Study/code_practice/energy-logs/energy-*.csv 2>/dev/null | wc -l | xargs)
if [[ $WEEKLY_FILES -ge 3 ]]; then
    echo ""
    echo "🔍 ENERGY INSIGHTS:"
    
    # Find peak hours (simplified analysis)
    ALL_DATA=$(cat ~/Documents/Study/code_practice/energy-logs/energy-*.csv | tail -n +2)
    
    echo "Recent high-energy entries (8+):"
    echo "$ALL_DATA" | awk -F',' '$2 >= 8 {print $1 " - " $3}' | tail -5
    
    echo ""
    echo "💡 TIP: Schedule your hardest coding tasks during high-energy times!"
fi
