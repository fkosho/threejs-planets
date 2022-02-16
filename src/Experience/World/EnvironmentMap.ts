import * as THREE from 'three'

export default class EnvironmentMap
{
    intensity: number
    texture: THREE.Texture

    constructor(intensity: number, texture: THREE.Texture)
    {
        this.intensity = intensity
        this.texture = texture
        this.texture.encoding = THREE.sRGBEncoding
    }
}