function drawScene(gl, programInfo, buffers, length, texture) {
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  const fieldOfView = (90 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  mat4.translate(projectionMatrix,projectionMatrix, [0,0,0])

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();
  const position = window.model.playerPosition
  mat4.translate(modelViewMatrix, modelViewMatrix, [position.x,-2,position.y])
  mat4.rotateY(modelViewMatrix, modelViewMatrix, window.model.playerRotation)

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  setPositionAttribute(gl, buffers, programInfo);

  setTextureAttribute(gl, buffers, programInfo);

  setColorAttribute(gl, buffers, programInfo);

  //setNormalAttribute(gl, buffers, programInfo);

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);

  // Set the shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  /*const nMatrix = mat3.create();
  mat3.normalFromMat4(nMatrix, modelViewMatrix);

  gl.uniformMatrix3fv(
    programInfo.uniformLocations.NMatrix,
    false,
    nMatrix
  );
  gl.uniform3fv(programInfo.uniformLocations.uniformLightPosition, [0, 3, 10]);
  //соствавляющие цвета
  gl.uniform3fv(programInfo.uniformLocations.uniformAmbientLightColor, [0.5, 0.5, 0.5]);
  gl.uniform3fv(programInfo.uniformLocations.uniformDiffuseLightColor, [1.0, 1.0, 1.0]);
  gl.uniform3fv(programInfo.uniformLocations.uniformSpecularLightColor, [1.0, 1.0, 1.0]);*/

  // Tell WebGL we want to affect texture unit 0

  
  

  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

  {
    const vertexCount = length / 3;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLE_STRIP, vertexCount, type, offset);
  }
}

// Tell WebGL how to pull out the positions from the position
// buffer into the vertexPosition attribute.
function setPositionAttribute(gl, buffers, programInfo) {
  const numComponents = 3;
  const type = gl.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  // 0 = use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

// Tell WebGL how to pull out the colors from the color buffer
// into the vertexColor attribute.
function setColorAttribute(gl, buffers, programInfo) {
  const numComponents = 4;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexColor,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

// tell webgl how to pull out the texture coordinates from buffer
function setTextureAttribute(gl, buffers, programInfo) {
  const num = 2; // every coordinate composed of 2 values
  const type = gl.FLOAT; // the data in the buffer is 32-bit float
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set to the next
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
  gl.vertexAttribPointer(
    programInfo.attribLocations.textureCoord,
    num,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
}

function setNormalAttribute(gl, buffers, programInfo) {
  const num = 3
  const type = gl.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  // 0 = use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexNormal,
    num,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
}

export { drawScene };