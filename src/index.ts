import './styles.css';
import { ExperienceController } from './experienceController';
import { WebGLContext } from './webgl/context';
import { WebGLLoader } from './webgl/loader';
import { PerspectiveCamera } from './webgl/camera';
import { WebGLCameraController } from './webgl/cameraController';

const canvas = document.getElementById('main-canvas');
if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
  throw new Error('Failed to find HTML canvas!');
}

const camera = new PerspectiveCamera();
const cameraController = new WebGLCameraController(camera, {
  phi: -Math.PI / 2,
  theta: Math.PI / 2,
  radius: 2,
});
const context = new WebGLContext(canvas, camera);
const loader = new WebGLLoader();
const experienceController = new ExperienceController(
  context,
  loader,
  cameraController
);
experienceController.loadFirstModel();
experienceController.start();
