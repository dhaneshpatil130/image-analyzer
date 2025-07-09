const mongoose = require('mongoose')

const mongourl = process.env.MONGO_CONN

mongoose.connect(mongourl)
.then(()=>{console.log("mongodb connected");
}).catch((error)=>{
    console.log(error);
    
})