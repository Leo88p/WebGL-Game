function preload() {
    window.resources.Models = Object.values(import.meta.glob('@models/*.obj', { eager: true, query: '?raw', import: 'default'}))
    const textures = Object.values(import.meta.glob('@textures/*.jpg', { eager: true, query: '?url', import: 'default'}))
    textures.forEach(t => {
        const image = new Image()
        window.resources.Textures.push(image)
        image.src = t;
    })
}
export {preload}