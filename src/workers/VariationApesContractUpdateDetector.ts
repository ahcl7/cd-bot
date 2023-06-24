import {readFromChainWeb} from "../utils";
import {DataWorker} from "./worker";
import {Publisher} from "../publishers/publisher";
const _ = require("lodash")
export class VariationApesContractUpdateDetector extends DataWorker {
  constructor(publisher: Publisher) {
    super(publisher, "Variation apes contract");
  }
  async fetchNewData(): Promise<string> {
    const pactCode = `(describe-module "free.variation-apes")`
    const data = await readFromChainWeb(pactCode);
    const ret = _.get(data, "code")
    return ret
  }
}
