const body = require('./body')
const head = require('./head')

module.exports = (json, cb)=>{
    head(json[0], (_head)=>{
        body(json[1],(_body)=>{
            cb(_head+_body)
        })
    })
}
module.exports.element = (element, cb)=>{
    body(element,(_body)=>{
        cb(_body)
    })
}

module.exports.body = (__body,cb)=>{
    body(__body,(_body)=>{
        cb(_body)
    })
}

module.exports.head = (__head, cb)=>{
    head(__head,(_head)=>{
        cb(_head)
    })
}