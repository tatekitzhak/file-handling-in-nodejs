
function callbackFunc() {


    function download(url,callback) {
        setTimeout(() => {
            // script to download the picture here
            console.log(`Downloading ${url} ...`);
            callback(url);
            
        }, 3000);
    };

    function process(picture) {
        console.log(`Processing ${picture}`);
    };

    let url = 'https';

    download(url,process);



}


module.exports = {callbackFunc};