// inquirer
// examples
// https://github.com/SBoudrias/Inquirer.js/tree/master/packages/inquirer/examples

const mustache = require('mustache');
const fs = require('fs')
const path = require('path');
const { exit } = require('process');
const copydir = require('copy-dir');
const inquirer = require('inquirer');

const templatesDir = path.join(__dirname,'..','templates')

var availableTemplates = [];
fs.readdirSync(templatesDir).forEach(dir => {
  availableTemplates.push(dir)
});

inquirer
.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'projectName (prj-ux): ',
      default: function(){
          return 'prj-ux';
      }
    },
  {
    type: 'list',
    name: 'template',
    message: 'Choose a template you want to start from',
    choices: availableTemplates
  }
])
.then((answers) => {
  console.log(JSON.stringify(answers))

  
});