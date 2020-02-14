
getEverything({ q: 'pole vault', source: 'CNN' }).then((response) => {
  const { articles } = response;

  // var articles = response.articles;
  const { url } = articles[0];


  // var url = articles[0].url;
  // console.log({ url, googleResponse: response })

  renderTitles(articles)

  return getAnalysis({ url });
}).then((response) => {


})

// https://api.aylien.com/api/v1/combined?url=https://mashable.com/article/doomsday-vault-cherokee-nation/&endpoint=sentiment&endpoint=summarize


function renderTitles(articles) {

  //The purpose of this function is to get the title passed into the parameter and append it to the end of the headline-results list.
  var articleList = $("#headline-results");


  for (let i = 0; i < articles.length; i++) {

    var articleTitle = articles[i].title;
    var articleImage = articles[i].urlToImage;

    //Create the HTML that create the card.
    var cardtxt = "<div class='card horizontal orange darken-4 z-depth-5'> <div class='card-content white-text'>"
      + "<div class='card-image'><img src=" + articleImage + "></div> " +

      " <span class='card-title'>" + articleTitle + " </span></div></div>"

    var cardtxt2 = "<div class='card horizontal orange darken-4 z-depth-5'> <div class='card-content white-text'>"
      + "<div class='card-image'><img src=" + articleImage + "> <span class='card-title'>" + articleTitle + " </span></div> " +

      " </div></div>"

    //declare the div tag
    var div = $("<div>");

    //Set the div tag to the title of the article.
    div.html(cardtxt);

    //Append the card to the results area.
    articleList.append(div);

  }


}