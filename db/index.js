const mongoose = require('mongoose');
const userSchema = require('../src/moduler/user.moduler');
const postSchema = require('../src/moduler/posts.moduler');


const username = process.env.MONGO_USER_NAME || "sakshia";
const password = process.env.MONGO_PASSWORD || "sakshi";
const cluster = process.env.MONGO_CLUSTER || "cluster0.jitl4kq";
const dbname = process.env.MONGO_DB_NAME || "postdb";

mongoose.set("returnOriginal", false);

try {
  mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
);
  console.log("MongoDB connection Successfully");
} catch (error) {
  console.log("DB Connection Error", error);
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


mongoose.model('user', userSchema);
mongoose.model('post', postSchema);



module.exports = db;