import { _decorator, Component, Node, Prefab, instantiate, Sprite, UITransform, resources, SpriteFrame, Layers } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('randomWalls_1')
export class randomWalls_1 extends Component {
    @property(Prefab) randomWall: Prefab
    width: number
    height: number
    start() {
        resources.load('white-bg/spriteFrame',SpriteFrame,(_err, spriteFrame) => {
            for(let i = 0; i < this.width + 2; i++){
                for(let j = this.height + 1; j >= 0 ; j--){
                    const node = instantiate(this.randomWall);
                    if(!(i>0&&i<this.width+1&&j>0&&j<this.height+1)){
                        node.setPosition(i*16,j*16)
                        node.setParent(this.node)
                    }
                }
                if(i>0&&i<this.width+1){
                    const node = new Node("shadow")
                    node.addComponent(Sprite)
                    node.layer = Layers.Enum.UI_2D
                    node.getComponent(UITransform).setAnchorPoint(0,0)
                    node.setScale(16,8)
                    node.getComponent(Sprite).spriteFrame = spriteFrame;
                    node.getComponent(Sprite).color.set(0,0,0,130)
                    node.setPosition(i*16, this.height*16+8)
                    node.setParent(this.node)
                }
            }
        })
    }

    update(deltaTime: number) {
        
    }
}


