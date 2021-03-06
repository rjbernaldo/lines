export const priceMatrix = {
  100: [5.28, 5.59, 5.91, 6.22, 6.55, 6.86, 7.17, 7.5, 7.89, 8.28, 8.67, 9.06],
  200: [6.59, 6.92, 7.23, 7.54, 7.86, 8.17, 8.5, 8.81, 9.2, 9.59, 9.98, 10.37],
  300: [8.48, 8.79, 9.1, 9.42, 9.73, 10.06, 10.37, 10.68, 11.07, 11.46, 21.85, 12.24],
  400: [11.33, 11.65, 11.96, 12.28, 12.59, 12.92, 13.23, 13.54, 13.93, 14.32, 14.71, 15.1],
  500: [13.5, 13.81, 14.14, 14.45, 14.76, 15.08, 15.4, 15.71, 16.1, 16.49, 16.88, 17.27],
  600: [16.67, 15.99, 16.3, 16.61, 16.94, 17.25, 17.57, 17.89, 18.28, 18.67, 19.06, 19.45],
  700: [17.3, 17.62, 17.93, 18.26, 18.57, 18.88, 19.2, 19.51, 19.9, 20.29, 20.68, 21.07],
  800: [18.94, 19.25, 19.56, 19.88, 20.19, 20.52, 20.83, 21.14, 21.53, 21.92, 22.31, 22.7],
  900: [20.56, 20.88, 21.2, 21.51, 21.84, 22.15, 22.46, 22.78, 23.17, 23.56, 23.95, 24.34],
  1000: [22.2, 22.51, 22.84, 23.15, 23.46, 23.78, 24.1, 24.41, 24.8, 25.19, 25.58, 25.97],
  1100: [23.85, 24.16, 24.48, 24.8, 25.11, 25.44, 25.75, 26.06, 26.45, 26.84, 27.23, 27.62],
  1200: [25.48, 25.79, 26.1, 26.42, 26.74, 27.06, 27.37, 27.68, 28.07, 28.46, 28.85, 29.24],
};

export function calculateModifier(girth = 1, bends = 1, length) {
  if (bends === 0 && length === 0) {
    return 0;
  } else if (girth <= 100) {
    return priceMatrix[100][bends];
  } else if (girth <= 200) {
    return priceMatrix[200][bends];
  } else if (girth <= 300) {
    return priceMatrix[300][bends];
  } else if (girth <= 400) {
    return priceMatrix[400][bends];
  } else if (girth <= 500) {
    return priceMatrix[500][bends];
  } else if (girth <= 600) {
    return priceMatrix[600][bends];
  } else if (girth <= 700) {
    return priceMatrix[700][bends];
  } else if (girth <= 800) {
    return priceMatrix[800][bends];
  } else if (girth <= 900) {
    return priceMatrix[900][bends];
  } else if (girth <= 1000) {
    return priceMatrix[1000][bends];
  } else if (girth <= 1100) {
    return priceMatrix[1100][bends];
  } else if (girth <= 1200) {
    return priceMatrix[1200][bends];
  }

  return null;
}
