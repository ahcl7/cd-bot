import {Command} from "./command";
import {listToStr, readFromChainWeb} from "../utils";

export class GetBearInfoCmd extends Command {
  async process(): Promise<string> {
    if (this.args.length == 0) {
      throw new Error("usage: !bearinfo bear-id")
    } else {
      const bearId = this.args[0];
      const attrs = [
        "level",
        "max-health-power",
        "current-health-power",
        "attack-one",
        "attack-two",
        "attack-three",
      ]
      const pactCode = `(free.brawler-bears.get-nft-fields-for-id  ${listToStr(attrs)} "${bearId}")`
      const bearInfo = await readFromChainWeb(pactCode)
      return JSON.stringify(bearInfo, null, 8);
    }
  }
}