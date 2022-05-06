import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { Canvas } from './Canvas/Canvas'

export default function App() {
    // Sizes
    const sizes = {
        width: 800,
        height: 600
    }

    // Scene
    const scene = new THREE.Scene()

    // Object 
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
    scene.add(cubeMesh)

    // Light
    const spotLight = new THREE.SpotLight(0x000000, 1, 10)
    scene.add(spotLight)

    // Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
    camera.position.z = 5
    scene.add(camera)

    // Renderer 
    useEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        })
        renderer.setSize(sizes.width, sizes.height)

        const tick = ()=> { 
            renderer.render(scene, camera)
            window.requestAnimationFrame(tick)
            cubeMesh.rotation.x += 0.005
            cubeMesh.rotation.y += 0.01
        }
        tick()
    })

    return (
        <canvas id='canvas'></canvas>
    )
}