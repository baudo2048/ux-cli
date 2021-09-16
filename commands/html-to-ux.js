const fs = require('fs')
const path = require('path')
const {parserHtmlToUx} = require('ux-lang')

const currentDir = 'C:\\Users\\u416183\\lab\\work\\temp\\uxUiTools' //process.cwd()

const fileName = process.argv[3]
const rootElement = process.argv[4]

if(!fs.existsSync(path.join(currentDir,'ux',fileName+'.ux'))){
    console.log("ERROR - fileName doesn't exist: " + path.join(currentDir,'ux',fileName+'.ux'))
    return;
}
var xml = fs.readFileSync(path.join(currentDir,'ux',fileName+'.ux'),'utf8').toString()

const outContent = parserHtmlToUx(xml,rootElement)
fs.writeFileSync(path.join(currentDir,'ux',fileName+'.ux'),outContent);

return;