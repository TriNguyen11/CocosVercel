import {
  Animation,
  Component,
  director,
  Node,
  RichText,
  Sprite,
  _decorator,
} from "cc";

import { CardsLor } from "./CardsLor";

const { ccclass, property } = _decorator;

@ccclass("Room")
export class Room extends Component {
  public static _instance: Room = null;
  //   @property(Node) public nodePlayer: Node;
  //   @property(Node) public player: Node;
  @property(RichText) public nameFake1: RichText = null;
  @property(RichText) public nameFake2: RichText = null;
  @property(RichText) public nameFake3: RichText = null;
  @property(RichText) public nameFake4: RichText = null;
  @property(RichText) public nameReal: RichText = null;

  @property(RichText) public betChipReal: RichText = null;
  @property(RichText) public betChipFake1: RichText = null;
  @property(RichText) public betChipFake2: RichText = null;
  @property(RichText) public betChipFake3: RichText = null;
  @property(RichText) public betChipFake4: RichText = null;

  @property(RichText) public aniBetChipReal: RichText = null;
  @property(RichText) public aniBetChipFake1: RichText = null;
  @property(RichText) public aniBetChipFake2: RichText = null;
  @property(RichText) public aniBetChipFake3: RichText = null;
  @property(RichText) public aniBetChipFake4: RichText = null;

  @property(RichText) public chipsFake1: RichText = null;
  @property(RichText) public chipsFake2: RichText = null;
  @property(RichText) public chipsFake3: RichText = null;
  @property(RichText) public chipsFake4: RichText = null;
  @property(RichText) public chipsReal: RichText = null;

  @property(RichText) public countDownFake1: RichText = null;
  @property(RichText) public countDownFake2: RichText = null;
  @property(RichText) public countDownFake3: RichText = null;
  @property(RichText) public countDownFake4: RichText = null;
  @property(RichText) public countDownReal: RichText = null;

  @property(RichText) public totalBet: RichText = null;
  @property(RichText) public chipWinP1: RichText = null;
  @property(RichText) public chipWinP2: RichText = null;
  @property(RichText) public chipWinP3: RichText = null;
  @property(RichText) public chipWinP4: RichText = null;
  @property(RichText) public chipWinP5: RichText = null;

  @property(RichText) public RankP1: RichText = null;
  @property(RichText) public RankP2: RichText = null;
  @property(RichText) public RankP3: RichText = null;
  @property(RichText) public RankP4: RichText = null;
  @property(RichText) public RankP5: RichText = null;
  private AnimationP: any = null;

  static roomController: any;
  static roomState: any;
  static profileUser: any;
  static seatPlayerReal: number;
  static results: number;
  static minChipToStay: number;

  static stateOnready: boolean;
  static statePlayers: any = [{}, {}, {}, {}, {}, {}];
  static roundGame: string;
  static bankerCards: Array<string>;
  static currentTurn: number;
  static potSize: number;
  static remainingPlayer: number;
  static ArrPlayersPlaying: Array<number>;
  static currentChips: number;
  static betRound: number = 0;
  static chiplevel: number = 0;
  static CountdownP1 = 9;
  static CountdownP2 = 9;
  static CountdownP3 = 9;
  static CountdownP4 = 9;
  static CountdownP5 = 9;

  private countBankerCard: number = 0;
  private countActionEmpty: number = 0;
  private flagCount: number = 0;
  private endGame: boolean = false;
  private CardsReal: Array<String> = [];
  private ArrSpriteCards: any;
  private tempRealUser: {
    chips: 0;
    accumulatedBet: 0;
  } = {
    chips: 0,
    accumulatedBet: 0,
  };
  private tempFake1: {
    chips: 0;
    accumulatedBet: 0;
  } = {
    chips: 0,
    accumulatedBet: 0,
  };
  private tempFake2: {
    chips: 0;
    accumulatedBet: 0;
  } = {
    chips: 0,
    accumulatedBet: 0,
  };
  private tempFake3: {
    chips: 0;
    accumulatedBet: 0;
  } = {
    chips: 0,
    accumulatedBet: 0,
  };
  private tempFake4: {
    chips: 0;
    accumulatedBet: 0;
  } = {
    chips: 0,
    accumulatedBet: 0,
  };
  private TableNode: Node = null;
  private AnimationRoom: any;

  private TempInitP1: any;
  private TempInitP2: any;
  private TempInitP3: any;
  private TempInitP4: any;
  private TempInitP5: any;

  public static getInstance(): any {
    if (!this._instance) this._instance = new Room();
    return this._instance;
  }

  static setRoomController(room: any) {
    return (this.roomController = room);
  }

