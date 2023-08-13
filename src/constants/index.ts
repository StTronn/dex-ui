export const CURRENCY_PAIRS = {
  "INR/SGD": {
    "token0": "INR",
    "token1": "SGD"
  },
  "INR/THB": {
    "token0": "INR",
    "token1": "THB"
  },
  "SGD/THB": {
    "token0": "SGD",
    "token1": "THB"
  }
}

export type Pairs = "INR/SGD" | "INR/THB" | "SGD/THB";
export type Coins = "INR" | "THB" | "SGD";

export const URL = "http://localhost:4023"
export const ADAPTER_URL = "http://localhost:4023"

export const coins: Coins[] = ["INR", "SGD", "THB"];
