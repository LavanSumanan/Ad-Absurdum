(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;
  
    /**
     * Given a URL to a beast image, remove all existing beasts, then
     * create and style an IMG node pointing to
     * that image, then insert the node into the document.
     */
    function insertAds(ad1, ad2, ad3) {
      removeExistingAds();
      let adImage = document.createElement("img");
      adImage.setAttribute("src", ad1);
      adImage.setAttribute("src", ad2);
      adImage.setAttribute("src", ad3);
      adImage.style.height = "100vh";
      adImage.className = "ad-image";
      document.body.appendChild(adImage);
    }
  
    /**
     * Remove every beast from the page.
     */
    function removeExistingAds() {
      let existingAds = document.querySelectorAll(".ad-image");
      for (let ad of existingAds) {
        ad.remove();
      }
    }
  
    /**
     * Listen for messages from the background script.
     * Call "absurdum()" or "reset()".
    */
    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "adAbsurdum") {
        insertAds(message.adURL);
      } else if (message.command === "reset") {
        removeExistingAds();
      }
    });
  
  })();