export const useChangeColor = (e: React.MouseEvent<HTMLElement>) => {
  var randomColor = "#";
  for (let i = 0; i < 6; i++) {
    randomColor += ((16 * Math.random()) | 0).toString(16);
  }
  e.currentTarget.style.backgroundColor = randomColor;
};
