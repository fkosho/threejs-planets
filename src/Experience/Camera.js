import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from "./Experience";

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.status = this.experience.status

        // Parameters
        this.defaultPosition = new THREE.Vector3(18, 12, 24)

        this.setInstance()
        // this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(18, 12, 24)
        this.currentLookAtPosition = new THREE.Vector3(0, 0, 0)
        this.instance.lookAt(this.currentLookAtPosition)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    /**
     * Pattern 1: don't use Status Class
     */
    updateFocus()
    {
        // when click a planet object
        if(this.target && this.target !== 'empty')
        {
            // move camera position
            this.movedCameraPosition = new THREE.Vector3()
            const distanceBetweenTargetAndCamera = new THREE.Vector3(10, 0, 0)

            this.movedCameraPosition.addVectors(this.target.position, distanceBetweenTargetAndCamera)

            this.instance.position.lerp(this.movedCameraPosition, 0.05)

            // move focused position
            this.currentLookAtPosition.lerp(this.target.position, 0.5)
            this.instance.lookAt(this.currentLookAtPosition)
            
        }
        // when click empty space
        else if(this.target && this.target == 'empty')
        {
            // move camera position
            this.instance.position.lerp(this.defaultPosition, 0.03)

            // move focused position
            const lookAtPosition = new THREE.Vector3(0, 0, 0)
            this.instance.lookAt(this.currentLookAtPosition.lerp(lookAtPosition, 0.5))
        }
    }

    changeFocus()
    {
        if(this.experience.raycaster.intersects.length)
        {
            this.target = this.experience.raycaster.intersects[0].object
        }
        else
        {
            this.target = 'empty'
        }
    }

    /**
     * Pattern 2: use Status Class
     */
    updateFocus2()
    {
        // when click a planet object
        if(this.status.focusTarget !== null && this.status.focusTarget !== null)
        {
            // move camera position
            this.movedCameraPosition = new THREE.Vector3()
            const distanceBetweenTargetAndCamera = new THREE.Vector3(10, 0, 0)

            this.movedCameraPosition.addVectors(this.status.focusTarget.position, distanceBetweenTargetAndCamera)

            this.instance.position.lerp(this.movedCameraPosition, 0.05)

            // move focused position
            this.currentLookAtPosition.lerp(this.status.focusTarget.position, 0.5)
            this.instance.lookAt(this.currentLookAtPosition)
            
        }
        // when click empty space
        else if(this.status.focus == false)
        {
            // move camera position
            this.instance.position.lerp(this.defaultPosition, 0.03)

            // move focused position
            const lookAtPosition = new THREE.Vector3(0, 0, 0)
            this.instance.lookAt(this.currentLookAtPosition.lerp(lookAtPosition, 0.5))
        }
    }

    changeFocus2()
    {
        if(this.experience.raycaster.intersects.length)
        {
            this.status.focusTarget = this.experience.raycaster.intersects[0].object
            this.status.focus = true
        }
        else
        {
            this.status.focusTarget = null
            this.status.focus = false
        }
    }
}