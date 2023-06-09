const Pact = require("pact-lang-api")
const DEFAULT_GAS_PRICE = 0.000001;
const creationTime = () => Math.round((new Date()).getTime() / 1000) - 10
const _ = require("lodash");

const defaultMeta = () => {
  return Pact.lang.mkMeta(
    '',
    '1',
    DEFAULT_GAS_PRICE,
    2000000,
    creationTime(),
    600
  );
};

export const NETWORK = (chainID: Number | string) => `https://api.chainweb.com/chainweb/0.0/mainnet01/chain/${chainID}/pact`

const readFromContract = async (cmd: { pactCode: string, meta: {} }, networkUrl: string) => {
  let data = await Pact.fetch.local(cmd, networkUrl);
  if (_.get(data, 'result.status') === 'success') {
    return data.result.data;
  } else {
    throw new Error(`ERROR readFromContract: ${_.get(data, 'result.error.message')}`)
  }
  return null;
};


export const readFromChainWeb = async function (pactCode: string) {
  const meta = {...defaultMeta(), gasLimit: 2000000};
  const data = await readFromContract({pactCode, meta}, NETWORK('1'))
  return data
}

export function listToStr(list: (Number | string)[]) {
  return "[" + list.map(x => `"${x}"`).join(",") + "]"
}

export function stringifyObjListForGitDiff(list: any[]) {
  return list.map(x => {
    if (x instanceof Number) return "" + x;
    else if (x instanceof String) return x;
    else if (x === null) return "null";
    else if (x === undefined) return "undefined";
    else return JSON.stringify(x);
  }).join("\n");
}