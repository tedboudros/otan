const fs = require("fs")

module.exports.json = function(file, cb){
    fs.readFile(file, (err, data)=>{
        if (err) throw err;
        var json = JSON.parse(data.toString());
        cb(json)
    })
}