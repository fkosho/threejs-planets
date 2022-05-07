import * as THREE from 'three'
import { memo, useEffect } from "react"
import { World } from '../Experience/World'

export const Canvas = memo(() => {
    // Sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    }

    // Scene
    const scene = new THREE.Scene()

    /**
     * Objects
     */
    // sample box
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
    scene.add(cubeMesh)

    // create world
    World(scene)
    

    // Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(3, 3, 3)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)

    scene.add(directionalLight, ambientLight)

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
        <canvas 
            id='canvas' 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                outline: 'none' 
            }} 
        />
    )
})