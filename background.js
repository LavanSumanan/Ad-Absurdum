/*
Puppers
"https://i.ibb.co/nqGQTRx/p1.png"
"https://i.ibb.co/1frMpg8/p2.png"
"https://i.ibb.co/M6Tznbv/p3.png"
Kitties
"https://i.ibb.co/4RL5ymT/k1.png"
"https://i.ibb.co/ZN12YVy/k2.png"
"https://i.ibb.co/xSN8zsf/k3.png"
Inspiration
"https://i.ibb.co/wgbbMms/in1.png"
"https://i.ibb.co/VTqVq36/in2.png"
"https://i.ibb.co/VLntjfr/in3.png"
Imagines
"https://i.ibb.co/K5gFpXs/im1.png"
"https://i.ibb.co/xJNYBMd/im2.png"
"https://i.ibb.co/pwr9Ks6/im3.png"
*/

// Arrays of images per theme
var pupperArray = ["https://i.ibb.co/nqGQTRx/p1.png", "https://i.ibb.co/1frMpg8/p2.png", "https://i.ibb.co/M6Tznbv/p3.png"];
var kittiesArray = ["https://i.ibb.co/4RL5ymT/k1.png", "https://i.ibb.co/ZN12YVy/k2.png", "https://i.ibb.co/xSN8zsf/k3.png"];
var inspirationArray = ["https://i.ibb.co/wgbbMms/in1.png", "https://i.ibb.co/VTqVq36/in2.png", "https://i.ibb.co/VLntjfr/in3.png"];
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

var currentTheme = "pupper";

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
            console.log(currentTheme);
        }
        else {
            //  Changes colour of button back to pink
            this.style.backgroundColor = "rgb(253, 107, 182)";
            // Set currentTheme to none
            currentTheme = "none";
            console.log(currentTheme);
        }

        // Reloads current tab
        browser.tabs.reload();
    
            

    };

}