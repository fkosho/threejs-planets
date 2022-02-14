import * as THREE from 'three'
import { SphereGeometry } from 'three'
import Experience from '../../Experience'
import Time from '../../Utils/Time'

export default class Star
{
    experience: Experience
    scene: THREE.Scece
    time: Time
    geometry: THREE.BufferGeometry
    material: THREE.Material
    mesh: THREE.Mesh

    // Parameters
    name: string

    constructor(radius: number, widthSegments: number, heightSegments: number, color: number, metalness: number, roughness: number, opacity: number, transparent: boolean)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        // Setup
        this.setGeometry(radius, widthSegments, heightSegments)
        this.setMaterial(color, metalness, roughness, opacity, transparent)
        this.setMesh()
    }

    setGeometry(radius: number, widthSegments: number, heightSegments: number)
    {
        this.geometry = new SphereGeometry(radius, widthSegments, heightSegments)
    }

    setMaterial(color: THREE.Color, metalness: number, roughness: number, opacity: number, transparent: boolean)
    {
        this.material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: metalness,
            roughness: roughness,
            opacity: opacity,
            transparent: transparent
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
}