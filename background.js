/*
Puppers
1. "https://i.ibb.co/nqGQTRx/p1.png"
2. "https://i.ibb.co/1frMpg8/p2.png"
3. "https://i.ibb.co/M6Tznbv/p3.png"
Kitties
1. "https://i.ibb.co/4RL5ymT/k1.png"
2. "https://i.ibb.co/ZN12YVy/k2.png"
3. "https://i.ibb.co/xSN8zsf/k3.png"
Inspiration
1. "https://i.ibb.co/wgbbMms/in1.png"
2. "https://i.ibb.co/VTqVq36/in2.png"
3. "https://i.ibb.co/VLntjfr/in3.png"
Imagines
1. "https://i.ibb.co/K5gFpXs/im1.png"
2. "https://i.ibb.co/xJNYBMd/im2.png"
3. "https://i.ibb.co/pwr9Ks6/im3.png"
*/

var pupper = ["https://i.ibb.co/nqGQTRx/p1.png", "https://i.ibb.co/1frMpg8/p2.png", "https://i.ibb.co/M6Tznbv/p3.png"];
var kitties = ["https://i.ibb.co/4RL5ymT/k1.png", "https://i.ibb.co/ZN12YVy/k2.png", "https://i.ibb.co/xSN8zsf/k3.png"];
var inspiration = ["https://i.ibb.co/wgbbMms/in1.png", "https://i.ibb.co/VTqVq36/in2.png", "https://i.ibb.co/VLntjfr/in3.png"];
var imagines = ["https://i.ibb.co/K5gFpXs/im1.png", "https://i.ibb.co/xJNYBMd/im2.png", "https://i.ibb.co/pwr9Ks6/im3.png"];

function pickImage(theme) {
    var ran = Math.floor(Math.random()*3);
    if (theme === "pupper") {
        return pupper[ran];
    } else if (theme === "kitties") {
        return kitties[ran];
    } else if (theme === "inspiration") {
        return inspiration[ran];
    } else if (theme === "imagines") {
        return imagines[ran];
    }
}

/*
function updateSize(imgURL) {
    var img = document.createElement("img");
    img.src=imgURL;
}
*/

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        return { redirectUrl: pickImage(CHANGE THIS) };
    },
    { urls: ["*://*.doubleclick.net/*"] },
    ["blocking"]
);