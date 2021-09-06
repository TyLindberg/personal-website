import { GLContext, ModelLoader, SimpleModel } from './types';

export class ExperienceController {
  constructor(
    private readonly context: GLContext<SimpleModel>,
    private readonly loader: ModelLoader<SimpleModel>
  ) {}

  async loadFirstModel(): Promise<void> {
    const model = await this.loader.loadModel('bunny');
    this.context.loadModel('bunny', model);
  }

  async nextModel(): Promise<boolean> {
    return true;
  }

  start(): void {
    this.context.startRenderLoop();
  }
}
