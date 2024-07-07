const LOCAL_STORAGE_KEY = 'recentViews';

export const getRecentViews = () => {
    const storedViews = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedViews ? JSON.parse(storedViews) : [];
};

export const addRecentView = (sku) => {
    const recentViews = getRecentViews();
    if (!recentViews.includes(sku)) {
        recentViews.push(sku);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recentViews));
    }
};

export const clearRecentView = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
};
