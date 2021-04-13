#!/usr/bin/env node

const fs = require('fs')
const path = require('path')



// process.argv[2] == gli ho messo la cartella da dove parte lo script

if(fs.existsSync(path.join(__dirname,'commands',process.argv[2]+'.js'))){
    require('./commands/'+process.argv[2])
} else {
    console.log("Command doesn't exist")

    // Qui per creare l'help
    // per ogni file in commands/ leggo il file e ne prendo la descrizione
}




