import { DescriptionModalWindow } from './components/atoms/modalWindow/DescriptionModalWindow'
import { Canvas } from './ThreeComponents/Canvas/Canvas'

export default function App() {
    const onClickCube = () => {
        console.log('clicked')
    }
    
    return (
        <>
            <Canvas />
            <DescriptionModalWindow onClick={onClickCube} />
        </>
    )
}