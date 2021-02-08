// When it receives a message from background.js with the request "resize", it finds all image elements with an src of the meme,
// and then resizes the image element to fit the ad.
chrome.runtime.onMessage.addListener(
    function (message) {
        if (message.action == "resize") {
            var elements = document.getElementsByTagName('img');
            for (var i=0; i < elements.length; i++) {
                if (elements[i].src == message.url) {
                    elements[i].width = message.width;
                    elements[i].height = message.height;
                }
            }
        }
    });