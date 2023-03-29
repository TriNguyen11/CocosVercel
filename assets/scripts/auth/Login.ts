import { _decorator, CCString, Component, director, EditBox, sys } from "cc";
import { EPokerScene } from "db://assets/__types__/layout.type";
import { Config } from "../Config";
import { Main } from "db://assets/scripts/Main";

const { ccclass, property } = _decorator;

@ccclass("Login")
export class Login extends Component {
  @property(CCString) facebookAppId: String = "";
  @property(CCString) googleAppId: String = "";

  @property(EditBox) public username: EditBox;
  @property(EditBox) public password: EditBox;

  private main: Main;

  public onLoad() {
    this.main = Main.getInstance();
  }

  public start() {
    // sys.localStorage.clear();
    // Config.setUpXsolla();
  }

  public update(deltaTime: number) {}

  public loginFacebook() {}

  public async loginGoogle() {
    // sys.openURL("http://localhost:9001/auth/google");
    if (sys.platform.toLowerCase() == "android") {
      // native.reflection.callStaticMethod(
      //   "com/cocos/game/XsollaNativeAuth",
      //   "xLoginInit",
      //   "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
      //   Xsolla.settings.loginId,
      //   Xsolla.settings.clientId.toString(),
      //   this.facebookAppId,
      //   this.googleAppId
      // );
    }
    // native.reflection.callStaticMethod(
    //   "com/cocos/game/AppActivity",
    //   "showAlertDialog",
    //   "(Ljava/lang/String;Ljava/lang/String;)V",
    //   "title",
    //   "hahahahha"
    // );
  }

  public loginApple() {}

  public async loginGuest() {
    try {
      const reqGuest = await fetch(Config.BASE_CMS_END_POINT + "/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "normal",
          payload: { username: "zunohan", password: "111111" },
        }),
      });
      const res = await reqGuest.json();
      if (!res.success) throw new Error("Bad Request!");
      sys.localStorage.setItem("accessToken", res.accessToken);
    } catch (err) {
      console.error(err);
    }
  }

  public async loginUP() {
    const username = this.username.string;
    const password = this.password.string;

    try {
      if (
        username.length < 6 ||
        username.length > 20 ||
        password.length < 6 ||
        password.length > 20
      )
        throw new Error("Username or Password is invalid!");

      const user = await Config.fetchData(
        "POST",
        Config.BASE_CMS_END_POINT + "/auth/signin",
        JSON.stringify({
          type: "normal",
          payload: { username, password },
        })
      );
      if (!user.success) throw new Error(user.message);
      sys.localStorage.setItem("accessToken", user.accessToken);
      this.main.authNode.active = false;
      this.main.lobbyNode.active = true;
      this.main.mainCamera.node.setPosition(
        this.main.initX + this.main.horizonAdd,
        this.main.initY
      );
      
    } catch (error) {
      console.error(error);
    }
  }
}
