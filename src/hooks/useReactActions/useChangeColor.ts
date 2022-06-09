export const useChangeColor = () => {
  var randomColor = "#";
  for (let i = 0; i < 6; i++) {
    randomColor += ((16 * Math.random()) | 0).toString(16);
  }

  const targetElement = document.getElementById("color")
  if(targetElement){
    targetElement.style.backgroundColor = randomColor;
  } else {
    return
  }
};