  //countdown
  async setCountdownP1() {
    try {
      this.countDownReal.string = Room.CountdownP1.toString();

      if (Room.CountdownP1 == 0) {
        this.node
          .getChildByName("playingRoom")
          .getChildByName("Button")
          .getChildByName("check").active = false;
        this.TableNode.getChildByName("Player1").getChildByName(
          "countdown"
        ).active = false;
        Room?.statePlayers[Room.seatPlayerReal]?.accumulatedBet ===
        Room.currentChips
          ? Room.roomController.send("CHECK")
          : Room.roomController.send("FOLD");
      }
      if (Room.CountdownP1 < 10 && Room.CountdownP1 > -1) {
        const timer = setTimeout(() => {
          if (
            Room.currentTurn == Room?.statePlayers[Room.seatPlayerReal]?.turn
          ) {
            this.TableNode.getChildByName("Player1").getChildByName(
              "countdown"
            ).active = false;
            return clearTimeout(timer);
          }
          Room.CountdownP1 = Room.CountdownP1 - 1;
          clearTimeout(timer);
          this.setCountdownP1();
          return clearTimeout(timer);
        }, 1200);
      }
    } catch (error) {}
  }
  setCountdownP2() {
    try {
    } catch (error) {}
    const timer = setTimeout(() => {
      this.setCountdownP2();
      clearTimeout(timer);
      return (this.countDownFake1.string = Room.CountdownP2.toString());
    }, 1200);
  }
  setCountdownP3() {
    try {
      // if (Room.roundGame !== "WELCOME") {
      //   this.countDownFake2.string = Countdown.toString();
      // }
    } catch (error) {}
    const timer = setTimeout(() => {
      this.setCountdownP3();
      clearTimeout(timer);
      return (this.countDownFake2.string = Room.CountdownP3.toString());
    }, 1200);
  }
  setCountdownP4() {
    try {
      // if (Room.roundGame !== "WELCOME") {
      //   this.countDownFake3.string = Countdown.toString();
      // }
    } catch (error) {}
    const timer = setTimeout(() => {
      this.setCountdownP4();
      clearTimeout(timer);
      return (this.countDownFake3.string = Room.CountdownP4.toString());
    }, 1200);
  }
  setCountdownP5() {
    try {
      if (Room.roundGame !== "SHOWDOWN") {
        this.countDownFake4.string = Room.CountdownP5.toString();
        if (Room.CountdownP5 < 10) {
          const timer = setTimeout(() => {
            if (
              Room.currentTurn ==
              Room?.statePlayers[
                Room.seatPlayerReal + 4 === 5
                  ? 5
                  : (Room.seatPlayerReal + 4) % 5
              ]?.turn
            ) {
              this.TableNode.getChildByName(`Player5`).getChildByName(
                "countdown"
              ).active = false;
              return clearTimeout(timer);
            }
            try {
              this.setCountdownP5();
              Room.CountdownP5--;
              return clearTimeout(timer);
            } catch (error) {}
          }, 1200);
        }
      } else {
        this.TableNode.getChildByName(`Player5`).getChildByName(
          "countdown"
        ).active = false;
      }
    } catch (error) {}
  }
  // ROoom state
  async setRoomState(roomState: any) {
    try {
      //get seat
      if (!Room.seatPlayerReal) {
        Object.values(roomState[1])?.map((item: any) => {
          if (Room.profileUser.username === item.username) {
            Room.seatPlayerReal = item.seat;
          }
        });
      }
    } catch (error) {}
    //get Arr playing
    if (roomState[1] !== undefined) {
      let ArrTemp = [];
      Object.values(roomState[1]).map((item: any, index) => {
        if (Room.currentChips < item.accumulatedBet) {
          Room.currentChips = item.accumulatedBet;
        }

        if (item.statement === "Playing") ArrTemp.push(item.turn);
        Room.statePlayers[item.seat] = item;
        if (item.action !== "" && item.action !== undefined) {
          this.countActionEmpty++;
        }
      });

      if (Room.ArrPlayersPlaying?.length !== ArrTemp?.length)
        Room.ArrPlayersPlaying = ArrTemp;
    }

    if (Room.stateOnready !== roomState[0]) {
      Room.stateOnready = roomState[0];
    }
    if (Room.potSize !== roomState[5]) {
      Room.potSize = roomState[5];
    }
    if (
      Room.roundGame === roomState[2] &&
      (this.flagCount === 2 || this.flagCount === 0)
    ) {
      if (
        Room.ArrPlayersPlaying[
          (roomState[4] + 1) % Room.ArrPlayersPlaying.length
        ] == Room?.statePlayers[Room.seatPlayerReal]?.turn &&
        roomState[2] !== "SHOWDOWN" &&
        roomState[2] !== "WELCOME" &&
        !this.endGame
      ) {
        try {
          if (
            Room?.statePlayers[Room.seatPlayerReal]?.accumulatedBet ==
            Room.currentChips
          ) {
            this.node
              .getChildByName("playingRoom")
              .getChildByName("Button")
              .getChildByName("check").active = true;
          } else {
            this.node
              .getChildByName("playingRoom")
              .getChildByName("Button")
              .getChildByName("check").active = false;
          }
          setTimeout(
            () => {
              // before is player (2)

              if (Room.roundGame !== "SHOWDOWN") {
                // this.flagCount = 2;
                console.log("count player ");
                this.node
                  .getChildByName("playingRoom")
                  .getChildByName("Button").active = true;
                this.TableNode.getChildByName("Player1").getChildByName(
                  "countdown"
                ).active = true;
                this.setCountdownP1();
              }
            },
            this.countActionEmpty !== 0 ? 2500 : 5000
          );
        } catch (error) {}
      } else {
        try {
          this.node
            .getChildByName("playingRoom")
            .getChildByName("Button").active = false;
        } catch (error) {}
      }
    } else {
      if (
        Room.betRound < Room.currentChips &&
        roomState[2] !== "PREFLOP" &&
        roomState[2] !== "WELCOME"
      ) {
        this.handleRoundGame(roomState[2]);
        // await this.sleep(2000);
        if (Room.currentChips >= Room.chiplevel) {
          Room.betRound = Room.currentChips;
        }
      }
      Room.roundGame = roomState[2];
      // next turn
      if (
        Room.ArrPlayersPlaying[
          (roomState[4] + 1) % Room.ArrPlayersPlaying.length
        ] == Room?.statePlayers[Room.seatPlayerReal]?.turn &&
        roomState[2] !== "SHOWDOWN" &&
        roomState[2] !== "WELCOME" &&
        !this.endGame
      ) {
        try {
          if (
            Room?.statePlayers[Room.seatPlayerReal]?.accumulatedBet ==
            Room.currentChips
          ) {
            this.node
              .getChildByName("playingRoom")
              .getChildByName("Button")
              .getChildByName("check").active = true;
          } else {
            this.node
              .getChildByName("playingRoom")
              .getChildByName("Button")
              .getChildByName("check").active = false;
          }

          setTimeout(
            () => {
              // before is round Game (1)
              if (
                Room.roundGame !== "SHOWDOWN" &&
                (this.flagCount === 1 || this.flagCount === 0)
              ) {
                // this.flagCount = 1;

                console.log("count 1 ");

                this.node
                  .getChildByName("playingRoom")
                  .getChildByName("Button").active = true;
                this.TableNode.getChildByName("Player1").getChildByName(
                  "countdown"
                ).active = true;
                this.setCountdownP1();
              }
            },
            this.countActionEmpty !== 0 ? 2500 : 4000
          );
        } catch (error) {}
      } else {
        try {
          this.node
            .getChildByName("playingRoom")
            .getChildByName("Button").active = false;
        } catch (error) {}
      }
    }
    if (Room.bankerCards?.length !== roomState[3]?.length) {
      this.handleBankerCard(roomState[3]);
      Room.bankerCards = roomState[3];
    }
    //trigger animation chip

    if (Room.currentTurn !== roomState[4] && roomState[4] !== 6969) {
      try {
        switch (roomState[4]) {
          case Room?.statePlayers[Room.seatPlayerReal]?.turn:
            this.handlePlayerReal(Room?.statePlayers[Room.seatPlayerReal]);
            break;
          case Room?.statePlayers[
            Room.seatPlayerReal + 1 === 5 ? 5 : (Room.seatPlayerReal + 1) % 5
          ]?.turn:
            this.handleFakePlayer1(
              Room?.statePlayers[
                Room.seatPlayerReal + 1 === 5
                  ? 5
                  : (Room.seatPlayerReal + 1) % 5
              ]
            );

            break;
          case Room?.statePlayers[
            Room.seatPlayerReal + 2 === 5 ? 5 : (Room.seatPlayerReal + 2) % 5
          ]?.turn:
            this.handleFakePlayer2(
              Room?.statePlayers[
                Room.seatPlayerReal + 2 === 5
                  ? 5
                  : (Room.seatPlayerReal + 2) % 5
              ]
            );
            break;
          case Room?.statePlayers[
            Room.seatPlayerReal + 3 === 5 ? 5 : (Room.seatPlayerReal + 3) % 5
          ]?.turn:
            this.handleFakePlayer3(
              Room?.statePlayers[
                Room.seatPlayerReal + 3 === 5
                  ? 5
                  : (Room.seatPlayerReal + 3) % 5
              ]
            );
            break;
          case Room?.statePlayers[
            Room.seatPlayerReal + 4 === 5 ? 5 : (Room.seatPlayerReal + 4) % 5
          ]?.turn:
            this.handleFakePlayer4(
              Room?.statePlayers[
                Room.seatPlayerReal + 4 === 5
                  ? 5
                  : (Room.seatPlayerReal + 4) % 5
              ]
            );
            break;
        }
      } catch (error) {}
      Room.currentTurn = roomState[4];
    }
    // find countdown
    switch ((roomState[4] + 1) % Room.ArrPlayersPlaying.length) {
      case Room?.statePlayers[Room.seatPlayerReal]?.turn:
        break;
      case Room?.statePlayers[
        Room.seatPlayerReal + 1 === 5 ? 5 : (Room.seatPlayerReal + 1) % 5
      ]?.turn:
        this.countActionEmpty !== 0
          ? await this.sleep(1000)
          : await this.sleep(4000);

        this.TableNode.getChildByName("Player2").getChildByName(
          "countdown"
        ).active = true;
        this.setCountdownP2();

        break;
      case Room?.statePlayers[
        Room.seatPlayerReal + 2 === 5 ? 5 : (Room.seatPlayerReal + 2) % 5
      ]?.turn:
        this.TableNode.getChildByName("Player3").getChildByName(
          "countdown"
        ).active = true;
        this.setCountdownP3();
        break;
      case Room?.statePlayers[
        Room.seatPlayerReal + 3 === 5 ? 5 : (Room.seatPlayerReal + 3) % 5
      ]?.turn:
        this.TableNode.getChildByName("Player4").getChildByName(
          "countdown"
        ).active = true;
        this.setCountdownP4();
        break;
      case Room?.statePlayers[
        Room.seatPlayerReal + 4 === 5 ? 5 : (Room.seatPlayerReal + 4) % 5
      ]?.turn:
        this.countActionEmpty !== 0
          ? await this.sleep(2000)
          : await this.sleep(5000);

        this.TableNode.getChildByName(`Player5`).getChildByName(
          "countdown"
        ).active = true;

        this.setCountdownP5();

        break;
    }

    if (Room.remainingPlayer !== roomState[6]) {
      Room.remainingPlayer = roomState[6];
    }

    return (Room.roomState = roomState);
  }
  static setProfileUser(profileUser: any) {
    return (this.profileUser = profileUser);
  }

