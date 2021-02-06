chrome.webRequest.onBeforeRequest.addListener(
    function(details) { return {redirectUrl: "https://www.google.com/"}; },
    { urls: ["*://*.doubleclick.net/*"] },
    ["blocking"]
  );

/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
const hidePage = `body > :not(.ad-image) {
    display: none;
  }`;

/**
* Listen for clicks on the buttons, and send the appropriate message to
* the content script in the page.
*/
function listenForClicks() {
document.addEventListener("click", (e) => {

/**
* Given the name of a beast, get the URL to the corresponding image.
*/
function themeToURL(theme) {
switch (theme) {
case "Kitties":
return browser.extension.getURL("./theme/kitties/kitties1.png");
case "Pupper":
return browser.extension.getURL("./theme/pupper/pupper1.png");
case "Inspiration":
return browser.extension.getURL("./theme/inspiration/inspiration1.png");
case "Imagines":
return browser.extension.getURL("./theme/imagines/imagines1.png");
}
}

/**
* Insert the page-hiding CSS into the active tab,
* then get the ad URL and
* send a "adAbsurdum" message to the content script in the active tab.
*/
function adAbsurdum(tabs) {
browser.tabs.insertCSS({code: hidePage}).then(() => {
let url = themeToURL(e.target.textContent);
browser.tabs.sendMessage(tabs[0].id, {
command: "adAbsurdum",
theme: url
});
});
}

/**
* Remove the page-hiding CSS from the active tab,
* send a "reset" message to the content script in the active tab.
*/
function reset(tabs) {
browser.tabs.removeCSS({code: hidePage}).then(() => {
browser.tabs.sendMessage(tabs[0].id, {
command: "reset",
});
});
}

/**
* Just log the error to the console.
*/
function reportError(error) {
console.error(`Could not change ads: ${error}`);
}

/**
* Get the active tab,
* then call "beastify()" or "reset()" as appropriate.
*/
if (e.target.classList.contains("beast")) {
browser.tabs.query({active: true, currentWindow: true})
.then(adAbsurdum)
.catch(reportError);
}
else if (e.target.classList.contains("reset")) {
browser.tabs.query({active: true, currentWindow: true})
.then(reset)
.catch(reportError);
}
});
}

/**
* There was an error executing the script.
* Display the popup's error message, and hide the normal UI.
*/
function reportExecuteScriptError(error) {
document.querySelector("#popup-content").classList.add("hidden");
document.querySelector("#error-content").classList.remove("hidden");
console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
* When the popup loads, inject a content script into the active tab,
* and add a click handler.
* If we couldn't inject the script, handle the error.
*/
browser.tabs.executeScript({file: "./content.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);