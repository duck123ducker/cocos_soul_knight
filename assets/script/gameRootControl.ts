import { _decorator, Component, Node, PhysicsSystem2D, EPhysics2DDrawFlags } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gameRootControl')
export class gameRootControl extends Component {
    start() {
        PhysicsSystem2D.instance.debugDrawFlags =
            // EPhysics2DDrawFlags.Aabb |
            EPhysics2DDrawFlags.Pair |
            EPhysics2DDrawFlags.Joint |
            EPhysics2DDrawFlags.Shape;
    }

    update(deltaTime: number) {

    }
}


