import Planet from './Planet'

export default class Earth extends Planet
{
    constructor(radius = 1, widthSegments = 32, heightSegments = 32, color = 0x002266, metalness = 0.3, roughness = 0.1, opacity = 0.8, transparent = true)
    {
        super(radius, widthSegments, heightSegments, color, metalness, roughness, opacity, transparent)
        
        // Set parameters
        this.name = 'Earth'
        this.revolveRadius = 8
        this.revolveSpeed = 0.0003

        this.mesh.name = this.name
    }
}