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
uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
  float distort = 2.0 * vDisplacement * u_intensity;

  vec3 color = vec3(abs(vUv - 0.5) * 2.0  * (1.0 - distort), 1.0);
  color = mix(color, vec3(0.49, 0.0, 1.0), 0.6);

  
  gl_FragColor = vec4(color ,1.0);
}
`;
