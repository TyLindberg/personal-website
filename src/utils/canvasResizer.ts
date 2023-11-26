const headerElement = document.querySelector('header');
if (!headerElement) {
  throw new Error('Failed to find header element');
}

// Adjust canvas to always fill remaining space after header
export const resizeCanvas = (canvas: HTMLCanvasElement): void => {
  const headerBottom = headerElement?.offsetHeight;
  const canvasHeight = window.innerHeight - headerBottom;
  canvas.style.top = `${headerBottom}px`;
  canvas.style.height = `${canvasHeight}px`;
};
