import { _decorator, Component, Node, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('trackControl')
export class trackControl extends Component {
    animationComponent: Animation
    start() {
        this.animationComponent = this.node.getComponent(Animation)
    }

    update(deltaTime: number) {
        if(!this.animationComponent.getState('track').isPlaying){
            this.node.destroy()
        }
    }
}


