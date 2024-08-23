export const stringToAcceptedColor = (str: string, alpha: number = 1) => {
  const acceptedColors = [
    "rgb(0,219,255)",
    "rgb(255,0,0)",
    "rgb(0,255,0)",
    "rgb(0,111,255)",
    "rgb(153,0,255)",
    "rgb(0,111,255)",
    "rgb(255,0,127)",
    "rgb(255,127,0)",
    "rgb(255,255,0)",
    "rgb(0,255,127)",
    "rgb(191,255,0)",
  ];
  // select a color from a list of accepted colors base on str
  let color: string;

  // Use a hash function on the input string to select an index from the acceptedColors array
  const hash = str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const index = hash % acceptedColors.length;

  // Get the selected color
  color = acceptedColors[index];

  if (color && alpha < 1) {
    color = color.replace(")", `, ${alpha})`);
  }
  return color;
};
