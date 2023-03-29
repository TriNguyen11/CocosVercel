import { _decorator, Component, Node, Label, Sprite } from "cc";
import { Main } from "db://assets/scripts/Main";
import { Lobby } from "db://assets/scripts/Lobby";
import { Config } from "db://assets/scripts/Config";
import { EPokerNode } from "db://assets/__types__/layout.type";

const { ccclass, property } = _decorator;

@ccclass("SelectRoom")
export class SelectRoom extends Component {
  private main: Main;
  private lobby: Lobby;

  public onLoad() {
    this.main = Main.getInstance();
    this.lobby = Lobby.getInstance();
  }

  public async onEnable() {
    this.init()

    const avatar = this.lobby.player.avatar;
    this.setAvatar(avatar)
  }

  public async start() {
    // const chips = this.lobby.player.chips;

    // this.node
    //   .getChildByName("SelectRoom")
    //   .getChildByName("PlayerInfo")
    //   .getChildByName("MoneyFrame")
    //   .getComponentInChildren(Label).string =
    //   Config.formatCurrency(chips).toString();
  }

  public goBackHome() {
    this.lobby.directorCamera(EPokerNode.HomeUI);
  }

  private init() {
    const chips = this.lobby.player.chips;

    this.node
      .getChildByName("SelectRoom")
      .getChildByName("PlayerInfo")
      .getChildByName("MoneyFrame")
      .getComponentInChildren(Label).string =
      Config.formatCurrency(chips).toString();
  }

  public setAvatar(avatar: any) {
    this.node.getChildByName("SelectRoom").getChildByName("PlayerInfo").getChildByName("Avatar").getComponent(Sprite).spriteFrame = this.lobby.setAvatar(this.node.getChildByName("SelectRoom").getChildByName("PlayerInfo").getChildByName("Avatar").getComponent(Sprite).spriteFrame, avatar)
  }

  public update(deltaTime: number) { }
}
