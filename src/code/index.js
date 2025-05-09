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
  document.addEventListener('keydown', (e) => {
    const position = window.model.playerPosition
    switch (e.code) {
      case 'KeyW':
        position.y++;
        break;
      case 'KeyS':
        position.y--;
        break;
      case 'KeyA':
        position.x++;
        break;
      case 'KeyD':
        position.x--;
        break;
      case 'KeyQ':
        window.model.playerRotation+=0.1;
        break;
      case 'KeyE':
        window.model.playerRotation-=0.1;
        break;
    }
  })
  preload()
  main()
}

