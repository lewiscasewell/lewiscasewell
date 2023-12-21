export const fragmentShaderStar = `
uniform float u_intensity;
uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    // Normalized coordinates centered in the middle
    vec2 centeredUv = vUv - vec2(0.5);

    // Calculate the distance from the center, adjusted for a full circle
    float dist = length(centeredUv) * sqrt(2.0); 

    // Define color components
    vec3 white = vec3(1.0);
    vec3 paleYellow = vec3(1.0, 1.0, 0.8);
    vec3 grey = vec3(0.5);
    vec3 purple = vec3(0.6, 0.3, 0.7);

    // Mix colors based on distance
    vec3 color = white;
    color = mix(color, paleYellow, smoothstep(0.0, 0.3, dist)); // Less yellow
    color = mix(color, grey, smoothstep(0.3, 0.6, dist));
    color = mix(color, purple, smoothstep(0.6, 1.0, dist)); // More purple

    // Applying a circular mask with smooth edges
    float alpha = 1.0 - smoothstep(0.95, 1.0, dist);

    gl_FragColor = vec4(color, alpha);
}

`;

export const fragmentShaderPlanet = `
uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;
varying float vDisplacement;

// Simple noise function to create variations
float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // Calculate normalized coordinates
    vec2 uv = vUv - vec2(0.5);
    float distort = vDisplacement * 2.0;

    // Specific deep purple color #7D00FF
    vec3 specificDeepPurple = vec3(0.49, 0.0, 1.0);
    vec3 lightPurple = vec3(0.6, 0.4, 0.9);
    vec3 deepBlue = vec3(0.2, 0.2, 0.8);
    vec3 softPink = vec3(0.9, 0.6, 0.7);

    // Calculate noise based on UV and time
    float n = noise(uv * 2.0 + u_time * 0.5);

    // Mix colors with noise and distort to create splurges
    vec3 color = mix(specificDeepPurple, lightPurple, n);
    color = mix(color, deepBlue, n * distort);
    color = mix(color, softPink, (1.0 - n) * distort);

    // Emphasize the specific deep purple color based on the noise and time
    color = mix(color, specificDeepPurple, 0.3 + 0.2 * sin(u_time * 0.5));

    gl_FragColor = vec4(color, 1.0);
}
`;
