export const calcWidth = (size) => {
  if (size > 0) {
    let widthfield = parseInt((size / 7) * 6);
    if (widthfield < 6) {
      widthfield = 6;
    }
    if (widthfield > 30) {
      widthfield = 30;
    }
    return widthfield;
  } else {
    return 15;
  }
};
