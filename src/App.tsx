import { useEffect } from "react"
import { DescriptionModal } from "./components/molecules/DescriptionModal"
import { useMoveCube } from "./hooks/use3dActions/useMoveCube"

export default function App() {

    return (
        <>
            <div
                id='sample'
                onClick={() => useMoveCube()}
                style={{
                    color: 'white',
                    backgroundColor: '#345678',
                    width: '100px',
                    height: '50px',
                    borderRadius: '30px'

                }}
            >

            </div>
            <DescriptionModal />
        </>
    )
}