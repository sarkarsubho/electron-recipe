const mongoose =require( "mongoose");

const connect=()=>{

    return mongoose.connect("mongodb+srv://subhankar:subho0905@cluster0.zrx9z.mongodb.net/rcipeEl?retryWrites=true&w=majority")
}
module.exports=connect;