
function callbackFunc() {


    function download(url, successCallback, failureCallback) {
        setTimeout(() => {
            // script to download the picture here
            console.log(`Downloading: ${url} ...`);
            // over simplification
            let error = url.length === 0 || !url; 
            // call the failure or success callback
            error ? failureCallback('Occurred error') :  successCallback(url);
            
        }, 3000);
    };

   
    let value = '';
    function successCallback(picture) {
        console.log(`Processing the picture ${picture}`);
    };

    function failureCallback(err) {
        console.log(`Handling error:${err}`);
    };

    download(value,successCallback,failureCallback);

}


module.exports = {callbackFunc};