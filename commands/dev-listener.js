const fs = require('fs');
const { exec } = require("child_process");
const path = require('path')


//require('log-timestamp');
const currentDir = process.cwd()
const uxFolder = path.join(currentDir,'ux')
const jsFolder = path.join(currentDir,'js')

fs.readdirSync(uxFolder).forEach(file => {
    fs.watchFile(path.join(uxFolder,file), (curr, prev) => {
        console.log(`file Changed`);
        exec(`ux bundler-html`, (error, stdout, stderr) => {
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
    });    
});

console.log(`Watching for file changes on ${uxFolder} and ${jsFolder}`);

