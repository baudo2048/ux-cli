const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')
const {parserJSFunction} = require('ux-lang')

const {JSDOM} = jsdom

const currentDir = process.cwd()

async function doIt(){
    let args = {};
    if(!process.argv[3]){
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


    const html = new JSDOM(
`
<!DOCTYPE html><html><head></head><body>
<script>
window.addEventListener('DOMContentLoaded', (event) => {
    
    window.onload = () => {
        document.body.appendChild(${args.compName}());
    }
});
</script>
<div id="ux-content-md" style="display:none">
</div>
</body></html>`);

    const uxCode = fs.readFileSync(`${args.compName}.ux`,'utf-8').toString()
    let jsCode = ''
    if(fs.existsSync(`${args.compName}.js`)){
        jsCode = fs.readFileSync(`${args.compName}.js`,'utf-8').toString()
    }
    let cssCode = ''
    if(fs.existsSync(`${args.compName}.css`)){
        cssCode = fs.readFileSync(`${args.compName}.css`,'utf-8').toString()
    }
    const outCode = parserJSFunction(`${args.compName}`,uxCode,jsCode,cssCode)

    let scriptTag = html.window.document.createElement('script')
    scriptTag.textContent = outCode
    html.window.document.body.appendChild(scriptTag)

    const htmlCode = html.window.document.getElementsByTagName('html')[0].outerHTML
    fs.writeFileSync(path.join(currentDir,`${args.compName}.html`),htmlCode)
}

doIt()
