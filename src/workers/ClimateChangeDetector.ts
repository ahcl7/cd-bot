import {readFromChainWeb, stringifyObjListForGitDiff} from "../utils";
import {DataWorker} from "./worker";
import {Publisher} from "../publishers/publisher";

export class ClimateChangeDetector extends DataWorker {
  constructor(publisher: Publisher) {
    super(publisher, "climate");
  }
  async fetchNewData(): Promise<string> {
    const pactCode = `(free.brawler-bears.get-curr-battle-env)`
    const data = await readFromChainWeb(pactCode)
    return stringifyObjListForGitDiff(data);
  }
}
