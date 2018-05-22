const vert = `
varying vec2 v_uv;

void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const frag = `
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TAU 6.28318530717958647692;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
`;

export { vert, frag };
