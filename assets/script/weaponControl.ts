import {_decorator, Component, EventMouse, Node, systemEvent, SystemEventType} from 'cc';

const { ccclass, property } = _decorator;

@ccclass('weaponControl')
export class weaponControl extends Component {
    @property(Node) sword: Node
    @property(Node) camera: Node
    @property(Node) player: Node
    type = 'sword'
    mouseDown = false
    mouseUIPosition = {
        x: 9600,
        y: 540
    }
    mouseWorldPosition = {
        x: 10000,
        y: 540
    }
    start() {
        this.node.children.forEach(child=>{
            child.active = true
        })
        systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this);
        systemEvent.on(SystemEventType.MOUSE_UP, this.onMouseUp, this);
        systemEvent.on(SystemEventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    update(deltaTime: number) {
        this.mouseWorldPosition = {
            x: this.camera.position.x + this.mouseUIPosition.x,
            y: this.camera.position.y + this.mouseUIPosition.y + 30
        }
        const angle = this.player.getScale().x>0?
            this.calculateAngle(this.player.getComponent('playerControl').playerWorldPosition, this.mouseWorldPosition):
            180 - this.calculateAngle(this.player.getComponent('playerControl').playerWorldPosition, this.mouseWorldPosition)
        if((angle>-90&&angle<90)||(angle>270)) this.node.angle = angle
    }

    onMouseDown(event: EventMouse){
        this.mouseDown = true
    }
    onMouseUp(event: EventMouse){
        this.mouseDown = false
    }
    onMouseMove(event: EventMouse){
        this.mouseUIPosition = event.getUILocation()
    }

    calculateAngle(a, b) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.atan2(dy, dx) * (180 / Math.PI);
    }
}