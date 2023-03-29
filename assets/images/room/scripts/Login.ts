import { _decorator, Component, Node, Animation } from "cc";

const { ccclass, property } = _decorator;

@ccclass("Login")
export class Login extends Component {
  private state: any;

  start() {
    const ani = this.getComponent(Animation);
    // console.log(ani)
    ani.play();
  }

  update(deltaTime: number) {}

  public callAni() {}
}
