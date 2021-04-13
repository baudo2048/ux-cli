const fs = require('fs')
const path = require('path')
const prompt = require('prompt-sync')();
const {getDependencies} = require('ux-lang')


const currentDir = process.cwd()
const uxFolder = path.join(currentDir,'ux')
const jsFolder = path.join(currentDir,'js')

const uxComplib = path.join(__dirname,'../../ux-comp-lib',)

const compName = prompt('Component Name: ');

// Add to my-project if compName doesn't exist
if(!fs.existsSync(path.join(currentDir,'ux',compName+'.ux'))){
    
    // Check if compName exists in ux-comp-libe
    if(fs.existsSync(path.join(uxComplib,'ux',compName+'.ux'))){
        var stack = []

        function addChildrenToStack(c){
            var deps = getDependencies(fs.readFileSync(path.join(uxComplib,'ux',c+'.ux'),'utf8').toString())
            console.log(JSON.stringify(deps))
            
            deps.forEach(v => {
                stack.push(v)
            })
        }

        function addCompToProject(c){
            fs.writeFileSync(path.join(currentDir,'ux',c+'.ux'), fs.readFileSync(path.join(uxComplib,'ux',c+'.ux'),'utf8').toString())
        
            if(fs.existsSync(path.join(uxComplib,'js',c+'.js'))){
                fs.writeFileSync(path.join(currentDir,'js',c+'.js'), fs.readFileSync(path.join(uxComplib,'js',c+'.js'),'utf8').toString())
            }
        }

        stack.push(compName)
        while(stack.length!=0){
            var nextComp = stack.pop()
            addCompToProject(nextComp)
            addChildrenToStack(nextComp)
        }

        
    } else {
        console.log('ERROR - Component with name "'+compName+'" doesn\'t exist')    
    }
    console.log('Added.')
} else {
    console.log('ERROR - Component with name "'+compName+'" already exists in your project')
}


