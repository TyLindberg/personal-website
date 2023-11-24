import { CameraController, GLContext, ModelLoader, SimpleModel } from './types';
import { now } from './utils/timeUtils';

export class ExperienceController {
  constructor(
    private readonly context: GLContext<SimpleModel>,
    private readonly loader: ModelLoader<SimpleModel>,
    private readonly cameraController: CameraController
  ) {}

  async loadFirstModel(): Promise<void> {
    const model = await this.loader.loadModel('bunny');
    this.context.loadModel('bunny', model);
  }

  async nextModel(transitionDuration: number): Promise<boolean> {
    return true;
  }

  start(): void {
    let prevTime = now();
    const animationCallback = () => {
      const currentTime = now();
      const deltaTime = currentTime - prevTime;
      prevTime = currentTime;

      const coords = this.cameraController.getCoordinates();
      coords.phi = (coords.phi + 0.0005 * deltaTime) % (2 * Math.PI);
      this.cameraController.setCoordinates(coords);
      requestAnimationFrame(animationCallback);
    };
    requestAnimationFrame(animationCallback);

    this.context.startRenderLoop();
  }
}
