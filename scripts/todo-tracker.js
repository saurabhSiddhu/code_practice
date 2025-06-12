#!/usr/bin/env node

/**
 * 📝 TODO TRACKER - SIMPLIFIED
 *
 * Integrates with your daily routine to track:
 * - Tasks completed vs planned
 * - Progress against daily goals
 * - Integration with existing systems
 */

const fs = require('fs');
const path = require('path');

class TodoTracker {
  constructor() {
    this.baseDir = process.cwd();
    this.todosDir = path.join(this.baseDir, 'daily-logs');
    this.today = new Date().toISOString().split('T')[0];
    this.todoFile = path.join(this.todosDir, `todos-${this.today}.json`);

    this.initializeFiles();
  }

  initializeFiles() {
    // Ensure directories exist
    if (!fs.existsSync(this.todosDir)) {
      fs.mkdirSync(this.todosDir, { recursive: true });
    }

    // Initialize today's todo file if it doesn't exist
    if (!fs.existsSync(this.todoFile)) {
      const defaultTodos = {
        date: this.today,
        dailyGoal: '',
        energyLevel: 0,
        categories: {
          interview: {
            name: '🧠 Interview Prep',
            planned: [],
            completed: []
          },
          exercise: {
            name: '🏃‍♂️ Exercise',
            planned: [],
            completed: []
          },
          work: {
            name: '💼 Work Tasks',
            planned: [],
            completed: []
          },
          learning: {
            name: '📚 Learning & Skills',
            planned: [],
            completed: []
          },
          personal: {
            name: '🏠 Personal',
            planned: [],
            completed: []
          }
        },
        completionScore: 0,
        notes: []
      };

      fs.writeFileSync(this.todoFile, JSON.stringify(defaultTodos, null, 2));
    }
  }

  loadTodos() {
    return JSON.parse(fs.readFileSync(this.todoFile, 'utf8'));
  }

  saveTodos(todos) {
    fs.writeFileSync(this.todoFile, JSON.stringify(todos, null, 2));
  }

  addTask(category, task, estimatedMinutes = 30) {
    const todos = this.loadTodos();

    if (!todos.categories[category]) {
      console.log(`❌ Invalid category: ${category}`);
      console.log(`Valid categories: ${Object.keys(todos.categories).join(', ')}`);
      return;
    }

    // Generate a unique ID by ensuring it doesn't conflict with existing tasks
    let newId = Date.now();
    const allTasks = [];

    // Collect all existing task IDs
    for (const cat in todos.categories) {
      allTasks.push(...todos.categories[cat].planned);
      allTasks.push(...todos.categories[cat].completed);
    }

    const existingIds = new Set(allTasks.map((t) => t.id));

    // Ensure the ID is unique
    while (existingIds.has(newId)) {
      newId = newId + 1;
    }
    const newTask = {
      id: newId,
      text: task,
      estimatedMinutes,
      completed: false,
      addedAt: new Date().toISOString(),
      priority: 'medium'
    };

    todos.categories[category].planned.push(newTask);
    this.saveTodos(todos);

    console.log(`✅ Added task to ${todos.categories[category].name}: ${task}`);
    console.log(`⏱️  Estimated time: ${estimatedMinutes} minutes`);
  }

  completeTask(taskId, actualMinutes) {
    const todos = this.loadTodos();
    let taskFound = false;

    // Find the task in planned items
    for (const cat in todos.categories) {
      const taskIndex = todos.categories[cat].planned.findIndex((t) => t.id === parseInt(taskId));
      if (taskIndex !== -1) {
        const task = todos.categories[cat].planned[taskIndex];
        task.completed = true;
        task.completedAt = new Date().toISOString();

        // Move to completed
        todos.categories[cat].completed.push(task);
        todos.categories[cat].planned.splice(taskIndex, 1);

        taskFound = true;

        console.log(`✅ Completed: ${task.text}`);
        break;
      }
    }

    if (taskFound) {
      this.updateCompletionScore(todos);
      this.saveTodos(todos);
    } else {
      console.log(`❌ Task with ID ${taskId} not found`);
    }
  }

