import { _decorator, Component, Node, Sprite, Layers, UITransform, resources, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('randomFloors_1')
export class randomFloors_1 extends Component {
    width: number
    height: number
    floors: SpriteFrame[]
    floorsResult = {}
    start() {
        resources.loadDir("maps/floor", SpriteFrame,
            (_err, spriteFrames) => {
                this.floors = spriteFrames
                for(let i = 0; i < this.width; i++){
                    for(let j = 0; j < this.height; j++){
                        const tmpIndex = Math.floor(Math.random() * spriteFrames.length)
                        if(!!this.floorsResult[tmpIndex]){
                            this.floorsResult[tmpIndex].push({
                                x: i*16,
                                y: j*16
                            })
                        }else {
                            this.floorsResult[tmpIndex] = [{
                                x: i*16,
                                y: j*16
                            }]
                        }
                    }
                }
                Object.keys(this.floorsResult).forEach(key=>{
                    this.floorsResult[key].forEach(pos=>{
                        this.initFloor(pos.x,pos.y,key)
                    })
                })
            }
        )
    }

    initFloor(x,y,index){
        const node = new Node("")
        node.addComponent(Sprite)
        node.layer = Layers.Enum.UI_2D
        node.setScale(1, 1.01)
        node.getComponent(UITransform).setAnchorPoint(0,0)
        node.getComponent(Sprite).spriteFrame = this.floors[index];
        node.setPosition(x,y)
        node.setParent(this.node)
    }

    update(deltaTime: number) {
        
    }
}


