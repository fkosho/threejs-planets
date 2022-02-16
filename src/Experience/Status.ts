import * as THREE from 'three'
import Experience from './Experience'
import EventEmitter from './Utils/EventEmitter'

export default class Status extends EventEmitter
{
    experience: Experience
    scene: THREE.Scece
    focus: boolean
    focusTarget: THREE.Mesh
    select: boolean
    selectTarget: THREE.Mesh
    sceneReady: boolean

    constructor()
    {
        super()

        // Setup
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Focus 
        this.focus = false // whether the camera is focusing on a planet or not.
        this.focusTarget = null

        // Select
        this.select = false // whether mouse exists on some object or not
        this.selectTarget = null

        // Ready
        this.sceneReady = false
    }
}
