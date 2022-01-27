export default [
    {
        name: 'sampleEnvironmentMapTexture',
        type: 'cubeTexture',
        path: 
        [
            'textures/environmentMaps/environmentMap/px.jpg',
            'textures/environmentMaps/environmentMap/nx.jpg',
            'textures/environmentMaps/environmentMap/py.jpg',
            'textures/environmentMaps/environmentMap/ny.jpg',
            'textures/environmentMaps/environmentMap/pz.jpg',
            'textures/environmentMaps/environmentMap/nz.jpg',
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