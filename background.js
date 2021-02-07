chrome.webRequest.onBeforeRequest.addListener(
    function (details) { return { redirectUrl: "https://photos.app.goo.gl/PUQiHYuTvgoVetos7" }; },
    { urls: ["*://*.doubleclick.net/*"] },
    ["blocking"]
);