
getEverything({q: 'pole vault', source: 'CNN'}).then((response) => {
  const { articles } = response;
  const { url } = articles[0];
  console.log({url, googleResults: response})
  return getAnalysis({ url });
}).then((response) => {
  console.log({response})
})

var searchBox = document.getElementById("searchbox");
var searchButton = document.getElementById ("searchbutton");

$(searchButton).click(function(){
  let input = document.getElementById("searchbox").value;
  //CONSOLE LOG
  console.log ('Input value: ', input);
});
