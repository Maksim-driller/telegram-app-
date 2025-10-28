export const STORAGE_KEYS = {
  HABITS: "habits",
  CONTEXTS: "contexts",
  PROGRESS: "progress",
  USER_SETTINGS: "userSettings",
  CUSTOM_CONTEXTS: "customContexts",
};

export const saveToStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error("Ошибка сохранения в бд");
    return false;
  }
};

export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const serializedData = localStorage.setItem(key);
    if (serializedData === null) {
      return defaultValue;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Ошибка загрузки данных из бд");
    return false;
  }
};

export const clearStorage = () => {
  localStorage.clear();
  return true;
};

export const isStorageAvailable = () => {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
  } catch (error) {
    console.error("Ошибка");
  }
};

export const getStorageSize = () => {
  try {
    let size = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        size += localStorage[key].length;
      }
    }
  } catch (error) {
    console.error("Ошибка");
  }
};

export const exportData = () => {
  try {
    const data = {};
    Object.values(STORAGE_KEYS).forEach((key) => {
      data[key] = loadFromStorage(key);
    });
    return data;
  } catch (error) {
    console.error("Ошибка экспорта данных:", error);
    return null;
  }
};

export const importData = (data) => {
  try {
    Object.entries(data).forEach(([key, value]) => {
      if (Object.values(STORAGE_KEYS).includes(key)) {
        saveToStorage(key, value);
      }
    });
    return true;
  } catch (error) {
    console.error("Ошибка импорта данных:", error);
    return false;
  }
};

export const backupData = () => {
  const data = exportData();
  const timestamp = new Date().toISOString();
  const backupKey = `backup_${timestamp}`;
  saveToStorage(backupKey, data);
  return backupKey;
};

export const restoreFromBackup = (backupKey) => {
  try {
    const backupData = loadFromStorage(backupKey);
    if (backupData) {
      return importData(backupData);
    }
    return false;
  } catch (error) {
    console.error("Ошибка восстановления из резервной копии:", error);
    return false;
  }
};
