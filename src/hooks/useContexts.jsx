import { useCallback } from "react";
import { useContexts as useContextsContext } from "../context/HabitsContext";

const useContexts = () => {
  const { contexts, addContext, removeContext, updateContext, getContextById } =
    useContextsContext();

  const getContextsByCategory = useCallback(
    (category) => {
      return contexts.filter((context) => context.category === category);
    },
    [contexts]
  );

  // Получить активные контексты (используемые в привычках)
  const getActiveContexts = useCallback(
    (habits) => {
      if (!habits || habits.length === 0) {
        return contexts;
      }

      const usedContextIds = new Set();
      habits.forEach((habit) => {
        if (habit.contexts) {
          habit.contexts.forEach((contextId) => {
            usedContextIds.add(contextId);
          });
        }
      });

      return contexts.filter((context) => usedContextIds.has(context.id));
    },
    [contexts]
  );
  const searchContexts = useCallback(
    (searchTerm) => {
      if (!searchTerm.trim()) {
        return contexts;
      }

      return contexts.filter((context) =>
        context.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [contexts]
  );

  const getContextsCount = useCallback(() => {
    const categories = {};
    contexts.forEach((context) => {
      if (!categories[context.category]) {
        categories[context.category] = 0;
      }
      categories[context.category]++;
    });

    return {
      total: contexts.length,
      byCategory: categories,
    };
  }, [contexts]);

  const getContextsByColor = useCallback(
    (color) => {
      return contexts.filter((context) => context.color === color);
    },
    [contexts]
  );
  const getContextsByIcon = useCallback(
    (icon) => {
      return contexts.filter((context) => context.icon === icon);
    },
    [contexts]
  );
  const getContextsStats = useCallback(() => {
    const stats = {
      total: contexts.length,
      byCategory: {},
      byColor: {},
      byIcon: {},
    };

    contexts.forEach((context) => {
      if (!stats.byCategory[context.category]) {
        stats.byCategory[context.category] = 0;
      }
      stats.byCategory[context.category]++;

      if (!stats.byColor[context.color]) {
        stats.byColor[context.color] = 0;
      }
      stats.byColor[context.color]++;

      if (!stats.byIcon[context.icon]) {
        stats.byIcon[context.icon] = 0;
      }
      stats.byIcon[context.icon]++;
    });

    return stats;
  }, [contexts]);

  const getRecentContexts = useCallback(
    (limit = 5) => {
      return contexts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
    },
    [contexts]
  );

  const getContextsByDate = useCallback(
    (date) => {
      const targetDate = new Date(date);
      return contexts.filter((context) => {
        const contextDate = new Date(context.createdAt);
        return contextDate.toDateString() === targetDate.toDateString();
      });
    },
    [contexts]
  );
  const validateContext = useCallback((contextData) => {
    const errors = [];

    if (!contextData.name || contextData.name.trim().length === 0) {
      errors.push("Название контекста обязательно");
    }

    if (contextData.name && contextData.name.length > 30) {
      errors.push("Название контекста слишком длинное");
    }

    if (!contextData.category) {
      errors.push("Категория контекста обязательна");
    }

    if (
      contextData.category &&
      !["location", "time", "activity"].includes(contextData.category)
    ) {
      errors.push("Неверная категория контекста");
    }

    if (!contextData.icon) {
      errors.push("Иконка контекста обязательна");
    }

    if (!contextData.color) {
      errors.push("Цвет контекста обязателен");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, []);
  const getPopularContexts = useCallback(
    (habits, limit = 5) => {
      if (!habits || habits.length === 0) {
        return contexts.slice(0, limit);
      }

      const contextUsage = {};
      habits.forEach((habit) => {
        if (habit.contexts) {
          habit.contexts.forEach((contextId) => {
            if (!contextUsage[contextId]) {
              contextUsage[contextId] = 0;
            }
            contextUsage[contextId]++;
          });
        }
      });

      return contexts
        .sort((a, b) => (contextUsage[b.id] || 0) - (contextUsage[a.id] || 0))
        .slice(0, limit);
    },
    [contexts]
  );
  const getContextsAlphabetically = useCallback(() => {
    return [...contexts].sort((a, b) => a.name.localeCompare(b.name));
  }, [contexts]);
  return {
    contexts,

    addContext,
    removeContext,
    updateContext,
    getContextById,
    getContextsByCategory,
    getActiveContexts,
    searchContexts,
    getContextsCount,
    getContextsByColor,
    getContextsByIcon,
    getContextsStats,
    getRecentContexts,
    getContextsByDate,
    validateContext,
    getPopularContexts,
    getContextsAlphabetically,
  };
};

export default useContexts;
