function createElement(element, cb){
    returnElement(element, function(beginning, end){
        var text = "";
        var i = 0
            if(element["children"] !== undefined){
                text = beginning
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
                text = beginning + end;
                cb(text);
            }
    })
}

function returnElement(element, cb){
    var beginning = "", end = ""
    returnTag(element, (tag, tag_end) => {
        beginning = tag
        end = tag_end
        returnClass(element, beginning, (_class) => {
            beginning = beginning + _class
            returnStyle(element, beginning, (_style) => {
                beginning = beginning + _style + ">"
                returnHtml(element, beginning, (_html)=>{
                    beginning = beginning + _html
                    cb(beginning, end)
                })
            })
        });
    })
}

function returnTag(element, cb){
    var beginning = "", end = ""
    if(element["type"] == "button"){
        beginning = '<input type="submit" value="'+element["value"]+'"'
        end = ""
    }else if(element["type"] == "a"){
        beginning = "<a href='" + element['href'] + "'"
        end = "</a>"
    }else if(element["type"] == "body"){
        beginning = "<body"
        end = "</body>"
    }else if(element["type"] == "div"){
        beginning = '<div id="'+element["id"]+'"'
        end = "</div>"
    }
    cb(beginning, end);
}

function returnClass(element, beginning, cb){
    if(element["class"] !== undefined){
        beginning = beginning + ' class="'
        var i = 0;
        element['class'].forEach(cls => {
            i++;
            beginning = beginning + cls + " "
            if(i === element['class'].length){
                cb(beginning.slice(0, -1) + '"')
            }
        })
    }else{
        cb(beginning)
    }
}

function returnStyle(element, beginning, cb){
    if(element["style"] !== undefined){
        beginning = beginning + ' style="'
        var length_keys = Object.keys(element["style"]).length
        var i = 0;
        for (var style in element["style"]){
            i++
            beginning = beginning + style + ': ' + element["style"][style] + "; "
            if(i == length_keys){
                cb(beginning.slice(0, -1) + '"')
            }
        }
    }else{
        cb(beginning)
    }
}

function returnHtml(element, beginning, cb){
    if(element["html"] !== undefined){
        cb(beginning + element['html'])
    }else{
        cb(beginning)
    }
}

module.exports = (body, cb) => {
    createElement(body, (text)=>{
        console.log("12");
        cb(text)
    })
}