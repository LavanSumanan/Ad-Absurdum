chrome.webRequest.onBeforeRequest.addListener(
    function (details) { return { redirectUrl: "https://www.alimentarium.org/en/system/files/thumbnails/image/AL027-01_pomme_de_terre_0.jpg" }; },
    { urls: ["*://*.doubleclick.net/*"] },
    ["blocking"]
);