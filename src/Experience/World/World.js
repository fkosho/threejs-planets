import Experience from '../Experience.js'
import Environment from './Environment.js'
import Sun from './Stars/Sun.js'
import Earth from './Planets/Earth.js'
import Venus from './Planets/Venus.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Set planet object
        this.stars = {}
        this.planets = {}

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.stars.sun = new Sun()
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