  updateCompletionScore(todos) {
    let totalTasks = 0;
    let completedTasks = 0;

    for (const cat in todos.categories) {
      totalTasks += todos.categories[cat].planned.length + todos.categories[cat].completed.length;
      completedTasks += todos.categories[cat].completed.length;
    }

    const completionRate = totalTasks > 0 ? completedTasks / totalTasks : 0;
    todos.completionScore = Math.round(completionRate * 100);
  }

  showDashboard() {
    const todos = this.loadTodos();

    // Update completion score before displaying
    this.updateCompletionScore(todos);

    console.log(`\n📅 TODO DASHBOARD - ${this.today}`);
    console.log('================================================');

    if (todos.dailyGoal) {
      console.log(`🎯 Daily Goal: ${todos.dailyGoal}`);
    }

    if (todos.energyLevel) {
      console.log(`⚡ Energy Level: ${todos.energyLevel}/10`);
    }

    console.log(`📊 Completion Score: ${todos.completionScore}%`);

    // Show each category
    for (const cat in todos.categories) {
      const category = todos.categories[cat];
      console.log(`\n${category.name}:`);
      console.log(`  📝 Planned: ${category.planned.length} tasks`);
      console.log(`  ✅ Completed: ${category.completed.length} tasks`);

      // Show pending tasks
      if (category.planned.length > 0) {
        console.log('  📋 Pending tasks:');
        category.planned.forEach((task) => {
          console.log(`    ${task.id}: ${task.text} (${task.estimatedMinutes}min)`);
        });
      }
    }

    // Show recent completions
    const allCompleted = Object.values(todos.categories)
      .flatMap((cat) => cat.completed)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .slice(0, 5);

    if (allCompleted.length > 0) {
      console.log('\n🏆 Recent Completions:');
      allCompleted.forEach((task) => {
        const time = new Date(task.completedAt).toLocaleTimeString();
        console.log(`  ✅ ${task.text} at ${time}`);
      });
    }
  }

  setDailyGoal(goal) {
    const todos = this.loadTodos();
    todos.dailyGoal = goal;
    this.saveTodos(todos);
    console.log(`🎯 Daily goal set: ${goal}`);
  }

  setEnergyLevel(level) {
    const todos = this.loadTodos();
    todos.energyLevel = Math.min(10, Math.max(1, parseInt(level)));
    this.saveTodos(todos);
    console.log(`⚡ Energy level set: ${todos.energyLevel}/10`);
  }

  quickAdd() {
    console.log('🚀 Quick Add Mode - Add tasks for today');
    console.log('Categories: interview, exercise, work, learning, personal');
    console.log('Format: category:task:estimatedMinutes');
    console.log('Example: interview:Solve two-sum problem:45');
    console.log('Type "done" to finish\n');

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const promptForTask = () => {
      rl.question('Add task (or "done"): ', (input) => {
        if (input.toLowerCase() === 'done') {
          rl.close();
          this.showDashboard();
          return;
        }

        const parts = input.split(':');
        if (parts.length >= 2) {
          const category = parts[0].trim();
          const task = parts[1].trim();
          const minutes = parts[2] ? parseInt(parts[2]) : 30;

          this.addTask(category, task, minutes);
        } else {
          console.log('❌ Format: category:task:minutes');
        }

        promptForTask();
      });
    };

    promptForTask();
  }

  generateReport() {
    const todos = this.loadTodos();

    const reportFile = path.join(this.todosDir, `daily-report-${this.today}.md`);

    let report = `# 📊 Daily Report - ${this.today}\n\n`;

    if (todos.dailyGoal) {
      report += `## 🎯 Daily Goal\n${todos.dailyGoal}\n\n`;
    }

    report += '## 📈 Summary\n';
    report += `- **Completion Score**: ${todos.completionScore}%\n`;
    report += `- **Energy Level**: ${todos.energyLevel}/10\n\n`;

    report += '## ✅ Completed Tasks\n\n';

    for (const cat in todos.categories) {
      const category = todos.categories[cat];
      if (category.completed.length > 0) {
        report += `### ${category.name}\n`;

        category.completed.forEach((task) => {
          report += `- ✅ ${task.text}\n`;
          report += `  - Estimated: ${task.estimatedMinutes}min\n`;
        });
        report += '\n';
      }
    }

    // Pending tasks
    const pendingCount = Object.values(todos.categories).reduce(
      (sum, cat) => sum + cat.planned.length,
      0
    );
    if (pendingCount > 0) {
      report += `## 📝 Pending Tasks (${pendingCount})\n\n`;

      for (const cat in todos.categories) {
        const category = todos.categories[cat];
        if (category.planned.length > 0) {
          report += `### ${category.name}\n`;
          category.planned.forEach((task) => {
            report += `- ⏳ ${task.text} (${task.estimatedMinutes}min)\n`;
          });
          report += '\n';
        }
      }
    }

    fs.writeFileSync(reportFile, report);
    console.log(`📄 Daily report generated: ${reportFile}`);
  }

