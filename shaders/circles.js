import simplex from './simplex.js';

const circles = `
${simplex}

float circle(in vec2 st, in vec2 center, in float radius, in float thick, in float noiseAmp, in float time){
    vec2 dist = st - center;
    vec2 dist2 = normalize(dist);
    float angle = atan(dist2.y, dist2.x);
    float angleNormalized = angle / TAU;
    float radiusAdapted = radius + noiseAmp * snoise(vec3(normalize(dist), time));
    float sqR = dot(dist, dist);
    float R = sqrt(sqR);
	return 1. - smoothstep(radiusAdapted - 0.006,radiusAdapted, R);
}

vec3 warpedCircle(in vec2 st, in float radius, in float time, float amp, float delay){
    vec2 center = vec2(0.5);
    float r = circle(st, center, radius, 0.005, 0.001 + amp, time - delay);
    float b = circle(st, center, radius, 0.005, 0.001 + amp, time);
    float g = circle(st, center, radius, 0.005, 0.001 + amp, time + delay);
    float lum = r * 0.30 + g * 0.59 + b * 0.11;
    vec3 color = vec3(r, g, b);
    float light = dot(vec3(1.), color);
	return mix(vec3(1.), color, smoothstep(0., 1., light));
}
`;

export default circles;
