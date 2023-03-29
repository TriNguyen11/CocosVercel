import {
  _decorator,
  Component,
  director,
  instantiate,
  Node,
  Prefab,
  RichText,
  ScrollView,
  Sprite,
  SpriteFrame,
} from "cc";
import { EPokerNode } from "db://assets/__types__/layout.type";
import { Config } from "db://assets/scripts/Config";
import { Lobby } from "db://assets/scripts/Lobby";

const { ccclass, property } = _decorator;

@ccclass("Ranking")
export class Ranking extends Component {
  @property(ScrollView) public scrollView: ScrollView;

  @property(Node) public dashBoard: Node;
  @property(Prefab) public recordUser: Prefab;
  @property(RichText) public nameUser: RichText;
  @property(RichText) public amountChips: RichText;

  @property(SpriteFrame) public spriteFirst: SpriteFrame = null;
  @property(SpriteFrame) public spriteSecond: SpriteFrame = null;
  @property(SpriteFrame) public spriteThird: SpriteFrame = null;
  @property(SpriteFrame) public spriteFourth: SpriteFrame = null;
  @property(SpriteFrame) public spriteFiveth: SpriteFrame = null;
  @property(SpriteFrame) public spriteSixth: SpriteFrame = null;
  @property(SpriteFrame) public spriteSeventh: SpriteFrame = null;
  @property(SpriteFrame) public spriteEighth: SpriteFrame = null;
  @property(SpriteFrame) public spriteNinth: SpriteFrame = null;
  @property(SpriteFrame) public sprite10st: SpriteFrame = null;

  private lobby: Lobby;

  public async onLoad() {
    this.lobby = Lobby.getInstance();
    // await this.init();
  }

  async onEnable() {
    await this.init();
  }

  async start() {}

  private async init() {
    const topRanking = await Config.fetchData(
      "GET",
      Config.BASE_CMS_END_POINT + "/user/rank/top-ten"
    );
    this.loadTopRanking(topRanking);
    Config.localize(this.node);
  }

  public goBackHome() {
    this.lobby.directorCamera(EPokerNode.HomeUI);
  }

  public loadTopRanking(topRanking: any) {
    let vec_X = 12,
      vec_Y = -10;
    for (let i = 0; i < topRanking.length; i++) {
      this.__initial_Prefab(
        this.dashBoard,
        this.recordUser,
        vec_X,
        vec_Y,
        topRanking[i],
        i + 1
      );
      vec_Y -= 75;
    }
  }

  public __initial_Prefab(
    nodeMain: Node,
    NodeChild: Prefab,
    vec_X: number,
    vec_Y: number,
    data: any,
    rank: number
  ) {
    const __init_Prefab = instantiate(NodeChild);
    nodeMain.addChild(__init_Prefab);
    console.log(__init_Prefab);
    this.setAvatar(__init_Prefab, data.avatar)
    __init_Prefab.setPosition(vec_X, vec_Y);

    let rankSpriteFrame: SpriteFrame = null;

    switch (rank) {
      case 1:
        rankSpriteFrame = this.spriteFirst;
        break;
      case 2:
        rankSpriteFrame = this.spriteSecond;
        break;
      case 3:
        rankSpriteFrame = this.spriteThird;
        break;
      case 4:
        rankSpriteFrame = this.spriteFourth;
        break;
      case 5:
        rankSpriteFrame = this.spriteFiveth;
        break;
      case 6:
        rankSpriteFrame = this.spriteSixth;
        break;
      case 7:
        rankSpriteFrame = this.spriteSeventh;
        break;
      case 8:
        rankSpriteFrame = this.spriteEighth;
        break;
      case 9:
        rankSpriteFrame = this.spriteNinth;
        break;
      case 10:
        rankSpriteFrame = this.sprite10st;
        break;
      default:
        break;
    }

    __init_Prefab.getChildByName("Medal").getComponent(Sprite).spriteFrame =
      rankSpriteFrame;

    __init_Prefab
      .getChildByName("Background")
      .getChildByName("Name")
      .getComponent(RichText).string = data.username;
    __init_Prefab
      .getChildByName("Background")
      .getChildByName("Chips")
      .getComponent(RichText).string = Config.handleNumerFm(data.chips);
  }

  public setAvatar(nodePrefab: Node, avatar: string) {
    nodePrefab.getChildByName("Avatar").getComponent(Sprite).spriteFrame = this.lobby.setAvatar(nodePrefab.getChildByName("Avatar").getComponent(Sprite).spriteFrame, avatar)
  }
}
