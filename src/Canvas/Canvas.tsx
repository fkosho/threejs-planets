import { memo, useEffect, useRef } from "react"

export const Canvas = memo(() => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        // const context = canvas.getContext('2d')

        
    })

    return (
        <canvas className="webgl" ref={canvasRef}></canvas>
    )
})