import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Earth from './Planets/Earth.js'
import Planet from './Planets/Planet.js'
import Venus from './Planets/Venus.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Set planet object
        this.planets = {}

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            // this.floor = new Floor()
            // this.fox = new Fox()
            // this.earth = new Earth(1, 36, 36, 0x002266, 0.3, 0.1, 0.8, true)
            this.planets.earth = new Earth()
            this.planets.venus = new Venus()
            this.environment = new Environment()            
        })
    }

    update()
    {
        if(this.planets.earth)
        {
            this.planets.earth.revolve()
        }
        if(this.planets.venus)
        {
            this.planets.venus.revolve()
        }
    }

    mouseOver()
    { 
        // add effect
        this.selected = this.experience.raycaster.intersects[0].object
        
    }
}