  async onLoad() {
    // Room.roomController.onStateChange((e) => {
    //   console.log(e, "check eee");
    // });
  }
  async start() {
    (this.TableNode = this.node
      .getChildByName("playingRoom")
      .getChildByName("banChoi")
      .getChildByName("Table")),
      (this.AnimationRoom = this.getComponent(Animation));

    this.TableNode.getChildByName("Player2").active = false;
    this.TableNode.getChildByName("Player3").active = false;
    this.TableNode.getChildByName("Player4").active = false;
    this.TableNode.getChildByName("Player5").active = false;

    // this.ActionPlayer = new ActionPlayer();
    this.ArrSpriteCards = this.node.getComponents(CardsLor)[0];
    this.AnimationP = this.getComponent(Animation);

    Room.roomController.onMessage("ALL", async (state) => {
      Room.CountdownP1 = 9;
      Room.CountdownP2 = 9;
      Room.CountdownP3 = 9;
      Room.CountdownP4 = 9;
      Room.CountdownP5 = 9;
      this.setRoomState(Object.values(state));
      await this.getInfo();
    });
    Room.roomController.onMessage("RESET_GAME", async (state) => {
      if (state.toString().indexOf(3) !== -1) {
        await this.sleep(3000);
        await Room.roomController.send("START_GAME");
      }
    });
    Room.roomController.onMessage(
      "RANK",
      (rank: { r: number; d: string; c: [] }) => {
        this.handleCards(rank);
      }
    );
    Room.roomController.onMessage("RESULT", async (results) => {
      this.endGame = true;
      Room.results = results;
      this.handleResult(results);
    });

    await this.sleep(7000);
    await Room.roomController.send("START_GAME");
  }

