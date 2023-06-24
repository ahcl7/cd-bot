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
  "price": number
}

export class BrawlerBearSalesDetector extends DataWorker {
  constructor(publisher: Publisher) {
    super(publisher, "bear sales/list");
  }
  async fetchNewData(): Promise<string> {
    let pactCode = `(free.brawler-bears.get-all-on-sale)`
    const allOnSales: NFT[] = await readFromChainWeb(pactCode)
    const attrs: string[] = [
      "level",
      "max-health-power",
      "current-health-power",
      "type",
      "owner"
    ]
    pactCode = `(free.brawler-bears.get-nft-fields-for-ids ${listToStr(attrs)} ${listToStr(allOnSales.map(x => x.id))})`
    const data: NFT[] = await readFromChainWeb(pactCode)
    for(let i = 0 ; i < allOnSales.length; i++) {
      Object.assign(allOnSales[i], data[i]);
    }
    const sortedById: NFT[] = allOnSales.sort((a, b) => {
      return (+a.id) - (+b.id)
    })
    const ret = stringifyObjListForGitDiff(sortedById)
    return ret;
  }
}
