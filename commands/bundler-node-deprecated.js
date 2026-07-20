const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')
//const parserForHtml = require('./parserForHtml')
const {parserJSFunction} = require('ux-lang')

const {JSDOM} = jsdom

var store = {
    Project: {
        Components: [
            {
                name: '',
                ux: '',
                js: '',
                css: '' 
            }
        ]
    }
}

const html = new JSDOM(`<html><head></head><body>
    <script id="ux-boot-script">
    window.addEventListener('DOMContentLoaded', (event) => {
        document.db = JSON.parse(decodeURIComponent(document.getElementById('ux-local-store').textContent));
        
        document.db.Project.Components.forEach( (v,i) => {
            
            var jsFunc = ux.parserJSFunction(v.name,v.ux,v.js,v.css);
    
            // CREO GLI SCRIPT TAGS E LI APPENDO AL BODY
            var script = document.createElement('script')
            script.setAttribute('id',v.name)    
            script.append(document.createTextNode(jsFunc))
            document.body.append(script)
        });

        document.head.appendChild(head());
        window.onload = () => {
            document.body.appendChild(body());
        }
    }
    </script>
    <div id="ux-content-md" style="display:none">
    
    </div>
    <div id="ux-local-store" style="display:none">{LOCAL STORE HERE}</div>
    </body></html>`);

// ARRAYS CONTENENTI CODICE GENERATO
const scriptsArr = []
const cssArr = []


// PER OGNI FILE IN UX FOLDER:
// APRO UX FOLDER E APRO JS E CSS FILES SE ESISTONO

const currentDir = process.cwd()

const uxFolder = path.join(currentDir,'ux')
const jsFolder = path.join(currentDir,'js')
const cssFolder = path.join(currentDir,'css')
const mdFolder = path.join(currentDir,'md')
const distFolder = path.join(currentDir,'dist')

fs.readdirSync(uxFolder).forEach(file => {
    console.log(file);

    const uxFile = fs.readFileSync(path.join(uxFolder,file))
    const uxContent = uxFile.toString()
    
    // SE ESISTE JS
    var jsContent = ''
    if(fs.existsSync(path.join(jsFolder,file.slice(0,-3)+'.js'))){
        jsContent = fs.readFileSync(path.join(jsFolder,file.slice(0,-3)+'.js')).toString()
    }
    
    // SE ESISTE CSS
    var cssContent = ''
    if(fs.existsSync(path.join(cssFolder,file.slice(0,-3)+'.css'))){
        cssContent = fs.readFileSync(path.join(cssFolder,file.slice(0,-3)+'.css')).toString()
        //cssArr.push(cssContent)
    }

    scriptsArr.push(parserJSFunction(file.slice(0,-3),uxContent,jsContent,cssContent))
});

    store.Project.Components.push({
        name: file.slice(0,-3),
        ux: uxContent,
        js: jsContent,
        css: cssContent
    })


//var scriptTag = html.window.document.createElement('script')
//scriptTag.textContent = ''
//scriptsArr.forEach(v => {
//    scriptTag.textContent += v
//})
html.window.document.body.appendChild(scriptTag)
var store = html.window.document.body.getElementById('ux-local-store')
// var styleTag = html.window.document.createElement('style')
// styleTag.textContent = ''
// cssArr.forEach(v=>{
//     styleTag.textContent += v
// })
// html.window.document.body.appendChild(styleTag)

// md content
if(fs.existsSync(mdFolder)){
    fs.readdirSync(mdFolder).forEach(file => {
        const mdFile = fs.readFileSync(path.join(mdFolder,file))
        const mdContent = mdFile.toString()
        
        var postDom = html.window.document.createElement('div')
        postDom.id = 'ux-post-'+file.slice(0,-3)
        postDom.textContent = mdContent
    
        html.window.document.getElementById('ux-content-md').appendChild(postDom)
    });
}


var cont = html.window.document.getElementsByTagName('html')[0].outerHTML
fs.writeFileSync(path.join(distFolder,'index.html'),cont)
