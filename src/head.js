module.exports = (head, cb)=>{
    var text = "";
    if(head["title"] !== undefined){
        text = text + '<title>' + head["title"] + '</title>'
    }
    head["css"].forEach(href =>{
        text = text + '<link href="'+href+'" rel="stylesheet" type="text/css">'
    })
    var html = "<head>"+text+"</head>";
    cb(html);
}