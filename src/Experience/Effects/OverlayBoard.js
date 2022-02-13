import * as THREE from 'three'
import Experience from '../Experience'
import loadingVertexShader from '../../shaders/effects/loading/vertex.glsl'
import loadingFragmentShader from '../../shaders/effects/loading/fragment.glsl'

export default class OverlayBoard
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            uniforms:
            {
                uAlpha: { value: 1 }
            },
            vertexShader: loadingVertexShader,
            fragmentShader: loadingFragmentShader
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)

        /**
         * Setting to prevent other meshes from becoming transparent.
         * If remove according code, meshes in lower-half screen will disappear when resources have loaded.
         */
        this.mesh.position.set(10, 10, 0) 
    }0
}