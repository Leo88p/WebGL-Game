export default function programInfo(gl, shaderProgram) {
  return {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
      vertexNormal:  gl.getAttribLocation(shaderProgram, "aVertexNormal")
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      uSampler: gl.getUniformLocation(shaderProgram, "uSampler"),
      NMatrix: gl.getUniformLocation(shaderProgram, "uNMatrix"),
      uniformPlayerPosition: gl.getUniformLocation(shaderProgram, "uPlayerPosition"),
      uniformAmbientLightColor: gl.getUniformLocation(shaderProgram, "uAmbientLightColor"),
      uniformLightersCount: gl.getUniformLocation(shaderProgram, "uLightersCount"),
      uniformLightPositions: gl.getUniformLocation(shaderProgram, "uLightPositions"),
      uniformDiffuseLightColors:  gl.getUniformLocation(shaderProgram, "uDiffuseLightColors"),
      uniformSpecularLightColors: gl.getUniformLocation(shaderProgram, "uSpecularLightColors"),
    },
  };
}