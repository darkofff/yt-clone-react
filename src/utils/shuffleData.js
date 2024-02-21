export function shuffleData(array) {
  // FUNCTION MEANT TO SHUFFLE DATA BEFORE DISPLAYING IT
  // TO MAKE IT LOOK MORE LIKE A REAL API CALL
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
