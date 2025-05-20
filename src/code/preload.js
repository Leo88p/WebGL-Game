async function preload() {
    const models = import.meta.glob('@models/*.obj', { eager: true, query: '?raw', import: 'default'})
    for (const [key, value] of Object.entries(models)) {
        const reduced = key.match(/[^\/]+(?=\.obj)/g)[0]
        window.resources.Models[reduced] = value
    }
    /*Object.keys(models).forEach(model=>
        console.log(model.match(/[^\/]+(?=\.obj)/g)))
    window.resources.Models = Object.values(models)*/
    const textures = import.meta.glob('@textures/*.(jpg|png)', { eager: true, query: '?url', import: 'default'})
    for (const [key, value] of Object.entries(textures)) {
        const image = new Image()
        const reduced = key.match(/[^\/]+(?=\.(jpg|png))/g)[0]
        window.resources.Textures[reduced] = image
        image.src = value;
        await image.decode()
    }
}
export {preload}