const fs = require('fs');
const element = require('./src/body');

var args = process.argv.splice(process.execArgv.length + 2);
fs.readFile(args[0], function(err, file){
    if (err) throw err;
    var newfile = JSON.parse(file.toString());
    createHtml(newfile[0], newfile[1])
})

function createHtml(head, body){
    createHead(head, function(headstr){
        var html = "<head>"+headstr+"</head>";
        element(body, function(str){
            html = html + str
        });
        fs.writeFile(args[0].split('.')[0] + ".html", html, function(err){if (err) throw err;});
    })
}

function createHead(head, cb){
    var text = "";
    if(head["title"] !== undefined){
        text = text + '<title>' + head["title"] + '</title>'
    }
    head["css"].forEach(href =>{
        text = text + '<link href="'+href+'" rel="stylesheet" type="text/css">'
    })
    cb(text);
}