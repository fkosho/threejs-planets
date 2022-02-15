import * as THREE from 'three'
import Experience from '../Experience'
import Environment from './Environment'
import Resources from '../Utils/Resources'
import Star from './Stars/Star'
import Sun from './Stars/Sun'
import Earth from './Planets/Earth'
import Venus from './Planets/Venus'
import Points from './Effects/Points'
import Planet from './Planets/Planet'

export default class World
{
    // Set up
    experience: Experience;
    resources: Resources;
    environment: Environment;
    scene: THREE.Scece;

    // Objects
    stars: Array<Star>;
    planets: Array<Planet>;

    // UI
    points: Points;

    // Effects

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.stars = new Array()
            this.planets = new Array() // Is this legal grammar?

            this.stars.push(new Sun())
            this.planets.push(new Earth())
            this.planets.push(new Venus())
            this.environment = new Environment()
            
            this.experience.status.sceneReady = true
            this.points = new Points()
        })
    }

    update()
    {
        for(const planet of this.planets) {
            planet.revolve()
        }
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
