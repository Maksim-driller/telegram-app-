import React, { useState, useMemo, useEffect } from "react";
import useHabits from "../hooks/useHabits";
import useContexts from "../hooks/useContexts";
import useTelegram from "../hooks/useTelegram";
import { CONTEXT_CATEGORIES } from "../constants/contexts";
import "./CreateHabit.css";

const HABIT_COLORS = [
  "#4CAF50", // зеленый
  "#2196F3", // синий
  "#FF5722", // красный
  "#9C27B0", // фиолетовый
  "#FF9800", // оранжевый
  "#00BCD4", // голубой
  "#795548", // коричневый
  "#607D8B", // серый
  "#F44336", // красный светлый
  "#3F51B5", // индиго
  "#009688", // бирюзовый
  "#673AB7", // глубокий фиолетовый
];

const HABIT_ICONS = [
  "💧", "📚", "💪", "🧘", "💻", "🚶", "📝", "🇬🇧",
  "🍳", "😴", "🎯", "⭐", "🔥", "🌟", "🎨", "🎵",
  "🏃", "🚴", "🏋️", "🧗", "🎮", "📱", "☕", "🍎",
];

const CreateHabit = ({ onClose, onSuccess }) => {
  const { addHabit, validateHabit } = useHabits();
  const { contexts } = useContexts();
  const { showAlert } = useTelegram();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contexts: [],
    frequency: "daily",
    target: 1,
    color: HABIT_COLORS[0],
    icon: HABIT_ICONS[0],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Закрытие по ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    // Блокируем прокрутку body когда модалка открыта
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose, isSubmitting]);

  // Получаем контексты по категориям из реальных данных
  const contextsByCategory = useMemo(() => {
    const grouped = {
      location: [],
      time: [],
      activity: [],
    };

    contexts.forEach((context) => {
      if (context.category && grouped[context.category]) {
        grouped[context.category].push(context);
      }
    });

    return grouped;
  }, [contexts]);

  // Функция для обработки изменений полей
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Очищаем ошибку для этого поля
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  // Функция для переключения контекста
  const toggleContext = (contextId) => {
    setFormData((prev) => {
      const newContexts = prev.contexts.includes(contextId)
        ? prev.contexts.filter((id) => id !== contextId)
        : [...prev.contexts, contextId];

      return {
        ...prev,
        contexts: newContexts,
      };
    });
  };

  // Функция валидации формы
  const validateForm = () => {
    const newErrors = {};

    // Валидация названия
    if (!formData.name.trim()) {
      newErrors.name = "Название привычки обязательно";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Название должно содержать минимум 2 символа";
    } else if (formData.name.length > 50) {
      newErrors.name = "Название не должно превышать 50 символов";
    }

    // Валидация контекстов
    if (formData.contexts.length === 0) {
      newErrors.contexts = "Выберите хотя бы один контекст";
    }

    // Валидация цели
    if (formData.target < 1) {
      newErrors.target = "Цель должна быть не менее 1";
    } else if (formData.target > 100) {
      newErrors.target = "Цель не должна превышать 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Функция отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Прокручиваем к первой ошибке
      const firstError = document.querySelector(".error, .error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      addHabit(formData);
      
      // Показываем успешное сообщение
      if (showAlert) {
        showAlert(`Привычка "${formData.name}" успешно создана! 🎉`);
      }
      
      // Небольшая задержка для показа сообщения
      setTimeout(() => {
        // Вызываем колбэки
        if (onSuccess) {
          onSuccess();
        }
        if (onClose) {
          onClose();
        }
      }, 300);
    } catch (error) {
      console.error("Ошибка при добавлении привычки:", error);
      setErrors({
        general: "Ошибка при добавлении привычки. Попробуйте еще раз.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-habit-overlay" onClick={onClose}>
      <div className="create-habit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="create-habit-header">
          <h2>Новая привычка</h2>
          <button className="close-btn" onClick={onClose} aria-label="Закрыть">
            ✕
          </button>
        </div>

        <form className="create-habit-form" onSubmit={handleSubmit}>
          {/* Общая ошибка */}
          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}

          {/* Название */}
          <div className="form-group">
            <label htmlFor="name">
              Название <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Например: Пить воду"
              className={errors.name ? "error" : ""}
              maxLength={50}
            />
            {errors.name && (
              <span className="field-error">{errors.name}</span>
            )}
          </div>

          {/* Описание */}
          <div className="form-group">
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Описание вашей привычки..."
              rows={3}
              maxLength={200}
            />
          </div>

          {/* Иконка и цвет */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="icon">Иконка</label>
              <div className="icon-selector">
                {HABIT_ICONS.slice(0, 12).map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    className={`icon-option ${
                      formData.icon === icon ? "selected" : ""
                    }`}
                    onClick={() => handleChange("icon", icon)}
                    style={{
                      backgroundColor:
                        formData.icon === icon ? formData.color : "transparent",
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="color">Цвет</label>
              <div className="color-selector">
                {HABIT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-option ${
                      formData.color === color ? "selected" : ""
                    }`}
                    onClick={() => handleChange("color", color)}
                    style={{
                      backgroundColor: color,
                      borderColor: formData.color === color ? color : "#ddd",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Контексты */}
          <div className="form-group">
            <label>
              Контексты <span className="required">*</span>
            </label>
            {Object.entries(contextsByCategory).map(([category, categoryContexts]) => {
              const displayName = {
                location: "Места",
                time: "Время",
                activity: "Активности",
              }[category] || category;

              return (
                <div key={category} className="context-category">
                  <h4>{displayName}</h4>
                  <div className="contexts-grid">
                    {categoryContexts.map((context) => (
                      <button
                        key={context.id}
                        type="button"
                        className={`context-chip ${
                          formData.contexts.includes(context.id) ? "selected" : ""
                        }`}
                        onClick={() => toggleContext(context.id)}
                        style={{
                          backgroundColor: formData.contexts.includes(context.id)
                            ? context.color
                            : "transparent",
                          borderColor: context.color,
                          color: formData.contexts.includes(context.id)
                            ? "#fff"
                            : context.color,
                        }}
                      >
                        <span className="context-icon">{context.icon}</span>
                        {context.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
            {errors.contexts && (
              <span className="field-error">{errors.contexts}</span>
            )}
          </div>

          {/* Частота и цель */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="frequency">Частота</label>
              <select
                id="frequency"
                value={formData.frequency}
                onChange={(e) => handleChange("frequency", e.target.value)}
              >
                <option value="daily">Ежедневно</option>
                <option value="weekly">Еженедельно</option>
                <option value="custom">По расписанию</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="target">
                Цель <span className="required">*</span>
              </label>
              <input
                type="number"
                id="target"
                value={formData.target}
                onChange={(e) =>
                  handleChange("target", parseInt(e.target.value) || 1)
                }
                min="1"
                max="100"
                className={errors.target ? "error" : ""}
              />
              {errors.target && (
                <span className="field-error">{errors.target}</span>
              )}
            </div>
          </div>

          {/* Кнопки */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              Создать привычку
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHabit;
