import React, { useEffect, useState } from "react";
import "./App.css";
import CreateHabit from "./components/CreateHabit";
import HabitsProvider from "./context/HabitsContext";
import { getMockInitialData } from "./data/mockData";
import useContexts from "./hooks/useContexts";
import useHabits from "./hooks/useHabits";
import useTelegram from "./hooks/useTelegram";

const App = () => {
  const { user, isReady, theme, showAlert } = useTelegram();
  const {
    habits,
    loading,
    error,
    addHabit,
    deleteHabit,
    getHabitsCount,
    getActiveHabits,
  } = useHabits();
  const { contexts } = useContexts();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Инициализация моковых данных только один раз при первом запуске
  useEffect(() => {
    // Проверяем, были ли уже загружены начальные данные
    const isInitialized = localStorage.getItem("habits_initialized") === "true";

    if (isReady && !loading && !initialized && !isInitialized) {
      try {
        // Проверяем, есть ли уже сохраненные данные
        const savedHabits = localStorage.getItem("habits");
        let hasExistingHabits = false;

        if (savedHabits) {
          try {
            const parsed = JSON.parse(savedHabits);
            hasExistingHabits = Array.isArray(parsed) && parsed.length > 0;
          } catch (e) {
            // Если не удалось распарсить, считаем что данных нет
            hasExistingHabits = false;
          }
        }

        // Если нет сохраненных данных, добавляем моковые
        if (!hasExistingHabits) {
          const mockData = getMockInitialData();
          if (mockData.habits.length > 0) {
            mockData.habits.forEach((habit) => {
              addHabit(habit);
            });
          }
        }

        // Отмечаем, что инициализация выполнена (независимо от того, были данные или нет)
        localStorage.setItem("habits_initialized", "true");
        setInitialized(true);
      } catch (error) {
        console.error("Ошибка инициализации:", error);
        // Даже при ошибке отмечаем как инициализированное, чтобы не повторять попытки
        localStorage.setItem("habits_initialized", "true");
        setInitialized(true);
      }
    } else if (isInitialized) {
      // Если уже был флаг инициализации, просто устанавливаем состояние
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, loading]);

  useEffect(() => {
    if (error) {
      showAlert(`Ошибка: ${error}`);
    }
  }, [error, showAlert]);

  const handleAddHabit = () => {
    setShowAddForm(true);
  };

  const handleDeleteHabit = (habitId) => {
    if (window.confirm("Вы уверены, что хотите удалить эту привычку?")) {
      deleteHabit(habitId);
    }
  };

  const handleHabitClick = (habit) => {
    setSelectedHabit(habit);
  };
  if (!isReady) {
    return (
      <div className="app loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Загрузка приложения...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="app loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  const habitsCount = getHabitsCount();
  const activeHabits = getActiveHabits();

  return (
    <div className={`app ${theme}`}>
      {/* Заголовок */}
      <header className="app-header">
        <div className="user-info">
          {user ? (
            <div className="user-details">
              <h1>Привет, {user.first_name}!</h1>
              <p>Трекер привычек</p>
            </div>
          ) : (
            <div className="user-details">
              <h1>Трекер привычек</h1>
              <p>Отслеживайте свои привычки</p>
            </div>
          )}
        </div>

        {/* Статистика */}
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{habitsCount.total}</span>
            <span className="stat-label">Всего</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{habitsCount.active}</span>
            <span className="stat-label">Активных</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{contexts.length}</span>
            <span className="stat-label">Контекстов</span>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="app-main">
        {/* Кнопка добавления привычки */}
        <div className="add-habit-section">
          <button className="add-habit-btn" onClick={handleAddHabit}>
            <span className="btn-icon">➕</span>
            Добавить привычку
          </button>
        </div>

        {/* Список привычек */}
        <div className="habits-section">
          <h2>Мои привычки</h2>

          {activeHabits.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>Нет активных привычек</h3>
              <p>Добавьте свою первую привычку, чтобы начать отслеживание</p>
              <button className="add-first-habit-btn" onClick={handleAddHabit}>
                Добавить первую привычку
              </button>
            </div>
          ) : (
            <div className="habits-list">
              {activeHabits.map((habit) => (
                <div
                  key={habit.id}
                  className="habit-card"
                  onClick={() => handleHabitClick(habit)}
                >
                  <div className="habit-header">
                    <div className="habit-icon" style={{ color: habit.color }}>
                      {habit.icon}
                    </div>
                    <div className="habit-info">
                      <h3 className="habit-name">{habit.name}</h3>
                      <p className="habit-description">{habit.description}</p>
                    </div>
                    <button
                      className="delete-habit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteHabit(habit.id);
                      }}
                    >
                      🗑️
                    </button>
                  </div>

                  <div className="habit-details">
                    <div className="habit-contexts">
                      <span className="contexts-label">Контексты:</span>
                      <div className="contexts-list">
                        {habit.contexts.map((contextId) => {
                          const context = contexts.find(
                            (c) => c.id === contextId
                          );
                          return context ? (
                            <span
                              key={contextId}
                              className="context-tag"
                              style={{ backgroundColor: context.color }}
                            >
                              {context.icon} {context.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>

                    <div className="habit-frequency">
                      <span className="frequency-label">Частота:</span>
                      <span className="frequency-value">
                        {habit.frequency === "daily"
                          ? "Ежедневно"
                          : habit.frequency === "weekly"
                          ? "Еженедельно"
                          : "По расписанию"}
                      </span>
                    </div>

                    <div className="habit-target">
                      <span className="target-label">Цель:</span>
                      <span className="target-value">{habit.target}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Форма добавления привычки */}
        {showAddForm && (
          <CreateHabit
            onClose={() => setShowAddForm(false)}
            onSuccess={() => {
              setShowAddForm(false);
            }}
          />
        )}

        {/* Детали привычки (заглушка) */}
        {selectedHabit && (
          <div className="habit-details-overlay">
            <div className="habit-details-modal">
              <h3>{selectedHabit.name}</h3>
              <p>{selectedHabit.description}</p>
              <p>
                Детальная информация о привычке будет реализована в следующих
                компонентах
              </p>
              <button
                className="close-details-btn"
                onClick={() => setSelectedHabit(null)}
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Футер */}
      <footer className="app-footer">
        <p>Трекер привычек • Telegram Mini App</p>
      </footer>
    </div>
  );
};
const AppWrapper = () => {
  return (
    <HabitsProvider>
      <App />
    </HabitsProvider>
  );
};

export default AppWrapper;
