import * as THREE from 'three'
import Experience from "../../Experience";

export default class Points
{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes
        this.status = this.experience.status

        // Setup
        this.setPoints()
    }

    setPoints()
    {
        if(this.status.ready)
        {
            this.points = [
                {
                    position: this.experience.world.stars.sun.mesh.position,
                    element: document.querySelector('.sun')
                },
                {
                    position: this.experience.world.planets.earth.mesh.position,
                    element: document.querySelector('.earth')
                },
                {
                    position: this.experience.world.planets.venus.mesh.position,
                    element: document.querySelector('.venus')
                }
            ]                
        }
    }

    updateScreenPosition() // todo: change name
    {
        for(const point of this.points)
        {
            const screenPosition = point.position.clone()
            screenPosition.project(this.camera.instance)

            const translateX = screenPosition.x * this.sizes.width * 0.5
            const translateY = - screenPosition.y * this.sizes.height * 0.5

            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }
}