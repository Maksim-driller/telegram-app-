import { useCallback, useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(key);
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } else {
        setData(defaultValue);
      }
    } catch (error) {
      setError("Ошибка загрузки данных");
      setData(defaultValue);
    } finally {
      setLoading(false);
    }
  }, [key, defaultValue]);

  // 1. Функция save
  const save = useCallback(
    (newData) => {
      try {
        // Сохранить данные в localStorage
        localStorage.setItem(key, JSON.stringify(newData));
        // Обновить состояние data
        setData(newData);
        // Очистить ошибку
        setError(null);
      } catch (error) {
        // Обработка ошибок
        setError("Ошибка операции");
        console.error("Ошибка:", error);
      }
    },
    [key]
  );

  // 2. Функция load
  const load = useCallback(() => {
    try {
      // Загрузить данные из localStorage
      const storedData = localStorage.getItem(key);
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } else {
        setData(defaultValue);
      }
    } catch (error) {
      // Обработка ошибок
      setError("Ошибка операции");
      console.error("Ошибка:", error);
    }
  }, [key]);

  // 3. Функция remove
  const remove = useCallback(() => {
    try {
      // Удалить данные из localStorage
      localStorage.removeItem(key);
      // Установить defaultValue в состояние
      setData(defaultValue);
    } catch (error) {
      // Обработка ошибок
      setError("Ошибка операции");
      console.error("Ошибка:", error);
    }
  }, [key, defaultValue]);

  // 4. Функция clear
  const clear = useCallback(() => {
    try {
      // Очистить все данные из localStorage
      localStorage.clear();
      // Установить defaultValue в состояние
      setData(defaultValue);
    } catch (error) {
      // Обработка ошибок
      setError("Ошибка операции");
      console.error("Ошибка:", error);
    }
  }, [defaultValue]);
  return {
    data,
    loading,
    error,
    save,
    load,
    remove,
    clear,
    setData,
  };
};
export default useLocalStorage;
