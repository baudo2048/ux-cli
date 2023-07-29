// Questo è quello con il trucco attenzione ai sotto componenti
// prima di partire controllare se nella folder del progetto è tutta libera
// per tutti i componenti.

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const request = require('request')
const {getDependencies} = require('ux-lang')



const currentDir = process.cwd()   // workingDir. From I run ux command. should be my home project folder
var stack = []

inquirer.prompt([
    {
        type:'input',
        name:'compName',
        message:'Insert Component Name: '
    }
]).then(answers=>{

    function addCompToProject(c){
        requestBody = {
            compDto: {
                name: c
            }
        };
        
        var options = {
            json: true,
            body: requestBody
        };
        
        request.post('http://circolostudiuniversitari.it/get-comp.php', options, (err, res, body) => {
          if (err) { return console.log(err); }
          
          const jdoc = JSON.parse(body.jdoc);
          
          // Controllo se il file esiste nel mio progetto
          if(!fs.existsSync(path.join(currentDir,'ux',c+'.ux'))){
            fs.writeFileSync(path.join(currentDir,'ux',c+'.ux'), jdoc.ux);
            fs.writeFileSync(path.join(currentDir,'js',c+'.js'), jdoc.js);
            fs.writeFileSync(path.join(currentDir,'css',c+'.css'), jdoc.css);
          } else {
            console.log('ERROR - Component with name "'+c+'" already exists in your project')
          }

          var deps = getDependencies(jdoc.ux)
          console.log('deps ' + JSON.stringify(deps))
          deps.forEach(v => {
              stack.push(v)
              console.log('dep stacked '+JSON.stringify(stack));
          })
          
        });

  
    }
    
    function addChildrenToStack(c){
        var deps = getDependencies(fs.readFileSync(path.join(uxComplib,'ux',c+'.ux'),'utf8').toString())
        console.log(JSON.stringify(deps))
        
        deps.forEach(v => {
            stack.push(v)
        })
    }
    
    var compName = answers.compName;

    async function go(){
    stack.push(compName)
    while(stack.length!=0){
        var nextComp = stack.pop()
        console.log('next comp: ' + nextComp)
        addCompToProject(nextComp)
        //addChildrenToStack(nextComp)
    }
}
    go();
});


