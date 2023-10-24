import { _decorator, Component, Node, resources, SpriteFrame, Sprite, UITransform, Layers } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('randomWall_1')
export class randomWall_1 extends Component {
    start() {
        resources.loadDir("maps/wall", SpriteFrame,
            (_err, spriteFrames) => {
                const wallTop :SpriteFrame[] = []
                const wallSide :SpriteFrame[] = []
                spriteFrames.forEach(item=>{
                    if(item.getRect().height===8) wallSide.push(item)
                    else if(item.getRect().height===16) wallTop.push(item)
                })
                this.addNode('wallSide', wallSide[Math.floor(Math.random() * wallSide.length)], 0)
                this.addNode('wallTop', wallTop[Math.floor(Math.random() * wallTop.length)], 8)
            }
        )
    }

    addNode(name: string, sprite: SpriteFrame, y: number){
        const node = new Node(name)
        node.addComponent(Sprite)
        node.layer = Layers.Enum.UI_2D
        node.setScale(1, 1.01)
        node.getComponent(UITransform).setAnchorPoint(0,0)
        node.getComponent(Sprite).spriteFrame = sprite;
        node.setPosition(0,y)
        node.setParent(this.node)
    }

    update(deltaTime: number) {
    }
}


