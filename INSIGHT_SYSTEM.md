# 🧠 Mental Model Building System

A structured system to extract maximum learning from every coding problem by building **stronger mental models**, **better constraint intuition**, and **deeper pattern understanding**.

## 🎯 System Overview

After solving each problem, capture insights in three key areas:

### 1. **Mental Models** 🧠

- Core insights that made the problem "click"
- Intuitive explanations and analogies
- Common mistakes to avoid

### 2. **Constraint Intuition** ⚡

- How constraints shaped your solution choice
- Scalability breakpoints and alternatives
- General constraint pattern recognition

### 3. **Pattern Understanding** 🔍

- Pattern family and variations
- Recognition triggers for future problems
- Evolution of your pattern understanding

## 🚀 Quick Start

### Capture Insights After Solving a Problem

```bash
# After solving two-sum
node scripts/capture-insights.js two-sum

# Or use the npm script
npm run insights two-sum
```

### Analyze Your Learning Progress

```bash
# Full analysis report
node scripts/analyze-insights.js --full

# Specific analysis
node scripts/analyze-insights.js --patterns
node scripts/analyze-insights.js --velocity
```

### Review Recent Learning

```bash
# Review last 7 days
node scripts/capture-insights.js --review

# Review last 30 days
node scripts/capture-insights.js --review --days 30
```

## 📊 What Gets Tracked

### 🧠 Mental Models Database

- **Core insights** that unlock problems
- **Analogies and visualizations** that help remember
- **Common mistakes** to avoid
- **Problems** where each model applies

### ⚡ Constraint Patterns Database

- **Constraint types** (memory tight, huge input, etc.)
- **Solution approaches** for each constraint pattern
- **Scalability breakpoints**
- **Alternative approaches** when constraints change

### 🔍 Pattern Evolution Tracker

- **Timeline** of your understanding for each pattern
- **Variations** you've encountered
- **Recognition triggers** you've developed
- **Understanding evolution** over time

### 🔗 Knowledge Graph

- **Connections** between similar problems
- **Shared principles** across problem families
- **Key differences** that make problems unique
- **Problem clusters** by pattern and insight

## 💡 Sample Insight Capture Flow

When you run `node scripts/capture-insights.js climbing-stairs`:

```
🎯 MENTAL MODEL EXTRACTION
1. What was the KEY INSIGHT that unlocked this problem?
   → "Each position depends on previous positions - optimal substructure"

2. How would you explain the intuition to someone who's never seen this?
   → "Think backwards: to reach step N, you could come from N-1, N-2, or N-3"

3. What real-world analogy helps you remember this?
   → "Like counting paths through a city - each intersection depends on previous ones"

⚡ CONSTRAINT INTUITION BUILDING
1. Which constraint was MOST important in choosing your approach?
   → "N ≤ 45 allows O(N) DP, but recursive would be exponential"

🔍 PATTERN EVOLUTION
1. What pattern family does this belong to?
   → "Linear DP / Fibonacci-like sequence"

🔗 BUILDING CONNECTIONS
1. What 2-3 problems does this remind you of?
   → "Fibonacci, House Robber, Minimum Path Sum"
```

## 📈 Analysis Reports

### Pattern Mastery Analysis

- Which patterns you've solved most problems in
- Pattern variations you've encountered
- How your understanding has evolved
- Recognition trigger development

### Constraint Intuition Analysis

- Most common constraint patterns you face
- How your constraint handling has improved
- Constraint-to-solution mapping strength

### Knowledge Graph Analysis

- Problem connectivity (how well you connect solutions)
- Knowledge hubs (problems that connect to many others)
- Recent connections discovered
- Graph density (measure of pattern recognition)

### Learning Velocity Analysis

- Problems solved with insights over time
- Weekly/monthly trends
- Acceleration in understanding

## 🎯 Integration with Your Practice

### Add to Your Daily Routine

**After solving each problem:**

1. **Test your solution**
2. **Capture insights** (3-5 minutes)
3. **Update your mental models**

**Weekly review:**

```bash
npm run analyze-insights --full
```

### Integration with Current Schedule

From your `GOOGLE_WEEKLY_MILESTONES.md`, add this step:

```
| 8:00-8:15 AM | Pattern Documentation (15 min) |
| 8:00 AM | Capture insights from yesterday's problems | 10 min |
| 8:10 AM | Review pattern evolution tracker | 5 min |
```

## 🔧 Files Structure

```
insights/
├── mental-models/
│   └── models-database.json          # Core insights and applications
├── constraint-patterns/
│   └── constraints-database.json     # Constraint patterns and solutions
├── pattern-evolution/
│   └── evolution-tracker.json        # Pattern understanding timeline
├── problem-connections/
│   └── knowledge-graph.json          # Problem similarity graph
├── INSIGHTS_SUMMARY.md               # Consolidated insights summary
├── WEEKLY_REPORT_*.md                # Weekly learning reports
└── {problem-name}-{timestamp}.json   # Raw insight data (JSON)

src/solutions/{problem-name}/
├── {problem-name}.js                 # Your solution code
├── {problem-name}.test.js           # Test cases
├── insights.md                      # 🧠 Human-readable insights
└── README.md                        # Problem description
```

**Key Benefits of This Organization:**

- **Co-location**: Insights live alongside the code for easy reference
- **Version Control**: Insights are versioned with your solutions
- **Discoverability**: Easy to find insights when reviewing solutions
- **Consolidated View**: Global insights summary links to individual insights

## 🎖️ Success Metrics

### Beginner (Weeks 1-2)

- ✅ Capture insights for 5+ problems
- ✅ Identify 3+ core mental models
- ✅ Build basic constraint intuition

### Intermediate (Weeks 3-4)

- ✅ Connect 3+ similar problems
- ✅ Recognize 5+ constraint patterns
- ✅ Evolution visible in pattern understanding

### Advanced (Month 2+)

- ✅ Knowledge graph connectivity > 1.0
- ✅ Pattern recognition time < 30 seconds
- ✅ Teaching-quality insight explanations

## 🚀 Benefits

### **Stronger Mental Models**

- Problems become "obvious" faster
- Better intuition for approach selection
- Reduced time debugging wrong approaches

### **Better Constraint Intuition**

- Instant recognition of constraint patterns
- Automatic optimization consideration
- Scalability thinking becomes natural

### **Deeper Pattern Understanding**

- Faster pattern recognition
- Better handling of pattern variations
- Natural evolution to advanced patterns

### **Connected Knowledge**

- See similarities across problem domains
- Transfer insights between problems
- Build expertise rather than just memory

---

_"The goal is not to solve problems, but to build the reasoning engine that can solve any problem."_

## 🎯 Next Steps

1. **Solve a problem** using your current practice
2. **Run the insight capture**: `npm run insights <problem-name>`
3. **See your mental models grow** in the `/insights` folder
4. **Analyze your progress** weekly with the analysis tools

Start building your mental models today! 🧠⚡🔍