  //Cards
  private async handleCards(rank: { r: number; d: string; c: [] }) {
    setTimeout(() => {
      try {
        this.RankP1.string = `<color=#FFE000>${rank?.d}</color>`;
      } catch (error) {}
    }, 5000);
    try {
      if (rank.c !== undefined) {
        this.CardsReal = rank.c;
        this.TableNode.getChildByName("Player1")
          .getChildByName("card")
          .getChildByName("realCard1")
          .getComponentsInChildren(Sprite)[0].spriteFrame = this.handleGetCard(
          this.CardsReal[0]
        );
        this.TableNode.getChildByName("Player1")
          .getChildByName("card")
          .getChildByName("realCard2")
          .getComponentsInChildren(Sprite)[0].spriteFrame = this.handleGetCard(
          this.CardsReal[1]
        );
        this.TableNode.getChildByName("Player2")
          .getChildByName("Card")
          .getChildByName("Card 2a")
          .getComponentsInChildren(Sprite)[0].spriteFrame =
          this.handleGetCard("CloseCard");
        this.TableNode.getChildByName("Player2")
          .getChildByName("Card")
          .getChildByName("Card 2b")
          .getComponentsInChildren(Sprite)[0].spriteFrame =
          this.handleGetCard("CloseCard");
        this.TableNode.getChildByName("Player3")
          .getChildByName("Card")
          .getChildByName("Card 2a")
          .getComponentsInChildren(Sprite)[0].spriteFrame =
          this.handleGetCard("CloseCard");
        this.TableNode.getChildByName("Player3")
          .getChildByName("Card")
          .getChildByName("Card 2b")
          .getComponentsInChildren(Sprite)[0].spriteFrame =
          this.handleGetCard("CloseCard");
        this.TableNode.getChildByName("Player4")
          .getChildByName("Card")
          .getChildByName("Card 2a")
          .getComponentsInChildren(Sprite)[0].spriteFrame =
          this.handleGetCard("CloseCard");
        this.TableNode.getChildByName("Player4")
          .getChildByName("Card")
          .getChildByName("Card 2b")
          .getComponentsInChildren(Sprite)[0].spriteFrame =
          this.handleGetCard("CloseCard");
        this.TableNode.getChildByName("Player5")
          .getChildByName("Card")
          .getChildByName("Card 2a")
          .getComponentsInChildren(Sprite)[0].spriteFrame =
          this.handleGetCard("CloseCard");
        this.TableNode.getChildByName("Player5")
          .getChildByName("Card")
          .getChildByName("Card 2b")
          .getComponentsInChildren(Sprite)[0].spriteFrame =
          this.handleGetCard("CloseCard");
        this.TableNode.getChildByName("bankerCards")
          .getChildByName("Flipcard1")
          .getChildByName("CloseCard1")
          .getComponentsInChildren(Sprite)[0].spriteFrame =
          this.handleGetCard("CloseCard");
        this.TableNode.getChildByName("bankerCards")
          .getChildByName("Flipcard2")
          .getChildByName("CloseCard2")
          .getComponentsInChildren(Sprite)[0].spriteFrame =
          this.handleGetCard("CloseCard");
        this.TableNode.getChildByName("bankerCards")
          .getChildByName("Flipcard3")
          .getChildByName("CloseCard3")
          .getComponentsInChildren(Sprite)[0].spriteFrame =
          this.handleGetCard("CloseCard");
        this.TableNode.getChildByName("bankerCards")
          .getChildByName("Flipcard4")
          .getChildByName("CloseCard4")
          .getComponentsInChildren(Sprite)[0].spriteFrame =
          this.handleGetCard("CloseCard");

        this.TableNode.getChildByName("bankerCards")
          .getChildByName("Flipcard5")
          .getChildByName("CloseCard5")
          .getComponentsInChildren(Sprite)[0].spriteFrame =
          this.handleGetCard("CloseCard");

        this.betChipFake1.string = Room.chiplevel.toString();
        this.aniBetChipFake1.string = Room.chiplevel.toString();

        this.betChipFake2.string = Room.chiplevel.toString();
        this.aniBetChipFake2.string = Room.chiplevel.toString();

        this.betChipFake3.string = Room.chiplevel.toString();
        this.aniBetChipFake3.string = Room.chiplevel.toString();

        this.betChipFake4.string = Room.chiplevel.toString();
        this.aniBetChipFake4.string = Room.chiplevel.toString();

        this.aniBetChipReal.string = Room.chiplevel.toString();
        this.betChipReal.string = Room.chiplevel.toString();
        this.AnimationRoom.play("initChip");
        await this.sleep(4000);
        await this.AnimationRoom.play("chiabai-fullplayer");
      }
    } catch (error) {}
  }
  private handleGetCard(name) {
    if (name === "Win") {
      return this.ArrSpriteCards[`Win`];
    } else if (name === "Lose") {
      return this.ArrSpriteCards[`Lose`];
    } else if (name === "CloseCard") {
      return this.ArrSpriteCards[`CloseCard`];
    }
    return this.ArrSpriteCards[`Card${name}`];
  }
  //banker
  private async handleBankerCard(Cards: any, result?: any) {
    try {
      this.node.getChildByName("playingRoom").getChildByName("Button").active =
        false;
      await this.sleep(1000);
      try {
        this.TableNode.getChildByName("bankerCards")
          .getChildByName("Flipcard1")
          .getChildByName("BankerCard1")
          .getComponentsInChildren(Sprite)[0].spriteFrame = this.handleGetCard(
          Cards[0]
        );
        this.TableNode.getChildByName("bankerCards")
          .getChildByName("Flipcard2")
          .getChildByName("BankerCard2")
          .getComponentsInChildren(Sprite)[0].spriteFrame = this.handleGetCard(
          Cards[1]
        );

        this.TableNode.getChildByName("bankerCards")
          .getChildByName("Flipcard3")
          .getChildByName("BankerCard3")
          .getComponentsInChildren(Sprite)[0].spriteFrame = this.handleGetCard(
          Cards[2]
        );
        this.TableNode.getChildByName("bankerCards")
          .getChildByName("Flipcard4")
          .getChildByName("BankerCard4")
          .getComponentsInChildren(Sprite)[0].spriteFrame = this.handleGetCard(
          Cards[3]
        );
        this.TableNode.getChildByName("bankerCards")
          .getChildByName("Flipcard5")
          .getChildByName("BankerCard5")
          .getComponentsInChildren(Sprite)[0].spriteFrame = this.handleGetCard(
          Cards[4]
        );
      } catch (error) {}

      if (Room.roundGame !== "SHOWDOWN" && Room.results == undefined) {
        if (Cards.length == 3) {
          setTimeout(() => {
            return this.AnimationRoom.play("show3card");
          }, 1000);
        }
        if (Cards.length == 4) {
          setTimeout(() => {
            this.AnimationRoom.play("showcard4");
          }, 1000);
        }

        if (Cards.length >= 5) {
          this.AnimationRoom.play("showcard5");
        }
      }

      if (
        Room.roundGame == "SHOWDOWN" &&
        Object.keys(Room.results).length > 1
      ) {
        console.log("allin ");
        console.log(Room.results, "results ");
        await this.AnimationRoom.play("endRoundChip");
        await this.sleep(1000);
        if (this.countBankerCard === 0) {
          this.AnimationRoom.play("show5card-allin");
        }
        if (this.countBankerCard === 3) {
          this.AnimationRoom.play("show3card-allin");
        }
        if (this.countBankerCard === 4) {
          this.AnimationRoom.play("showcard5");
        }

        await this.sleep(4000);
        await this.AnimationRoom.play("showcard-10card");
        console.log("SHow card");
        this.node
          .getChildByName("playingRoom")
          .getChildByName("Button").active = false;

        await console.log("sau show hand");
        await this.sleep(8000);
        await Room.roomController.send("RESET_GAME");
        await this.handleReset();
      } else if (
        Room.roundGame == "SHOWDOWN" ||
        Object.keys(Room.results).length == 1
      ) {
        this.TableNode.getChildByName("Player1").getChildByName(
          "countdown"
        ).active = false;
        this.TableNode.getChildByName("Player2").getChildByName(
          "countdown"
        ).active = false;
        this.TableNode.getChildByName("Player3").getChildByName(
          "countdown"
        ).active = false;
        this.TableNode.getChildByName("Player4").getChildByName(
          "countdown"
        ).active = false;
        this.TableNode.getChildByName("Player5").getChildByName(
          "countdown"
        ).active = false;
        console.log("fold");
        await this.sleep(6000);
        await Room.roomController.send("RESET_GAME");
        await this.handleReset();
        console.log(Room.profileUser.chips, "Room.profileUser.chips");
        console.log(Room.minChipToStay, "Room.minChipToStay");
        if (Room.profileUser.chips < Room.minChipToStay) {
          director.loadScene("zuno-poker");
        }
      } else {
      }
    } catch (error) {}

    if (this.countBankerCard !== Room.bankerCards.length)
      this.countBankerCard = Cards.length;
  }
  //Player
  private async handleFakePlayer1(FakeUser1?: any, result?: any, list?: any) {
    if (this.TempInitP2 == undefined)
      this.TempInitP2 = FakeUser1.chips + FakeUser1.accumulatedBet;

    try {
      if (Object.keys(list)?.length > 1) {
        if (result?.c !== undefined) {
          if (result?.w !== undefined)
            this.chipWinP2.string = (
              this.TempInitP2 - FakeUser1.chips
            ).toString();

          setTimeout(() => {
            return (this.RankP2.string = `<color=#FFE000>${result?.d}</color>`);
          }, 6000);
        }
      } else if (Object.keys(list)?.length == 1) {
        if (result?.w !== undefined) {
          await this.AnimationRoom.play("endRoundChip");
          await this.sleep(1500);
          // this.chipWinP2.string = (
          //   this.TempInitP2 - FakeUser1.chips
          // ).toString();

          this.AnimationRoom.play("WinnerP2");
        }
      }
    } catch (error) {}
    if (
      FakeUser1?.chips <
        (this.tempFake1?.chips ? this.tempFake1?.chips : 999999999) &&
      Object.keys(FakeUser1).length != 0 &&
      FakeUser1?.accumulatedBet > Room.chiplevel
    ) {
      this.betChipFake1.string = (
        FakeUser1.accumulatedBet - Room.betRound
      ).toString();
      this.aniBetChipFake1.string = (
        Room.currentChips - this.tempFake1.accumulatedBet
      ).toString();

      this.AnimationRoom.play("chipBetP2");
    }
    this.tempFake1 = FakeUser1;
  }
  private async handleFakePlayer2(FakeUser2?: any, result?: any, list?: any) {
    if (this.TempInitP3 == undefined)
      this.TempInitP3 = FakeUser2.chips + FakeUser2.accumulatedBet;

    try {
      if (Object.keys(list)?.length > 1) {
        if (result?.c !== undefined) {
          // if (result?.w !== undefined)
          // this.chipWinP3.string = (
          //   this.TempInitP3 - FakeUser2.chips
          // ).toString();
          setTimeout(() => {
            return (this.RankP3.string = `<color=#FFE000>${result?.d}</color>`);
          }, 6000);

          this.TableNode.getChildByName("Player3").getChildByName(
            "Win-lose"
          ).active = true;
        }
      } else if (Object.keys(list)?.length == 1) {
        if (result?.w !== undefined) {
          // this.chipWinP3.string = (
          //   this.TempInitP3 - FakeUser2.chips
          // ).toString();
          await this.AnimationRoom.play("endRoundChip");
          await this.sleep(1500);

          this.AnimationRoom.play("WinnerP3");
        }
      }
    } catch (error) {}
    if (
      FakeUser2?.chips <
        (this.tempFake2?.chips ? this.tempFake2?.chips : 999999999) &&
      Object.keys(FakeUser2).length != 0 &&
      FakeUser2?.accumulatedBet > Room.chiplevel
    ) {
      this.betChipFake2.string = (
        FakeUser2.accumulatedBet - Room.betRound
      ).toString();
      this.aniBetChipFake2.string = (
        Room.currentChips - this.tempFake2.accumulatedBet
      ).toString();

      this.AnimationRoom.play("chipBetP3");
    }
    this.tempFake2 = FakeUser2;
  }
  private async handleFakePlayer3(FakeUser3?: any, result?: any, list?: any) {
    if (this.TempInitP4 == undefined)
      this.TempInitP4 = FakeUser3.chips + FakeUser3.accumulatedBet;

    try {
      if (Object.keys(list)?.length > 1) {
        if (result?.c !== undefined) {
          // if (result?.w !== undefined)
          // this.chipWinP4.string = (
          //   this.TempInitP4 - FakeUser3.chips
          // ).toString();

          setTimeout(() => {
            return (this.RankP4.string = `<color=#FFE000>${result?.d}</color>`);
          }, 6000);
        }
      } else if (Object.keys(list)?.length == 1) {
        if (result?.w !== undefined) {
          await this.AnimationRoom.play("endRoundChip");
          await this.sleep(1500);
          // this.chipWinP4.string = (
          //   this.TempInitP4 - FakeUser3.chips
          // ).toString();
          this.AnimationRoom.play("WinnerP4");
        }
      }
    } catch (error) {}
    if (
      FakeUser3?.chips <
        (this.tempFake3?.chips ? this.tempFake3?.chips : 999999999) &&
      Object.keys(FakeUser3).length != 0 &&
      FakeUser3?.accumulatedBet > Room.chiplevel
    ) {
      this.betChipFake3.string = (
        FakeUser3.accumulatedBet - Room.betRound
      ).toString();
      this.aniBetChipFake3.string = (
        Room.currentChips - this.tempFake3.accumulatedBet
      ).toString();

      this.AnimationRoom.play("chipBetP4");
    }
    this.tempFake3 = FakeUser3;
  }
  private async handleFakePlayer4(FakeUser4?: any, result?: any, list?: any) {
    if (this.TempInitP5 == undefined)
      this.TempInitP5 = FakeUser4.chips + FakeUser4.accumulatedBet;
    try {
      if (Object.keys(list)?.length > 1) {
        if (result?.c !== undefined) {
          if (result?.w === true) {
            await this.sleep(1500);
            this.chipWinP5.string = `<color=#FFE000> + ${(
              Room?.statePlayers[
                Room.seatPlayerReal + 4 === 5
                  ? 5
                  : (Room.seatPlayerReal + 4) % 5
              ]?.chips - FakeUser4.chips
            ).toString()}</color>`;
          }

          setTimeout(() => {
            this.RankP5.string = `<color=#FFE000>${result?.d}</color>`;
          }, 7700);
        }
      } else if (Object.keys(list)?.length <= 1) {
        if (result?.w === true) {
          await this.AnimationRoom.play("endRoundChip");
          await this.sleep(1500);
          this.chipWinP5.string = `<color=#FFE000> + ${(
            Room?.statePlayers[
              Room.seatPlayerReal + 4 === 5 ? 5 : (Room.seatPlayerReal + 4) % 5
            ]?.chips - FakeUser4.chips
          ).toString()}</color>`;
          console.log(
            Room?.statePlayers[
              Room.seatPlayerReal + 4 === 5 ? 5 : (Room.seatPlayerReal + 4) % 5
            ]?.chips - FakeUser4.chips,
            "chip win p5 2222"
          );
          this.AnimationRoom.play("WinnerP5");
        }
      }
    } catch (error) {}
    if (
      FakeUser4?.chips <
        (this.tempFake4?.chips ? this.tempFake4?.chips : 999999999) &&
      Object.keys(FakeUser4).length != 0 &&
      FakeUser4?.accumulatedBet > Room.chiplevel
    ) {
      this.betChipFake4.string = (
        FakeUser4.accumulatedBet - Room.betRound
      ).toString();
      this.aniBetChipFake4.string = (
        Room.currentChips - this.tempFake4.accumulatedBet
      ).toString();

      this.AnimationRoom.play("chipBetP5");
    }
    this.tempFake4 = FakeUser4;
  }

