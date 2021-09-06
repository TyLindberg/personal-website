import './styles.css';
import { ExperienceController } from './experienceController';
import { WebGLContext } from './webgl/context';
import { WebGLLoader } from './webgl/loader';

const canvas = document.getElementById('main-canvas');
if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
  throw new Error('Failed to find HTML canvas!');
}

const context = new WebGLContext(canvas);
const loader = new WebGLLoader();
const experienceController = new ExperienceController(context, loader);
experienceController.loadFirstModel();
experienceController.start();
