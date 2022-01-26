import * as THREE from 'three'
import { Camera } from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'

let instance = null

export default class Experience
{
    constructor(canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()

        // Resize event
        this.sizes.on('resize', () =>
        {
            console.log('A resize occured')
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    update()
    {
        
    }
}