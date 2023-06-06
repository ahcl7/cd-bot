import {readFromChainWeb} from "../utils";
import {DataWorker} from "./worker";
import {Publisher} from "../publishers/publisher";
const _ = require("lodash")
export class BrawlerBearAttackContractUpdateDetector extends DataWorker {
  constructor(publisher: Publisher) {
    super(publisher, "brawler-bears-attack contract");
  }
  async fetchNewData(): Promise<string> {
    const pactCode = `(describe-module "free.brawler-bears-attacks")`
    const data = await readFromChainWeb(pactCode);
    const ret = _.get(data, "code")
    return ret
  }
}
