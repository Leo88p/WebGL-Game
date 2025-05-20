import vsSource from './shaders/vertices.hlsl?raw'
import fsSource from './shaders/fragment.hlsl?raw'
import {initBuffers} from './init-buffers'
import initShaderProgram from './init-shader-program'
import programInfo from './program-info'
import {drawScene} from './draw-scene'
import modelData from './configs/scene1.json'
import loadTexture from './load-texture'
import gameObject from './gameObject';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
function main() {
    const gl = window.gl;
    const models = []
    const objLoader = new OBJLoader()
    let player;
    for (const value of Object.values(modelData)) {
      const model = window.resources.Models[value.model]
      const arr = objLoader.parse(model).children[0].geometry.attributes
      const data = {position: arr.position.array, normal: arr.normal.array, texcoord: arr.uv.array}
      models.push(new gameObject())
      const color = [1.0, 1.0, 1.0, 1.0];
      const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
      models[models.length-1].buffers = initBuffers(gl, data.position, color, data.texcoord, data.normal);
      models[models.length-1].info = programInfo(gl, shaderProgram);
      models[models.length-1].texture = loadTexture(gl, window.resources.Textures[value.texture], value.flip);
      models[models.length-1].length = data.position.length;
      models[models.length-1].position = value.position;
      models[models.length-1].lighting = value.lighting;
      models[models.length-1].player = value.player;
      models[models.length-1].floor = value.floor;
      const dict = ['x', 'y', 'z']
      for (let i = 0; i < data.position.length; i++) {
        if (data.position[i] > models[models.length-1].boundaries.top[dict[i%3]]) {
          models[models.length-1].boundaries.top[dict[i%3]] = data.position[i]
        }
        if (data.position[i] < models[models.length-1].boundaries.bottom[dict[i%3]]) {
          models[models.length-1].boundaries.bottom[dict[i%3]] = data.position[i]
        }
      }
      const points = []
      points.push({x: models[models.length-1].boundaries.top.x, y: models[models.length-1].boundaries.top.z})
      points.push({x: models[models.length-1].boundaries.top.x, y: models[models.length-1].boundaries.bottom.z})
      points.push({x: models[models.length-1].boundaries.bottom.x, y: models[models.length-1].boundaries.bottom.z})
      points.push({x: models[models.length-1].boundaries.bottom.x, y: models[models.length-1].boundaries.top.z})
      models[models.length-1].vertices = points
      if (value.player) {
        player = models[models.length-1]
      }
    }
    let then = 0;
    // Draw the scene repeatedly
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.clearColor(0.0, 0.7, 0.8, 1.0);
    gl.enable(gl.BLEND)
    function render(now) {
      let position = window.model.playerPosition
      const oldRotation = window.model.playerRotation;
      const vector = vec3.create()
      if (window.pressed['KeyW']) {
        vec3.add(vector, vector, [0,0,0.125])
      }
      if (window.pressed['KeyS']) {
        vec3.add(vector, vector, [0,0,-0.125])
      }
      if (window.pressed['KeyA']) {
        window.model.playerRotation -= 0.05;
      }
      if (window.pressed['KeyD']) {
        window.model.playerRotation += 0.05;
      }
      vec3.rotateY(vector, vector, [0,0,0], -window.model.playerRotation)
      position.x += vector[0]
      position.y += vector[2]
      player.x = -position.x
      player.y = -position.y
      player.rotation = -window.model.playerRotation
      let collition = false
      for (let m of models) {
        if (m==player || m.floor) {
          continue;
        }
        else if (m.intersects(player)) {
          collition = true
          break;
        }
      }
      if (collition) {
        position.x -= vector[0]
        position.y -= vector[2]
        player.position.x += vector[0]
        player.position.z += vector[2]
        window.model.playerRotation = oldRotation
      }
      const lighters = []
      models.forEach(m => {
        if (m.lighting) {
          lighters.push(m.lighting)
          lighters[lighters.length-1].position = []
          new Array('x','y','z').forEach(c => lighters[lighters.length-1].position.push(m.position[c] + (m.boundaries.top[c] + m.boundaries.bottom[c])/2))
        }
      })
      const deltaTime = now - then;
      then = now;
      gl.clear(gl.COLOR_BUFFER_BIT);
      models.forEach(m => {
        drawScene(gl, m.info, m.buffers, m.length, m.texture, m.position, m.rotation, lighters)
      })

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

export {main}