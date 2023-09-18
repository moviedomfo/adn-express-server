import { get } from 'env-var';
import 'dotenv/config';
/**
 * Common constats
 */
export const AppConstants = {
  PORT: get('PORT').default('3103').asPortNumber(),
  APP_VERSION: get('APP_VERSION').required().asString(),
  COMPANY: 'Pelsoft',
  BD_MONGO_URI: get('BD_MONGO_URI').required().asString(),
  BD_MONGO_PWD: get('BD_MONGO_PWD').required().asString(),
  BD_MONGO_USER: get('BD_MONGO_USER').required().asString(),
  BD_MONGO_DB_NAME: get('BD_MONGO_DB_NAME').required().asString(),
  R_EXP_MORE_THAN_4CHAR_CONTINUOS: ` *\\b(?=[a-z\\d]*([a-z\\d])\\1{3}|\\d+\\b)[a-z\\d]+`,
};
