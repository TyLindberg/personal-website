import { GLContext, SimpleModel } from '../types';
import vertexShaderSource from './shaders/vert.glsl';
import fragmentShaderSource from './shaders/frag.glsl';

interface ProgramInfo {
  attributeLocations: { [key: string]: GLint };
  uniformLocations: { [key: string]: GLint };
}

// TODO: Handle device pixel ratio (turn off antialiasing potentially)

export class WebGLContext implements GLContext<SimpleModel> {
  private gl: WebGLRenderingContext;
  private programInfo: ProgramInfo;
  private shouldRender = false;
  private isSceneDirty = false; // TODO: Find a way to make this easier to track

  private count: GLsizei = 0; // TODO: Remove this

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    const gl = (this.gl =
      canvas.getContext('webgl') ??
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext));
    if (!gl) {
      throw new Error('WEBGL_CONTEXT_INIT_FAILURE');
    }
    this.glInit(gl);
    window.addEventListener('resize', this.resize);

    this.programInfo = this.setupProgram();
    this.startInternalRenderLoop();
  }

  async loadModel(key: string, model: SimpleModel): Promise<boolean> {
    const { gl, programInfo } = this;
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, model.triangles, gl.STATIC_DRAW);
    gl.vertexAttribPointer(
      programInfo.attributeLocations.position,
      3,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(programInfo.attributeLocations.position);
    this.count = model.triangles.length / 3;
    this.isSceneDirty = true;
    return true;
  }

  async changeModel(key: string): Promise<boolean> {
    return true;
  }

  startRenderLoop(): void {
    this.shouldRender = true;
  }

  // get cameraController() {
  //   return {
  //     autoRotate: false,
  //     getCoordinates: () => {},
  //     transitionCamera: () => {},
  //   };
  // }

  private glInit = (gl: WebGLRenderingContext) => {
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    this.isSceneDirty = true;
  };

  private startInternalRenderLoop = () => {
    const { gl } = this;
    const renderFrame = () => {
      if (this.shouldRender && this.isSceneDirty) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        if (this.count) {
          gl.drawArrays(gl.TRIANGLES, 0, this.count);
        }
        this.isSceneDirty = false;
      }
      requestAnimationFrame(renderFrame);
    };
    requestAnimationFrame(renderFrame);
  };

  private resize = () => {
    const { canvas, gl } = this;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    this.isSceneDirty = true;
  };

  private setupProgram() {
    const { gl } = this;

    // Compile vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) {
      throw new Error('Failed to create vertex shader');
    }
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(vertexShader));
    }

    // Compile fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
      throw new Error('Failed to create fragment shader');
    }
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(fragmentShader));
    }

    const program = gl.createProgram();
    if (!program) {
      throw new Error('Failed to create program');
    }

    // Link program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const linkErrLog = gl.getProgramInfoLog(program);
      console.error(linkErrLog);
      throw new Error('Failed to link program');
    }

    // Use this program for all future rendering
    gl.useProgram(program);

    // Get attribute locations
    return {
      attributeLocations: {
        position: gl.getAttribLocation(program, 'position'),
      },
      uniformLocations: {},
    };
  }
}
