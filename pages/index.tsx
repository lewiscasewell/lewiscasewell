import Head from "../components/Head";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, Vector3 } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BufferGeometry, MathUtils, Mesh, ShaderMaterial } from "three";
import vertexShader from "../utils/vertexShader";
import {
  fragmentShaderPlanet,
  fragmentShaderStar,
} from "../utils/fragmentShader";
import FooterMenu from "../components/FooterMenu";
import Navbar from "../components/Navbar";

const Blob = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh<BufferGeometry, ShaderMaterial>>(null);
  const hover = useRef(false);

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    if (!mesh.current) return null;
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      hover.current ? 0.85 : 0.15,
      0.02
    );
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={1}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        fragmentShader={fragmentShaderPlanet}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

const Blobs: React.FC<{ scale: number; position: Vector3 | undefined }> = ({
  scale,
  position,
}) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh<BufferGeometry, ShaderMaterial>>(null);
  const hover = useRef(false);

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    if (!mesh.current) return null;
    mesh.current!.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      hover.current ? 0.85 : 0.15,
      0.02
    );
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      scale={scale}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        fragmentShader={fragmentShaderStar}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

function getRndNum(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Home() {
  const arrayOfBlobs: { scale: number; position: Vector3 | undefined }[] =
    Array(200)
      .fill(0)
      .map(() => ({
        scale: getRndNum(0.1, 0.3),
        position: [
          Math.floor(getRndNum(-100, 100)),
          Math.floor(getRndNum(-100, 100)),
          Math.floor(getRndNum(-100, 100)),
        ],
      }));

  return (
    <>
      <Head />
      <main>
        <Navbar />

        <Canvas
          camera={{ position: [0.0, 0.0, 8.0] }}
          style={{ height: "100vh" }}
        >
          <Blob />
          {arrayOfBlobs.map((blob, index) => {
            return (
              <Blobs key={index} scale={blob.scale} position={blob.position} />
            );
          })}
          <axesHelper />
          <OrbitControls maxDistance={150} minDistance={4} />
        </Canvas>

        <FooterMenu />
      </main>
    </>
  );
}
