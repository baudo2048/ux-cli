
    function dispatch (eventName, msg) {
        console.log('dispatch - ' + eventName);
        var detail = {detail: msg};
        document.dispatchEvent(new CustomEvent(eventName, detail));
    }
    
    // export function dispatch2 (eventName, msg, from, to)
    
    function register (eventName, callback){
        document.addEventListener(eventName, callback);
    }
    
    function unregister (eventName, callback){
        document.removeEventListener(eventName, callback);
    }
    
    function registerDefault (callback){
        document.addEventListener(callback.name, callback);
    }
    
    document.registerDefault = registerDefault
    document.em = dispatch
    document.register = register
    document.unregister = unregister

