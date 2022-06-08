import React, { useEffect } from "react"
import { DescriptionModal } from "./components/molecules/DescriptionModal"
import Experience from "./Experience/Experience"
import { useMoveCube } from "./hooks/use3dActions/useMoveCube"
import { useChangeColor } from "./hooks/useReactActions/useChangeColor"

export const App: React.FC = () => {

    useEffect(() => {
        const experience = new Experience({
            targetElement: document.getElementById("canvas")
        })
    }, [])

    return (
        <>
            <div style={{ width: "1000px", height: "600px"}}>
                <div
                    id={"canvas"}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        zIndex: "1"
                    }}
                ></div>
                <div
                    id='sample'
                    onClick={() => useMoveCube()}
                    style={{
                        position: "absolute",
                        color: 'white',
                        backgroundColor: '#345678',
                        width: '120px',
                        height: '100px',
                        borderRadius: '30px',
                        zIndex: "2"
                    }}
                >
                </div>
                <div
                    id='color'
                    onClick={(e) => useChangeColor(e)}
                    style={{
                        position: "absolute",
                        color: 'white',
                        backgroundColor: '#838ea5',
                        width: '120px',
                        height: '100px',
                        borderRadius: '30px',
                        zIndex: "2",
                        bottom:0
                    }}
                >
                </div>
                <DescriptionModal />
            </div>
            </>
    )
}