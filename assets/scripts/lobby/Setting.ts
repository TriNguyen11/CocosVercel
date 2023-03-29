import {
  _decorator,
  AudioSource,
  Component,
  Label,
  math,
  Node,
  Slider,
  Sprite,
  SpriteFrame,
  sys,
} from "cc";
import { Config } from "db://assets/scripts/Config";
import { ELang } from "db://assets/__types__/global.type";
import { EPokerNode } from "db://assets/__types__/layout.type";
import { Lobby } from "db://assets/scripts/Lobby";

const { ccclass, property } = _decorator;

@ccclass("Setting")
export class Setting extends Component {
  @property(Node) private contentLayout: Node;

  @property(SpriteFrame) private backgroundActive: SpriteFrame = null;
  @property(SpriteFrame) private backgroundInActive: SpriteFrame = null;
  @property(Slider) private sliderMusic: Slider = null;

  // Content Layout
  @property(Node) private generalLayout: Node;
  @property(Node) private privateLayout: Node;
  @property(Node) private supportLayout: Node;

  private lobby: Lobby;

  public onLoad() {
    this.lobby = Lobby.getInstance();
    this.generalLayout.active = true;
    this.privateLayout.active = false;
    this.supportLayout.active = false;
    console.log();

    const volume = Number(sys.localStorage.getItem("volume"));

    this.node
      .getChildByName("Setting")
      .getChildByName("Dashboard")
      .getChildByName("Content")
      .getChildByName("General")
      .getChildByName("Music")
      .getChildByName("Slider")
      .getComponent(Slider).progress = volume;

    this.changeStyleHeader("GENERAL");

    this.sliderMusic = this.node.getChildByName("Setting").getChildByName("Dashboard").getChildByName("Content").getChildByName("General").getChildByName("Music").getChildByName("Slider").getComponent(Slider)

    this.sliderMusic.node.on('slide', this.setVolume, this)
  }

  public start() {
    this.switchLang(false);
  }

  public goBackHome() {
    this.lobby.directorCamera(EPokerNode.HomeUI);
  }

  public test() {
    this.contentLayout.removeAllChildren();
  }

  public changeTab(e, tab) {
    switch (tab) {
      case "GENERAL":
        this.generalLayout.active = true;
        this.privateLayout.active = false;
        this.supportLayout.active = false;
        this.changeStyleHeader("GENERAL");

        break;

      case "PRIVATE":
        this.generalLayout.active = false;
        this.privateLayout.active = true;
        this.supportLayout.active = false;
        this.changeStyleHeader("PRIVATE");

        break;

      case "SUPPORT":
        this.generalLayout.active = false;
        this.privateLayout.active = false;
        this.supportLayout.active = true;
        this.changeStyleHeader("SUPPORT");
        break;

      default:
        break;
    }
  }

  public handleChangeLang() {
    this.switchLang(true);
  }

  public switchLang(isChange: boolean) {
    if (Config.getLang() === ELang.en) {
      if (isChange) {
        Config.setLang(ELang.vn);
        this.node
          .getChildByName("Setting")
          .getChildByName("Dashboard")
          .getChildByName("Content")
          .getChildByName("General")
          .getChildByName("Language")
          .getChildByName("ButtonSwitchLang")
          .getChildByName("LangLabel")
          .getComponent(Label).string = "English";
      } else {
        this.node
          .getChildByName("Setting")
          .getChildByName("Dashboard")
          .getChildByName("Content")
          .getChildByName("General")
          .getChildByName("Language")
          .getChildByName("ButtonSwitchLang")
          .getChildByName("LangLabel")
          .getComponent(Label).string = "Vietnamese";
      }
    } else if (Config.getLang() === ELang.vn) {
      if (isChange) {
        Config.setLang(ELang.en);
        this.node
          .getChildByName("Setting")
          .getChildByName("Dashboard")
          .getChildByName("Content")
          .getChildByName("General")
          .getChildByName("Language")
          .getChildByName("ButtonSwitchLang")
          .getChildByName("LangLabel")
          .getComponent(Label).string = "Vietnamese";
      } else {
        this.node
          .getChildByName("Setting")
          .getChildByName("Dashboard")
          .getChildByName("Content")
          .getChildByName("General")
          .getChildByName("Language")
          .getChildByName("ButtonSwitchLang")
          .getChildByName("LangLabel")
          .getComponent(Label).string = "English";
      }
    }
    Config.localize(this.node);
  }

  public changeStyleHeader(header: string) {
    const listLabelHeader = this.node
      .getChildByName("Setting")
      .getChildByName("Dashboard")
      .getChildByName("Header")
      .getComponentsInChildren(Label);
    const listSpriteHeader = this.node
      .getChildByName("Setting")
      .getChildByName("Dashboard")
      .getChildByName("Header")
      .getComponentsInChildren(Sprite);

    for (let label = 0; label < listLabelHeader.length; label++) {
      switch (header) {
        case "GENERAL":
          this.changeColorWordHeader(listLabelHeader[label], "LabelGEN");
          break;

        case "PRIVATE":
          this.changeColorWordHeader(listLabelHeader[label], "LabelPRIVATE");
          break;

        case "SUPPORT":
          this.changeColorWordHeader(listLabelHeader[label], "LabelSUP");
          break;

        default:
          break;
      }
    }

    for (let sprite = 0; sprite < listSpriteHeader.length; sprite++) {
      switch (header) {
        case "GENERAL":
          this.changeColorBackgroundHeader(
            listSpriteHeader[sprite],
            "GBackground"
          );
          break;

        case "PRIVATE":
          this.changeColorBackgroundHeader(
            listSpriteHeader[sprite],
            "PBackground"
          );
          break;

        case "SUPPORT":
          this.changeColorBackgroundHeader(
            listSpriteHeader[sprite],
            "SBackground"
          );
          break;

        default:
          break;
      }
    }
  }

  public changeColorWordHeader(label: Label, name: string) {
    const labelName = label.name.substring(0, label.name.indexOf("<Label>"));
    if (labelName === name) {
      label.color = math.color(255, 255, 255, 255);
    } else {
      label.color = math.color(0, 0, 0, 255);
    }
  }

  public changeColorBackgroundHeader(sprite: Sprite, name: string) {
    const spriteName = sprite.name.substring(
      0,
      sprite.name.indexOf("<Sprite>")
    );
    if (spriteName === name) {
      sprite.spriteFrame = this.backgroundActive;
    } else {
      sprite.spriteFrame = this.backgroundInActive;
    }
  }

  public setVolume(slider: Slider) {
    console.log(slider.progress);
    sys.localStorage.setItem("volume", slider.progress.toString())
    this.node.getParent().getComponent(AudioSource).volume = slider.progress
  }
}
