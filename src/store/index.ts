// store/index.ts
import user, { key as userKey } from './modules/user';
import app, { key as appKey } from './modules/app';
import setting, { key as settingKey } from './modules/setting';

const storArr = [
  {
    modelName: user,
    key: userKey
  }, {
    modelName: app,
    key: appKey
  }, {
    modelName: setting,
    key: settingKey
  }
];

export default storArr;
