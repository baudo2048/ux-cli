const jsdom = require('jsdom')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer');
const { exit } = require('process');

const { JSDOM } = jsdom;

const currentDir = process.cwd()

inquirer
.prompt([
    {
      type: 'input',
      name: 'fileName',
      message: 'fileName[no ext]: '
    },
    {
      type: 'input',
      name: 'rootElement',
      message: 'rootElement: '   
    }
])
.then((answers) => {

    if(!fs.existsSync(path.join(currentDir,'ux',answers.fileName+'.ux'))){
        console.log("ERROR - fileName doesn't exist: " + path.join(currentDir,'ux',answers.fileName+'.ux'))
        return;
    }
    var xml = fs.readFileSync(path.join(currentDir,'ux',answers.fileName+'.ux'),'utf8').toString()


const dom = new JSDOM(xml);

var uxCodeArr = []
var stack = []

var stackElementSample = {
    tabIndex: 0,
    element: 'dom element'
}

function camelCase(input) { 
    return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

function spaceTab(nTab){
    var st = ''
    for(var i=0;i<nTab;i++){
        st+='    '
    }
    return st
}

function scrivi(stackElement){
    const tabIndex = stackElement.tabIndex
    const el = stackElement.element

    //const textNode = el.textContent==undefined?'':" '"+el.textContent
    var textNode = ''
    // CERCO SE CONTIENE IL TEXTNODE
    const childNodesArr = Array.from(el.childNodes)
    childNodesArr.forEach(
        v=>{
                if(v.nodeType===3){
                    textNode += v.nodeValue
                }
                
        })
    textNode = textNode.trim()

    // 1. SCRIVO TAG NAME + TEXTNODE
    if (textNode==''){
        uxCodeArr.push(spaceTab(tabIndex)+el.tagName)
    } else {
        uxCodeArr.push(spaceTab(tabIndex)+el.tagName + " '" + textNode)
    }
    
    // 2. SCRIVO GLI ATTRIBUTI
    el.getAttributeNames().forEach(attr =>{
        //console.log(typeof attr)
        if(attr.includes('-')){
            uxCodeArr.push(spaceTab(tabIndex+1)+'.'+camelCase(attr)+' '+el.getAttribute(attr))
        } else {
            if(attr=='class'){
                uxCodeArr.push(spaceTab(tabIndex+1)+'.'+'className'+' '+el.getAttribute(attr))
            } else {
                uxCodeArr.push(spaceTab(tabIndex+1)+'.'+ attr +' '+el.getAttribute(attr))
            }
            
        }
        
    })
    
    return
}


function pushChildren(stackElement){
    var children = Array.from(stackElement.element.children)
    const cl = children.length
    for (var i=cl-1;i>=0;i--){
        stack.push({tabIndex: stackElement.tabIndex+1, element:children[i]})
    }
}

const svgBlock = dom.window.document.getElementsByTagName(answers.rootElement)[0]

stack.push({tabIndex:0,element:svgBlock})

while(stack.length!=0){
    const stackEl = stack.pop()
    scrivi(stackEl)
    pushChildren(stackEl)
}

var outContent = '';

uxCodeArr.forEach(el => {
    outContent += el+'\n'
})

fs.writeFileSync(path.join(currentDir,'ux',answers.fileName+'.ux'),outContent);

})



return;