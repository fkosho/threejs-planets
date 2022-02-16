import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Experience from '../Experience'
import EventEmitter from './EventEmitter'
import { gsap } from 'gsap'
import OverlayBoard from '../Effects/OverlayBoard'

export default class Resources extends EventEmitter
{
    experience: Experience
    scene: THREE.Scece
    loadingEffect: OverlayBoard
    loadingBarElement: HTMLElement
    sources: [{
        name: string,
        type: string,
        path: Array<string>
    }]
    items: {}
    toLoad: number
    loaded: number
    loaders: {
        gltfLoader: GLTFLoader,
        textureLoader: THREE.TextureLoader,
        cubeTextureLoader: THREE.CubeTextureLoader
    }
    loadingManager: THREE.LoadingManager
    progressRatio: number

    constructor(sources)
    {
        super()

        // Options
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.loadingEffect = this.experience.loadingEffect
        this.loadingBarElement = document.querySelector('.loading-bar')
        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoadingManager()
        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {
            gltfLoader: GLTFLoader,
            textureLoader: THREE.TextureLoader,
            cubeTextureLoader: THREE.CubeTextureLoader
        }
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager)
    }

    setLoadingManager()
    {
        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () =>
            {
                // Wait a little
                window.setTimeout(() =>
                {
                    // Animate overlay
                    gsap.to(
                        this.loadingEffect.material.uniforms.uAlpha, 
                        { 
                            duration: 3, 
                            value: 0,
                            delay: 1
                        }
                    )

                    // Update loadingBarElement
                    this.loadingBarElement.classList.add('ended')
                    this.loadingBarElement.style.transform = ''
                }, 2000)
            },
            // Progress
            (itemUrl, itemsLoaded, itemsTotal) =>
            {
                // Calculate the progress and update the loadingBarElement
                this.progressRatio = itemsLoaded / itemsTotal
                this.loadingBarElement.style.transform = `scaleX(${this.progressRatio})`
            }
        )
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}