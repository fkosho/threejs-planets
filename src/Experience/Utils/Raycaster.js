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
        if(Object.keys(this.experience.world.planets).length > 0)
        {
            this.instance.setFromCamera(this.mouse, this.camera.instance)

            // set target objects
            let target = []
            for(let key in this.experience.world.planets)
            {
                target.push(this.experience.world.planets[key].mesh)
            }

            this.intersects = this.instance.intersectObjects(target)
            this.trigger('mouseover')
            console.log(this.intersects)
        }
    }

    clickPlanet()
    {
        // in progress
        console.log('clicked planet!!')
    }
}