  /**
   * Generate JSON report for integration with other systems
   */
  generateJsonReport() {
    const todos = this.loadTodos();

    // Calculate metrics for task analysis
    const totalTasks = Object.values(todos.categories).reduce(
      (sum, cat) => sum + cat.planned.length + cat.completed.length,
      0
    );
    const completedTasks = Object.values(todos.categories).reduce(
      (sum, cat) => sum + cat.completed.length,
      0
    );
    const pendingTasks = totalTasks - completedTasks;

    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Identify missed high-priority categories
    const missedCategories = [];
    for (const cat in todos.categories) {
      const category = todos.categories[cat];
      if (category.planned.length > category.completed.length) {
        missedCategories.push({
          category: cat,
          name: category.name,
          pending: category.planned.length,
          completed: category.completed.length
        });
      }
    }

    const jsonReport = {
      date: this.today,
      completion_score: todos.completionScore || 0,
      completion_rate: completionRate,
      total_tasks: totalTasks,
      completed_tasks: completedTasks,
      pending_count: pendingTasks,
      energy_level: todos.energyLevel || 0,
      daily_goal: todos.dailyGoal || '',
      missed_categories: missedCategories,
      category_breakdown: Object.keys(todos.categories).map((cat) => ({
        category: cat,
        name: todos.categories[cat].name,
        planned: todos.categories[cat].planned.length,
        completed: todos.categories[cat].completed.length
      }))
    };

    return jsonReport;
  }

  setupDailyTasks(energyLevel) {
    console.log(`🗓️  Setting up daily tasks based on energy level ${energyLevel}/10...`);

    // Default Exercise - 45 minutes
    this.addTask('exercise', 'Daily workout session', 45);

    // Default Coding Problems - 2 problems
    if (energyLevel >= 8) {
      this.addTask('interview', 'Coding Problem 1 - Hard difficulty', 45);
      this.addTask('interview', 'Coding Problem 2 - Hard difficulty', 45);
    } else if (energyLevel >= 6) {
      this.addTask('interview', 'Coding Problem 1 - Medium difficulty', 40);
      this.addTask('interview', 'Coding Problem 2 - Medium difficulty', 40);
    } else {
      this.addTask('interview', 'Coding Problem 1 - Easy difficulty', 30);
      this.addTask('interview', 'Coding Problem 2 - Easy difficulty', 30);
    }

    // Default Work tasks
    this.addTask('work', 'Code review session', 60);
    this.addTask('work', '2 Story points development work', 240); // ~4 hours for 2 story points

    // Default Typing practice
    this.addTask('learning', 'Typing practice session', 20);

    // Daily planning
    this.addTask('personal', 'Daily planning & admin', 15);

    console.log('✅ Default daily tasks added! Use "npm run todo" to see your plan.');
  }

