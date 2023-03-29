import {
  _decorator,
  Button,
  Component,
  instantiate,
  Label,
  Node,
  Sprite,
  SpriteFrame,
} from "cc";
import { Config } from "db://assets/scripts/Config";
import { Lobby } from "db://assets/scripts/Lobby";
import { EPokerNode } from "db://assets/__types__/layout.type";

const { ccclass, property } = _decorator;

const DAILY_COINS = 20000;

@ccclass("Reward")
export class Reward extends Component {
  @property(Node) public rewardMain: Node;
  @property(Node) public claimed: Node;
  @property(Node) public current: Node;
  @property(Node) public noClaimed: Node;

  @property(SpriteFrame) public openBoxReward: SpriteFrame = null;
  @property(SpriteFrame) public closeBoxReward: SpriteFrame = null;

  @property(SpriteFrame) public noClaim: SpriteFrame = null;
  @property(SpriteFrame) public hasClaim: SpriteFrame = null;

  private readonly currentDay = 3;

  private lobby: Lobby;

  async onLoad() {

  }

  async onEnable() {
    this.lobby = Lobby.getInstance();
    await this.init();
  }

  async start() { }

  private async init() {
    Config.localize(this.node);
    const player = await Config.fetchData(
      "GET",
      Config.BASE_CMS_END_POINT + "/user/reward?type=dailylogin"
    );
    this.renderReward(player);
  }

  public goBackHome() {
    this.lobby.directorCamera(EPokerNode.HomeUI);
  }

  public renderReward(player: any) {
    console.log(player);

    this.rewardMain.removeAllChildren();
    const today = getDayOfWeek(player.today).key;
    console.log(
      this.current.getChildByName("Button_Claim").getComponent(Sprite)
    );

    for (let day = 0; day <= 8; day++) {
      if (today < day) {
        this.__initial_Prefab(this.rewardMain, this.noClaimed, day);
      }

      if (today === day) {
        
        this.__initial_Prefab(this.rewardMain, this.current, day);
        console.log(player);

        if (
          new Date(player.latestLogin).setHours(0, 0, 0, 0) ===
          new Date().setHours(0, 0, 0, 0)
        ) {
          this.node
            .getChildByName("Reward")
            .getChildByName("Reward")
            .getChildByName("Current")
            .getChildByName("Button_Claim")
            .getComponent(Sprite).spriteFrame = this.hasClaim;

          console.log(
            this.node
              .getChildByName("Reward")
              .getChildByName("Reward")
              .getChildByName("Current")
              .getChildByName("Button_Claim")
              .getChildByName("Labelclaim")
              .getComponent(Label)
          );

          console.log(
            this.node
              .getChildByName("Reward")
              .getChildByName("Reward")
              .getChildByName("Claimed")
              .getChildByName("Disable_Button_Claimed")
              .getChildByName("Labelclaimed")
              .getComponent(Label)
          );

          this.node
            .getChildByName("Reward")
            .getChildByName("Reward")
            .getChildByName("Current")
            .getChildByName("Button_Claim")
            .getChildByName("Labelclaim")
            .getComponent(Label).string = this.node
              .getChildByName("Reward")
              .getChildByName("Reward")
              .getChildByName("Claimed")
              .getChildByName("Disable_Button_Claimed")
              .getChildByName("Labelclaimed")
              .getComponent(Label).string;

          this.node
            .getChildByName("Reward")
            .getChildByName("Reward")
            .getChildByName("Current")
            .getChildByName("Button_Claim")
            .getComponent(Button)
            .destroy();
          this.node
            .getChildByName("Reward")
            .getChildByName("Reward")
            .getChildByName("Current")
            .getChildByName("Icon")
            .getComponent(Sprite).spriteFrame = this.openBoxReward;
        }
      }

      if (today > day) {
        this.__initial_Prefab(this.rewardMain, this.claimed, day);
      }
    }
  }

  public async handleClaimeDailyLogin() {
    const rewardLogin = await Config.fetchData(
      "POST",
      Config.BASE_CMS_END_POINT + "/user/reward/daily-login?type=dailylogin"
    );
    console.log(rewardLogin);

    if (rewardLogin.success) {
      this.node
        .getChildByName("Reward")
        .getChildByName("Reward")
        .getChildByName("Current")
        .getChildByName("Button_Claim")
        .getComponent(Sprite).spriteFrame = this.hasClaim;
      this.node
        .getChildByName("Reward")
        .getChildByName("Reward")
        .getChildByName("Current")
        .getChildByName("Button_Claim")
        .getChildByName("Labelclaim")
        .getComponent(Label).string = "CLAIMED";
      this.node
        .getChildByName("Reward")
        .getChildByName("Reward")
        .getChildByName("Current")
        .getChildByName("Button_Claim")
        .getComponent(Button)
        .destroy();
      this.node
        .getChildByName("Reward")
        .getChildByName("Reward")
        .getChildByName("Current")
        .getChildByName("Icon")
        .getComponent(Sprite).spriteFrame = this.openBoxReward;
      this.lobby.player.chips = Number(this.lobby.player.chips) + DAILY_COINS;
      

    }
    // this.__initial_Popup(rewardLogin.message);
  }

  public __initial_Prefab(node: Node, NodeChild: Node, date: number) {
    const __init_Prefab = instantiate(NodeChild);
    node.addChild(__init_Prefab);
    this.setPositionPrefab(__init_Prefab, date);
  }

  public setPositionPrefab(node: Node, date: number) {
    const listPosition = [
      {
        day: 2,
        x: -2374.06,
        y: -780,
      },
      {
        day: 3,
        x: -2151.929,
        y: -780,
        // 189.131
      },
      {
        day: 4,
        x: -1929.798,
        y: -780,

      },
      {
        day: 5,
        x: -1706.025,
        y: -780,

      },
      {
        day: 6,
        x: -1483.555,
        y: -780,

      },
      {
        day: 7,
        x: -1260.21,
        y: -780,

      },
      {
        day: 8,
        x: -1038.82,
        y: -780,

      },
    ];

    for (let position of listPosition) {
      if (position.day === date) {
        node.setPosition(position.x, position.y);
      }
    }
  }

  public handleClosePopupNotification() {
    this.node.getChildByName("PopupNotification").active = false;
  }

  public __initial_Popup(message: string) {
    this.node.getChildByName("PopupNotification").active = true;
    this.node
      .getChildByName("PopupNotification")
      .getChildByName("Layout")
      .getChildByName("TitlePopup")
      .getComponent(Label).string = message;
  }
}

const getDayOfWeek = (day: number) => {
  const dayOfWeek = [
    {
      name: "Sunday",
      key: 8,
    },
    {
      name: "Monday",
      key: 2,
    },
    {
      name: "Tuesday",
      key: 3,
    },
    {
      name: "Wednesday",
      key: 4,
    },
    {
      name: "Thursday",
      key: 5,
    },
    {
      name: "Friday",
      key: 6,
    },
    {
      name: "Saturday",
      key: 7,
    },
  ];

  return dayOfWeek[day];
};
