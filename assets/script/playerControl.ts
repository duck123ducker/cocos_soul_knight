import {_decorator, Component, EventKeyboard, input, Input, KeyCode, UITransform, view, Animation, Prefab, instantiate,
    RigidBody2D, v2 } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('playerControl')
export class playerControl extends Component {
    @property(Prefab) track: Prefab
    speed: number = 1000
    viewSize
    playerSize
    playerScale
    animationComponent: Animation
    running = false
    trackTimer
    trackTimerStatus = false
    playerWorldPosition = {
        x: 960,
        y: 540
    }
    rigidBody2D: RigidBody2D
    pressingKey = {
        [KeyCode.KEY_A]: 0,
        [KeyCode.KEY_D]: 0,
        [KeyCode.KEY_S]: 0,
        [KeyCode.KEY_W]: 0
    }

    start() {
        this.rigidBody2D = this.getComponent(RigidBody2D)
        this.animationComponent = this.node.getComponent(Animation)
        this.animationComponent.crossFade('knight_stand', 0.1)
        this.viewSize = view.getDesignResolutionSize()
        this.playerScale = this.node.getScale()
        this.playerSize = {
            x: this.getComponent(UITransform).contentSize.x * this.playerScale.x,
            y: this.getComponent(UITransform).contentSize.y * this.playerScale.y
        }
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.KEY_A:
            case KeyCode.KEY_S:
            case KeyCode.KEY_D:
                this.pressingKey[event.keyCode] = 1
                break
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.KEY_A:
            case KeyCode.KEY_S:
            case KeyCode.KEY_D:
                this.pressingKey[event.keyCode] = 0
                break
        }
    }

    update(deltaTime: number) {
        const direction: number[] = [this.pressingKey[KeyCode.KEY_W]-this.pressingKey[KeyCode.KEY_S], this.pressingKey[KeyCode.KEY_D]-this.pressingKey[KeyCode.KEY_A]]
        const normalizedDirection: number[] = this.normalizeArray(direction)
        const pos = this.node.getPosition()
        // this.node.setPosition(pos.x + deltaTime * this.speed * normalizedDirection[1], pos.y + deltaTime * this.speed * normalizedDirection[0])
        this.rigidBody2D.linearVelocity = v2(deltaTime * this.speed * normalizedDirection[1], deltaTime * this.speed * normalizedDirection[0])
        if(normalizedDirection[1] < 0) this.node.setScale(-this.playerScale.x, this.playerScale.y)
        else if(normalizedDirection[1] > 0) this.node.setScale(this.playerScale.x, this.playerScale.y)
        this.playerWorldPosition = this.node.parent.getComponent(UITransform).convertToWorldSpaceAR(pos)
        this.running = !(direction[0] === 0 && direction[1] === 0)
        if(this.running){
            if(!this.animationComponent.getState('knight_run').isPlaying) this.animationComponent.play('knight_run')
            if(!this.trackTimerStatus){
                this.trackTimerStatus = true
                this.showTrack()
                this.trackTimer = setInterval(this.showTrack.bind(this),1000)
            }
        }else{
            if(!this.animationComponent.getState('knight_stand').isPlaying) this.animationComponent.play('knight_stand')
            if(this.trackTimerStatus){
                this.trackTimerStatus = false
                clearInterval(this.trackTimer)
            }
        }
    }

    showTrack(){
        const { x, y } = this.node.position;
        const node = instantiate(this.track);
        node.setParent(this.node.parent);
        node.setPosition(x, y-this.playerSize.y/2+10);
    }

    normalizeArray(arr): number[] {
        const sumOfSquares: number= arr.reduce((sum, value) => sum + value ** 2, 0);
        const sqrtOfSum: number = Math.sqrt(sumOfSquares);
        return sqrtOfSum===0?[0,0]:arr.map(value => value / sqrtOfSum);
    }
}
