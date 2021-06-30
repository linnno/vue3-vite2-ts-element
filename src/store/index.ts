// store/index.ts
import user,{ key as userKey } from "./modules/user";

const storArr = [
  {
    modelName: user,
    key: userKey
  }
]

export default storArr;