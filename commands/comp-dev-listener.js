const fs = require('fs');
const { exec } = require("child_process");
const path = require('path')
const inquirer = require('inquirer')

async function doIt(){

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'compName',
            message: 'Insert CompName (no ext): '
        }
    ])

    const currentDir = process.cwd()

    fs.watchFile(path.join(currentDir,`${answers.compName}.ux`), (curr, prev)=>{
        console.log('Compiling...')
        exec(`ux comp-to-html ${answers.compName}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                console.log('\u0007');
                return;
            }
            console.log(`stdout: ${stdout}`);
            
          });
    })

    if(fs.existsSync(path.join(currentDir,`${answers.compName}.js`))){
        fs.watchFile(path.join(currentDir,`${answers.compName}.js`), (curr, prev)=>{
            console.log('Compiling...')
            exec(`ux comp-to-html ${answers.compName}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    console.log('\u0007');
                    return;
                }
                console.log(`stdout: ${stdout}`);
              });
        })
    }

    if(fs.existsSync(path.join(currentDir,`${answers.compName}.css`))){
        fs.watchFile(path.join(currentDir,`${answers.compName}.css`), (curr, prev)=>{
            console.log('Compiling...')
            exec(`ux comp-to-html ${answers.compName}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
              });
        })
    }
    console.log(`Watching for file changes...`);
    console.log('\u0007');
}

doIt()

