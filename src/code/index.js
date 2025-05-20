import Resources from './resources'
import Model from './model'
import {preload} from './preload'
import {main} from './main.js'
const canvas = document.querySelector("#glcanvas");
window.gl = canvas.getContext("webgl2");
if (window.gl === null) {
  alert(
    "Unable to initialize WebGL. Your browser or machine may not support it."
  );
}
else {
  window.resources = new Resources();
  window.model = new Model()
  window.pressed = {
    'KeyW': false,
    'KeyS': false,
    'KeyA': false,
    'KeyD': false
  }
  document.addEventListener('keydown', (e) => {
    window.pressed[e.code] = true
  })
  document.addEventListener('keyup', (e) => {
    window.pressed[e.code] = false
  })
  await preload()
  main()
}

