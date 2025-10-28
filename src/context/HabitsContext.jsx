import React, { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_CONTEXTS } from "../constants/contexts";
import useLocalStorage from "../hooks/useLocalStorage";

const HabitsContext = createContext();
const ContextsContext = createContext();

const HabitsProvider = ({ children }) => {
  const {
    data: habits,
    save: saveHabits,
    loading: habitsLoading,
    error: habitsError,
  } = useLocalStorage("habits", []);

  const {
    data: contexts,
    save: saveContexts,
    loading: contextsLoading,
    error: contextsError,
  } = useLocalStorage("contexts", DEFAULT_CONTEXTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const addHabit = (habitData) => {
    try {
      const newHabit = {
        id: Date.now().toString(),
        name: habitData.name,
        description: habitData.description || "",
        contexts: habitData.contexts || [],
        frequency: habitData.frequency || "daily",
        target: habitData.target || 1,
        color: habitData.color || "#4CAF50",
        icon: habitData.icon || "⭐",
        createdAt: new Date(),
        isActive: true,
      };
      const updatedHabits = [...habits, newHabit];
      saveHabits(updatedHabits);
      setError(null);
      return newHabit;
    } catch (error) {
      setError("Ошибка добавления привычки");
      console.error("Ошибка:", error);
    }
  };

  const updateHabit = (id, updatedData) => {
    try {
      // 1. Найти индекс привычки в массиве
      const habitIndex = habits.findIndex((habit) => habit.id === id);

      // 2. Проверить, что привычка найдена
      if (habitIndex === -1) {
        setError("Привычка не найдена");
        return null;
      }

      const updatedHabit = {
        ...habits[habitIndex],
        ...updatedData,
        updatedAt: new Date(),
      };

      const updatedHabits = habits.map((habit) =>
        habit.id === id ? updatedHabit : habit
      );

      saveHabits(updatedHabits);

      setError(null);

      return updatedHabit;
    } catch (error) {
      setError("Ошибка обновления привычки");
      console.error("Ошибка:", error);
    }
  };
  const deleteHabit = (id) => {
    try {
      const habitIndex = habits.findIndex((habit) => habit.id === id);
      if (habitIndex === -1) {
        setError("Привычка не найдена");
        return null;
      }
      const updatedHabits = habits.filter((habit) => habit.id !== id);

      saveHabits(updatedHabits);

      setError(null);

      return true;
    } catch (error) {
      setError("Ошибка удаления привычки");
      console.error("Ошибка:", error);
    }
  };
  const addContext = (contextData) => {
    try {
      const newContext = {
        id: Date.now().toString(),
        name: contextData.name,
        icon: contextData.icon || "📍",
        color: contextData.color || "#4CAF50",
        category: contextData.category || "location",
        createdAt: new Date(),
      };
      const updatedContexts = [...contexts, newContext];
      saveContexts(updatedContexts);
      setError(null);

      return newContext;
    } catch (error) {
      setError("Ошибка добавления контекста");
      console.error("Ошибка:", error);
    }
  };

  // Удалить контекст
  const removeContext = (id) => {
    try {
      const isUsed = habits.some((habit) => habit.contexts.includes(id));

      if (isUsed) {
        setError("Контекст используется в привычках");
        return false;
      }
      const updatedContexts = contexts.filter((context) => context.id !== id);
      saveContexts(updatedContexts);
      setError(null);

      return true;
    } catch (error) {
      setError("Ошибка удаления контекста");
      console.error("Ошибка:", error);
    }
  };
  const getContextsByHabit = (habitId) => {
    try {
      const habit = habits.find((h) => h.id === habitId);

      if (!habit) {
        return [];
      }
      const habitContexts = contexts.filter((context) =>
        habit.contexts.includes(context.id)
      );

      return habitContexts;
    } catch (error) {
      console.error("Ошибка получения контекстов:", error);
      return [];
    }
  };
  const updateContext = (id, updatedData) => {
    try {
      const updatedContexts = contexts.map((context) => {
        if (context.id === id) {
          return {
            ...context,
            ...updatedData,
            updatedAt: new Date(),
          };
        }
        return context;
      });

      saveContexts(updatedContexts);
      setError(null);
    } catch (error) {
      setError("Ошибка обновления контекста");
      console.error("Ошибка:", error);
    }
  };

  // useEffect для инициализации
  useEffect(() => {
    if (contexts && contexts.length === 0 && !contextsLoading) {
      saveContexts(DEFAULT_CONTEXTS);
    }
  }, [contexts, contextsLoading, saveContexts]);

  // Создание объектов value для контекстов
  const habitsValue = {
    habits,
    contexts,
    loading: habitsLoading || contextsLoading,
    error: habitsError || contextsError || error,
    addHabit,
    updateHabit,
    deleteHabit,
    getHabitById: (id) => habits.find((h) => h.id === id),
    addContext,
    removeContext,
    updateContext,
    getContextsByHabit,
    getContextById: (id) => contexts.find((c) => c.id === id),
  };

  const contextsValue = {
    contexts,
    addContext,
    removeContext,
    updateContext,
    getContextById: (id) => contexts.find((c) => c.id === id),
  };

  return (
    <HabitsContext.Provider value={habitsValue}>
      <ContextsContext.Provider value={contextsValue}>
        {children}
      </ContextsContext.Provider>
    </HabitsContext.Provider>
  );
};

const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits должен использоваться внутри HabitsProvider");
  }
  return context;
};

const useContexts = () => {
  const context = useContext(ContextsContext);
  if (!context) {
    throw new Error("useContexts должен использоваться внутри HabitsProvider");
  }
  return context;
};

export { ContextsContext, HabitsContext, useContexts, useHabits };
export default HabitsProvider;
