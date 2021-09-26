import { SphericalCoordinates, CartesianCoordinates } from '../types';

const sphericalToCartesian = (
  sphericalCoords: SphericalCoordinates
): CartesianCoordinates => {
  const { phi, theta, radius } = sphericalCoords;
  return {
    x: radius * Math.cos(phi) * Math.sin(theta),
    y: radius * Math.cos(theta),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
};

const cartesianToSpherical = (
  cartesianCoords: CartesianCoordinates
): SphericalCoordinates => {
  const { x, y, z } = cartesianCoords;
  const radius = Math.sqrt(x * x + y * y + z * z);
  return {
    phi: Math.atan2(z, x),
    theta: Math.acos(y / radius),
    radius,
  };
};

export { sphericalToCartesian, cartesianToSpherical };
