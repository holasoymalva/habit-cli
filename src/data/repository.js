const fs = require('fs');
const path = require('path');
const os = require('os');
const { v4: uuidv4 } = require('uuid');
const { format, parseISO } = require('date-fns');

class HabitRepository {
  constructor() {
    this.dataDir = path.join(os.homedir(), '.streaksmith');
    this.dataFile = path.join(this.dataDir, 'data.json');
    this.ensureDataDirectory();
  }

  ensureDataDirectory() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
    
    if (!fs.existsSync(this.dataFile)) {
      this.saveData({ habits: [], logs: [] });
    }
  }

  loadData() {
    try {
      const data = fs.readFileSync(this.dataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { habits: [], logs: [] };
    }
  }

  saveData(data) {
    fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
  }

  addHabit(name) {
    const data = this.loadData();
    
    // Check if habit already exists
    const existingHabit = data.habits.find(h => 
      h.name.toLowerCase() === name.toLowerCase() && !h.archived
    );
    
    if (existingHabit) {
      throw new Error(`Habit "${name}" already exists`);
    }

    const habit = {
      id: uuidv4(),
      name: name,
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      archived: false
    };

    data.habits.push(habit);
    this.saveData(data);
    return habit;
  }

  getHabits() {
    const data = this.loadData();
    return data.habits.filter(h => !h.archived);
  }

  findHabitByName(name) {
    const habits = this.getHabits();
    return habits.find(h => 
      h.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  logCompletion(habitId, date, completed = true) {
    const data = this.loadData();
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Remove existing log for this habit and date
    data.logs = data.logs.filter(log => 
      !(log.habitId === habitId && log.date === dateStr)
    );
    
    // Add new log if marking as completed
    if (completed) {
      data.logs.push({
        habitId,
        date: dateStr,
        completed: true
      });
    }
    
    this.saveData(data);
  }

  isCompletedToday(habitId) {
    const today = format(new Date(), 'yyyy-MM-dd');
    return this.isCompletedOnDate(habitId, today);
  }

  isCompletedOnDate(habitId, dateStr) {
    const data = this.loadData();
    return data.logs.some(log => 
      log.habitId === habitId && 
      log.date === dateStr && 
      log.completed
    );
  }

  getTodayStatus() {
    const habits = this.getHabits();
    return habits.map(habit => ({
      ...habit,
      completed: this.isCompletedToday(habit.id)
    }));
  }

  getDataPath() {
    return this.dataFile;
  }
}

module.exports = { HabitRepository };