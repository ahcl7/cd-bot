import {readFromChainWeb, stringifyObjListForGitDiff} from "../utils";
import {DataWorker} from "./worker";
import {Publisher} from "../publishers/publisher";

export class PendingBattleChangeDetector extends DataWorker {
  constructor(publisher: Publisher) {
    super(publisher, "Pending battles");
  }
  async fetchNewData(): Promise<string> {
    const pactCode = `(free.brawler-bears.pending-battles)`
    const data = await readFromChainWeb(pactCode)
    return stringifyObjListForGitDiff(data);
  }
}
