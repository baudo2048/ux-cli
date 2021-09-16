const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer');
const bent = require('bent');
const {getDependencies} = require('ux-lang')


const currentDir = process.cwd()
const uxFolder = path.join(currentDir,'ux')
const jsFolder = path.join(currentDir,'js')
const cssFolder = path.join(currentDir,'css')

inquirer.prompt([{
    type: 'input',
    name: 'compName',
    message: 'compName: '
}]).then(answers=>{
    const compName = answers.compName
    // Check if compName exists in my-project
    if(fs.existsSync(path.join(uxFolder,compName+'.ux'))){
        var stack = []

        function addChildrenToStack(c){
            var deps = getDependencies(fs.readFileSync(path.join(currentDir,'ux',c+'.ux'),'utf8').toString())
            console.log(JSON.stringify(deps))
                        
            deps.forEach(v => {
                stack.push(v)
            })
        }

        async function addCompToUxCompLib(c){
            var uxContent = fs.readFileSync(path.join(currentDir,'ux',c+'.ux'),'utf8').toString()
            var jsContent = ''
            var cssContent = ''
            if(fs.existsSync(path.join(currentDir,'js',c+'.js'))){
                jsContent = fs.readFileSync(path.join(currentDir,'js',c+'.js'),'utf8').toString()
            }
            if(fs.existsSync(path.join(currentDir,'css',c+'.css'))){
                cssContent = fs.readFileSync(path.join(currentDir,'css',c+'.css'),'utf8').toString()
            }

            body = {
                compDto: {
                    name: c,
                    jdoc: {
                        ux: uxContent,
                        js: jsContent,
                        css: cssContent
                    }
                }
            };
            
            const getJson = bent('json','http://circolostudiuniversitari.it')
            let obj = await getJson('/upd-comp.php',body)
            return obj
        
        }

        stack.push(compName)
        while(stack.length!=0){
            var nextComp = stack.pop()
            addCompToUxCompLib(nextComp).then(j=>{
                addChildrenToStack(nextComp)
            })
            
        }

        
    } else {
        console.log('ERROR - Component with name "'+compName+'" doesn\'t exist')    
    }
})







