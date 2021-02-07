// When it receives a message from background.js with the request "reload", reloads the website.
chrome.runtime.onMessage.addListener(
    function (message) {
        if (message.action == "reload") {
            alert("test");
            window.location.reload();
            return false;
        }
    });