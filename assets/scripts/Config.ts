import { _decorator, Label, Node, sys } from "cc";
import { ELang } from "db://assets/__types__/global.type";
import { English, Vietnamese } from "db://assets/localization";

const { ccclass, property } = _decorator;

@ccclass("Config")
export class Config {
  public static BASE_CMS_END_POINT = "https://cms.dadsnetwork.net";
  public static BASE_GAME_END_POINT = "https://poker.dadsnetwork.net";
  public static BASE_GAME_WEBSOCKET = "wss://poker.dadsnetwork.net";

  // public static BASE_CMS_END_POINT = "http://localhost:9001";
  // public static BASE_GAME_END_POINT = "http://localhost:9000";
  // public static BASE_GAME_WEBSOCKET = "ws://localhost:9000";

  public static async fetchData(method: string, url: string, body?: string) {
    const accessToken = sys.localStorage.getItem("accessToken");
    try {
      const req = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body,
      });

      const res = await req.json();
      console.log(res);
      
      if (!res.success) throw new Error(res.message);
      return res.data ? res.data : res;
    } catch (err) {
      console.error(err);
    }
  }

  public static setUpXsolla() {
    const settings: XsollaSettings = {
      loginId: "475870d1-c2a9-4bcb-966a-7fcd763c2f8a",
      projectId: "475870d1-c2a9-4bcb-966a-7fcd763c2f8a",
      clientId: 4659,
      enableSandbox: true,
    };

    Xsolla.init(settings);
    console.log(Xsolla);
  }

  public static formatCurrency(number: number) {
    if (number.toString().length > 6) {
      const suffixes = ["", "K", "M", "B", "T"];
      const suffixNum = Math.floor(("" + number).length / 3);
      let shortValue = parseFloat(
        (suffixNum != 0
          ? number / Math.pow(1000, suffixNum)
          : number
        ).toPrecision(2)
      );

      if (shortValue % 1 != 0) {
        shortValue = Number(shortValue.toFixed(1));
      }

      return shortValue + " " + suffixes[suffixNum];
    } else {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  public static getLang() {
    return sys.localStorage.getItem("lang");
  }

  public static setLang(lang: ELang) {
    sys.localStorage.setItem("lang", lang);
  }

  public static localize(node: Node) {
    const defaultLang = sys.localStorage.getItem("lang");
    if (!defaultLang) sys.localStorage.setItem("lang", ELang.en);
    // console.log(this.node.getComponentsInChildren(Label));
    switch (this.getLang()) {
      case ELang.en:
        for (let n of node.getComponentsInChildren(Label))
          for (let lang in English)
            if (n.node.name === lang) {
              n.string = English[n.node.name];
            }
        break;
      case ELang.vn:
        for (let n of node.getComponentsInChildren(Label))
          for (let lang in Vietnamese)
            if (n.node.name === lang) {
              n.string = Vietnamese[n.node.name];
            }
        break;
      default:
        break;
    }
  }

  public static handleNumerFm(number: number) {
    if (number.toString().length > 6) {
      const suffixes = ["", "K", "M", "B", "T"];
      const suffixNum = Math.floor(("" + number).length / 3);
      let shortValue = parseFloat(
        (suffixNum != 0
          ? number / Math.pow(1000, suffixNum)
          : number
        ).toPrecision(2)
      );

      if (shortValue % 1 != 0) {
        shortValue = Number(shortValue.toFixed(1));
      }

      return shortValue + " " + suffixes[suffixNum];
    } else {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  public static sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // public handleSettingMusic(slider: Slider) {
  //   sys.localStorage.setItem("volume", slider.progress.toString());
  //   this.node.getComponent(AudioSource).volume = Number(
  //     sys.localStorage.getItem("volume")
  //   );
  // }
}

interface XsollaSettings {
  loginId: string;
  projectId: string;
  clientId: number;
  enableSandbox?: boolean;
  enableInAppBrowser?: boolean;
}

export class Xsolla {
  static settings: XsollaSettings = {
    loginId: "475870d1-c2a9-4bcb-966a-7fcd763c2f8a",
    projectId: "475870d1-c2a9-4bcb-966a-7fcd763c2f8a",
    clientId: 4659,
    enableSandbox: true,
  };

  static init(settings: XsollaSettings) {
    if (settings.enableInAppBrowser == null) settings.enableInAppBrowser = true;

    Xsolla.settings = settings;
  }
}
