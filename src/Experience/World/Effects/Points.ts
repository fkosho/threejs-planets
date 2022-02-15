import Camera from '../../Camera';
import Experience from "../../Experience";
import Status from '../../Status';
import Sizes from '../../Utils/Sizes';
import Point from './Point';

export default class Points
{
    experience: Experience;
    camera: Camera;
    sizes: Sizes;
    status: Status;

    points: Array<Point>;

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
        if(this.status.sceneReady)
        {
            this.points = new Array()

            // Stars
            for(const star of this.experience.world.stars)
            {
                const name = star.name.toLowerCase()
                const newPoint = new Point(star.mesh.position, name)
                this.points.push(newPoint)
            }

            // Planets
            for(const planet of this.experience.world.planets)
            {
                const name = planet.name.toLowerCase()
                const newPoint = new Point(planet.mesh.position, name)
                this.points.push(newPoint)
            }
        }
    }

    updateScreenPosition()
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