  private async handlePlayerReal(RealUser: any, result?: any, list?: any) {
    if (this.TempInitP1 == undefined)
      this.TempInitP1 = RealUser.chips + RealUser.accumulatedBet;
    if (
      RealUser?.chips <
        (this.tempRealUser?.chips ? this.tempRealUser?.chips : 9999999999) &&
      Object.keys(RealUser).length != 0 &&
      RealUser?.accumulatedBet > Room.chiplevel
    ) {
      this.aniBetChipReal.string = (
        Room.currentChips - this.tempRealUser.accumulatedBet
      ).toString();
      this.betChipReal.string = (
        RealUser.accumulatedBet - Room.betRound
      ).toString();

      this.AnimationRoom.play("chipBetP1");
    }
    try {
      if (Object.keys(list)?.length > 1) {
        if (result?.c !== undefined) {
          if (result?.w == true) {
            await this.sleep(1500);
            this.chipWinP1.string = `<color=#FFE000> +${(
              Room?.statePlayers[Room.seatPlayerReal]?.chips - RealUser.chips
            ).toString()}</color>`;
          }
          this.RankP1.string = `<color=#FFE000>${result?.d}</color>`;
        }
      } else if (Object.keys(list)?.length <= 1) {
        await this.AnimationRoom.play("endRoundChip");
        await this.sleep(1500);
        this.chipWinP1.string = `<color=#FFE000> +${(
          Room?.statePlayers[Room.seatPlayerReal]?.chips - RealUser.chips
        ).toString()}</color>`;
        this.AnimationRoom.play("WinnerP1");
      }
    } catch (error) {}
    this.tempRealUser = RealUser;
    Room.profileUser.chips = RealUser.chips;
  }

