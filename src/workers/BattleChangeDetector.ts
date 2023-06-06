import {readFromChainWeb, stringifyObjListForGitDiff} from "../utils";
import {DataWorker} from "./worker";
import {Publisher} from "../publishers/publisher";

export class BattleChangeDetector extends DataWorker {
  constructor(publisher: Publisher) {
    super(publisher, "Own battles");
  }
  async fetchNewData(): Promise<string> {
    const account = "k:4797e8b869769d99dbc5ea20a999a3701b2361fef86e472186503d611d429423";
    const pactCode = `(free.brawler-bears.owner-all-battles "${account}")`
    const data = await readFromChainWeb(pactCode)
    return stringifyObjListForGitDiff(data);
  }
}
