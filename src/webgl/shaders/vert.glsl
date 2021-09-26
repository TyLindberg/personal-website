#version 100
precision highp float;

attribute vec3 position;

uniform mat4 viewProjectionMatrix;

void main() {
  vec4 transformedPosition = viewProjectionMatrix * vec4(position, 1.0);
  gl_Position = vec4(transformedPosition.xyz, 1.0);
}
