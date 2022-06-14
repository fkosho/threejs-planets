import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const SampleFirst: React.FC = () => {
  // ! でnull を許容しない。
  const mountRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    // サイズ
    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };
    // レンダラを作成
    const renderer = new THREE.WebGLRenderer();

    //useRefで取得
    const elm = mountRef.current;
    console.log(elm);

    elm.appendChild(renderer.domElement);
    console.log(renderer.domElement);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sizes.width, sizes.height);

    // シーンを作成
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x3d85c6);

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(
      45,
      sizes.width / sizes.height,
      
    );
    camera.position.set(0, 0, +1000);

    const geometry = new THREE.SphereGeometry(300, 30, 30);
    const material = new THREE.MeshStandardMaterial({color: '#FF653E'});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ライト
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);

    scene.add(directionalLight);
    // アニメーション
    const tick = () => {
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    };

    tick();

    // ブラウザのリサイズ処理
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    });

    return () => {
      //remove するべきかはわからない。
      elm.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div ref={mountRef} />
    </>
  );
};
