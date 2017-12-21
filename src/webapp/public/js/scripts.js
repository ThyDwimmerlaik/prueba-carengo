var current_n = 0
var flag_load = false;

function loadFeed(n)
{
  flag_load = true;
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var items = JSON.parse(this.responseText)
      showItems(items)
    }
    else if(this.readyState == 4 && this.status == 400)
    {
      flag_load = false
    }
  };
  xhttp.open("GET", "http://localhost:8080/feed?n="+n, true)
  xhttp.send()
}

function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;
  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  return isVisible;
}

function showItems(items)
{
  for(var i in items)
  {
    var itemTemplate = document.getElementById("item-template").innerHTML
    Mustache.parse(itemTemplate)
    var renderedItem = Mustache.render(itemTemplate, items[i])
    document.getElementById("items-container").innerHTML += renderedItem
  }
}

window.onscroll = function() {
  if(flag_load && isScrolledIntoView(document.getElementById("bottom-page")))
  {
    current_n++
    loadFeed(current_n)
  }
};
