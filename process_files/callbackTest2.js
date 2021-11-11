
function callbackFunc2() {
    function whatIsFullName(fullName) {
        console.log(fullName);
    };

    function handleFullName(fName,lName,cb) {
        const fullName = fName + lName;
        cb(fullName);
    }

    handleFullName('Ran','Itzhak',whatIsFullName);
}


module.exports = {callbackFunc2};