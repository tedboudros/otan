module.exports = function(body, cb){
    createBody(body, (text)=>{
        cb(text);
    })
}

function createBody(body, cb){
    getElement(body, (begin, end)=>{
        if(body["children"] !== undefined){
            var i=0,text=begin
            body['children'].forEach(child => {
                i++
                createBody(child, (child_str)=>{
                    text+=child_str
                })
                if(i==body["children"].length){
                    cb(text+end)
                }
            })
        }else{
            cb(begin+end);
        }
    })
}

function getElement(obj, cb){
    getTag(obj["type"], (_tag, tag_end)=>{
        getClass(obj["class"], (_class)=>{
            getHtml(obj["html"], (_html)=>{
                getStyle(obj["style"], (_style)=>{
                    var begin = _tag + _class + _style + ">" + _html
                    cb(begin, tag_end)
                })
            })
        })
    })
}

function getTag(type, cb){
    var beginning = "", end = ""
    if(type == "button"){
        beginning = '<input type="submit"'
        end = ""
    }else if(type == "a"){
        beginning = "<a"
        end = "</a>"
    }else if(type == "body"){
        beginning = "<body"
        end = "</body>"
    }else if(type == "div"){
        beginning = '<div'
        end = "</div>"
    }
    cb(beginning, end);
}

function getClass(_class, cb){
    var str = "";
    if(_class !== undefined){
        str = ' class="'
        var i = 0;
        _class.forEach(cls => {
            i++;
            str+= cls + " "
            if(i == _class.length){
                cb(str.slice(0, -1) + '"')
            }
        })
    }else{
        cb(str)
    }
}

function getHtml(_html, cb){
    if(_html !== undefined){
        cb(_html)
    }else{
        cb("")
    }
}

function getStyle(_style, cb){
    var str = ""
    if(_style !== undefined){
        str = ' style="'
        var length_keys = Object.keys(_style).length
        var i = 0;
        for (var style in _style){
            i++
            str += style + ': ' + _style[style] + "; "
            if(i == length_keys){
                str = str.slice(0, -1) + '"'
                cb(str)
            }
        }
    }else{
        cb(str)
    }
}