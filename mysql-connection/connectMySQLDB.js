var mysql=require('mysql');
const host = '127.0.0.1';

 const db_config = {
    host: host,
    user: 'ran',
    password: 'ran',
    database: 'db1',
    debug: false,
  };

var db = mysql.createConnection(db_config);

db.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });  
module.exports = db; 