import app from './app';
import './database';

//Start server
app.listen(app.get('port'));
console.log("Server running on port: ",app.get('port'));