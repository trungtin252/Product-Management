const { default: mongoose } = require("mongoose")


// Connect to db
module.exports.connect = async ()=> {
    // const connectionParams = {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }

    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected !");
    }catch (error){
        console.log("Fail to connect, please check again");
    }
}