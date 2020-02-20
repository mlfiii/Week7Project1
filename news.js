(async function () {
    var url ''  
    
var data = await (await fetch(url)).jason();
data.article.forEach(art => {
    var head = document.createElement("div")
    head.style.backgroundImage = 'url(${art.urlTo'
    head.classList.add("head");
    
var title = document.createElement("div")
title.classList.add("title")
title.innerText = art.title;
Headers.appendChild(title)

var desc = document.createElement("div")
desc.classList.add('desc');
desc.innerHTML = art.description;
document.body.appendChild(head)
document.body.appendChild(desc)
