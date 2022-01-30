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
            this.clickPlanet()
        })
    }

    setInstance()
    {
        this.instance = new THREE.Raycaster()
    }

    raycast()
    {
        // this works but the performance is too bad. it's necessary to modify.
        
        // set ray
        this.instance.setFromCamera(this.mouse, this.camera.instance)

        // set target objects
        let target = []
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                target.push(child)
            }
        })
        
        this.intersects = this.instance.intersectObjects(target)
        this.trigger('mouseover')
        console.log(this.intersects)
    }

    clickPlanet()
    {
        // in progress
        console.log('clicked planet!!')
    }
}