import { ModelLoader, SimpleModel } from '../types';
import { points as bunnyPoints } from './bunny';

export class WebGLLoader implements ModelLoader<SimpleModel> {
  get availableModels(): Array<string> {
    return ['bunny'];
  }

  get loadedModels(): { [key: string]: SimpleModel } {
    return modelMap;
  }

  async loadModel(key: string): Promise<SimpleModel> {
    if (!modelMap[key]) {
      throw new Error('Model does not exist!');
    }
    return modelMap[key];
  }
}

const modelMap: { [key: string]: SimpleModel } = {
  bunny: { points: bunnyPoints },
};
