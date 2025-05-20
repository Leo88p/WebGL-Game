#version 300 es
precision lowp float;
precision lowp int;

in vec3 aVertexPosition;
in vec4 aVertexColor;
in vec2 aTextureCoord;
in vec3 aVertexNormal;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNMatrix;

out vec4 vColor;
out vec2 vTextureCoord;
out vec3 vVertexNormal;
out vec3 vVertexPosition;

void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
    vColor = aVertexColor;
    vTextureCoord = aTextureCoord;
    vVertexNormal = uNMatrix * aVertexNormal;
    vVertexPosition = aVertexPosition;
}