  //other
  async getInfo() {
    // Room.profileUser.chips = Room?.statePlayers[Room.seatPlayerReal]?.chips;
    if (Room?.roundGame === "SHOWDOWN") await this.sleep(10000);
    try {
      this.nameReal.string = Room?.statePlayers[Room.seatPlayerReal]?.username;
      this.chipsReal.string =
        Room?.statePlayers[Room.seatPlayerReal]?.chips.toString();

      if (
        Room?.statePlayers[
          Room.seatPlayerReal + 1 === 5 ? 5 : (Room.seatPlayerReal + 1) % 5
        ]?.username
      ) {
        this.TableNode.getChildByName("Player2").active = true;

        this.nameFake1.string =
          Room?.statePlayers[
            Room.seatPlayerReal + 1 === 5 ? 5 : (Room.seatPlayerReal + 1) % 5
          ]?.username;

        this.chipsFake1.string =
          Room?.statePlayers[
            Room.seatPlayerReal + 1 === 5 ? 5 : (Room.seatPlayerReal + 1) % 5
          ]?.chips.toString();
      } else {
        this.TableNode.getChildByName("Player2").active = false;
      }

      if (
        Room?.statePlayers[
          Room.seatPlayerReal + 2 === 5 ? 5 : (Room.seatPlayerReal + 2) % 5
        ]?.username
      ) {
        this.TableNode.getChildByName("Player3").active = true;

        this.nameFake2.string =
          Room?.statePlayers[
            Room.seatPlayerReal + 2 === 5 ? 5 : (Room.seatPlayerReal + 2) % 5
          ]?.username;
        this.chipsFake2.string =
          Room?.statePlayers[
            Room.seatPlayerReal + 2 === 5 ? 5 : (Room.seatPlayerReal + 2) % 5
          ]?.chips.toString();
      } else {
        this.TableNode.getChildByName("Player3").active = false;
      }

      if (
        Room?.statePlayers[
          Room.seatPlayerReal + 3 === 5 ? 5 : (Room.seatPlayerReal + 3) % 5
        ]?.username
      ) {
        this.TableNode.getChildByName("Player4").active = true;
        this.nameFake3.string =
          Room?.statePlayers[
            Room.seatPlayerReal + 3 === 5 ? 5 : (Room.seatPlayerReal + 3) % 5
          ]?.username;
        this.chipsFake3.string =
          Room?.statePlayers[
            Room.seatPlayerReal + 3 === 5 ? 5 : (Room.seatPlayerReal + 3) % 5
          ]?.chips.toString();
      } else {
        this.TableNode.getChildByName("Player4").active = false;
      }
      if (
        Room?.statePlayers[
          Room?.seatPlayerReal + 4 === 5 ? 5 : (Room?.seatPlayerReal + 4) % 5
        ]?.username
      ) {
        this.TableNode.getChildByName("Player5").active = true;

        this.nameFake4.string =
          Room?.statePlayers[
            Room.seatPlayerReal + 4 === 5 ? 5 : (Room.seatPlayerReal + 4) % 5
          ]?.username;
        this.chipsFake4.string =
          Room?.statePlayers[
            Room.seatPlayerReal + 4 === 5 ? 5 : (Room.seatPlayerReal + 4) % 5
          ]?.chips.toString();
      } else {
        this.TableNode.getChildByName("Player5").active = false;
      }
    } catch (error) {}
    // console.log(Room.statePlayers,"Test Send Start");
  }

