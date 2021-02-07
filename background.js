/*
Puppers
1. "https://i.ibb.co/nqGQTRx/p1.png"
2. "https://i.ibb.co/1frMpg8/p2.png"
3. "https://i.ibb.co/M6Tznbv/p3.png"
Kitties
1. ""
2. ""
3. ""
Inspiration
1. ""
2. ""
3. ""
Imagines
1. ""
2. ""
3. ""
*/

chrome.webRequest.onBeforeRequest.addListener(
    function (details) { return { redirectUrl: "https://i.ibb.co/KsG9L3p/pupper-1-2.png" }; },
    { urls: ["*://*.doubleclick.net/*"] },
    ["blocking"]
);