const fs = require('fs')
const path = require('path')
const {parserJSFunction} = require('ux-lang')

let html = `<!DOCTYPE html>
<html>
<head>
</head>
<body>
`;


const currentDir = process.cwd()

const uxFolder = path.join(currentDir,'ux')
const jsFolder = path.join(currentDir,'js')
const cssFolder = path.join(currentDir,'css')
const distFolder = path.join(currentDir,'dist')

fs.readdirSync(uxFolder).forEach(file => {
    console.log(file);

    const uxFile = fs.readFileSync(path.join(uxFolder,file))
    const uxContent = uxFile.toString()
    
    // SE ESISTE JS
    var jsContent = ''
    if(fs.existsSync(path.join(jsFolder,file.slice(0,-3)+'.js'))){
        jsContent = fs.readFileSync(path.join(jsFolder,file.slice(0,-3)+'.js')).toString()
    }
    
    // SE ESISTE CSS
    var cssContent = ''
    if(fs.existsSync(path.join(cssFolder,file.slice(0,-3)+'.css'))){
        cssContent = fs.readFileSync(path.join(cssFolder,file.slice(0,-3)+'.css')).toString()
        //cssArr.push(cssContent)
    }

    jsFunc = parserJSFunction(file.slice(0,-3),uxContent,jsContent,cssContent)

    html += `<script type="text/javascript" name="${file.slice(0,-3)}">
    ${jsFunc}
    </script>\n`;
});





html += `
<script>

window.addEventListener("DOMContentLoaded",()=>{

    document.head.appendChild(head());

    document.body.appendChild(body());

});

</script>

</body>
</html>`;


fs.writeFileSync(path.join(distFolder,'index.html'),html)