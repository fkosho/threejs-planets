import './style.css'
import { StrictMode } from 'react'
import ReactDom from 'react-dom'

import Experience from './Experience/Experience.js'
import { App } from './App'


// const experience = new Experience({
//     targetElement: document.querySelector('.experience')
// })

const rootElement = document.getElementById('reactRoot')

ReactDom.render(
    <StrictMode>
        <App />
    </StrictMode>,
    rootElement
)