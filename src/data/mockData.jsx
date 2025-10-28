// Data Testing App

export const MOCK_HABITS = [
  {
    id: "1",
    name: "Пить воду",
    description: "Выпивать 8 стаканов воды в день для поддержания здоровья",
    contexts: ["home", "office", "gym"],
    frequency: "daily",
    target: 8,
    color: "#2196F3",
    icon: "💧",
    createdAt: new Date("2024-01-01"),
    isActive: true,
  },
  {
    id: "2",
    name: "Читать книги",
    description: "Читать минимум 30 минут в день для развития",
    contexts: ["home", "transport", "park"],
    frequency: "daily",
    target: 1,
    color: "#4CAF50",
    icon: "📚",
    createdAt: new Date("2024-01-02"),
    isActive: true,
  },
  {
    id: "3",
    name: "Заниматься спортом",
    description: "Тренироваться 3 раза в неделю",
    contexts: ["gym", "park", "home"],
    frequency: "weekly",
    target: 3,
    color: "#FF5722",
    icon: "💪",
    createdAt: new Date("2024-01-03"),
    isActive: true,
  },
  {
    id: "4",
    name: "Медитировать",
    description: "Медитировать 10 минут утром для спокойствия",
    contexts: ["home", "park"],
    frequency: "daily",
    target: 1,
    color: "#9C27B0",
    icon: "🧘",
    createdAt: new Date("2024-01-04"),
    isActive: true,
  },
  {
    id: "5",
    name: "Изучать программирование",
    description: "Уделять время изучению новых технологий",
    contexts: ["home", "office"],
    frequency: "daily",
    target: 1,
    color: "#FF9800",
    icon: "💻",
    createdAt: new Date("2024-01-05"),
    isActive: true,
  },
  {
    id: "6",
    name: "Гулять на свежем воздухе",
    description: "Прогуливаться минимум 30 минут в день",
    contexts: ["park", "home"],
    frequency: "daily",
    target: 1,
    color: "#4CAF50",
    icon: "🚶",
    createdAt: new Date("2024-01-06"),
    isActive: true,
  },
  {
    id: "7",
    name: "Писать в дневник",
    description: "Записывать мысли и события дня",
    contexts: ["home"],
    frequency: "daily",
    target: 1,
    color: "#795548",
    icon: "📝",
    createdAt: new Date("2024-01-07"),
    isActive: true,
  },
  {
    id: "8",
    name: "Изучать английский",
    description: "Заниматься английским языком каждый день",
    contexts: ["home", "transport"],
    frequency: "daily",
    target: 1,
    color: "#3F51B5",
    icon: "🇬🇧",
    createdAt: new Date("2024-01-08"),
    isActive: true,
  },
  {
    id: "9",
    name: "Готовить здоровую еду",
    description: "Готовить домашнюю еду вместо заказа",
    contexts: ["home"],
    frequency: "weekly",
    target: 5,
    color: "#FFC107",
    icon: "🍳",
    createdAt: new Date("2024-01-09"),
    isActive: true,
  },
  {
    id: "10",
    name: "Спать 8 часов",
    description: "Соблюдать режим сна для восстановления",
    contexts: ["home"],
    frequency: "daily",
    target: 1,
    color: "#673AB7",
    icon: "😴",
    createdAt: new Date("2024-01-10"),
    isActive: true,
  },
];

// Примеры контекстов
export const MOCK_CONTEXTS = [
  {
    id: "home",
    name: "Дом",
    icon: "🏠",
    color: "#4CAF50",
    category: "location",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "office",
    name: "Офис",
    icon: "🏢",
    color: "#2196F3",
    category: "location",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "gym",
    name: "Спортзал",
    icon: "💪",
    color: "#FF5722",
    category: "location",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "park",
    name: "Парк",
    icon: "🌳",
    color: "#4CAF50",
    category: "location",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "transport",
    name: "Транспорт",
    icon: "🚌",
    color: "#9C27B0",
    category: "location",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "morning",
    name: "Утром",
    icon: "🌅",
    color: "#FFC107",
    category: "time",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "evening",
    name: "Вечером",
    icon: "🌙",
    color: "#673AB7",
    category: "time",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "weekend",
    name: "Выходные",
    icon: "🎉",
    color: "#E91E63",
    category: "time",
    createdAt: new Date("2024-01-01"),
  },
];

