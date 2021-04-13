const fs = require('fs')
const path = require('path')

const uxComplib = path.join(__dirname,'../../ux-comp-lib',)


fs.readdirSync(path.join(uxComplib,'ux')).forEach(file=>{
    console.log(file)
})
    


