import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('randomFloors_1')
export class randomFloors_1 extends Component {
    @property(Prefab) randomFloor: Prefab
    width: number
    height: number
    start() {
        for(let i = 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++){
                const node = instantiate(this.randomFloor);
                node.setPosition(i*16,j*16)
                node.setParent(this.node)
            }
        }
    }

    update(deltaTime: number) {
        
    }
}


