import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from "./Experience"
import Sizes from './Utils/Sizes'
import Status from './Status'

export default class Camera
{
    experience: Experience
    canvas: HTMLElement
    sizes: Sizes
    scene: THREE.Scece
    status: Status

    target: THREE.Mesh
    defaultPosition: THREE.Vector3
    currentLookAtPosition: THREE.Vector3
    movedCameraPosition: THREE.Vector3

    instance: THREE.PerspectiveCamera
    controls: OrbitControls

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

    updateFocus()
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

    changeFocus()
    {
        const intersects = this.experience.raycaster.intersects

        if(intersects.length)
        {
            // clicked invisible mesh during focusing other mesh
            if(this.experience.raycaster.intersects[0].object.visible === false)
            {
                return
            }
            this.status.focusTarget = this.experience.raycaster.intersects[0].object
            this.status.focus = true
            
            // disable to click other meshes
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child != this.status.focusTarget)
                {
                    child.visible = false
                }
            })

            console.log('nomal')
        }
        else
        {
            this.status.focusTarget = null
            this.status.focus = false

            // enable to click meshes
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child != this.status.focusTarget)
                {
                    child.visible = true
                }
            })
        }
    }
}