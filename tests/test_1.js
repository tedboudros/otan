const fs = require("fs")
const json2html = require("../index.js")

fs.readFile("tests/test_1.json", function(err, file){
    if (err) throw err;
    var json = JSON.parse(file.toString());
    json2html(json, (text)=>{
        fs.writeFile("tests/test_1.html", text, (err)=>{
            if(err)throw err;
        })
    })
})