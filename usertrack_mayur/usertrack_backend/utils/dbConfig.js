const mysql=require("mysql2/promise");

let connection;

const connectDB=async function() {
  
    try {
      connection = await mysql.createConnection({
      
    });
    console.log("Database Connected Successfully");
    } catch (err) {
      console.error("Database Connection Failed");
      console.error(err.message);
      process.exit(1); 
    }
}

const getConnection=function(){
    return connection;
}


module.exports={
    connectDB,
    getConnection
}