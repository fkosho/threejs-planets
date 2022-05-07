import * as THREE from 'three'

type Props = {
    scene: THREE.Scene,
    px?: number,
    py?: number,
    pz?: number,
}

export const Planet = (props: Props) => {
    const { scene, px, py, pz } = props
    console.log(`position x:${px}`)

    const planetMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0x435687 })
    )
    planetMesh.position.x = px ? px : 1.0
    planetMesh.position.y = py ? py : 1.0
    planetMesh.position.z = pz ? pz : 0

    scene.add(planetMesh)
}