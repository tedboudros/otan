const html = require("./src/html")

module.exports = (json,cb)=>{
    html(json, cb)
}

module.exports.element = (obj, cb)=>{
    html.element(obj, cb)
}

module.exports.head = (head, cb)=>{
    html.head(head,cb)
}