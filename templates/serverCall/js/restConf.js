function json(serviceName, msg={}, mode='cors'){
    const host = 'http://www.circolostudiuniversitari.it/';

    return new Promise( (resolve, reject) => {
        // prendo i cookie
        // document.cookie = "user=admin@katecode.com;pass=admin"
        
        //document.cookie = "user=admin@katecode.com;pass=admin"
        //document.cookie = "pass=admi"
        
        // *************** Vanilla cookie
        var props = document.cookie.split(';')

        var user = ''
        var pass = ''

        props.forEach(v => {
          var tokens = v.split('=')
          if(tokens[0]=='user'){
            user = tokens[1]
          }
          if(tokens[0].trim()=='pass'){
            pass = tokens[1]
          }
        })
        //********************************
        
        // npm js-cookie
        //Cookies.set('user','root')
        //Cookies.set('pass','root')
        

        fetch(host+serviceName, {
            mode: mode, //same-origin
            method: 'POST', 
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(msg) // body data type must match "Content-Type" header
        }).then( response => {
            return response.json()
        }).then(data => {
            console.log('fetching response ... data is + ' + JSON.stringify(data))
            //document.eventManager(`${serviceName}.response`, data)
            resolve(data)
        }).catch(error => {
            reject(error)
        });
    })

}

document.json = json;