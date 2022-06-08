import { useState } from "react"
import { useDisplayModal } from "../../hooks/useReactActions/useDisplayModal"



export const DescriptionModal = () => {
    const [ text, setText ] = useState('')

    return (
        <div style={{
            borderRadius: '20px',
            height: '600px',
            width: '100px',
            backgroundColor: '#783423',
            color: '#ffffff'
        }}>
            {text}
        </div>
    )
}