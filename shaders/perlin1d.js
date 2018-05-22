const simplePerlin = `
float simplePerlin (in vec2 st) {
    float x = st.x;
    float i = floor(x);  // integer
    float f = fract(x);  // fraction
    return mix(rand(i), rand(i + 1.0), smoothstep(0., 1., f));
}

float simplePerlin (in float x) {
    float i = floor(x);  // integer
    float f = fract(x);  // fraction
    return mix(rand(i), rand(i + 1.0), smoothstep(0., 1., f));
}
`;

export default simplePerlin;
