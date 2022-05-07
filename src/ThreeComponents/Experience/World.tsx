import { VFC } from "react"
import { Planet } from "./Planets"

type Props = {
    scene: THREE.Scene,
    px?: number,
    py?: number,
    pz?: number,
}


export const World = (scene: THREE.Scene) => {
    console.log('aaa')

    const props: Props = {
        scene: scene,
        px: 1.4,
        py: 0.001
    }

    const props2: Props = {
        scene: scene,
        px: -1.4,
        py: -0.001
    }



    Planet(props)
    Planet(props2)
}