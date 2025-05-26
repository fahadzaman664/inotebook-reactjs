const mongoose = require('mongoose');
const mongoURL = ('mongodb://localhost:27017/inotebook');

const connectToMongo =  () => {
  try {
    mongoose.connect(mongoURL);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// const connectToMongoo=()=>{
//      mongoose.connect(moongoURL{
//         console.log("connected to mongo successfully");
//       })
// }

module.exports = connectToMongo;