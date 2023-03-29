import { _decorator, Component, Node, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CardsLor")
export class CardsLor extends Component {
  private cardsFolder = "/assets/public/deckofcard";
  public cards = {
    Card2c: "",
  };
  public cardsSouce = [];
  @property(SpriteFrame) public Card2c: SpriteFrame = null;
  @property(SpriteFrame) public Card3c: SpriteFrame = null;
  @property(SpriteFrame) public Card4c: SpriteFrame = null;
  @property(SpriteFrame) public Card5c: SpriteFrame = null;
  @property(SpriteFrame) public Card6c: SpriteFrame = null;
  @property(SpriteFrame) public Card7c: SpriteFrame = null;
  @property(SpriteFrame) public Card8c: SpriteFrame = null;
  @property(SpriteFrame) public Card9c: SpriteFrame = null;
  @property(SpriteFrame) public CardTc: SpriteFrame = null;
  @property(SpriteFrame) public CardJc: SpriteFrame = null;
  @property(SpriteFrame) public CardQc: SpriteFrame = null;
  @property(SpriteFrame) public CardKc: SpriteFrame = null;
  @property(SpriteFrame) public CardAc: SpriteFrame = null;

  @property(SpriteFrame) public Card2d: SpriteFrame = null;
  @property(SpriteFrame) public Card3d: SpriteFrame = null;
  @property(SpriteFrame) public Card4d: SpriteFrame = null;
  @property(SpriteFrame) public Card5d: SpriteFrame = null;
  @property(SpriteFrame) public Card6d: SpriteFrame = null;
  @property(SpriteFrame) public Card7d: SpriteFrame = null;
  @property(SpriteFrame) public Card8d: SpriteFrame = null;
  @property(SpriteFrame) public Card9d: SpriteFrame = null;
  @property(SpriteFrame) public CardTd: SpriteFrame = null;
  @property(SpriteFrame) public CardJd: SpriteFrame = null;
  @property(SpriteFrame) public CardQd: SpriteFrame = null;
  @property(SpriteFrame) public CardKd: SpriteFrame = null;
  @property(SpriteFrame) public CardAd: SpriteFrame = null;

  @property(SpriteFrame) public Card2h: SpriteFrame = null;
  @property(SpriteFrame) public Card3h: SpriteFrame = null;
  @property(SpriteFrame) public Card4h: SpriteFrame = null;
  @property(SpriteFrame) public Card5h: SpriteFrame = null;
  @property(SpriteFrame) public Card6h: SpriteFrame = null;
  @property(SpriteFrame) public Card7h: SpriteFrame = null;
  @property(SpriteFrame) public Card8h: SpriteFrame = null;
  @property(SpriteFrame) public Card9h: SpriteFrame = null;
  @property(SpriteFrame) public CardTh: SpriteFrame = null;
  @property(SpriteFrame) public CardJh: SpriteFrame = null;
  @property(SpriteFrame) public CardQh: SpriteFrame = null;
  @property(SpriteFrame) public CardKh: SpriteFrame = null;
  @property(SpriteFrame) public CardAh: SpriteFrame = null;

  @property(SpriteFrame) public Card2s: SpriteFrame = null;
  @property(SpriteFrame) public Card3s: SpriteFrame = null;
  @property(SpriteFrame) public Card4s: SpriteFrame = null;
  @property(SpriteFrame) public Card5s: SpriteFrame = null;
  @property(SpriteFrame) public Card6s: SpriteFrame = null;
  @property(SpriteFrame) public Card7s: SpriteFrame = null;
  @property(SpriteFrame) public Card8s: SpriteFrame = null;
  @property(SpriteFrame) public Card9s: SpriteFrame = null;
  @property(SpriteFrame) public CardTs: SpriteFrame = null;
  @property(SpriteFrame) public CardJs: SpriteFrame = null;
  @property(SpriteFrame) public CardQs: SpriteFrame = null;
  @property(SpriteFrame) public CardKs: SpriteFrame = null;
  @property(SpriteFrame) public CardAs: SpriteFrame = null;

  @property(SpriteFrame) public CloseCard: SpriteFrame = null;
  @property(SpriteFrame) public Win: SpriteFrame = null;
  @property(SpriteFrame) public Lose: SpriteFrame = null;

  //
  private static _instance: CardsLor;
  public static getInstance(): CardsLor {
    if (!this._instance) {
      this._instance = new CardsLor();
    }
    return this._instance;
  }
  start() {
    // for (let i in this.cards) {
    //   this.cardsSouce.push(this.cards[i]);
    // }
    // this.Card7sReturn = this.Card2c;
    // // console.log(this.Card2cReturn, "asdasd");
    // console.log("starrttttt", this.Card7sReturn);
  }
  handleCardLor(name: string) {
    switch (name) {
      case "2c":
        // return this.Card2c;
        break;
      case "3c":
        break;
      case "4c":
        break;
      case "5c":
        break;
      case "6c":
        break;
      case "7c":
        break;
      case "8c":
        break;
      case "9c":
        break;
      case "Tc":
        break;
      case "Jc":
        break;
      case "Qc":
        break;
      case "Kc":
        break;
      case "Ac":
        break;
      case "2d":
        break;
      case "3d":
        break;
      case "4d":
        break;
      case "5d":
        break;
      case "6d":
        break;
      case "7d":
        break;
      case "8d":
        break;
      case "9d":
        break;
      case "Td":
        break;
      case "Jd":
        break;
      case "Qd":
        break;
      case "Kd":
        break;
      case "Ad":
        break;
      case "2h":
        break;
      case "3h":
        break;
      case "4h":
        break;
      case "5h":
        break;
      case "6h":
        break;
      case "7h":
        break;
      case "8h":
        break;
      case "9h":
        break;
      case "Th":
        break;
      case "Jh":
        break;
      case "Qh":
        break;
      case "Kh":
        break;
      case "Ah":
        break;
      case "2s":
        break;
      case "3s":
        break;
      case "4s":
        break;
      case "5s":
        break;
      case "6s":
        break;
      case "7s":
        break;
      case "8s":
        break;
      case "9s":
        break;
      case "Ts":
        break;
      case "Js":
        break;
      case "Qs":
        break;
      case "Ks":
        break;
      case "As":
        break;
    }
  }

  update(deltaTime: number) {}
}
class asd extends CardsLor {
  constructor() {
    super();
  }
  start() {
    // console.log(this, "anjskdnaskjd");
  }
}
const unu = new asd();
unu.start();
