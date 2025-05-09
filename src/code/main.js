import vsSource from './shaders/vertices.hlsl?raw'
import fsSource from './shaders/fragment.hlsl?raw'
import parseOBJ from './parseOBJ'
import {initBuffers} from './init-buffers'
import programInfo from './program-info'
import {drawScene} from './draw-scene'
function main() {
    const gl = window.gl;
    const models = []
    window.resources.Models.forEach((model, index) => {
        models.push({})
        const data = parseOBJ(model);
        const color = [1.0, 1.0, 1.0, 1.0];
        const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
        models[index].buffers = initBuffers(gl, data.position, color, data.texcoord, data.normal);
        models[index].info = programInfo(gl, shaderProgram);
        models[index].texture = loadTexture(gl, window.resources.Textures[index]);
        models[index].length = data.position.length;
    })
    let then = 0;
    // Draw the scene repeatedly
    function render(now) {
      const deltaTime = now - then;
      then = now;
      gl.clearColor(0.0, 0.7, 0.8, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      models.forEach(m => drawScene(gl, m.info, m.buffers, m.length, m.texture))

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return null;
  }
  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function loadTexture(gl, image) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be downloaded over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    srcFormat,
    srcType,
    image
  );

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
  if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
    // Yes, it's a power of 2. Generate mips.
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    // No, it's not a power of 2. Turn off mips and set
    // wrapping to clamp to edge
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}

export {main}