// Примеры записей выполнения привычек
export const MOCK_PROGRESS = [
  {
    id: "1",
    habitId: "1",
    context: "home",
    timestamp: new Date("2024-01-15T08:00:00"),
    notes: "Выпил 2 стакана утром",
    mood: "good",
  },
  {
    id: "2",
    habitId: "1",
    context: "office",
    timestamp: new Date("2024-01-15T12:00:00"),
    notes: "Выпил 3 стакана в обед",
    mood: "good",
  },
  {
    id: "3",
    habitId: "2",
    context: "transport",
    timestamp: new Date("2024-01-15T18:00:00"),
    notes: "Читал в метро по дороге домой",
    mood: "good",
  },
  {
    id: "4",
    habitId: "3",
    context: "gym",
    timestamp: new Date("2024-01-15T19:00:00"),
    notes: "Тренировка в спортзале, 1 час",
    mood: "good",
  },
  {
    id: "5",
    habitId: "4",
    context: "home",
    timestamp: new Date("2024-01-15T07:00:00"),
    notes: "Медитация утром, 10 минут",
    mood: "good",
  },
  {
    id: "6",
    habitId: "5",
    context: "home",
    timestamp: new Date("2024-01-15T20:00:00"),
    notes: "Изучал React хуки",
    mood: "good",
  },
  {
    id: "7",
    habitId: "6",
    context: "park",
    timestamp: new Date("2024-01-15T16:00:00"),
    notes: "Прогулка в парке, 45 минут",
    mood: "good",
  },
  {
    id: "8",
    habitId: "7",
    context: "home",
    timestamp: new Date("2024-01-15T21:00:00"),
    notes: "Записал события дня",
    mood: "good",
  },
  {
    id: "9",
    habitId: "8",
    context: "transport",
    timestamp: new Date("2024-01-15T09:00:00"),
    notes: "Учил английские слова в метро",
    mood: "good",
  },
  {
    id: "10",
    habitId: "9",
    context: "home",
    timestamp: new Date("2024-01-15T19:30:00"),
    notes: "Приготовил ужин дома",
    mood: "good",
  },
];

export const getMockHabits = () => {
  return MOCK_HABITS;
};

export const getMockContexts = () => {
  return MOCK_CONTEXTS;
};

export const getMockProgress = () => {
  return MOCK_PROGRESS;
};

export const getMockHabitById = (id) => {
  return MOCK_HABITS.find((habit) => habit.id === id);
};

export const getMockContextById = (id) => {
  return MOCK_CONTEXTS.find((context) => context.id === id);
};

export const getMockProgressByHabitId = (habitId) => {
  return MOCK_PROGRESS.filter((progress) => progress.habitId === habitId);
};

export const getMockProgressByContext = (context) => {
  return MOCK_PROGRESS.filter((progress) => progress.context === context);
};

export const getMockProgressByDate = (date) => {
  const targetDate = new Date(date);
  return MOCK_PROGRESS.filter((progress) => {
    const progressDate = new Date(progress.timestamp);
    return progressDate.toDateString() === targetDate.toDateString();
  });
};

export const getMockStats = () => {
  return {
    habits: {
      total: MOCK_HABITS.length,
      active: MOCK_HABITS.filter((h) => h.isActive).length,
      daily: MOCK_HABITS.filter((h) => h.frequency === "daily").length,
      weekly: MOCK_HABITS.filter((h) => h.frequency === "weekly").length,
    },
    contexts: {
      total: MOCK_CONTEXTS.length,
      byCategory: {
        location: MOCK_CONTEXTS.filter((c) => c.category === "location").length,
        time: MOCK_CONTEXTS.filter((c) => c.category === "time").length,
        activity: MOCK_CONTEXTS.filter((c) => c.category === "activity").length,
      },
    },
    progress: {
      total: MOCK_PROGRESS.length,
      byMood: {
        good: MOCK_PROGRESS.filter((p) => p.mood === "good").length,
        neutral: MOCK_PROGRESS.filter((p) => p.mood === "neutral").length,
        bad: MOCK_PROGRESS.filter((p) => p.mood === "bad").length,
      },
    },
  };
};

export const getRandomMockHabit = () => {
  const randomIndex = Math.floor(Math.random() * MOCK_HABITS.length);
  return MOCK_HABITS[randomIndex];
};

export const getRandomMockContext = () => {
  const randomIndex = Math.floor(Math.random() * MOCK_CONTEXTS.length);
  return MOCK_CONTEXTS[randomIndex];
};

export const getMockInitialData = () => {
  return {
    habits: MOCK_HABITS,
    contexts: MOCK_CONTEXTS,
    progress: MOCK_PROGRESS,
  };
};
