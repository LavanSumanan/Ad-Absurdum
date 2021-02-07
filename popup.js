var elems = document.getElementsByClassName("theme");
for (var i = 0; i < elems.length; i++) {
  elems[i].onclick = function() {
    var color = window.getComputedStyle(this, null)
                .getPropertyValue("background-color");
    if (color === "rgb(253, 107, 182)") {
      for (var j = 0; j < elems.length; j++) {
        elems[j].style.backgroundColor = "rgb(253, 107, 182)";
      }
      this.style.backgroundColor = "rgb(0, 169, 254)";
    }
    else {
      this.style.backgroundColor = "rgb(253, 107, 182)";
    }
  };
}