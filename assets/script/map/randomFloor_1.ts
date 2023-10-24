import { _decorator, Component, Node, resources, SpriteFrame, Sprite, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('randomFloor')
export class randomFloor extends Component {
    start() {
        resources.loadDir("maps/floor", SpriteFrame,
            (_err, spriteFrames) => {
                this.node.getComponent(Sprite).spriteFrame = spriteFrames[Math.floor(Math.random() * spriteFrames.length)];
            }
        )
    }

    update(deltaTime: number) {
    }
}


