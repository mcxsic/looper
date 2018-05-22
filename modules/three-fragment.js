import THREE from '../third_party/three.js';
import { frag, vert } from '../shaders/fragment-vertex.js';

const PLANE_WIDTH = 10;
const PLANE_HEIGHT = 10;

const WIDTH = 400;
const HEIGHT = 400;
const PIXEL_RATIO = 2;

function getWebGLRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setPixelRatio(PIXEL_RATIO, PIXEL_RATIO);

    const canvas = renderer.domElement;
    canvas.style.width = `${WIDTH}px`;
    canvas.style.height = `${HEIGHT}px`;
    return renderer;
}

function getCamera() {
    let camera = new THREE.OrthographicCamera(
        PLANE_WIDTH / -2,
        PLANE_WIDTH / 2,
        PLANE_HEIGHT / 2,
        PLANE_HEIGHT / -2,
        0.9,
        1.1
    );
    camera.position.z = 1;
    return camera;
}

function getGeometry() {
    return new THREE.PlaneBufferGeometry(PLANE_WIDTH, PLANE_HEIGHT, 1);
}

function getMaterial(fragment, uniforms) {
    return new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 1.0 },
            u_resolution: {
                value: new THREE.Vector2(
                    WIDTH * PIXEL_RATIO,
                    HEIGHT * PIXEL_RATIO
                )
            },
            ...uniforms
        },
        vertexShader: vert,
        fragmentShader: frag.concat(fragment)
    });
}

function generateScene(fragment, uniforms) {
    const renderer = getWebGLRenderer();
    let camera = getCamera();
    let scene = new THREE.Scene();
    let material = getMaterial(fragment, uniforms);
    let geometry = getGeometry();
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    return { renderer, camera, mesh, scene };
}

export { generateScene };
