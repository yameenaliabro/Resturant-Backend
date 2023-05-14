const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://muhammadyameen:nadir786@atlascluster.7wh0xci.mongodb.net/',{
}).then(()=>{
    console.log("Connected to DB")
});
module.exports = mongoose