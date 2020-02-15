// test area --- not part of final product
getEverything({q: 'pole vault', source: 'CNN'}).then((response) => {
  const { articles } = response;

  // var articles = response.articles;
  const { url } = articles[0];

  // var url = articles[0].url;
  // console.log({ url, googleResponse: response })
  renderTitles(articles)

  return getAnalysis({ url });
}).then((response) => {
  console.log(response);
}).catch(error => {
  renderError(error);
});


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

    //declare the div tag
    var div = $("<div>");

    //Set the div tag to the title of the article.
    div.html(cardtxt);

    //Append the card to the results area.
    articleList.append(div);

  }


}

const renderError = (error) => {
  console.error(error);
  console.log({error, error})
  const modal = $('#error-modal');

  const header = $('<h4>');
  const paragraph = $('<p>');

  header.text(`Error: ${error.code || ''}`);
  paragraph.text(error.message || '');

  $('#error-modal .modal-content').append(header, paragraph);

  modal.modal('open');
} 

$(document).ready(function(){
  $('.modal').modal();
});