  private async handleResult(result) {
    await result.map(async (item) => {
      console.log(item, "check item win");
      switch (item.t) {
        // real
        case Room?.statePlayers[Room.seatPlayerReal]?.turn:
          console.log("case 1");
          this.TableNode.getChildByName("Player1")
            .getChildByName("Win-lose")
            .getChildByName("WinLose")
            .getComponentsInChildren(Sprite)[0].spriteFrame =
            this.handleGetCard(item?.w === true ? "Win" : "Lose");
          this.handlePlayerReal(
            Room?.statePlayers[Room.seatPlayerReal],
            item,
            result
          );
          break;
        //fake 1
        case Room?.statePlayers[
          Room.seatPlayerReal + 1 === 5 ? 5 : (Room.seatPlayerReal + 1) % 5
        ]?.turn:
          console.log("case 2");

          this.TableNode.getChildByName("Player2")
            .getChildByName("Card")
            .getChildByName("UnCard")
            .getComponentsInChildren(Sprite)[0].spriteFrame =
            this.handleGetCard(result?.c[0]);
          this.TableNode.getChildByName("Player2")
            .getChildByName("Card")
            .getChildByName("UnCard2")
            .getComponentsInChildren(Sprite)[0].spriteFrame =
            this.handleGetCard(result?.c[1]);

          this.TableNode.getChildByName("Player2")
            .getChildByName("Win-lose")
            .getChildByName("WinLose")
            .getComponentsInChildren(Sprite)[0].spriteFrame =
            this.handleGetCard(result?.w === true ? "Win" : "Lose");
          this.handleFakePlayer1(
            Room?.statePlayers[
              Room.seatPlayerReal + 1 === 5 ? 5 : (Room.seatPlayerReal + 1) % 5
            ],
            item,
            result
          );
          break;

        //fake2
        case Room?.statePlayers[
          Room.seatPlayerReal + 2 === 5 ? 5 : (Room.seatPlayerReal + 2) % 5
        ]?.turn:
          console.log("case 31");

          this.TableNode.getChildByName("Player3")
            .getChildByName("Card")
            .getChildByName("UnCard")
            .getComponentsInChildren(Sprite)[0].spriteFrame =
            this.handleGetCard(result?.c[0]);
          this.TableNode.getChildByName("Player3")
            .getChildByName("Card")
            .getChildByName("UnCard2")
            .getComponentsInChildren(Sprite)[0].spriteFrame =
            this.handleGetCard(result?.c[1]);

          this.TableNode.getChildByName("Player3")
            .getChildByName("Win-lose")
            .getChildByName("WinLose")
            .getComponentsInChildren(Sprite)[0].spriteFrame =
            this.handleGetCard(result?.w === true ? "Win" : "Lose");
          this.handleFakePlayer2(
            Room?.statePlayers[
              Room.seatPlayerReal + 2 === 5 ? 5 : (Room.seatPlayerReal + 2) % 5
            ],
            item,
            result
          );
          break;
        //fake3
        case Room?.statePlayers[
          Room.seatPlayerReal + 3 === 5 ? 5 : (Room.seatPlayerReal + 3) % 5
        ]?.turn:
          console.log("case 4");

          this.TableNode.getChildByName("Player4")
            .getChildByName("Card")
            .getChildByName("UnCard")
            .getComponentsInChildren(Sprite)[0].spriteFrame =
            this.handleGetCard(result?.c[0]);
          this.TableNode.getChildByName("Player4")
            .getChildByName("Card")
            .getChildByName("UnCard2")
            .getComponentsInChildren(Sprite)[0].spriteFrame =
            this.handleGetCard(result?.c[1]);

          this.TableNode.getChildByName("Player4")
            .getChildByName("Win-lose")
            .getChildByName("WinLose")
            .getComponentsInChildren(Sprite)[0].spriteFrame =
            this.handleGetCard(result?.w === true ? "Win" : "Lose");
          this.handleFakePlayer3(
            Room?.statePlayers[
              Room.seatPlayerReal + 3 === 5 ? 5 : (Room.seatPlayerReal + 3) % 5
            ],
            item,
            result
          );
          break;
        //   fake4
        case Room?.statePlayers[
          Room.seatPlayerReal + 4 === 5 ? 5 : (Room.seatPlayerReal + 4) % 5
        ]?.turn:
          console.log("case 5");

          this.TableNode.getChildByName("Player5")
            .getChildByName("Win-lose")
            .getChildByName("WinLose")
            .getComponentsInChildren(Sprite)[0].spriteFrame =
            this.handleGetCard(item?.w === true ? "Win" : "Lose");
          if (item?.c) {
            this.TableNode.getChildByName("Player5")
              .getChildByName("Card")
              .getChildByName("UnCard")
              .getComponentsInChildren(Sprite)[0].spriteFrame =
              this.handleGetCard(item?.c[0]);
            this.TableNode.getChildByName("Player5")
              .getChildByName("Card")
              .getChildByName("UnCard2")
              .getComponentsInChildren(Sprite)[0].spriteFrame =
              this.handleGetCard(item?.c[1]);
          }
          this.handleFakePlayer4(
            Room?.statePlayers[
              Room.seatPlayerReal + 4 === 5 ? 5 : (Room.seatPlayerReal + 4) % 5
            ],
            item,
            result
          );
          break;
      }
    });
    if (Object.keys(Room.results).length === 1 || Room.bankerCards.length === 5)
      await this.handleBankerCard(Room.bankerCards);
  }

