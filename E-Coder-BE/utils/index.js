export function removeDuplicates(array) {
    const uniqueArray = [];
  
    for (const item of array) {
      if (!uniqueArray.some((existingItem) => JSON.stringify(existingItem) === JSON.stringify(item))) {
        uniqueArray.push(item);
      }
    }
  
    return uniqueArray?.map((item) => item._id) || [];
  }