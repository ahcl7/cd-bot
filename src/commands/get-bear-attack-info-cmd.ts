import {Command} from "./command";
import {listToStr, readFromChainWeb} from "../utils";

export class getBearAttackInfoCmd extends Command {
  async process(): Promise<string> {
    if (this.args.length == 0) {
      throw new Error("usage: !bearAttackInfo attack-id")
    } else {
      const attackId = this.args[0];
      const attrs = [
        "power",
        "damage",
        "owner"
      ]
      const pactCode = `(free.brawler-bears-attacks.get-nft-fields-for-id  ${listToStr(attrs)} "${attackId}")`
      const bearInfo = await readFromChainWeb(pactCode)
      return JSON.stringify(bearInfo, null, 8);
    }
  }
}