const LOCAL_STORAGE_KEY = 'user_data';

// Отримати дані з localStorage для конкретного користувача
const getUserData = (userId) => {
    const storedData = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${userId}`);
    return storedData ? JSON.parse(storedData) : { token: '', recentViews: [] };
};

// Зберегти дані в localStorage для конкретного користувача
const setUserData = (userId, data) => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_${userId}`, JSON.stringify(data));
};

// Отримати останні перегляди для конкретного користувача
export const getRecentViews = (userId) => {
    const userData = getUserData(userId);
    return userData.recentViews;
};

// Додати новий перегляд для конкретного користувача
export const addRecentView = (userId, sku) => {
    const userData = getUserData(userId);
    const recentViews = userData.recentViews;

    if (recentViews.length === 0 || recentViews[recentViews.length - 1] !== sku) {
        recentViews.push(sku);
        if (recentViews.length > 30) {
            recentViews.shift();
        }
        setUserData(userId, { ...userData, recentViews });
    }
};

// Очистити перегляди для конкретного користувача
export const clearRecentView = (userId) => {
    const userData = getUserData(userId);
    setUserData(userId, { ...userData, recentViews: [] });
};

// Отримати токен для конкретного користувача
export const getToken = (userId) => {
    const userData = getUserData(userId);
    return userData.token;
};

// Встановити токен для конкретного користувача
export const setToken = (userId, token) => {
    const userData = getUserData(userId);
    setUserData(userId, { ...userData, token });
};

// Очистити всі дані користувача
export const clearUserData = (userId) => {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_${userId}`);
};
