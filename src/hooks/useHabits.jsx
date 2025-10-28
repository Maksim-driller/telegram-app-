import { useCallback } from "react";
import { useHabits as useHabitsContext } from "../context/HabitsContext";

const useHabits = () => {
  const {
    habits,
    loading,
    error,
    addHabit,
    updateHabit,
    deleteHabit,
    getHabitById,
  } = useHabitsContext();
  const getHabitsByContext = useCallback(
    (contextId) => {
      return habits.filter((habit) => habit.contexts.includes(contextId));
    },
    [habits]
  );
  const getActiveHabits = useCallback(() => {
    return habits.filter((habit) => habit.isActive);
  }, [habits]);

  const toggleHabitStatus = useCallback(
    (habitId) => {
      const habit = getHabitById(habitId);
      if (habit) {
        updateHabit(habitId, { isActive: !habit.isActive });
      }
    },
    [getHabitById, updateHabit]
  );
  const getHabitsCount = useCallback(() => {
    return {
      total: habits.length,
      active: habits.filter((h) => h.isActive).length,
      inactive: habits.filter((h) => !h.isActive).length,
    };
  }, [habits]);

  const searchHabits = useCallback(
    (searchTerm) => {
      if (!searchTerm.trim()) {
        return habits;
      }

      return habits.filter(
        (habit) =>
          habit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          habit.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [habits]
  );

  const getHabitsByFrequency = useCallback(
    (frequency) => {
      return habits.filter((habit) => habit.frequency === frequency);
    },
    [habits]
  );

  const getHabitsByColor = useCallback(
    (color) => {
      return habits.filter((habit) => habit.color === color);
    },
    [habits]
  );
  const getHabitsStats = useCallback(() => {
    const stats = {
      total: habits.length,
      active: habits.filter((h) => h.isActive).length,
      daily: habits.filter((h) => h.frequency === "daily").length,
      weekly: habits.filter((h) => h.frequency === "weekly").length,
      custom: habits.filter((h) => h.frequency === "custom").length,
    };

    return stats;
  }, [habits]);
  const getRecentHabits = useCallback(
    (limit = 5) => {
      return habits
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
    },
    [habits]
  );
  const getHabitsByDate = useCallback(
    (date) => {
      const targetDate = new Date(date);
      return habits.filter((habit) => {
        const habitDate = new Date(habit.createdAt);
        return habitDate.toDateString() === targetDate.toDateString();
      });
    },
    [habits]
  );
  const validateHabit = useCallback((habitData) => {
    const errors = [];

    if (!habitData.name || habitData.name.trim().length === 0) {
      errors.push("Название привычки обязательно");
    }

    if (habitData.name && habitData.name.length > 50) {
      errors.push("Название привычки слишком длинное");
    }

    if (habitData.target && (habitData.target < 1 || habitData.target > 100)) {
      errors.push("Цель должна быть от 1 до 100");
    }

    if (habitData.contexts && habitData.contexts.length === 0) {
      errors.push("Выберите хотя бы один контекст");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, []);
  return {
    habits,
    loading,
    error,
    addHabit,
    updateHabit,
    deleteHabit,
    getHabitById,
    getHabitsByContext,
    getActiveHabits,
    toggleHabitStatus,
    getHabitsCount,
    searchHabits,
    getHabitsByFrequency,
    getHabitsByColor,
    getHabitsStats,
    getRecentHabits,
    getHabitsByDate,
    validateHabit,
  };
};

export default useHabits;
