import { get } from 'env-var';
/**
 * Common constats
 */
export const AppConstants = {
  Verion: process.env.APP_VERSION as string,
  COMPANY: 'Pelsoft',
  BD_MONGODB_URI: get('BD_MONGODB_URI').required().asString(),
  BD_MONGODB_PWD: get('BD_MONGODB_PWD').required().asString(),
  BD_MONGODB_ADB_NAME: get('BD_MONGODB_ADB_NAME').required().asString(),
  BD_MONGODB_USER: get('BD_MONGODB_USER').required().asString(),
  R_EXP_MORE_THAN_4CHAR_CONTINUOS: ` *\\b(?=[a-z\\d]*([a-z\\d])\\1{3}|\\d+\\b)[a-z\\d]+`,
};
