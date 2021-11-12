//https://ruben.verborgh.org/blog/2012/12/31/asynchronous-error-handling-in-javascript/

function postLetter(letter, address) {
    if (canSendTo(address)) {
      letter.sendTo(address);
      return true;
    }
    return false;
  }

  if (postLetter(myLetter, myAddress))
    console.log("Letter sent.");
  else
    console.error("Letter not sent.");

function postLetter(letter, address) {
        if (canSendTo(address)) {
          letter.sendTo(address);
          return letter.getTrackingCode();
        }
        throw "Cannot reach address " + address;
}
try {
    var trackingCode = postLetter(myLetter, myAddress);
    console.log("Letter sent with code " + trackingCode);
  }
  catch (errorMessage) {
    console.error("Letter not sent: " + errorMessage);
  }
  function postLetter(letter, address, onSuccess, onFailure) {
    if (canSendTo(address))
      letter.sendTo(address, function () {
        onSuccess(letter.getTrackingCode());
      });
    else
      onFailure("Cannot reach address " + address);
  }

  postLetter(myLetter, myAddress,
    function (trackingCode) {
      console.log("Letter sent with code " + trackingCode);
    },
    function (errorMessage) {
      console.error("Letter not sent: " + errorMessage);
    });

    function postLetter(letter, address, callback) {
        if (canSendTo(address))
          letter.sendTo(address, function () {
            callback(null, letter.getTrackingCode());
          });
        else
          callback("Cannot reach address " + address);
      }
      //If the first argument is non-null, an error has occurred. This can be seen in the caller:
      
      postLetter(myLetter, myAddress,
        function (errorMessage, trackingCode) {
          if (errorMessage)
            return console.error("Letter not sent: " + errorMessage);
          console.log("Letter sent with code " + trackingCode);
        });
        var trackingCodePromise = postLetter(myLetter, myAddress);
trackingCodePromise.done(function (trackingCode) {
  console.log("Letter sent with code " + trackingCode);
});
trackingCodePromise.fail(function (errorMessage) {
  console.log("Letter not sent: " + errorMessage);
});


foo(arg, (err, val) => {
    if (err) {
         console.log(err);
    } else {
         val += 1;
         bar(val, (err1, val1) => {
              if (err) {
                   console.log(err1);
              } else {
                   val1 += 2;
                   baz(val1, (err2, result) => {
                        if (err2) {
                             console.log(err2);
                        } else {
                             result += 3;
                             console.log(result); // 6
                        }
                   });
              }
         });
    }
});