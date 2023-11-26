const headerElement = document.querySelector('header');

// Adjust canvas to always fill remaining space after header
export const resizeCanvas = (canvas: HTMLCanvasElement): void => {
  const headerBottom = headerElement?.offsetHeight;
  canvas.style.top = `${headerBottom}px`;
};
