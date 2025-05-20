class coordinates {
    constructor(value) {
        this.x = value;
        this.y = value;
        this.z = value;
    }
}
export default class gameObject {
    constructor() {
      this.buffers = undefined;
      this.info = undefined;
      this.texture = undefined;
      this.length = undefined;
      this.position = undefined;
      this.boundaries = {
        top: new coordinates(-Infinity),
        bottom: new coordinates(Infinity)
      }
      this.lighting = undefined;
      this.Rotation = 0;
      this.Vertices = []
    }
    get x() {
      return this.position.x
    }
    set x(value) {
      this.position.x = value
    }
    get y() {
      return this.position.z
    }
    set y(value) {
      this.position.z = value
    }
    get rotation() {
      return this.Rotation
    }
    set rotation(value) {
      this.Rotation = value
    }
    get vertices() {
    const result = []
      for (let v of this.Vertices) {
        const vec = vec3.create()
        vec3.add(vec,vec,[v.x, 0, v.y])
        vec3.rotateY(vec,vec, [0,0,0], this.Rotation)
        result.push({x: vec[0], y: vec[2]})
      } 
      return result
      return this.Vertices
    }
    set vertices(value) {
      this.Vertices = value
    }
    lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
      const uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
      const uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
      if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
          return true;
      }
      return false;
    }
    polygonPoint(px, py) {
        let collision = false
        this.vertices.forEach((vc, index)=> {
            let vn
            if (index==this.vertices.length-1) {
                vn = this.vertices[0]
            }
            else {
                vn = this.vertices[index+1]
            }
            if (((vc.y + this.y >= py && vn.y + this.y < py) || (vc.y + this.y < py && vn.y + this.y >= py)) &&
                (px < (vn.x-vc.x)*(py-vc.y - this.y) / (vn.y-vc.y)+vc.x + this.x))
                collision = !collision
        })
        return collision
    }
    intersects(fig) {
        let flag = false
        this.vertices.forEach((vc, index)=>{
            let vn
            if (index==this.vertices.length-1) {
                vn = this.vertices[0]
            }
            else {
                vn = this.vertices[index+1]
            }
            fig.vertices.forEach((vc2, index2)=>{
                let vn2
                if (index2==fig.vertices.length-1) {
                    vn2 = fig.vertices[0]
                }
                else {
                    vn2 = fig.vertices[index2+1]
                }
                if (this.lineLine(vc.x + this.x,vc.y + this.y,vn.x + this.x,vn.y + this.y,
                    vc2.x + fig.x, vc2.y + fig.y,vn2.x + fig.x, vn2.y + fig.y)) {
                        flag = true
                }
            })
        })
        if (flag) {
            return true
        } else {
            return this.polygonPoint(fig.vertices[0].x + fig.x, fig.vertices[0].y + fig.y)
        }
    }
}