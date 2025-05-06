export const secureStorage = {
    set: (key, value, hours = 1) => {
      try {
        const item = {
          value,
          expiry: Date.now() + (hours * 60 * 60 * 1000)
        };
        localStorage.setItem(key, JSON.stringify(item));
      } catch (error) {
        console.error('Storage error:', error);
      }
    },
    get: (key) => {
      try {
        const item = JSON.parse(localStorage.getItem(key));
        if (!item || Date.now() > item.expiry) {
          localStorage.removeItem(key);
          return null;
        }
        return item.value;
      } catch (error) {
        return null;
      }
    },
    remove: (key) => {
      localStorage.removeItem(key);
    }
  };