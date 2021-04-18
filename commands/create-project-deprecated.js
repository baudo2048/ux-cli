const prompt = require('prompt-sync')();
const mustache = require('mustache');
const fs = require('fs')
const path = require('path');
const { exit } = require('process');
var copydir = require('copy-dir');
 


const templateDir = path.join(__dirname,'..','templates','basic')
const currentDir = process.cwd()

const projectName = prompt('projectName (prj-ux): ');



if(fs.existsSync(path.join(currentDir,projectName))){
  console.log('Already exists a folder "' + projectName + '" please use another projectName')
  return
}


var view = {
    projectName: projectName
  };

const packageFileTemplate = fs.readFileSync(path.join(templateDir,'package.json'),'utf8').toString()
var packageFileOutput = mustache.render(packageFileTemplate, view)

fs.mkdirSync(path.join(currentDir,projectName))

fs.writeFileSync(path.join(currentDir,projectName,'package.json'), packageFileOutput)
fs.writeFileSync(path.join(currentDir,projectName,'index.js'), fs.readFileSync(path.join(templateDir,'index.js'),'utf8').toString())
fs.writeFileSync(path.join(currentDir,projectName,'README.md'), fs.readFileSync(path.join(templateDir,'README.md'),'utf8').toString())

// assets copy ricorsivo
// css
// js
// ux
copydir.sync(path.join(templateDir,'assets'), path.join(currentDir,projectName,'assets'))
//copydir.sync(path.join(templateDir,'css'), path.join(currentDir,projectName,'css'))
copydir.sync(path.join(templateDir,'js'), path.join(currentDir,projectName,'js'))
copydir.sync(path.join(templateDir,'ux'), path.join(currentDir,projectName,'ux'))
copydir.sync(path.join(templateDir,'md'), path.join(currentDir,projectName,'md'))
copydir.sync(path.join(templateDir,'dist'), path.join(currentDir,projectName,'dist'))