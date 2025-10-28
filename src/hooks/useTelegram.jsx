import { useEffect, useState } from "react";

const useTelegram = () => {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    try {
      if (window.Telegram?.WebApp) {
        const userData = window.Telegram.WebApp.initDataUnsafe?.user || null;
        const currentTheme = window.Telegram.WebApp.colorScheme || "light";
        setUser(userData);
        setTheme(currentTheme);
        setIsReady(true);
      } else {
        // Для работы в браузере без Telegram
        setUser(null);
        setTheme("light");
        setIsReady(true); // Все равно готовы работать
      }
    } catch (error) {
      console.error("Ошибка получения данных пользователя:", error);
      // Даже при ошибке приложение должно работать
      setUser(null);
      setTheme("light");
      setIsReady(true);
    }
  }, []);

  const setMainButton = (text, onClick, visible) => {
    try {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.MainButton.setText(text);
        window.Telegram.WebApp.MainButton.onClick(onClick);
        if (visible) {
          window.Telegram.WebApp.MainButton.show();
        } else {
          window.Telegram.WebApp.MainButton.hide();
        }
      } else {
        console.error("Telegram WebApp недоступен");
      }
    } catch (error) {
      console.error("Ошибка настройки главной кнопки:", error);
    }
  };

  const setBackButton = (onClick, visible) => {
    try {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.BackButton.onClick(onClick);
        if (visible) {
          window.Telegram.WebApp.BackButton.show();
        } else {
          window.Telegram.WebApp.BackButton.hide();
        }
      } else {
        console.error("Telegram WebApp недоступен");
      }
    } catch (error) {
      console.error("Ошибка настройки кнопки назад:", error);
    }
  };

  const showAlert = (message) => {
    try {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert(message);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Ошибка");
    }
  };

  const showConfirm = (message) => {
    try {
      if (window.Telegram?.WebApp) {
        return window.Telegram.WebApp.showConfirm(message);
      } else {
        return Promise.resolve(confirm(message));
      }
    } catch (error) {
      console.error("Ошибка");
      return Promise.resolve(false);
    }
  };

  return {
    user,
    isReady,
    theme,
    setMainButton,
    setBackButton,
    showAlert,
    showConfirm,
  };
};

export default useTelegram;
