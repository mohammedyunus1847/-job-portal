const mongoose= require ('mongoose');

const connectDb = async()=>{
    try
    {
        const Connection = await  mongoose.connect(process.env.MONGO_URI)
        console.log(`MONGO DB CONNECTED SUCCESSFULLY : ${Connection.connection.host}`)
    }
    catch(error)
    {
        console.log(`SOMETHING WENT WRONG  ${error.message}`)
        process.exit(1);
    }
}

module.exports=connectDb;

