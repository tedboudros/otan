const html = require("./src/html")
const file = require("./src/file")

module.exports = (json,cb)=>{
    html(json, cb)
}

module.exports.element = (obj, cb)=>{
    html.element(obj, cb)
}

module.exports.head = (head, cb)=>{
    html.head(head,cb)
}

module.exports = (file, cb)=>{
    file.json(file,function(data){
        html(data, cb)
    })
}