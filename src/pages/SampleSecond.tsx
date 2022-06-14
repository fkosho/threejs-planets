import React, { useEffect, useRef } from "react";
import * as THREE from "three";
export const SampleSecond: React.FC = () => {
  // refをコンソール用にしか実装していない。
  const refObject = useRef<HTMLCanvasElement>(null);
  const createBox = () => {
    // サイズ
    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };

    // レンダラを作成
    const renderer: any = new THREE.WebGLRenderer({
      canvas: document.querySelector("#sample2") as HTMLCanvasElement,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sizes.width, sizes.height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
    camera.position.set(0, 0, +1000);

    // 箱を作成
    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    tick();

    // 毎フレーム時に実行されるループイベント
    function tick() {
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
      // レンダリング
      requestAnimationFrame(tick);
    }

    // ブラウザのリサイズ処理
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  };
  // didMountで描画しないと、Cannot read property 'width' of nullというエラーが出る
  useEffect(() => {
    createBox();
    console.log(refObject.current);
    console.log(refObject);
  }, []);

  return (
    <>
      <canvas id="sample2" ref={refObject} />
    </>
  );
};
