attribute vec2 offset;

uniform float uWidth;
uniform float uHeight;
// uniform float uTime;

varying vec2 vUv;
// varying float vTime;

void main()
{
    vec4 modelViewPosition = viewMatrix * modelMatrix * vec4(position, 1.0);

    modelViewPosition.xy += offset * vec2(uWidth, uHeight);

    gl_Position = projectionMatrix * modelViewPosition;

    vUv = uv;
    // vTime = uTime;
}