import { _decorator, Component, Node, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('cameraControl')
export class cameraControl extends Component {
    @property(Node) player: Node
    start() {

    }

    lateUpdate(deltaTime: number) {
        const playerPosition = this.player.getPosition()
        const cameraPosition = this.node.getPosition()
        const lerpX = math.lerp(cameraPosition.x, playerPosition.x, 4 * deltaTime)
        const lerpY = math.lerp(cameraPosition.y, playerPosition.y, 4 * deltaTime)
        this.node.setPosition(lerpX, lerpY)
        // this.node.setPosition(playerPosition.x, playerPosition.y)
    }
}


