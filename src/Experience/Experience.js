import * as THREE from 'three'
import World from './World/World'
import Camera from './Camera'
import Renderer from './Renderer'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Resources from './Utils/Resources'
import Debug from './Utils/Debug'
import Raycaster from './Utils/Raycaster'
import sources from './sources'
import Status from './Status'
import Stats from 'stats.js'
import OverlayBoard from './Effects/OverlayBoard'


// Monitor FPS
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

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
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.loadingEffect = new OverlayBoard()
        this.resources = new Resources(sources)
        this.status = new Status()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.raycaster = new Raycaster()

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Mouseover event
        this.raycaster.on('mouseover', () =>
        {
            this.mouseOver()
        })

        // MouseOff event
        this.raycaster.on('mouseoff', () =>
        {
            this.mouseOff()
        })

        // Click event
        this.raycaster.on('click', () =>
        {
            this.click()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            stats.begin()
            if(this.status.sceneReady)
            {
                this.update()
            }
            stats.end()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    mouseOver()
    {
        this.world.select()
    }

    mouseOff()
    {
        this.world.unselect()
    }

    click()
    {
        /**
         * focus on clicked planet
         */
        // change focus target and gradually move camera per frame
        // this.camera.changeFocus()
        this.camera.changeFocus()
        // gradually reduce world's time speed to 0 per frame

        // show planet's introduction text
    }

    update()
    {
        // this.camera.updateFocus()
        this.camera.updateFocus()
        this.world.update()
        this.renderer.update()
        this.raycaster.raycast()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) => 
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        // this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
        {
            this.debug.ui.destroy
        }
    }
}