  previewSetup(energyLevel) {
    console.log(`\n🎯 DAILY TASK PREVIEW - Energy Level ${energyLevel}/10`);
    console.log('==================================================');

    const tasks = [];
    let totalTime = 0;

    // Exercise
    tasks.push({ category: '🏃‍♂️ Exercise', task: 'Morning workout session', minutes: 45 });
    totalTime += 45;

    // Interview prep based on energy
    if (energyLevel >= 8) {
      tasks.push({
        category: '🧠 Interview Prep',
        task: 'Solve hard algorithm problem',
        minutes: 60
      });
      tasks.push({ category: '🧠 Interview Prep', task: 'System design practice', minutes: 45 });
      totalTime += 105;
    } else if (energyLevel >= 6) {
      tasks.push({
        category: '🧠 Interview Prep',
        task: 'Solve medium algorithm problem',
        minutes: 45
      });
      tasks.push({ category: '🧠 Interview Prep', task: 'Review previous solutions', minutes: 30 });
      totalTime += 75;
    } else {
      tasks.push({ category: '🧠 Interview Prep', task: 'Review algorithm patterns', minutes: 30 });
      tasks.push({ category: '🧠 Interview Prep', task: 'Practice easy problem', minutes: 30 });
      totalTime += 60;
    }

    // Work tasks
    tasks.push({ category: '💼 Work Tasks', task: 'Priority work task', minutes: 120 });
    tasks.push({ category: '💼 Work Tasks', task: 'Code review session', minutes: 30 });
    totalTime += 150;

    // Learning and personal
    tasks.push({ category: '📚 Learning & Skills', task: 'Study session', minutes: 30 });
    tasks.push({ category: '🏠 Personal', task: 'Daily planning & admin', minutes: 20 });
    totalTime += 50;

    // Display preview
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.category}: ${task.task} (${task.minutes} min)`);
    });

    const hours = Math.round((totalTime / 60) * 10) / 10;
    console.log(`\n⏱️  Total estimated time: ${totalTime} minutes (${hours} hours)`);
    console.log('\n💡 Use "node scripts/todo-tracker.js setup <energy>" to add these tasks');
    console.log('💡 Or "npm run todo-add" for manual task addition');

    return true;
  }
  previewDailyTasks(energyLevel) {
    console.log(`\n🎯 DAILY TASK PREVIEW - Energy Level ${energyLevel}/10`);
    console.log('==================================================');

    const suggestedTasks = [];

    // Default Exercise - 45 minutes
    suggestedTasks.push({
      category: 'exercise',
      name: '🏃‍♂️ Exercise',
      task: 'Daily workout session',
      minutes: 45
    });

    // Default Coding Problems - 2 problems based on energy
    if (energyLevel >= 8) {
      suggestedTasks.push({
        category: 'interview',
        name: '🧠 Interview Prep',
        task: 'Coding Problem 1 - Hard difficulty',
        minutes: 45
      });
      suggestedTasks.push({
        category: 'interview',
        name: '🧠 Interview Prep',
        task: 'Coding Problem 2 - Hard difficulty',
        minutes: 45
      });
    } else if (energyLevel >= 6) {
      suggestedTasks.push({
        category: 'interview',
        name: '🧠 Interview Prep',
        task: 'Coding Problem 1 - Medium difficulty',
        minutes: 40
      });
      suggestedTasks.push({
        category: 'interview',
        name: '🧠 Interview Prep',
        task: 'Coding Problem 2 - Medium difficulty',
        minutes: 40
      });
    } else {
      suggestedTasks.push({
        category: 'interview',
        name: '🧠 Interview Prep',
        task: 'Coding Problem 1 - Easy difficulty',
        minutes: 30
      });
      suggestedTasks.push({
        category: 'interview',
        name: '🧠 Interview Prep',
        task: 'Coding Problem 2 - Easy difficulty',
        minutes: 30
      });
    }

    // Default Work tasks
    suggestedTasks.push({
      category: 'work',
      name: '💼 Work Tasks',
      task: 'Code review session',
      minutes: 60
    });
    suggestedTasks.push({
      category: 'work',
      name: '💼 Work Tasks',
      task: '2 Story points development work',
      minutes: 240
    });

    // Default Typing practice
    suggestedTasks.push({
      category: 'learning',
      name: '📚 Learning & Skills',
      task: 'Typing practice session',
      minutes: 20
    });

    // Daily planning
    suggestedTasks.push({
      category: 'personal',
      name: '🏠 Personal',
      task: 'Daily planning & admin',
      minutes: 15
    });

    // Show preview
    let totalTime = 0;
    suggestedTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.name}: ${task.task} (${task.minutes} min)`);
      totalTime += task.minutes;
    });

    console.log(
      `\n⏱️  Total estimated time: ${totalTime} minutes (${Math.round((totalTime / 60) * 10) / 10} hours)`
    );

    return suggestedTasks;
  }

  interactiveSetup(energyLevel) {
    const suggestedTasks = this.previewDailyTasks(energyLevel);

    console.log('\n🤔 Would you like to:');
    console.log('1. ✅ Add all suggested tasks');
    console.log('2. 🎛️  Customize tasks (add/edit/remove)');
    console.log('3. ⏭️  Skip auto-setup (add manually later)');

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const handleChoice = (choice) => {
      switch (choice.trim()) {
        case '1':
          console.log('\n✅ Adding all suggested tasks...');
          suggestedTasks.forEach((task) => {
            this.addTask(task.category, task.task, task.minutes);
          });
          rl.close();
          this.showDashboard();
          break;

        case '2':
          rl.close();
          this.customizeSetup(suggestedTasks);
          break;

        case '3':
          console.log('\n⏭️  Skipping auto-setup. Add tasks later with: npm run todo-add');
          rl.close();
          break;

        default:
          console.log('❌ Please enter 1, 2, or 3');
          rl.question('Your choice: ', handleChoice);
      }
    };

    rl.question('\nYour choice: ', handleChoice);
  }

  customizeSetup(suggestedTasks) {
    console.log('\n🎛️  CUSTOMIZE YOUR DAILY TASKS');
    console.log('===============================');
    console.log('Commands:');
    console.log('  add <number>     - Add suggested task by number');
    console.log('  edit <number>    - Edit task description or time');
    console.log('  custom          - Add completely custom task');
    console.log('  list            - Show suggested tasks again');
    console.log('  done            - Finish customization');
    console.log('');

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const addedTasks = [];

    const showSuggested = () => {
      console.log('\n📋 Suggested tasks:');
      suggestedTasks.forEach((task, index) => {
        const status = addedTasks.includes(index) ? '✅' : '⏳';
        console.log(`${status} ${index + 1}. ${task.name}: ${task.task} (${task.minutes} min)`);
      });
    };

    const handleCommand = (input) => {
      const parts = input.trim().split(' ');
      const command = parts[0].toLowerCase();

      switch (command) {
        case 'add':
          const taskNum = parseInt(parts[1]) - 1;
          if (taskNum >= 0 && taskNum < suggestedTasks.length) {
            if (!addedTasks.includes(taskNum)) {
              const task = suggestedTasks[taskNum];
              this.addTask(task.category, task.task, task.minutes);
              addedTasks.push(taskNum);
            } else {
              console.log('❌ Task already added');
            }
          } else {
            console.log('❌ Invalid task number');
          }
          break;

        case 'edit':
          const editNum = parseInt(parts[1]) - 1;
          if (editNum >= 0 && editNum < suggestedTasks.length) {
            const task = suggestedTasks[editNum];
            rl.question(`Edit task description (current: "${task.task}"): `, (newTask) => {
              if (newTask.trim()) {
                task.task = newTask.trim();
              }
              rl.question(`Edit time estimate (current: ${task.minutes} min): `, (newTime) => {
                if (newTime.trim()) {
                  task.minutes = parseInt(newTime) || task.minutes;
                }
                console.log(`✅ Updated: ${task.task} (${task.minutes} min)`);
                rl.question('\nCustomize> ', handleCommand);
              });
            });
            return;
          } else {
            console.log('❌ Invalid task number');
          }
          break;

        case 'custom':
          rl.question('Category (interview/exercise/work/learning/personal): ', (category) => {
            rl.question('Task description: ', (taskDesc) => {
              rl.question('Estimated minutes: ', (minutes) => {
                this.addTask(category.trim(), taskDesc.trim(), parseInt(minutes) || 30);
                rl.question('\nCustomize> ', handleCommand);
              });
            });
          });
          return;

        case 'list':
          showSuggested();
          break;

        case 'done':
          console.log('\n✅ Customization complete!');
          rl.close();
          this.showDashboard();
          return;

        default:
          console.log('❌ Unknown command. Use: add, edit, custom, list, or done');
      }

      rl.question('\nCustomize> ', handleCommand);
    };

    showSuggested();
    rl.question('\nCustomize> ', handleCommand);
  }

  listTasksForCompletion() {
    const todos = this.loadTodos();

    console.log('\n📋 YOUR PENDING TASKS (Easy Completion)');
    console.log('=====================================');

    let taskNumber = 1;
    const taskMap = new Map();

    for (const cat in todos.categories) {
      const category = todos.categories[cat];
      if (category.planned.length > 0) {
        console.log(`\n${category.name}:`);
        category.planned.forEach((task) => {
          console.log(
            `  ${taskNumber}. ${task.text} (${task.estimatedMinutes}min) [ID: ${task.id}]`
          );
          taskMap.set(taskNumber, { id: task.id, text: task.text, category: cat });
          taskNumber++;
        });
      }
    }

    if (taskNumber === 1) {
      console.log('\n🎉 No pending tasks! Great job!');
      return;
    }

    console.log('\n💡 To complete a task:');
    console.log('   node scripts/todo-tracker.js complete <ID> <actual-minutes>');
    console.log('\n📊 Or view full dashboard: npm run todo');
  }

  /**
   * Auto-complete a coding problem task
   * Called from prep.js when a problem is solved
   */
  autoCompleteCodingProblem(problemName) {
    const todos = this.loadTodos();
    let completed = false;

    // Look for coding problem tasks to complete
    const interviewTasks = todos.categories.interview?.planned || [];

    // Find the first uncompleted coding problem task with improved matching
    for (let i = 0; i < interviewTasks.length; i++) {
      const task = interviewTasks[i];

      // More specific matching for coding problems
      const isCodingTask =
        task.text.includes('Coding Problem') ||
        task.text.includes('algorithm problem') ||
        (task.text.toLowerCase().includes('coding') &&
          task.text.toLowerCase().includes('problem')) ||
        task.text.includes('leetcode') ||
        task.text.includes('Algorithm') ||
        (task.text.toLowerCase().includes('solve') && task.text.toLowerCase().includes('problem'));

      // Exclude non-coding tasks that might contain "problem"
      const isNonCodingTask =
        task.text.toLowerCase().includes('system design') ||
        task.text.toLowerCase().includes('mock interview') ||
        task.text.toLowerCase().includes('behavioral') ||
        task.text.toLowerCase().includes('review') ||
        task.text.toLowerCase().includes('study');

      if (isCodingTask && !isNonCodingTask && !task.completed) {
        // Update task text to reflect the actual problem solved
        const originalText = task.text;
        task.text = problemName;

        // Save the updated todos with the new task text
        this.saveTodos(todos);

        // Complete this task
        this.completeTask(task.id);
        completed = true;

        console.log(`🎯 Auto-completed todo: "${originalText}" → "${problemName}"`);
        console.log(`📝 Problem solved: ${problemName}`);
        break;
      }
    }

    if (!completed) {
      // If no coding task found, add and complete one
      const taskText = `Solved: ${problemName}`;

      // Store the current count to identify the new task
      const currentTodos = this.loadTodos();
      const beforeCount = currentTodos.categories.interview.planned.length;

      this.addTask('interview', taskText, 30);

      // Get the newly added task by finding the one that was just added
      const updatedTodos = this.loadTodos();
      const afterCount = updatedTodos.categories.interview.planned.length;

      if (afterCount > beforeCount) {
        // Find the task with the matching text that was just added
        const newTask = updatedTodos.categories.interview.planned.find(
          (task) => task.text === taskText && !task.completed
        );

        if (newTask) {
          this.completeTask(newTask.id);
          console.log(`✅ Created and completed: "${taskText}"`);
        } else {
          console.log(`❌ Could not find newly created task: "${taskText}"`);
        }
      } else {
        console.log(`❌ Task was not created successfully`);
      }
    }

    return completed;
  }

  /**
   * Auto-complete a typing practice session
   */
  autoCompleteTypingPractice() {
    const todos = this.loadTodos();
    const learningTasks = todos.categories.learning?.planned || [];

    // Find typing practice task
    for (const task of learningTasks) {
      if (task.text.toLowerCase().includes('typing')) {
        this.completeTask(task.id);
        console.log(`⌨️  Auto-completed: "${task.text}"`);
        return true;
      }
    }

    return false;
  }

  /**
   * Auto-complete exercise task
   */
  autoCompleteExercise() {
    const todos = this.loadTodos();
    const exerciseTasks = todos.categories.exercise?.planned || [];

    if (exerciseTasks.length > 0) {
      const task = exerciseTasks[0]; // Complete first exercise task
      this.completeTask(task.id);
      console.log(`🏃‍♂️ Auto-completed: "${task.text}"`);
      return true;
    }

    return false;
  }
}

