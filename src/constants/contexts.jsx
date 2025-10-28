export const DEFAULT_CONTEXTS = [
  { id: "home", name: "Дом", icon: "🏠", color: "#4CAF50", category: "location" },
  { id: "office", name: "Офис", icon: "🏢", color: "#2196F3", category: "location" },
  { id: "gym", name: "Спортзал", icon: "💪", color: "#FF5722", category: "location" },
  { id: "transport", name: "Транспорт", icon: "🚌", color: "#9C27B0", category: "location" },
  { id: "park", name: "Парк", icon: "🌳", color: "#4CAF50", category: "location" },
  { id: "cafe", name: "Кафе", icon: "☕", color: "#795548", category: "location" },
  { id: "shop", name: "Магазин", icon: "🛒", color: "#FF9800", category: "location" },
  { id: "hospital", name: "Больница", icon: "🏥", color: "#F44336", category: "location" },
  { id: "school", name: "Учеба", icon: "🎓", color: "#3F51B5", category: "location" },
  { id: "travel", name: "Путешествие", icon: "✈️", color: "#00BCD4", category: "activity" },
  { id: "morning", name: "Утром", icon: "🌅", color: "#FFC107", category: "time" },
  { id: "evening", name: "Вечером", icon: "🌙", color: "#673AB7", category: "time" },
  { id: "weekend", name: "Выходные", icon: "🎉", color: "#E91E63", category: "time" },
  { id: "work", name: "Работа", icon: "💼", color: "#607D8B", category: "activity" },
  { id: "study", name: "Учеба", icon: "📚", color: "#009688", category: "activity" },
];

export const CONTEXT_CATEGORIES = {
  LOCATION: "location",
  TIME: "time",
  ACTIVITY: "activity",
};

export const CONTEXTS_BY_CATEGORY = {
  [CONTEXT_CATEGORIES.LOCATION]: [
    "home",
    "office",
    "gym",
    "park",
    "cafe",
    "shop",
    "hospital",
    "school",
  ],
  [CONTEXT_CATEGORIES.TIME]: ["morning", "evening", "weekend"],
  [CONTEXT_CATEGORIES.ACTIVITY]: ["work", "study", "travel"],
};

export const getContextById = (id) => {
  return DEFAULT_CONTEXTS.find((context) => context.id === id);
};

export const getContextsByCategory = (category) => {
  const contextIds = CONTEXTS_BY_CATEGORY[category] || [];
  return DEFAULT_CONTEXTS.filter((context) => contextIds.includes(context.id));
};
