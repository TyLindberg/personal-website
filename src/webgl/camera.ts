import { mat4, ReadonlyMat4 } from 'gl-matrix';
import { Camera, SphericalCoordinates } from '../types';
import { sphericalToCartesian } from '../utils/coordinateUtils';

export class PerspectiveCamera implements Camera {
  private viewMatrix = mat4.create();
  private projectionMatrix = mat4.create();
  private viewProjectionMatrix = mat4.create();
  private coordinates: SphericalCoordinates = { phi: 0, theta: 0, radius: 1 };
  private _fov;
  private _aspect;
  private _near;
  private _far;
  private isViewMatrixDirty = true;
  private isProjectionMatrixDirty = true;

  constructor(fov = 50, aspect = 1, near = 0.01, far = 100) {
    this._fov = fov;
    this._aspect = aspect;
    this._near = near;
    this._far = far;
  }

  get fov(): number {
    return this._fov;
  }

  set fov(newFov: number) {
    if (this._fov === newFov) {
      return;
    }
    this.isProjectionMatrixDirty = true;
    this._fov = newFov;
  }

  get aspect(): number {
    return this._aspect;
  }

  set aspect(newAspect: number) {
    if (this._aspect === newAspect) {
      return;
    }
    this.isProjectionMatrixDirty = true;
    this._aspect = newAspect;
  }

  get near(): number {
    return this._near;
  }

  set near(newNear: number) {
    if (this._near === newNear) {
      return;
    }
    this.isProjectionMatrixDirty = true;
    this._near = newNear;
  }

  get far(): number {
    return this._far;
  }

  set far(newFar: number) {
    if (this._far === newFar) {
      return;
    }
    this.isProjectionMatrixDirty = true;
    this._far = newFar;
  }

  getCoordinates(): SphericalCoordinates {
    return { ...this.coordinates };
  }

  setCoordinates(coords: SphericalCoordinates): void {
    if (
      this.coordinates.phi === coords.phi &&
      this.coordinates.theta === coords.theta &&
      this.coordinates.radius === coords.radius
    ) {
      return;
    }

    this.isViewMatrixDirty = true;
    this.coordinates.phi = coords.phi;
    this.coordinates.theta = coords.theta;
    this.coordinates.radius = coords.radius;
  }

  getViewProjectionMatrix(): ReadonlyMat4 {
    let shouldComputeNewMatrix = false;
    if (this.isViewMatrixDirty) {
      shouldComputeNewMatrix = true;

      const cartesianCoordinates = sphericalToCartesian(this.coordinates);
      mat4.lookAt(
        this.viewMatrix,
        [
          cartesianCoordinates.x,
          cartesianCoordinates.y,
          cartesianCoordinates.z,
        ],
        [0, 0, 0],
        [0, -1, 0]
      );
      this.isViewMatrixDirty = false;
    }

    if (this.isProjectionMatrixDirty) {
      shouldComputeNewMatrix = true;

      mat4.perspective(
        this.projectionMatrix,
        this._fov,
        this._aspect,
        this._near,
        this._far
      );
      this.isProjectionMatrixDirty = false;
    }

    if (shouldComputeNewMatrix) {
      mat4.mul(
        this.viewProjectionMatrix,
        this.projectionMatrix,
        this.viewMatrix
      );
    }

    return this.viewProjectionMatrix;
  }
}
