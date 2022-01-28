import * as THREE from 'three'
import { SphereGeometry } from 'three'
import Experience from '../../Experience'

export default class Planet
{
    /**
     * @param {number} radius planet radius.
     * @param {number} widthSegments number of horizontal segments.
     * @param {number} heightSegments number of vertical segments.
     * @param {number} color color of planet surface.
     * @param {number} metalness 
     * @param {number} roughness 
     * @param {number} opacity 
     * @param {boolean} transparent 
     */
    constructor(radius, widthSegments, heightSegments, color, metalness, roughness, opacity, transparent)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        // Setup
        this.setGeometry(radius, widthSegments, heightSegments)
        this.setMaterial(color, metalness, roughness, opacity, transparent)
        this.setMesh()

        // Parameters
        this.revolveRadius = 0
        this.revolveSpeed = 0
    }

    setGeometry(radius, widthSegments, heightSegments)
    {
        this.geometry = new SphereGeometry(radius, widthSegments, heightSegments)
    }

    setMaterial(color, metalness, roughness, opacity, transparent)
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

    revolve()
    {
        this.mesh.position.x = Math.cos(this.time.elapsed * this.revolveSpeed) * this.revolveRadius
        this.mesh.position.z = - Math.sin(this.time.elapsed * this.revolveSpeed) * this.revolveRadius
    }
}