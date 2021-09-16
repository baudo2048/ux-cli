const fs = require('fs')
const path = require('path')
const {parserJSFunction} = require('ux-lang')


// ARRAYS CONTENENTI CODICE GENERATO
const scriptsArr = []
const cssArr = []


// PER OGNI FILE IN UX FOLDER:
// APRO UX FOLDER E APRO JS E CSS FILES SE ESISTONO

const currentDir = process.cwd()

const uxFolder = path.join(currentDir,'ux')
const jsFolder = path.join(currentDir,'js')
const cssFolder = path.join(currentDir,'css')
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


let scriptContent =
`
function app_container(){

`;
scriptsArr.forEach(v => {
    scriptContent += v
})
scriptContent+=
`\n
eventConf()
restConf()
return app();}
`;

fs.writeFileSync(path.join(distFolder,'app.js'),scriptContent)


// styleContent = ''
// cssArr.forEach(v=>{
//     styleContent += v
// })
// fs.writeFileSync(path.join(distFolder,'app.css'),styleContent)


