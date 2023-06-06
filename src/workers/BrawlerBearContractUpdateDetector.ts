import {readFromChainWeb} from "../utils";
import {DataWorker} from "./worker";
import {Publisher} from "../publishers/publisher";
const _ = require("lodash")
export class BrawlerBearContractUpdateDetector extends DataWorker {
  constructor(publisher: Publisher) {
    super(publisher, "brawler-bears contract");
  }
  async fetchNewData(): Promise<string> {
    const pactCode = `(describe-module "free.brawler-bears")`
    const data = await readFromChainWeb(pactCode);
    const ret = _.get(data, "code")
    return ret
  }
}
