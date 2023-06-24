import {readFromChainWeb} from "../utils";
import {DataWorker} from "./worker";
import {Publisher} from "../publishers/publisher";
const _ = require("lodash")
export class NinetiesBullContractUpdateDetector extends DataWorker {
  constructor(publisher: Publisher) {
    super(publisher, "nineties bull contract");
  }
  async fetchNewData(): Promise<string> {
    const pactCode = `(describe-module "free.nineties-bulls")`
    const data = await readFromChainWeb(pactCode);
    const ret = _.get(data, "code")
    return ret
  }
}
