import * as THREE from 'three'
import { useEffect } from 'react'

export const SampleThird:React.FC  = () => {
    useEffect(() => {
        // サイズ
        const sizes = {
          width: innerWidth,
          height: innerHeight
        }

        // canvasを取得
        const canvas = document.getElementById('canvas')

        // レンダラー
        const renderer = new THREE.WebGLRenderer({
          canvas: canvas || undefined,
          antialias: true,
          alpha: true
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(window.devicePixelRatio)
    
        // シーン
        const scene = new THREE.Scene()
    
        // カメラ
        const camera = new THREE.PerspectiveCamera(
          45,
          sizes.width / sizes.height,
        )
    
        // ボックスジオメトリー
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
        const boxMaterial = new THREE.MeshLambertMaterial({
          color: '#2497f0'
        })
        const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
        mesh.position.z = -5
        mesh.rotation.set(10, 10, 10)
        scene.add(mesh)
    
        // ライト
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
        scene.add(ambientLight)
        const pointLight = new THREE.PointLight(0xffffff, 0.2)
        pointLight.position.set(1, 2, 3)
        scene.add(pointLight)
    
        // アニメーション
        const clock = new THREE.Clock()
        const tick = () => {
          const elapsedTime = clock.getElapsedTime()
          mesh.rotation.x = elapsedTime
          mesh.rotation.y = elapsedTime
          window.requestAnimationFrame(tick)
          renderer.render(scene, camera)
        }
        tick()
    
        // ブラウザのリサイズ処理
        window.addEventListener('resize', () => {
          sizes.width = window.innerWidth
          sizes.height = window.innerHeight
          camera.aspect = sizes.width / sizes.height
          camera.updateProjectionMatrix()
          renderer.setSize(sizes.width, sizes.height)
          renderer.setPixelRatio(window.devicePixelRatio)
        })
      }, [])
      return (
        <>
          <canvas id="canvas"></canvas>
        </>
      )
}
