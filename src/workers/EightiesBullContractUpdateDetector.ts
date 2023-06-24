import {readFromChainWeb} from "../utils";
import {DataWorker} from "./worker";
import {Publisher} from "../publishers/publisher";
const _ = require("lodash")
export class EightiesBullContractUpdateDetector extends DataWorker {
  constructor(publisher: Publisher) {
    super(publisher, "eighties bull contract");
  }
  async fetchNewData(): Promise<string> {
    const pactCode = `(describe-module "free.eighties-bulls")`
    const data = await readFromChainWeb(pactCode);
    const ret = _.get(data, "code")
    return ret
  }
}
