const prompt = require('prompt');

prompt.start();

var projectName = ''
prompt.get(['projectName'], (err, result)=>{
    if (err) { return onErr(err); }
    projectName = result.projectName
})


prompt.get(['username', 'email'], function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  Username: ' + result.username);
    console.log('  Email: ' + result.email);
});

function onErr(err) {
    console.log(err);
    return 1;
}