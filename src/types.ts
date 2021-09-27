import { ReadonlyMat4 } from 'gl-matrix';

export interface GLContext<Model> {
  loadModel(key: string, model: Model): Promise<boolean>;
  changeModel(key: string, transitionDuration: number): Promise<boolean>;
  startRenderLoop(): void;
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

// TODO: Add on move events to let top level know user is interacting
export interface CameraController {
  autoRotateSpeed: number;
  getCoordinates(): SphericalCoordinates;
  setCoordinates(coords: SphericalCoordinates): void;
  transitionToCoordinates(
    coords: SphericalCoordinates,
    transitionDuration: number,
    additionalRotations?: number
  ): Promise<void>;
}

export interface Camera {
  aspect: number;
  near: number;
  far: number;
  getCoordinates(): SphericalCoordinates;
  setCoordinates(coords: SphericalCoordinates): void;
  getViewProjectionMatrix(): ReadonlyMat4;
}

export interface SphericalCoordinates {
  radius: number;
  theta: number;
  phi: number;
}

export interface CartesianCoordinates {
  x: number;
  y: number;
  z: number;
}
