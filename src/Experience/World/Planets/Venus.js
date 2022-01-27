import Planet from './Planet.js'

export default class Earth extends Planet
{
    constructor(radius = 0.6, widthSegments = 32, heightSegments = 32, color = 0xdd2222, metalness = 0.3, roughness = 0.1, opacity = 0.9, transparent = true)
    {
        super(radius, widthSegments, heightSegments, color, metalness, roughness, opacity, transparent)

        this.mesh.position.set(- 1, 1, 1)
    }
}