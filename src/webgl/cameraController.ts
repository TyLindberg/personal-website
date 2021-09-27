import { Camera, CameraController, SphericalCoordinates } from '../types';

interface WebGLCameraSettings {
  autoRotateSpeed?: number;
}

export class WebGLCameraController implements CameraController {
  autoRotateSpeed;

  constructor(
    private readonly camera: Camera,
    private readonly canvas: HTMLCanvasElement,
    startingPosition: SphericalCoordinates,
    { autoRotateSpeed = 0 }: WebGLCameraSettings = {}
  ) {
    this.camera.setCoordinates(startingPosition);
    this.autoRotateSpeed = autoRotateSpeed;
  }

  getCoordinates(): SphericalCoordinates {
    return this.camera.getCoordinates();
  }

  setCoordinates(coords: SphericalCoordinates): void {
    this.camera.setCoordinates(coords);
  }

  async transitionToCoordinates(
    coords: SphericalCoordinates,
    transitionDuration: number,
    additionalRotations?: number
  ): Promise<void> {
    return;
  }
}
