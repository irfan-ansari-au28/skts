export function formatFieldName(fieldName) {
    // Add a space before each uppercase letter and split into words
    const words = fieldName.replace(/([A-Z])/g, ' $1').trim().split(' ');
    
    // Capitalize the first letter of each word and join them back together
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  