export const storage = {
    save: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
    get: (key) => JSON.parse(localStorage.getItem(key)) || []
};