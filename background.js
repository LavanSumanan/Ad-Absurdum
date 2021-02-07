/*
Puppers
"https://i.ibb.co/L8fMRN9/p1.png"
"https://i.ibb.co/MhK1sG0/p2.png"
"https://i.ibb.co/WnzJPKJ/p3.png"
Kitties
"https://i.ibb.co/P1h1NJX/k1.png",
"https://i.ibb.co/4FyQDr5/k2.png",
"https://i.ibb.co/tLYRJN1/k3.png"
Inspiration
"https://i.ibb.co/Q6k9kVP/in1.png",
"https://i.ibb.co/6FgHx4X/in2.png",
"https://i.ibb.co/jMN2MXm/in3.png"
Imagines
"https://i.ibb.co/K5gFpXs/im1.png"
"https://i.ibb.co/xJNYBMd/im2.png"
"https://i.ibb.co/pwr9Ks6/im3.png"
*/

// Arrays of images per theme
var pupperArray = ["https://i.ibb.co/L8fMRN9/p1.png", "https://i.ibb.co/MhK1sG0/p2.png", "https://i.ibb.co/WnzJPKJ/p3.png"];
var kittiesArray = ["https://i.ibb.co/P1h1NJX/k1.png", "https://i.ibb.co/4FyQDr5/k2.png","https://i.ibb.co/tLYRJN1/k3.png"];
var inspirationArray = ["https://i.ibb.co/Q6k9kVP/in1.png", "https://i.ibb.co/6FgHx4X/in2.png", "https://i.ibb.co/jMN2MXm/in3.png"];
var imaginesarray = ["https://i.ibb.co/K5gFpXs/im1.png", "https://i.ibb.co/xJNYBMd/im2.png", "https://i.ibb.co/pwr9Ks6/im3.png"];

// function to pick a random image from a theme (given a theme)
function pickImage(theme) {
    var ran = Math.floor(Math.random() * 3);
    if (theme === "pupper") {
        return pupperArray[ran];
    } else if (theme === "kitties") {
        return kittiesArray[ran];
    } else if (theme === "inspiration") {
        return inspirationArray[ran];
    } else if (theme === "imagines") {
        return imaginesarray[ran];
    }
}

var currentTheme;

// Fires when a server requests to display. Calls "pickImage(theme)" to find a URL for an image in the given theme "currentTheme" 
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        var URL = pickImage(currentTheme);
        if (URL != "none") {
            return { redirectUrl: URL };
        }
    },
    { urls: ["*://*.doubleclick.net/*"] },
    ["blocking"]
);

// Changes the colour of the theme buttons on-click
var elems = document.getElementsByClassName("theme");
for (var i = 0; i < elems.length; i++) {

    elems[i].onclick = function () {

        var color = window.getComputedStyle(this, null).getPropertyValue("background-color");
        if (color === "rgb(253, 107, 182)") {
            for (var j = 0; j < elems.length; j++) {
                elems[j].style.backgroundColor = "rgb(253, 107, 182)";
            }
            this.style.backgroundColor = "rgb(0, 169, 254)";
            // Set currentTheme to the chosen button's id
            currentTheme = this.id;
        }
        else {
            //  Changes colour of button back to pink
            this.style.backgroundColor = "rgb(253, 107, 182)";
            // Set currentTheme to none
            currentTheme = "none";
        }

        // Reloads current tab
        chrome.tabs.reload();

        // Sends message to content.js to reload page
        chrome.tabs.sendMessage({action: "reload"});

    };

}