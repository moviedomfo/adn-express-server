
import { AppConstants } from '../common/commonConstants';
import { connect } from 'mongoose';



( async () =>{
        //console.log(AppConstants.BD_SERVER_PWD);
        //MongoDB Atlas, NoSQL en la nube https://www.youtube.com/watch?v=Imwk0HtEuGY
        const uri = `mongodb+srv://${AppConstants.BD_SERVER_USER}:${AppConstants.BD_SERVER_PWD}@cluster0.aa2koji.mongodb.net/?retryWrites=true&w=majority`
         const db = await connect(uri,{
            
         });
        console.log('Database is connected to: ' +  db.connection.name);
})();