  private async handleRoundGame(roundGame: string) {
    switch (roundGame) {
      case "WELCOME":
        break;
      case "FLOP":
        this.totalBet.string = Room.potSize.toString();
        console.log(Room.betRound, "bet round");
        console.log(Room.currentChips, "current");
        await this.sleep(700);
        await this.AnimationRoom.play("endRoundChip");

        break;
      case "TURN":
        console.log(Room.betRound, "bet round");
        console.log(Room.currentChips, "current");
        this.totalBet.string = Room.potSize.toString();
        await this.sleep(700);
        await this.AnimationRoom.play("endRoundChip");

        break;
      case "RIVER":
        console.log(Room.betRound, "bet round");
        console.log(Room.currentChips, "current");
        this.totalBet.string = Room.potSize.toString();
        await this.sleep(700);
        await this.AnimationRoom.play("endRoundChip");

        break;
      case "SHOWDOWN":
        // this.handleBankerCard(Room.bankerCards);
        this.totalBet.string = Room.potSize.toString();
        break;
    }
  }

  private handleReset() {
    this.AnimationRoom.play("thuhoicard-fullplayer");
    Room.currentChips = Room.chiplevel;
    this.tempRealUser = {
      chips: 0,
      accumulatedBet: 0,
    };
    this.tempFake1 = {
      chips: 0,
      accumulatedBet: 0,
    };
    this.tempFake2 = {
      chips: 0,
      accumulatedBet: 0,
    };
    this.tempFake3 = {
      chips: 0,
      accumulatedBet: 0,
    };
    this.tempFake4 = {
      chips: 0,
      accumulatedBet: 0,
    };
    this.totalBet.string = "";
    this.endGame = false;
    this.TempInitP1 = undefined;
    this.TempInitP2 = undefined;
    this.TempInitP3 = undefined;
    this.TempInitP4 = undefined;
    this.TempInitP5 = undefined;
    this.countBankerCard = 0;
    this.countActionEmpty = 0;
    Room.betRound = 0;
    Room.results = undefined;

    //reset players
    this.RankP1.string = "";
    this.RankP2.string = "";
    this.RankP3.string = "";
    this.RankP4.string = "";
    this.RankP5.string = "";

    this.chipWinP1.string = "";
    this.chipWinP2.string = "";
    this.chipWinP3.string = "";
    this.chipWinP4.string = "";
    this.chipWinP5.string = "";

    this.TableNode.getChildByName("Player1")
      .getChildByName("card")
      .getChildByName("realCard1")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("Player1")
      .getChildByName("card")
      .getChildByName("realCard2")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;

    this.TableNode.getChildByName("Player2")
      .getChildByName("Card")
      .getChildByName("UnCard")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("Player2")
      .getChildByName("Card")
      .getChildByName("UnCard2")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;

    this.TableNode.getChildByName("Player3")
      .getChildByName("Card")
      .getChildByName("UnCard")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("Player3")
      .getChildByName("Card")
      .getChildByName("UnCard2")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;

    this.TableNode.getChildByName("Player4")
      .getChildByName("Card")
      .getChildByName("UnCard")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("Player4")
      .getChildByName("Card")
      .getChildByName("UnCard2")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;

    this.TableNode.getChildByName("Player5")
      .getChildByName("Card")
      .getChildByName("UnCard")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("Player5")
      .getChildByName("Card")
      .getChildByName("UnCard2")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    //reset banker
    this.TableNode.getChildByName("bankerCards")
      .getChildByName("Flipcard1")
      .getChildByName("CloseCard1")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;

    this.TableNode.getChildByName("bankerCards")
      .getChildByName("Flipcard1")
      .getChildByName("BankerCard1")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("bankerCards")
      .getChildByName("Flipcard2")
      .getChildByName("CloseCard2")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("bankerCards")
      .getChildByName("Flipcard2")
      .getChildByName("BankerCard2")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("bankerCards")
      .getChildByName("Flipcard3")
      .getChildByName("CloseCard3")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("bankerCards")
      .getChildByName("Flipcard3")
      .getChildByName("BankerCard3")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("bankerCards")
      .getChildByName("Flipcard4")
      .getChildByName("CloseCard4")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("bankerCards")
      .getChildByName("Flipcard5")
      .getChildByName("CloseCard5")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("bankerCards")
      .getChildByName("Flipcard4")
      .getChildByName("BankerCard4")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("bankerCards")
      .getChildByName("Flipcard5")
      .getChildByName("BankerCard5")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;

    //winlose
    this.TableNode.getChildByName("Player1")
      .getChildByName("Win-lose")
      .getChildByName("WinLose")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("Player2")
      .getChildByName("Win-lose")
      .getChildByName("WinLose")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("Player3")
      .getChildByName("Win-lose")
      .getChildByName("WinLose")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("Player4")
      .getChildByName("Win-lose")
      .getChildByName("WinLose")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;
    this.TableNode.getChildByName("Player5")
      .getChildByName("Win-lose")
      .getChildByName("WinLose")
      .getComponentsInChildren(Sprite)[0].spriteFrame = null;

    // dis room
  }

  private sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  test() {
    this.countDownReal.string = "11";
    // director.loadScene("zuno-poker");
  }
}
