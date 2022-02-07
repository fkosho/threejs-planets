import Experience from '../Experience.js'
import Environment from './Environment.js'
import Sun from './Stars/Sun.js'
import Earth from './Planets/Earth.js'
import Venus from './Planets/Venus.js'
import Points from './Effects/Points.js'

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
            
            this.experience.status.ready = true
            this.points = new Points()
        })
    }

    update()
    {
        this.planets.earth.revolve()
        this.planets.venus.revolve()
        this.points.updateScreenPosition()
    }

    select()
    {
        // only glows in overall view 
        if(this.experience.status.focus == false)
        {
            this.experience.raycaster.intersected.material.emissive.setHex(0x070707)
        }
    }

    unselect()
    {
        if(this.experience.raycaster.intersected)
        {
            this.experience.raycaster.intersected.material.emissive.setHex(0x000000)
        }
    }
}
