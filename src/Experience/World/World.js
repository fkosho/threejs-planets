import * as THREE from 'three'
import { Mesh } from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Earth from './Planets/Earth.js'
import Venus from './Planets/Venus.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            // this.floor = new Floor()
            // this.fox = new Fox()
            // this.earth = new Earth(1, 36, 36, 0x002266, 0.3, 0.1, 0.8, true)
            this.earth = new Earth()
            this.venus = new Venus()
            this.environment = new Environment()            
        })

        // Mouse over event
        // this.mouse
    }

    update()
    {
        if(this.earth)
        {
            this.earth.revolve()
            this.venus.revolve()
        }
    }
}
