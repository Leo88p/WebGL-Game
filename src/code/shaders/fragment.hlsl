#version 300 es
precision lowp float;
precision lowp int;

in vec4 vColor;
in vec2 vTextureCoord;
in vec3 vVertexNormal;
in vec3 vVertexPosition;

uniform sampler2D uSampler;
uniform vec3 uAmbientLightColor;
uniform vec3 uDiffuseLightColors[100];
uniform vec3 uSpecularLightColors[100];
uniform mat4 uModelViewMatrix;
uniform int uLightersCount;
uniform vec3 uPlayerPosition;
uniform vec3 uLightPositions[100];

out vec4 color;

void main(void) {
    vec4 vertexPositionEye4 = uModelViewMatrix * vec4(vVertexPosition, 1.0);
    vec3 vertexPositionEye3 = vertexPositionEye4.xyz / vertexPositionEye4.w;
    vec3 vLightDirections[100];
    for (int i=0; i<uLightersCount; i++) {
        vLightDirections[i] = uLightPositions[i] - vertexPositionEye3;
    }
    vec3 vPlayerDirection = uPlayerPosition - vertexPositionEye3;
    vec3 normal = normalize(vVertexNormal);
    vec3 playerDirection = normalize(vPlayerDirection);
    vec3 vLightWeighting = uAmbientLightColor;
    for (int i=0; i<uLightersCount; i++) {
        vec3 lightDirection = normalize(vLightDirections[i]);
        float diffuseLightDot = max(dot(normal, lightDirection), 0.0);
        vec3 halfVector = normalize(lightDirection + playerDirection);
        float specularLightDot = max(dot(normal, halfVector), 0.0);
        float specularLightParam = pow(specularLightDot, 100.0);
        float distance = length(lightDirection);
        float attenuation = 1.0/(1.0+1.0*distance*distance);
        vLightWeighting += (uDiffuseLightColors[i] * diffuseLightDot + uSpecularLightColors[i] * specularLightDot * specularLightParam) * attenuation;
    }
    color = vec4(vLightWeighting.rgb * vColor.rgb, vColor.a)*texture(uSampler, vTextureCoord);
}