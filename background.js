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
var images =
    [
        [
            ["https://i.ibb.co/L8fMRN9/p1.png", 400, 267],
            ["https://i.ibb.co/MhK1sG0/p2.png", 400, 267],
            ["https://i.ibb.co/WnzJPKJ/p3.png", 400, 267]
        ],
        [
            ["https://i.ibb.co/P1h1NJX/k1.png", 400, 300],
            ["https://i.ibb.co/4FyQDr5/k2.png", 400, 300],
            ["https://i.ibb.co/tLYRJN1/k3.png", 400, 300]
        ],
        [
            ["https://i.ibb.co/Q6k9kVP/in1.png", 400, 300],
            ["https://i.ibb.co/6FgHx4X/in2.png", 400, 300],
            ["https://i.ibb.co/jMN2MXm/in3.png", 400, 300]
        ],
        [
            ["https://i.ibb.co/K5gFpXs/im1.png", 100, 75],
            ["https://i.ibb.co/xJNYBMd/im2.png", 400, 960],
            ["https://i.ibb.co/pwr9Ks6/im3.png", 400, 176]
        ]
    ];

// function to pick a random image from a theme (given a theme)
function pickImage(theme) {
    if (theme == "pupper") {
        return 0;
    } else if (theme == "kitties") {
        return 1;
    } else if (theme == "inspiration") {
        return 2;
    } else if (theme == "imagines") {
        return 3;
    }
}

var currentTheme;

// Fires when a server requests to display. Calls "pickImage(theme)" to find a URL for an image in the given theme "currentTheme" 
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        var ran = Math.floor(Math.random() * 3);
        var URL = images[pickImage(currentTheme)][ran][0];
        var width = images[pickImage(currentTheme)][ran][1];
        var length = images[pickImage(currentTheme)][ran][2]
        if (URL != "none") {
            // Send message to content.js to resize ad containers to fit meme.            
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "resize",
                    url: URL,
                    width: width,
                    length: length
                });
            });
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
            currentTheme = this.id+"";
            alert(currentTheme);
        }
        else {
            //  Changes colour of button back to pink
            this.style.backgroundColor = "rgb(253, 107, 182)";
            // Set currentTheme to none
            currentTheme = "none";
        }

        // Reloads current tab
        chrome.tabs.reload();

    };

}