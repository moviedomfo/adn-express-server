import { ADNController } from './../adn.controller';
import { AppConstants } from '../../common/commonConstants';
import { connect } from 'mongoose';
import { MongoDatabaseCnn } from './MondoDatabaseCnn';

(async () => {
  // const uri = `mongodb+srv://${AppConstants.BD_MONGODB_USER}:${AppConstants.BD_MONGODB_PWD}@cluster0.aa2koji.mongodb.net/?retryWrites=true&w=majority`;
  // const db = await connect(uri, {});
  // console.log('Database is connected to: ' + db.connection.name);
  connectToMongo();
})();

async function connectToMongo() {
  //const uri = `mongodb+srv://${AppConstants.BD_MONGODB_USER}:${AppConstants.BD_MONGODB_PWD}@cluster0.aa2koji.mongodb.net/?retryWrites=true&w=majority`;
  
  MongoDatabaseCnn.connect({
    dbName: AppConstants.BD_MONGODB_ADB_NAME,
    uri: AppConstants.BD_MONGODB_URI,
  });
}
