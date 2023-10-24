import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('randomRoom_1')
export class randomRoom_1 extends Component {
    @property(Prefab) randomFloors: Prefab
    @property(Prefab) randomWalls: Prefab
    width: number = 32
    height: number = 32
    start() {
        this.addNode(this.randomFloors, "randomFloors_1", 16 ,16)
        this.addNode(this.randomWalls, "randomWalls_1", 0 ,0)
    }

    addNode(prefab: Prefab, scriptName: string, x, y){
        const node = instantiate(prefab);
        const nodeScript = node.getComponent(scriptName)
        nodeScript.width = this.width
        nodeScript.height = this.height
        node.setPosition(x , y)
        node.setParent(this.node)
    }
    update(deltaTime: number) {
        
    }
}


