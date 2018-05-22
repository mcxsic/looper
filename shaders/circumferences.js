import simplex from './simplex.js';

const circumference = `
${simplex}

float circumference(in vec2 st, in vec2 center, in float radius, in float thick, in float noiseAmp, in float time){
    vec2 dist = st - center;
    float angle = atan(dist.y, dist.x);
    float angleNormalized = angle / TAU;
    float radiusAdapted = radius + noiseAmp * snoise(vec3(normalize(dist * 2.), time));
    float sqR = dot(dist, dist);
    float R = sqrt(sqR);
	return smoothstep(radiusAdapted - 0.003 - thick / 2., radiusAdapted - thick / 2., R) * (1. - smoothstep(radiusAdapted + thick / 2., radiusAdapted + 0.003 + thick / 2., R));
}

vec3 warpedCircumference(in vec2 st, in float radius, in float time, float amp, float delay){
    vec2 center = vec2(0.5);
    float r = circumference(st, center, radius, 0.005, 0.001 + amp, time - delay);
    float b = circumference(st, center, radius, 0.005, 0.001 + amp, time);
    float g = circumference(st, center, radius, 0.005, 0.001 + amp, time + delay);
    float lum = r * 0.31 + g * 0.59 + b * 0.11;
	return vec3(r, g, b);
}
`;

export default circumference;
