const fs = require('fs')
const html = require("./src/html")


/*
var args = process.argv.splice(process.execArgv.length + 2);
fs.readFile(args[0], function(err, file){
    if (err) throw err;
    var newfile = JSON.parse(file.toString());
    html(newfile, (text)=>{
        console.log(text);
        fs.writeFile(args[0].slice(0,-4)+"html", text, (err)=>{if(err)throw err;})
    })
})
*/

module.exports = (json,cb)=>{
    html(json, cb)
}

module.exports.element = (obj, cb)=>{
    html.element(obj, cb)
}

module.exports.head = (head, cb)=>{
    html.head(head,cb)
}