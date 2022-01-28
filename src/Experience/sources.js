export default [
    /**
     * Environment
     */
    {
        name: 'sampleEnvironmentMapTexture',
        type: 'cubeTexture',
        path: 
        [
            'textures/environmentMaps/rathaus_night/px.png',
            'textures/environmentMaps/rathaus_night/nx.png',
            'textures/environmentMaps/rathaus_night/py.png',
            'textures/environmentMaps/rathaus_night/ny.png',
            'textures/environmentMaps/rathaus_night/pz.png',
            'textures/environmentMaps/rathaus_night/nz.png',
        ]
    },

    /**
     * Objects
     */
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'textures/dirt/color.jpg'
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'textures/dirt/normal.jpg'
    },
    {
        name: 'foxModel',
        type: 'gltfModel',
        path: 'models/Fox/glTF/Fox.gltf'
    }
]