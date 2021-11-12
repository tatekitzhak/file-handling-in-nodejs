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