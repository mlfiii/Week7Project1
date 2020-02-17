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


const currentArticle = "";

function renderTitles(articles) {

  //The purpose of this function is to get the title passed into the parameter and append it to the end of the headline-results list.
  var articleList = $("#headline-results");
  articleList.empty();

  // console.log(articles);
  for (let i = 0; i < articles.length; i++) {

    var articleTitle = articles[i].title;
    var articleImage = articles[i].urlToImage;
    var articleURL = articles[i].url;
    var articleID = i

    //These sets the vlaulues to blank in case there's something that isn't returned.
    if (articleImage === null) {
      articleImage = ""

    }

    if (articleTitle === null) {
      articleTitle = ""

    }

    if (articleURL === null) {
      articleURL = ""

    }

    //Create the HTML that creates the card.

    var cardtxt = "<div class='row'>" +
      "<div class='col s12 m7 offset-m3'>" +
      "<div class='card hoverable'>" +
      "<div class='card-image'>" +
      "<img src=" + articleImage + ">" +
      "</div>" +
      "<div class='card-content'>" +
      "<span class='card-title blue-text text-darken-4'>" + articleTitle + "</span>" +
      "<a class='waves-effect waves-light btn article-btn blue darken-4' article-url='" + articleURL +
      "' iam-in='article-id-" + articleID + "' sent-id='sentiment-id-" + articleID + "'><i class='material-icons left'>textsms</i></a>  " +
      "<a class='waves-effect waves-light btn copy-btn blue darken-4' article-url='" + articleURL +
      "' iam-in='article-id-" + articleID + "'><i class='material-icons left'>content_copy</i></a>" +
      "<p id='sentiment-id-" + articleID + "' class='blue-text text-darken-4'></p>" +
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

  //Pulls the ID of the p tag where the text shall be rendered to.
  var iamIn = $(this).attr('iam-in');
  var iamSentID = $(this).attr('sent-id');
  var placeSynopsisHere = $("#" + iamIn);
  var placeSentimentHere = $("#" + iamSentID);

  //The url that was set when the titles are rendered onto page.
  var articleUrl = $(this).attr('article-url');

  //Creates the ID of where the text shall be placed.
  var placeSynopsisHere = $("#" + iamIn);

  //Initiates the analysis function.  Waits until a respoonse is returned.
  getAnalysis({ url: articleUrl }).then(function (response) {

    //Set the text variable.

    var responseTxt = response.text;
    var sentimentPolarity = response.results[0].result.polarity
    var sentenceArray = response.results[1].result.sentences
    var sentimentIcon = ""
    var sentimentColor = ""

    //Sets the poliarity icon and color classes.
    if (sentimentPolarity === "negative") {

      sentimentIcon = "remove"
      sentimentColor = "red darken-4"
    }
    else if (sentimentPolarity === "positive") {

      sentimentIcon = "add"
      sentimentColor = "green darken-4"
    }
    else if (sentimentPolarity === "neutral") {

      sentimentIcon = "pause"
      sentimentColor = "yellow darken-1"
    }
    else {

      sentimentIcon = ""
      sentimentColor = "yellow darken-1"
    }

    //Concatenates the synopsis text.
    for (let i = 0; i < sentenceArray.length; i++) {

      responseTxt = responseTxt + " " + sentenceArray[i];

    }

    //Used to set the html to the polarity and the summary.
    placeSynopsisHere.html("<hr><br>" + responseTxt);
    placeSentimentHere.html("<hr>" + "<a class='waves-effect waves-light btn sentiment-btn " +
      sentimentColor + "'>Sentiment<i class='material-icons left'>"
      + sentimentIcon + "</i></a> <br>")

  });

});

//mlf:  This is the onclick event to send text to the clipboard
$('#headline-results').on('click', '.copy-btn', function () {

  //Setup the objects that are used to copy the text
  const copiedFromTextArea = $(this).attr('iam-in');
  const textarea = document.createElement("textarea");
  const textToCopy = $("#" + copiedFromTextArea).text();

  //If the synopsis text is blank, exit the function because the synopsis has not been retrieved yet.  Alert the user.
  if (!textToCopy) {
    // alert("You must click on the synopsis button first!");gi
    return;
  }

  //Create a text area that holds the synopsis text to be copied to clipboard
  textarea.value = textToCopy;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  //Alert user that the synopsis has been copied to clipboard.
  // alert("Your new synopsis has been copied to clipboard!");

});


