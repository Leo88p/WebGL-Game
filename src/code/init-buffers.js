function initBuffers(gl, positions, color, textureCoordinates, normal) {
  const positionBuffer = initPositionBuffer(gl, positions);

  const textureCoordBuffer = initTextureBuffer(gl, textureCoordinates);

  const indexBuffer = initIndexBuffer(gl, positions.length/3);

  const colorBuffer = initColorBuffer(gl, color, positions.length);

  const normalBuffer = initNormalBuffer(gl, normal);

  return {
    position: positionBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
    color: colorBuffer,
    normal: normalBuffer
  };
}

function initPositionBuffer(gl, positions) {
  // Create a buffer for the square's positions.
  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return positionBuffer;
}

function initColorBuffer(gl, color, length) {

  // Convert the array of colors into a table for all the vertices.

  var colors = [];

  for (var j = 0; j < length; ++j) {
    colors = colors.concat(color);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

function initIndexBuffer(gl, length) {
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indices = [...Array(length).keys()]

  // Now send the element array to GL

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );

  return indexBuffer;
}

function initTextureBuffer(gl, textureCoordinates) {
  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(textureCoordinates),
    gl.STATIC_DRAW
  );

  return textureCoordBuffer;
}

function initNormalBuffer(gl, normals) {
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(normals),
    gl.STATIC_DRAW,
  );

  return normalBuffer;
}

export { initBuffers };