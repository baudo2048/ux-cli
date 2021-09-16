const { exec } = require("child_process");
const path = require('path')
const server = require('ux-ui-dev-tools')

const currentDir = process.cwd()



function doIt(){
    const server = path.join(__dirname,'..','node_modules/ux-ui-dev-tools/index.js')
    exec(`node ${server} ${currentDir}`, (error, stdout, stderr) => {
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
}

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});