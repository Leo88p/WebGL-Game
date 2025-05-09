#version 300 es
precision lowp float;

in vec4 vColor;
in vec2 vTextureCoord;

uniform sampler2D uSampler;

out vec4 color;

void main(void) {
    color = vColor*texture(uSampler, vTextureCoord);
}