export const formatRating = (rating) => {
  return rating ? parseFloat(rating).toFixed(1) : "N/A";
};

export const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const removeDuplicates = (array, key) => {
  return array.filter((item, index, self) =>
    index === self.findIndex((i) => i[key] === item[key])
  );
};