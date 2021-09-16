const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const {parserJSFunction} = require('ux-lang')

const currentDir = process.cwd()

async function doIt(){
    let args = {};

    if(process.argv[3]==undefined){
        args = await inquirer.prompt([
            {
                type:"input",
                name:'compName',
                message: 'Insert compName (without extension): '
            }
        ])
    } else {
        args.compName = process.argv[3]
    }




    const uxCode = fs.readFileSync(path.join(currentDir,`${args.compName}.ux`),'utf-8').toString()
    let jsCode = ''
    if(fs.existsSync(path.join(currentDir,`${args.compName}.js`))){
        jsCode = fs.readFileSync(path.join(currentDir,`${args.compName}.js`),'utf-8').toString()
    }
    let cssCode = ''
    if(fs.existsSync(path.join(currentDir,`${args.compName}.css`))){
        cssCode = fs.readFileSync(path.join(currentDir,`${args.compName}.css`),'utf-8').toString()
    }
    const outCode = parserJSFunction(`__${args.compName}`,uxCode,jsCode,cssCode)

    let scriptContent =
`
function _${args.compName}(){
${outCode}
//eventConf()
//restConf()
return __${args.compName}();}
`;

fs.writeFileSync(path.join(currentDir,`_${args.compName}.js`),scriptContent)
}

doIt()
