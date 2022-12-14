import Head from "next/head";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import {
  CaretDownIcon,
  DiscordLogoIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

import Link from "next/link";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, Vector3 } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils } from "three";

import vertexShader from "../utils/vertexShader";
import fragmentShader from "../utils/fragmentShader";

const Blob = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>();
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
        fragmentShader={fragmentShader}
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
  const mesh = useRef<any>();
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
      position={position}
      scale={scale}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
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
      <Head>
        <title>Lewis Casewell</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="theme-color" content="#18181b" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          <OrbitControls />
        </Canvas>

        <FooterMenu />
      </main>
    </>
  );
}

interface Props {
  className?: string;
  children: React.ReactNode;
  title: string;
  href: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, Props>(
  ({ className, children, title, href }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          className={classNames("ListItemLink", className)}
          href={href}
          ref={forwardedRef}
        >
          <>
            <div className="ListItemHeading">{title}</div>
            <p className="ListItemText">{children}</p>
          </>
        </Link>
      </NavigationMenu.Link>
    </li>
  )
);

ListItem.displayName = "ListItem";

const Navbar = () => {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Overview <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">
              <li style={{ gridRow: "span 3" }}>
                <NavigationMenu.Link asChild>
                  <Link
                    className="Callout"
                    href="https://blog.lewiscasewell.com"
                  >
                    <div className="CalloutHeading">Hi, I&apos;m Lewis.</div>
                    <p className="CalloutText">
                      I am a UK based frontend developer primarily working with
                      Typescript, React and React-native.
                    </p>
                  </Link>
                </NavigationMenu.Link>
              </li>

              <ListItem href="https://blog.lewiscasewell.com/" title="About">
                Find out more about me.
              </ListItem>
              <ListItem
                href="mailto:lewiscasewell@hotmail.co.uk?subject=Hello Lewis"
                title="Contact"
              >
                Shoot me an email.
              </ListItem>
              <ListItem href="https://github.com/lewiscasewell" title="Github">
                Check out all of my current projects.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Projects <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <ListItem title="Polls" href="https://polls.lewiscasewell.com">
                Need to settle a question? Start a 24hr poll that you can share
                with anyone.
                <br />
                This application was built using Nextjs, tRPC, Prisma,
                PlanetScale and Tailwindcss.
              </ListItem>
              <ListItem
                title="Weight tracker"
                href="https://weight-tracker-beta.vercel.app"
              >
                Track your daily bodyweight and calculate your daily calorie
                target.
                <br />A PWA built using Nextjs, Firebase Authentication,
                Firestore and Tailwindcss.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            className="NavigationMenuLink"
            href="https://blog.lewiscasewell.com"
          >
            Blog
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
};

const FooterMenu = () => {
  return (
    <footer className="FooterMenuRoot">
      <Link href="https://github.com/lewiscasewell" className="FooterMenuItem">
        <GitHubLogoIcon className="Icon" />
      </Link>
      <Link href="https://twitter.com/developer2395" className="FooterMenuItem">
        <TwitterLogoIcon className="Icon" />
      </Link>
      <Link
        href="https://www.linkedin.com/in/lewis-casewell-bb1769182/"
        className="FooterMenuItem"
      >
        <LinkedInLogoIcon className="Icon" />
      </Link>
      <Link
        href="https://discord.com/users/case#9923"
        className="FooterMenuItem"
      >
        <DiscordLogoIcon className="Icon" />
      </Link>
    </footer>
  );
};
