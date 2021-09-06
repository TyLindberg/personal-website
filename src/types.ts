export interface GLContext<Model> {
  loadModel(key: string, model: Model): Promise<boolean>;
  changeModel(key: string, transitionDuration: number): Promise<boolean>;
  startRenderLoop(): void;
  // get cameraController(): CameraController;
}

export interface ModelLoader<Model> {
  get availableModels(): Array<string>;
  get loadedModels(): { [key: string]: Model };
  loadModel(key: string): Promise<Model>;
}

export interface SimpleModel {
  triangles: Float32Array;
  normals: Float32Array;
}

export interface CameraController {
  autoRotate: boolean;
  getCoordinates(): SphericalCoordinates;
  transitionToCoordinates(
    coords: SphericalCoordinates,
    transitionDuration: number,
    additionalRotations?: number
  ): Promise<void>;
}

export interface SphericalCoordinates {
  radius: number;
  theta: number;
  phi: number;
}
