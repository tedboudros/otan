const fs = require('fs');

var args = process.argv.splice(process.execArgv.length + 2);
fs.readFile(args[0], function(err, file){
    if (err) throw err;
    var newfile = JSON.parse(file.toString());
    console.log(newfile)
    createHtml(newfile[0], newfile[1])
})

function createHtml(head, body){
    createHead(head, function(headstr){
        var html = "<head>"+headstr+"</head>";
        createElement(body, function(str){
            html = html + str
        });
        console.log(args[0].split('.')[0] + ".html");
        fs.writeFile(args[0].split('.')[0] + ".html", html, function(err){if (err) throw err;});
    })
}

function createHead(head, cb){
    var text = "";
    head["css"].forEach(href =>{
        text = text + '<link href="'+href+'" rel="stylesheet" type="text/css">'
    })
    cb(text);
}

function createElement(element, cb){
    returnElement(element, function(beggining, end){
        var text = "";
        var i = 0
            if(element["children"] !== undefined){
                text = beggining
                var i = 0;
                element["children"].forEach(child => {
                    i++;
                    createElement(child, function(str){
                        text = text + str
                    })
                    if(i==element["children"].length){
                        text = text + end
                        cb(text)
                    }
                })  
            }else{
                text = beggining + end;
                cb(text);
            }
    })
}

function returnElement(element, cb){
    var beggining = "", end = ""
    if(element["type"] == "button"){
        beggining = '<input type="submit" value="'+element["value"]+'"'
        end = ""
    }else if(element["type"] == "a"){
        beggining = "<body"
        end = "</body>"
    }else if(element["type"] == "body"){
        beggining = "<body"
        end = "</body>"
    }else if(element["type"] == "div"){
        beggining = '<div id="'+element["id"]+'"'
        end = "</div>"
    }       
    if(element["class"] !== undefined){
        beggining = beggining + ' class="'
        var i = 0;
        element['class'].forEach(cls => {
            i++;
            beggining = beggining + cls + " "
            if(i === element['class'].length){
                beggining = beggining.slice(0, -1) + '"'
            }
        })
    }
    beggining = beggining + ">"
    cb(beggining, end)
}