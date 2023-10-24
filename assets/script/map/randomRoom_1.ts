import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('randomRoom_1')
export class randomRoom_1 extends Component {
    @property(Prefab) randomFloor: Prefab
    start() {
        for(let i = 0; i < 16; i++){
            for(let j = 0; j < 16; j++){
                let node = instantiate(this.randomFloor);
                node.setPosition(i*16,j*16)
                node.setParent(this.node)
            }
        }
    }

    update(deltaTime: number) {
        
    }
}


