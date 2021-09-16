const inquirer = require('inquirer')

const currentDir = process.cwd()   // workingDir. From I run ux command. should be my home project folder

inquirer.prompt([
    {
        type:"input",
        name:'compName',
        message: 'Insert compName (without extension): '
    }
]).then(answers=>{

})