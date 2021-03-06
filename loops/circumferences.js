import THREE from '../third_party/three.js';
import { generateScene } from '../modules/three-fragment.js';
import circumference from '../shaders/circumferences.js';

const loopDuration = 3;

const shader = `
const float duration = ${loopDuration}.;
${circumference}

vec3 warpedCircumference(in vec2 st, in float radius, in float time, float delay){
    float noise = smoothstep(0.2, 0.6, snoise(vec3(normalize(st * 10.), time)));
    float ampScale = 0.5 + 0.5 * cos(u_time * 2. * PI / duration - PI);
    float amp = (0.005 + mix(0.01, 0.05, smoothstep(0.05, 0.5, radius)) * noise) * ampScale;
	return warpedCircumference(st, radius, time, amp, delay);
}

void main(){
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = warpedCircumference(st, 0.05, u_time * 0.9 - 0.3, 0.3);
    color += warpedCircumference(st, 0.1, u_time * 0.9 - 0.41, 0.3);
    color += warpedCircumference(st, 0.15, u_time * 0.9 - 0.5237, 0.2);
    color += warpedCircumference(st, 0.20, u_time * 0.9 - 0.612679, 0.3);
    color += warpedCircumference(st, 0.25, u_time * 0.9 - 0.7820, 0.2);
    color += warpedCircumference(st, 0.3, u_time * 0.9 - 0.8512, 0.15);
    color += warpedCircumference(st, 0.35, u_time * 0.9 - 0.9151, 0.4);
    color += warpedCircumference(st, 0.40, u_time * 0.9 - 1.1231, 0.7);
    color += warpedCircumference(st, 0.45, u_time * 0.9 - 1.3, 0.7);
    // color += warpedCircumference(st, 0.50, u_time * 0.9 + 1.7, 0.7);
    // color += warpedCircumference(st, 0.55, u_time * 0.9 + 1.9, 0.7);
    // color += warpedCircumference(st, 0.60, u_time * 0.9 + 2.0, 0.7);
    // color += warpedCircumference(st, 0.65, u_time * 0.9 + 1., 0.7);
    // color += warpedCircumference(st, 0.70, u_time * 0.9 + 1., 0.7);

	gl_FragColor = vec4(color, 1.0);
}
`;
const { renderer, camera, mesh, scene } = generateScene(shader, {});

const canvas = renderer.domElement;
renderer.setClearColor(0x101010, 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

function draw(startTime) {
    const time = (0.001 * (performance.now() - startTime)) % loopDuration;
    mesh.material.uniforms.u_time.value = time;
    renderer.render(scene, camera);
}

export { draw, loopDuration, canvas };
