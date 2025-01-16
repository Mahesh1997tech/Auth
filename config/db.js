import mongoose from "mongoose";

async function db(){
    try {
      let conn=await mongoose.connect("mongodb://127.0.0.1/authDB")  
      console.log(`db is connected on ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}
export default db;