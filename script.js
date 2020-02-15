// // test area --- not part of final product
// getEverything({q: 'pole vault', source: 'CNN'}).then((response) => {
//   const { articles } = response;

//   // var articles = response.articles;
//   const { url } = articles[0];

//   // var url = articles[0].url;
//   // console.log({ url, googleResponse: response })
//   renderTitles(articles)

//   return getAnalysis({ url });
// }).then((response) => {
//   console.log(response);
// }).catch(error => {
//   renderError(error);
// });

// getEverything("https://www.bbc.co.uk/sport/athletics/51511341");

function renderTitles(articles) {

  //The purpose of this function is to get the title passed into the parameter and append it to the end of the headline-results list.
  var articleList = $("#headline-results");
  articleList.empty();

  console.log(articles);
  for (let i = 0; i < articles.length; i++) {

    var articleTitle = articles[i].title;
    var articleImage = articles[i].urlToImage;
    var articleURL = articles[i].url;
    var articleID = i

    //Create the HTML that create the card.

    var cardtxt = "<div class='row'>" +
      "<div class='col s12 m7'>" +
      "<div class='card'>" +
      "<div class='card-image'>" +
      "<img src=" + articleImage + ">" +
      "</div>" +
      "<div class='card-content'>" +
      "<span class='card-title blue-text text-darken-4'>" + articleTitle + "</span>" +
      "<a class='waves-effect waves-light btn article-btn blue darken-4' article-url='" + articleURL +
      "' iam-in='article-id-" + articleID + "'><i class='material-icons left'>textsms</i></a>" +
      "<p id='article-id-" + articleID + "' class='blue-text text-darken-4'></p>" +
      "</div>" +
      "<div class='card-action'>" +
      "<a href='" + articleURL + "' target='_blank'>Full Article</a>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>"

    //declare the div tag
    var div = $("<div>");

    //Set the div tag to the title of the article.
    div.html(cardtxt);

    //Append the card to the results area.
    articleList.append(div);

  }


};

const renderError = (error) => {
  console.error(error);
  console.log({ error, error })
  const modal = $('#error-modal');

  const header = $('<h4>');
  const paragraph = $('<p>');

  header.text(`Error: ${error.code || ''}`);
  paragraph.text(error.message || '');

  $('#error-modal .modal-content').append(header, paragraph);

  modal.modal('open');
}

$("#searchbutton").click(function (event) {

  event.preventDefault();
  let input = $("#searchbox")
    .val()
    .trim();

  if (input) {
    getEverything({ q: input })
      .then(({ articles }) => {
        renderTitles(articles);
      })
      .catch(error => {
        renderError(error);
      })
  }
});

$(document).ready(function () {
  $('.modal').modal();
  getHeadlines({ country: 'us' })
    .then(({ articles }) => {
      renderTitles(articles);
    })
    .catch(error => {
      renderError(error);
    })
});


//mlf: This click locates the specific button clicked on and renders the synopsis.
$('#headline-results').on('click', '.article-btn', function () {

  //The url that was set when the titles are rendered onto page.
  var articleUrl = $(this).attr('article-url')

  //Pulls the ID of the p tag where the text shall be rendered to.
  var iamIn = $(this).attr('iam-in')

  //Creates the ID of where the text shall be placed.
  var placeMeHere = $("#" + iamIn)


  //Initiates the analysis function.  Waits until a respoonse is returned.
  getAnalysis({ url: articleUrl }).then(function (response) {

    //Set the text variable.
    var responseTxt = response.text;

    //Places the text in the spexcific ID.
    placeMeHere.html("<br>" + responseTxt);

  });

});
