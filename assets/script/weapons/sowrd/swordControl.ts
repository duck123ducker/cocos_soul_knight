import { _decorator, Component, Node, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('swordControl')
export class swordControl extends Component {
    @property(Node) weapon: Node
    @property(Node) bullet1: Node
    @property(Node) bullet2: Node
    @property(Node) bullet3: Node
    weaponScript
    attacking = false //正在执行攻击动作
    start() {
        this.weaponScript = this.weapon.getComponent('weaponControl')
        this.node.active = this.weaponScript.type === 'sword'
        this.bullet1.active = false
        this.bullet2.active = false
        this.bullet3.active = false
    }

    update(deltaTime: number) {
        if(!this.attacking){
            if(this.weaponScript.mouseDown){
                this.attacking = true
                tween(this.node)
                    .by(0, { angle: 80 })
                    .by(0.1*60/260, { angle: -60 })
                    .call(()=>{
                        this.bullet1.active = true
                    })
                    .by(0.1*50/260, { angle: -50 })
                    .call(()=>{
                        setTimeout(()=>{
                            this.bullet1.active = false
                        },50)
                        this.bullet2.active = true
                    })
                    .by(0.1*80/260, { angle: -80 })
                    .call(()=>{
                        setTimeout(()=>{
                            this.bullet2.active = false
                        },50)
                        this.bullet3.active = true
                    })
                    .by(0.1*10/260, { angle: -10 })
                    .call(()=>{
                        setTimeout(()=>{
                            this.bullet3.active = false
                        },50)
                    })
                    .by(0.1, { angle: 150 })
                    .by(0.1, { angle: -30 })
                    .call( ()=>{
                        setTimeout(()=>{
                            this.attacking = false
                        },100)
                    })
                    .start()
            }
        }
    }
}