module.exports = TodoTracker;

// CLI Interface
if (require.main === module) {
  const tracker = new TodoTracker();
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'add':
      if (args.length >= 3) {
        const category = args[1];
        const task = args.slice(2, -1).join(' ');
        const minutes = parseInt(args[args.length - 1]) || 30;
        tracker.addTask(category, task, minutes);
      } else {
        console.log('Usage: node scripts/todo-tracker.js add <category> <task> <minutes>');
      }
      break;

    case 'complete':
      if (args.length >= 2) {
        const taskId = args[1];
        tracker.completeTask(taskId);
      } else {
        console.log('Usage: node scripts/todo-tracker.js complete <taskId>');
      }
      break;

    case 'dashboard':
    case 'show':
      tracker.showDashboard();
      break;

    case 'list':
      tracker.listTasksForCompletion();
      break;

    case 'goal':
      if (args.length >= 2) {
        const goal = args.slice(1).join(' ');
        tracker.setDailyGoal(goal);
      } else {
        console.log('Usage: node scripts/todo-tracker.js goal <daily goal>');
      }
      break;

    case 'energy':
      if (args.length >= 2) {
        tracker.setEnergyLevel(args[1]);
      } else {
        console.log('Usage: node scripts/todo-tracker.js energy <1-10>');
      }
      break;

    case 'quick':
      tracker.quickAdd();
      break;

    case 'setup':
      if (args.length >= 2) {
        const energyLevel = parseInt(args[1]) || 6;
        tracker.setupDailyTasks(energyLevel);
      } else {
        console.log('Usage: node scripts/todo-tracker.js setup <energy-level>');
      }
      break;

    case 'preview':
      if (args.length >= 2) {
        const energyLevel = parseInt(args[1]) || 6;
        tracker.interactiveSetup(energyLevel);
      } else {
        console.log('Usage: node scripts/todo-tracker.js preview <energy-level>');
      }
      break;

    case 'report':
      if (args.includes('--json')) {
        const jsonReport = tracker.generateJsonReport();
        console.log(JSON.stringify(jsonReport, null, 2));
      } else {
        tracker.generateReport();
      }
      break;

    case 'auto-complete':
      if (args.length >= 2) {
        const type = args[1]; // 'coding', 'typing', 'exercise'

        switch (type) {
          case 'coding':
            const problemName = args[2] || 'unknown-problem';
            tracker.autoCompleteCodingProblem(problemName);
            break;
          case 'typing':
            tracker.autoCompleteTypingPractice();
            break;
          case 'exercise':
            tracker.autoCompleteExercise();
            break;
          default:
            console.log('Usage: auto-complete <coding|typing|exercise> [problem-name]');
        }
      } else {
        console.log('Usage: node scripts/todo-tracker.js auto-complete <type>');
      }
      break;

    default:
      console.log(`
📝 TODO TRACKER - Simplified Daily Task Management

🚀 QUICK START:
  node scripts/todo-tracker.js preview <energy>   # Preview suggested tasks
  node scripts/todo-tracker.js setup <energy>     # Auto-setup daily tasks
  node scripts/todo-tracker.js quick              # Interactive task addition
  node scripts/todo-tracker.js dashboard          # View today's status

📝 TASK MANAGEMENT:
  add <category> <task> <minutes>     # Add new task
  complete <taskId>                   # Mark task complete
  dashboard                          # Show all tasks & progress

📊 REPORTING:
  report                             # Generate daily report

🎯 GOAL SETTING:
  goal <text>                        # Set daily goal
  energy <1-10>                      # Set energy level
  setup <energy>                     # Auto-setup daily routine tasks

📊 CATEGORIES:
  interview  # 🧠 Interview prep & coding problems
  exercise   # 🏃‍♂️ Physical fitness & movement
  work       # 💼 Professional work tasks
  learning   # 📚 Skill development & study
  personal   # 🏠 Personal tasks & life

💡 EXAMPLES:
  node scripts/todo-tracker.js setup 8           # Setup tasks for high energy day
  node scripts/todo-tracker.js add interview "Solve binary search problem" 45
  node scripts/todo-tracker.js add exercise "Morning HIIT workout" 30
  node scripts/todo-tracker.js complete 1647123456
      `);
  }
}
