#!/usr/bin/env node

/**
 * 📊 ADVANCED ANALYTICS DASHBOARD
 *
 * Generates weekly and monthly task completion insights from your todo tracking data
 */

const fs = require('fs');
const path = require('path');

class AnalyticsDashboard {
  constructor() {
    this.baseDir = process.cwd();
    this.logsDir = path.join(this.baseDir, 'daily-logs');
    this.analyticsDir = path.join(this.baseDir, 'analytics');

    if (!fs.existsSync(this.analyticsDir)) {
      fs.mkdirSync(this.analyticsDir, { recursive: true });
    }
  }

  getAllDailyLogs() {
    if (!fs.existsSync(this.logsDir)) return [];

    return fs
      .readdirSync(this.logsDir)
      .filter((file) => file.startsWith('todos-') && file.endsWith('.json'))
      .map((file) => {
        const filePath = path.join(this.logsDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const date = file.match(/todos-(\d{4}-\d{2}-\d{2})\.json/)[1];
        return { date, data };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  generateWeeklyReport(weekStart) {
    const logs = this.getAllDailyLogs();
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const weekLogs = logs.filter((log) => {
      const logDate = new Date(log.date);
      return logDate >= weekStart && logDate <= weekEnd;
    });

    let totalTasks = 0;
    let completedTasks = 0;
    let totalTimeTracked = 0;
    let categoryBreakdown = {};
    let dailyScores = [];

    weekLogs.forEach(({ date, data }) => {
      dailyScores.push({
        date,
        score: data.completionScore || 0,
        energyLevel: data.energyLevel || 0
      });

      Object.values(data.categories).forEach((category) => {
        totalTasks += category.planned.length + category.completed.length;
        completedTasks += category.completed.length;
        totalTimeTracked += category.timeSpent || 0;

        const catName = category.name;
        if (!categoryBreakdown[catName]) {
          categoryBreakdown[catName] = { time: 0, tasks: 0 };
        }
        categoryBreakdown[catName].time += category.timeSpent || 0;
        categoryBreakdown[catName].tasks += category.completed.length;
      });
    });

    const avgCompletion = dailyScores.reduce((sum, day) => sum + day.score, 0) / dailyScores.length;
    const avgEnergy =
      dailyScores.reduce((sum, day) => sum + day.energyLevel, 0) / dailyScores.length;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return {
      weekStart: weekStart.toISOString().split('T')[0],
      weekEnd: weekEnd.toISOString().split('T')[0],
      daysTracked: weekLogs.length,
      avgCompletion: Math.round(avgCompletion),
      avgEnergy: Math.round(avgEnergy * 10) / 10,
      completionRate: Math.round(completionRate),
      totalTimeTracked: Math.round(totalTimeTracked),
      categoryBreakdown,
      dailyTrends: dailyScores
    };
  }

  generateMonthlyReport(year, month) {
    const logs = this.getAllDailyLogs();
    const monthLogs = logs.filter((log) => {
      const logDate = new Date(log.date);
      return logDate.getFullYear() === year && logDate.getMonth() === month - 1;
    });

    const weeks = [];
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Generate weekly reports for the month
    let currentWeek = new Date(startDate);
    currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay()); // Start from Sunday

    while (currentWeek <= endDate) {
      const weekReport = this.generateWeeklyReport(new Date(currentWeek));
      if (weekReport.daysTracked > 0) {
        weeks.push(weekReport);
      }
      currentWeek.setDate(currentWeek.getDate() + 7);
    }

    // Calculate monthly aggregates
    let monthlyStats = {
      year,
      month,
      monthName: new Date(year, month - 1).toLocaleString('default', { month: 'long' }),
      daysTracked: monthLogs.length,
      weeks,
      trends: {
        completionTrend: this.calculateTrend(weeks.map((w) => w.avgCompletion)),
        energyTrend: this.calculateTrend(weeks.map((w) => w.avgEnergy)),
        taskTrend: this.calculateTrend(weeks.map((w) => w.completionRate))
      }
    };

    return monthlyStats;
  }

  calculateTrend(values) {
    if (values.length < 2) return 'stable';

    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));

    const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;

    const change = secondAvg - firstAvg;
    if (change > 5) return 'improving';
    if (change < -5) return 'declining';
    return 'stable';
  }

  exportWeeklyReport(weekStart) {
    const report = this.generateWeeklyReport(weekStart);
    const filename = `weekly-report-${report.weekStart}.json`;
    const filepath = path.join(this.analyticsDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
    console.log(`📊 Weekly report exported: ${filename}`);

    // Generate markdown summary
    this.generateWeeklyMarkdown(report);
    return report;
  }

  generateWeeklyMarkdown(report) {
    const markdown = `# 📊 Weekly Task Completion Report
## ${report.weekStart} to ${report.weekEnd}

### 📈 Summary
- **Days Tracked**: ${report.daysTracked}/7
- **Average Completion**: ${report.avgCompletion}%
- **Average Energy**: ${report.avgEnergy}/10
- **Task Completion Rate**: ${report.completionRate}%
- **Total Time Tracked**: ${Math.floor(report.totalTimeTracked / 60)}h ${report.totalTimeTracked % 60}m

### 📊 Category Breakdown
${Object.entries(report.categoryBreakdown)
  .map(
    ([category, data]) =>
      `- **${category}**: ${data.tasks} tasks, ${Math.floor(data.time / 60)}h ${data.time % 60}m`
  )
  .join('\n')}

### 📅 Daily Trends
${report.dailyTrends
  .map((day) => `- **${day.date}**: Completion ${day.score}%, Energy ${day.energyLevel}/10`)
  .join('\n')}

### 🎯 Insights
${this.generateWeeklyInsights(report)}
`;

    const markdownFile = path.join(this.analyticsDir, `weekly-report-${report.weekStart}.md`);
    fs.writeFileSync(markdownFile, markdown);
    console.log(`📝 Weekly markdown report: weekly-report-${report.weekStart}.md`);
  }

  generateWeeklyInsights(report) {
    const insights = [];

    if (report.avgCompletion >= 80) {
      insights.push('🔥 Excellent completion rate! Keep up the momentum.');
    } else if (report.avgCompletion >= 60) {
      insights.push('👍 Good completion rate. Consider optimizing time estimation.');
    } else {
      insights.push('📋 Focus on task completion consistency this week.');
    }

    if (report.avgEnergy >= 8) {
      insights.push('⚡ High energy levels maintained throughout the week.');
    } else if (report.avgEnergy < 6) {
      insights.push('😴 Energy levels were low. Consider adjusting sleep/exercise routine.');
    }

    const topCategory = Object.entries(report.categoryBreakdown).sort(
      (a, b) => b[1].time - a[1].time
    )[0];
    if (topCategory) {
      insights.push(
        `🎯 Most time spent on: ${topCategory[0]} (${Math.floor(topCategory[1].time / 60)}h)`
      );
    }

    return insights.join('\n');
  }

  showDashboard() {
    console.log('\n📊 ANALYTICS DASHBOARD');
    console.log('='.repeat(50));

    const logs = this.getAllDailyLogs();
    if (logs.length === 0) {
      console.log('❌ No tracking data found. Start using the todo tracker first!');
      return;
    }

    console.log(`📅 Tracking period: ${logs[0].date} to ${logs[logs.length - 1].date}`);
    console.log(`📊 Total days tracked: ${logs.length}`);

    // Current week summary
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());

    const thisWeek = this.generateWeeklyReport(weekStart);
    console.log(`\n🗓️  THIS WEEK (${thisWeek.weekStart} to ${thisWeek.weekEnd}):`);
    console.log(`   Days tracked: ${thisWeek.daysTracked}/7`);
    console.log(`   Avg completion: ${thisWeek.avgCompletion}%`);
    console.log(`   Avg energy: ${thisWeek.avgEnergy}/10`);
    console.log(`   Completion rate: ${thisWeek.completionRate}%`);

    // Monthly summary if we have enough data
    if (logs.length >= 7) {
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();
      const monthlyData = this.generateMonthlyReport(currentYear, currentMonth);

      console.log(`\n📅 THIS MONTH (${monthlyData.monthName} ${currentYear}):`);
      console.log(`   Days tracked: ${monthlyData.daysTracked}`);
      console.log(`   Completion trend: ${monthlyData.trends.completionTrend}`);
      console.log(`   Energy trend: ${monthlyData.trends.energyTrend}`);
    }
  }
}

// CLI Interface
if (require.main === module) {
  const analytics = new AnalyticsDashboard();
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'dashboard':
    case 'show':
      analytics.showDashboard();
      break;

    case 'weekly':
      const weekDate = args[1] ? new Date(args[1]) : new Date();
      weekDate.setDate(weekDate.getDate() - weekDate.getDay()); // Start of week
      analytics.exportWeeklyReport(weekDate);
      break;

    case 'monthly':
      const year = args[1] ? parseInt(args[1]) : new Date().getFullYear();
      const month = args[2] ? parseInt(args[2]) : new Date().getMonth() + 1;
      const monthlyReport = analytics.generateMonthlyReport(year, month);
      console.log(JSON.stringify(monthlyReport, null, 2));
      break;

    default:
      console.log(`
📊 ANALYTICS DASHBOARD

🚀 COMMANDS:
  node scripts/analytics-dashboard.js dashboard    # Show current analytics
  node scripts/analytics-dashboard.js weekly      # Export this week's report
  node scripts/analytics-dashboard.js weekly YYYY-MM-DD # Specific week
  node scripts/analytics-dashboard.js monthly     # Current month report
  node scripts/analytics-dashboard.js monthly YYYY MM # Specific month

📈 FEATURES:
  • Weekly completion trends
  • Monthly progress summaries  
  • Category time breakdowns
  • Energy level correlation
  • Automated insights generation
      `);
  }
}

module.exports = AnalyticsDashboard;
