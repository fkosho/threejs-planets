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
            // console.log(this.mouse.x, this.mouse.y)
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
        if(this.experience.world.venus != null)
        {
            // console.log(this.experience.world.venus)

            this.instance.setFromCamera(this.mouse, this.camera.instance)
            this.intersects = this.instance.intersectObject(this.experience.world.venus.mesh)
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