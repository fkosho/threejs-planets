import * as THREE from 'three'

export default class Point
{
    position: THREE.Vector3;
    element: HTMLElement;

    constructor(position: THREE.Vector3, name: string)
    {
        this.position = position;
        this.element = document.querySelector<HTMLElement>(`.${name}`);
    }
}