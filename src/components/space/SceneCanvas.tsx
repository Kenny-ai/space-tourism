"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import {
  AdditiveBlending,
  BackSide,
  Color,
  Group,
  Mesh,
  Points,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three";
import type { destinationTypes } from "../../@types/model";
import {
  destinationWorlds,
  worlds,
  type SceneInteraction,
  type World,
} from "./scene-data";

interface SceneProps {
  world: World;
  overview: boolean;
  active: boolean;
  paused: boolean;
  reduced: boolean;
  reset: number;
  interaction: MutableRefObject<SceneInteraction>;
  onReady: () => void;
  onFailure: () => void;
  onSelect: (world: destinationTypes) => void;
  invalidateRef: MutableRefObject<() => void>;
}

const atmosphereVertex = `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 positionView = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-positionView.xyz);
    gl_Position = projectionMatrix * positionView;
  }
`;
const atmosphereFragment = `
  uniform vec3 glowColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 3.5);
    gl_FragColor = vec4(glowColor, rim * 0.48);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function Atmosphere({ color, size = 1.07 }: { color: string; size?: number }) {
  const uniforms = useMemo(
    () => ({ glowColor: { value: new Color(color) } }),
    [color],
  );
  return (
    <mesh scale={size}>
      <sphereGeometry args={[1.35, 48, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={atmosphereVertex}
        fragmentShader={atmosphereFragment}
        transparent
        side={BackSide}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function WorldMesh({
  id,
  selected,
  overview,
  active,
  paused,
  interaction,
  onSelect,
}: {
  id: World;
  selected: boolean;
  overview: boolean;
  active: boolean;
  paused: boolean;
  interaction: SceneProps["interaction"];
  onSelect: SceneProps["onSelect"];
}) {
  const texture = useLoader(TextureLoader, worlds[id].texture);
  const rotating = useRef<Group>(null);
  const shell = useRef<Mesh>(null);
  const clouds = useLoader(
    TextureLoader,
    id === "earth" ? "/assets/textures/clouds.webp" : worlds[id].texture,
  );
  const spin = useRef(0);
  const { gl } = useThree();
  // Three.js textures are mutable GPU resources cached by the loader.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
  }, [texture, gl]);
  useFrame((_, delta) => {
    if (!rotating.current) return;
    if (active && !paused && !interaction.current.dragging)
      spin.current += Math.min(delta, 0.05) * 0.045;
    const yaw = selected && !overview ? interaction.current.yaw : 0;
    const tilt = selected && !overview ? interaction.current.tilt : 0;
    rotating.current.rotation.set(
      tilt + (id === "earth" ? 0.14 : 0.04),
      spin.current + yaw + 2.7,
      0.08,
    );
    if (shell.current && active && !paused)
      shell.current.rotation.y += Math.min(delta, 0.05) * 0.014;
  });
  return (
    <group position={worlds[id].position}>
      <group ref={rotating}>
        <mesh
          onClick={(event) => {
            if (overview && event.delta < 5 && id !== "earth") {
              event.stopPropagation();
              onSelect(id);
            }
          }}
        >
          <sphereGeometry args={[1.35, 64, 48]} />
          <meshStandardMaterial
            map={texture}
            color={worlds[id].color}
            roughness={id === "earth" ? 0.72 : 0.95}
            metalness={0}
            bumpMap={id === "earth" || id === "titan" ? undefined : texture}
            bumpScale={0.023}
          />
        </mesh>
        {id === "earth" && (
          <mesh ref={shell} scale={1.012}>
            <sphereGeometry args={[1.35, 48, 32]} />
            <meshStandardMaterial
              map={clouds}
              alphaMap={clouds}
              transparent
              opacity={0.75}
              depthWrite={false}
              roughness={1}
            />
          </mesh>
        )}
        {id === "titan" && (
          <mesh scale={1.018}>
            <sphereGeometry args={[1.35, 48, 32]} />
            <meshStandardMaterial
              color="#c6954d"
              transparent
              opacity={0.76}
              depthWrite={false}
              roughness={1}
            />
          </mesh>
        )}
        {worlds[id].atmosphere && (
          <Atmosphere
            color={worlds[id].atmosphere!}
            size={id === "titan" ? 1.055 : 1.035}
          />
        )}
      </group>
      {overview && id !== "earth" && (
        <Html center position={[0, -1.9, 0]} zIndexRange={[5, 0]}>
          <button
            type="button"
            className="atlas-marker"
            aria-label={`Approach ${worlds[id].name}`}
            aria-pressed={selected}
            onClick={() => onSelect(id)}
          >
            <span />
            {worlds[id].name}
            <small>APPROACH ↗</small>
          </button>
        </Html>
      )}
    </group>
  );
}

function StarField({ active, paused }: { active: boolean; paused: boolean }) {
  const points = useRef<Points>(null);
  const positions = useMemo(() => {
    // Deterministic positions avoid random changes when the scene remounts.
    const values = new Float32Array(750 * 3);
    let seed = 81;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 750; i++) {
      values[i * 3] = (random() - 0.5) * 90;
      values[i * 3 + 1] = (random() - 0.5) * 65;
      values[i * 3 + 2] = -8 - random() * 35;
    }
    return values;
  }, []);
  useFrame((_, delta) => {
    if (points.current && active && !paused)
      points.current.rotation.z += Math.min(delta, 0.05) * 0.0015;
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#c7d8ef"
        size={0.035}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CameraRig({
  world,
  overview,
  reduced,
  paused,
  active,
  interaction,
}: SceneProps) {
  const { camera, pointer, invalidate } = useThree();
  const look = useRef(new Vector3(...worlds[world].position));
  const target = useRef(new Vector3());
  const cameraTarget = useRef(new Vector3());
  useFrame((_, delta) => {
    const parallax =
      active && !paused && !reduced && !interaction.current.dragging;
    if (overview) {
      target.current.set(0, -0.2, 0);
      cameraTarget.current.set(0, 6.5, 36);
    } else {
      target.current.set(...worlds[world].position);
      cameraTarget.current.copy(target.current);
      cameraTarget.current.x += parallax ? pointer.x * 0.25 : 0.1;
      cameraTarget.current.y += 0.35 + (parallax ? pointer.y * 0.15 : 0);
      cameraTarget.current.z += world === "earth" ? 6.5 : 6.4;
    }
    const blend = reduced ? 1 : 1 - Math.exp(-Math.min(delta, 0.05) * 3.5);
    camera.position.lerp(cameraTarget.current, blend);
    look.current.lerp(target.current, blend);
    camera.lookAt(look.current);
    if (
      active &&
      (camera.position.distanceToSquared(cameraTarget.current) > 0.00001 ||
        look.current.distanceToSquared(target.current) > 0.00001)
    )
      invalidate();
  });
  return null;
}

function ContextLifecycle({ onFailure }: { onFailure: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    // Intentional disposal during route changes must not trigger the fallback.
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  return null;
}

function SceneContents(props: SceneProps) {
  const { world, active, paused, overview, onReady } = props;
  useEffect(() => {
    onReady();
  }, [onReady]);
  const shown: World[] = world === "earth" ? ["earth"] : destinationWorlds;
  const orbit = useMemo(
    () =>
      Array.from({ length: 129 }, (_, index) => {
        const angle = (index / 128) * Math.PI * 2;
        return [Math.cos(angle) * 12, -2, Math.sin(angle) * 3 - 1] as [
          number,
          number,
          number,
        ];
      }),
    [],
  );
  return (
    <>
      <ambientLight intensity={0.24} />
      <directionalLight
        position={[-12, 8, 10]}
        intensity={3.1}
        color="#fff3df"
      />
      <directionalLight
        position={[8, -3, -8]}
        intensity={0.55}
        color="#80a7e3"
      />
      <StarField active={active} paused={paused} />
      {shown.map((id) => (
        <WorldMesh
          key={`${id}-${props.reset}`}
          id={id}
          selected={world === id}
          overview={overview}
          active={active}
          paused={paused}
          interaction={props.interaction}
          onSelect={props.onSelect}
        />
      ))}
      {overview && (
        <Line
          points={orbit}
          color="#9ebbd7"
          lineWidth={0.6}
          transparent
          opacity={0.23}
        />
      )}
      <CameraRig {...props} />
    </>
  );
}

export default function SceneCanvas(props: SceneProps) {
  const { active, paused, world, onFailure, invalidateRef } = props;
  return (
    <Canvas
      camera={{
        position: [worlds[world].position[0], 0.35, 6.5],
        fov: 36,
        near: 0.1,
        far: 150,
      }}
      dpr={[1, 1.5]}
      frameloop={active && !paused ? "always" : "demand"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={null}
      onCreated={({ gl, invalidate }) => {
        invalidateRef.current = invalidate;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ContextLifecycle onFailure={onFailure} />
      <Suspense fallback={null}>
        <SceneContents {...props} />
      </Suspense>
    </Canvas>
  );
}
