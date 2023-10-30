import { _decorator, Component, Node, Sprite, UITransform, resources, SpriteFrame, Layers, RigidBody2D, ERigidBody2DType,
    BoxCollider2D, v2, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('randomWalls_1')
export class randomWalls_1 extends Component {
    width: number
    height: number
    wallTop :SpriteFrame[] = []
    wallTopResult = {}
    wallSide :SpriteFrame[] = []
    wallSideResult = {}
    shadow: SpriteFrame
    shadowResult = []

    start() {
        this.addRigid()
        resources.loadDir("maps/wall", SpriteFrame,(_err, spriteFrames) => {
            resources.load('white-bg/spriteFrame',SpriteFrame,(_err, spriteFrame) => {
                this.shadow = spriteFrame
                spriteFrames.forEach(item=>{
                    if(item.getRect().height===8) this.wallSide.push(item)
                    else if(item.getRect().height===16) this.wallTop.push(item)
                    for(let i = 0; i < this.width + 2; i++){
                        for(let j = this.height + 1; j >= 0 ; j--){
                            if(!(i>0&&i<this.width+1&&j>0&&j<this.height+1)){
                                const tmpTopIndex = Math.floor(Math.random() * this.wallTop.length)
                                if(!!this.wallTopResult[tmpTopIndex]){
                                    this.wallTopResult[tmpTopIndex].push({
                                        x: i*16,
                                        y: j*16+8
                                    })
                                }else {
                                    this.wallTopResult[tmpTopIndex] = [{
                                        x: i*16,
                                        y: j*16+8
                                    }]
                                }
                                if((j===0)||(j===this.height + 1&&i!==0&&i!==this.width+1)){
                                    const tmpSideIndex = Math.floor(Math.random() * this.wallSide.length)
                                    if(!!this.wallSideResult[tmpSideIndex]){
                                        this.wallSideResult[tmpSideIndex].push({
                                            x: i*16,
                                            y: j*16
                                        })
                                    }else {
                                        this.wallSideResult[tmpSideIndex] = [{
                                            x: i*16,
                                            y: j*16
                                        }]
                                    }
                                }
                            }
                        }
                        if(i>0&&i<this.width+1){
                            this.shadowResult.push({x: i*16, y: this.height*16+8})
                        }
                    }
                    Object.keys(this.wallTopResult).forEach(key=>{
                        this.wallTopResult[key].forEach(pos=>{
                            this.addWallTop(pos.x,pos.y,key)
                        })
                    })
                    Object.keys(this.wallSideResult).forEach(key=>{
                        this.wallSideResult[key].forEach(pos=>{
                            this.addWallSide(pos.x,pos.y,key)
                        })
                    })
                    this.shadowResult.forEach(pos=>{
                        this.addShadow(pos.x,pos.y)
                    })
                })
            })
        })
    }

    addRigid(){
        this.addRigidWall(0,8,(this.width+2)*16,16)
        this.addRigidWall(0,24+this.height*16,(this.width+2)*16,16)
        this.addRigidWall(0,24,16,16*this.height)
        this.addRigidWall(this.width*16+16,24,16,16*this.height)
    }

    addRigidWall(posx,posy,width,height){
        const node = new Node()
        node.layer = Layers.Enum.UI_2D
        node.setScale(1, 1.01)
        node.setPosition(posx,posy)
        node.addComponent(UITransform).setAnchorPoint(0,0)
        const rigidBody2D = node.addComponent(RigidBody2D)
        rigidBody2D.type = ERigidBody2DType.Static
        const boxCollider2D = node.addComponent(BoxCollider2D)
        boxCollider2D.size = math.size(width,height)
        boxCollider2D.offset = v2(width/2,height/2)
        node.setParent(this.node)
    }

    addWallTop(x,y,indexTop){
        const node = new Node()
        const sprite = node.addComponent(Sprite)
        node.layer = Layers.Enum.UI_2D
        node.setScale(1, 1.01)
        node.getComponent(UITransform).setAnchorPoint(0,0)
        sprite.spriteFrame = this.wallTop[indexTop];
        node.setPosition(x,y)
        node.setParent(this.node)
    }

    addWallSide(x,y,indexSide){
        const node = new Node()
        node.addComponent(Sprite)
        node.layer = Layers.Enum.UI_2D
        node.setScale(1, 1.01)
        node.getComponent(UITransform).setAnchorPoint(0,0)
        node.getComponent(Sprite).spriteFrame = this.wallSide[indexSide];
        node.setPosition(x,y)
        node.setParent(this.node)
    }

    addShadow(x,y){
        const node = new Node("shadow")
        node.addComponent(Sprite)
        node.layer = Layers.Enum.UI_2D
        node.getComponent(UITransform).setAnchorPoint(0,0)
        node.setScale(16,8)
        node.getComponent(Sprite).spriteFrame = this.shadow;
        node.getComponent(Sprite).color.set(0,0,0,50)
        node.setPosition(x, y)
        node.setParent(this.node)
    }
    update(deltaTime: number) {
    }
}


