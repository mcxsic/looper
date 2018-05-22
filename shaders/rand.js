const rand = `
float rand (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float rand (float st) {
    return rand(vec2(st, 0.));
}
`;

export default rand;
