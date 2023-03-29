import { _decorator, Component, sys } from "cc";

const { ccclass, property } = _decorator;

@ccclass("Helper")
export class Helper extends Component {
  public static accessToken = sys.localStorage.getItem("accessToken");

  public static async getPlayer() {
    try {
      const reqPlayer = await fetch(
        "https://cms.dadsnetwork.net/user/reward?type=dailylogin",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      const res = await reqPlayer.json();
      // console.log(res)
      if (!res.success) throw new Error(res.message);
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  public static async loginGuest() {
    try {
      const reqGuest = await fetch("https://cms.dadsnetwork.net/auth/signin", {
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

      sys.localStorage.setItem("accessToken", res.accessToken);
    } catch (err) {
      console.error(err);
    }
  }

  public static async getUser() {
    try {
      const reqGuest = await fetch("https://cms.dadsnetwork.net/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      const res = await reqGuest.json();

      if (!res.success) throw new Error(res.message);
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  public static async getTopRanking() {
    try {
      const reqPlayer = await fetch(
        "https://cms.dadsnetwork.net/user/rank/top-ten",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      const res = await reqPlayer.json();
      // console.log(res)
      if (!res.success) throw new Error(res.message);
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  public static async rewardDailyLogin() {
    try {
      const rewardUser = await fetch(
        "https://cms.dadsnetwork.net/user/reward/daily-login?type=daily-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      const res = await rewardUser.json();
      console.log(res);

      if (!res.success) throw new Error(res.message);
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  public static async updateProfile(dataUpdate: any) {
    try {
      const reqPlayer = await fetch("https://cms.dadsnetwork.net/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify(dataUpdate),
      });
      const res = await reqPlayer.json();
      console.log(res);
      if (!res.success) throw new Error(res.message);
      return res;
    } catch (err) {
      console.error(err);
    }
  }
}
