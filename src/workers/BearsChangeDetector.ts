import {listToStr, readFromChainWeb, stringifyObjListForGitDiff} from "../utils";
import {DataWorker} from "./worker";
import {Publisher} from "../publishers/publisher";

type NFT = {
  level: {
    int: number
  },
  "max-health-power": {
    int: number
  },
  id: number | string,
  "current-health-power": {
    int: number
  },
  "attack-one": string,
  "attack-two": string,
  "attack-three": string,
  "current-battle-id": string,
  "type": string,
}

export class BearsChangeDetector extends DataWorker {
  constructor(publisher: Publisher) {
    super(publisher, "Own bears");
  }
  async fetchNewData(): Promise<string> {
    const account = "k:4797e8b869769d99dbc5ea20a999a3701b2361fef86e472186503d611d429423";
    let pactCode = `(free.brawler-bears.ids-owned-by "${account}")`
    const ids: { id: string }[] = await readFromChainWeb(pactCode)
    const attrs: string[] = [
      "level",
      "max-health-power",
      "current-health-power",
      "attack-one",
      "attack-two",
      "attack-three",
      "type"
    ]
    pactCode = `(free.brawler-bears.get-nft-fields-for-ids ${listToStr(attrs)} ${listToStr(ids.map(x => x.id))})`
    const data: NFT[] = await readFromChainWeb(pactCode)
    const sortedById: NFT[] = data.sort((a, b) => {
      return (+a.id) - (+b.id)
    })
    const ret = stringifyObjListForGitDiff(sortedById)
    return ret;
  }
}
