import Star from './Star'

export default class Sun extends Star
{
    constructor(radius = 2, widthSegments = 32, heightSegments = 32, color = 0xff1d01, metalness = 0.3, roughness = 0.1, opacity = 0.8, transparent = true)
    {
        super(radius, widthSegments, heightSegments, color, metalness, roughness, opacity, transparent)

        this.name = "Sun"
    }
}