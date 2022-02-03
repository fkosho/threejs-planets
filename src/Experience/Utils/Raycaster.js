import * as THREE from 'three'
import EventEmitter from './EventEmitter'
import Experience from '../Experience'

export default class Raycaster extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.mouse = new THREE.Vector2()
        this.camera = this.experience.camera

        this.intersected

        this.setInstance()

        /**
         * Mouse events
         */
        // Mouse move
        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        })

        // click a planet
        window.addEventListener('click', () =>
        {
            this.trigger('click')
        })
    }

    setInstance()
    {
        this.instance = new THREE.Raycaster()
    }

    raycast()
    {
        // this works properly but the performance is bad. it's necessary to modify.
        
        // set ray
        this.instance.setFromCamera(this.mouse, this.camera.instance)

        // set target objects
        this.target = []
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                this.target.push(child)
            }
        })
        
        this.intersects = this.instance.intersectObjects(this.target)

        // Intersect events
        if(this.intersects.length)
        {
            this.intersected = this.intersects[0].object
            this.trigger('mouseover')
        }
        else
        {
            this.trigger('mouseoff')
            this.intersected = null
        }
    }
}