#version 300 es
precision lowp float;

in vec4 aVertexPosition;
in vec4 aVertexColor;
in vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

out vec4 vColor;
out vec2 vTextureCoord;

void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
    vTextureCoord = aTextureCoord;
}