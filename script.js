//Used to set what article  the user had previously clicked on and what is the corresponding sentiment.
let previousArticleID = "";
let previousSentID = "";
let previousCopyBtn = "";

function renderTitles(articles) {

  //The purpose of this function is to get the title passed into the parameter and append it to the end of the headline-results list.
  var articleList = $("#headline-results");

  //Get the text of what was searched for
  var titleLineText = $("#searchbox")
    .val()
    .trim();
  articleList.empty();
  var titleResultsNum = articles.length

  //Since there was another title list rendered, reset the previously clicked article and sentiment ID's.
  previousArticleID = "";
  previousSentID = "";

  if (titleLineText !== "") {
    //Set the results when there is text searched for.
    if (titleResultsNum === 0) {
      $("#header-text")
        .html("<span class='red-text text-darken-4'>" + titleResultsNum + "</span> results for: <span class='red-text text-darken-4'>" + titleLineText + "</span>");
    } else {
      $("#header-text")
        .html("Top <span class='red-text text-darken-4'>" + titleResultsNum + "</span> results for: <span class='red-text text-darken-4'>" + titleLineText + "</span>");
    }

  }
  else {
    titleLineText = "Top " + "<span class='red-text text-darken-4'>" + titleResultsNum + "</span>" + " Articles"

    $("#header-text")
      .html(titleLineText);
  };

  //Loop through the articles to render.
  for (let i = 0; i < articles.length; i++) {

    var articleTitle = articles[i].title;
    var articleImage = articles[i].urlToImage;
    var articleURL = articles[i].url;
    var articleSource = articles[i].source.name
    var articleID = i

    //These sets the vlaulues to blank in case there's something that isn't returned.
    if (articleImage === null || articleImage === "null") {
      articleImage = ""

    }

    if (articleTitle === null || articleTitle === "null") {
      articleTitle = ""

    }

    if (articleURL === null || articleURL === "null") {
      articleURL = ""

    }

    if (articleSource === null || articleSource === "null") {
      articleSource = "Article/Video"

    }


    //Create the HTML that creates the card.

    var cardtxt =
      "<div class='card hoverable'>" +
      "<div class='card-image'>" +
      "<img class='article-image' src=" + articleImage + ">" +
      "</div>" +
      "<div class='card-content row'>" +
      "<div class='card-title blue-text text-darken-4'>" + articleTitle + "</div>" +
      "<div class='col s12'>" +
      "<a class='waves-effect waves-light btn article-btn blue darken-4' article-url='" + articleURL +
      "' iam-in='article-id-" + articleID + "' sent-id='sentiment-id-" + articleID + "' copy-id='copy-id-" + articleID + "'><i class='material-icons left'>textsms</i>Summary</a>  " +
      "<a id='copy-id-" + articleID + "'class='hidden waves-effect waves-light btn copy-btn blue darken-4' article-url='" + articleURL +
      "' iam-in='article-id-" + articleID + "'><i class='material-icons left'>content_copy</i>Copy to Clipboard</a>" +
      "</div>" +
      "<img class='hidden loading-wheel' src='./Images/loading-wheel.gif'>" +
      "<div id='sentiment-id-" + articleID + "' class='col s12'></div>" +
      "<p id='article-id-" + articleID + "' class='blue-text text-darken-4 article-text col s12'></p>" +
      "</div>" +
      "<div class='card-action'>" +
      "<a href='" + articleURL + "' target='_blank'><span class='black-text'>" + "Source:</span> <span class='source blue-text text-darken-4'>'" + articleSource + "'</span></a>" +
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
  const modal = $('#error-modal');

  const header = $('<h4>');
  const paragraph = $('<p>');

  header.text(`Error: ${error.code || ''}`);
  paragraph.text(error.message || '');

  $('#error-modal .modal-content').append(header, paragraph);

  modal.modal('open');
}

$("#searchbutton").click(function (event) {

  togglePageLoading();

  event.preventDefault();
  let input = $("#searchbox")
    .val()
    .trim();

  if (input) {
    getEverything({ q: input })
      .then(({ articles }) => {
        togglePageLoading();
        renderTitles(articles);
      })
      .catch(error => {
        togglePageLoading();
        renderError(error);
      })
  }
});

$(document).ready(function () {
  $('.modal').modal();
  getHeadlines({ country: 'us' })
    .then(({ articles }) => {
      togglePageLoading();
      renderTitles(articles);
    })
    .catch(error => {
      togglePageLoading();
      renderError(error);
    })
});


//mlf: This click locates the specific button clicked on and renders the synopsis.
$('#headline-results').on('click', '.article-btn', function () {

  //Pulls the ID of the p tag where the text shall be rendered to.
  var iamIn = $(this).attr('iam-in');
  var iamSentID = $(this).attr('sent-id');
  var iamCopyID = $(this).attr('copy-id');
  var loadingWheel = $(this).parent().siblings('img.loading-wheel');
  var placeSentimentHere = $("#" + iamSentID);
  var currentCopyBtn = $("#" + iamCopyID)

  //Check the previous article id.  If it's not blank then go into if.
  if (previousArticleID !== "") {

    var previousArticleText = $("#" + previousArticleID)
    var previousSentObject = $("#" + previousSentID)
    var previousCopyObject = $("#" + previousCopyBtn)

    //If the previous article ID is not the same as the current article ID then empty the previous p tag.
    if (previousArticleID !== iamIn) {

      previousArticleText.empty();
      previousSentObject.empty();
      previousCopyObject.toggleClass('hidden')
    } else {
      return;
    }
  }


  //The url that was set when the titles are rendered onto page.
  var articleUrl = $(this).attr('article-url');

  //Creates the ID of where the text shall be placed.
  var placeSynopsisHere = $("#" + iamIn);

  loadingWheel.toggleClass('hidden');
  //Initiates the analysis function.  Waits until a respoonse is returned.
  getAnalysis({ url: articleUrl }).then(function (response) {

    //Set the text variable.

    var responseTxt = "<br><br>";
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


    //MLF: COMMENTED SINCE THE .JOIN METHOD IS BEING USED.
    // for (let i = 0; i < sentenceArray.length; i++) {

    //   responseTxt = responseTxt + "<p class='response-paragraph'> " + sentenceArray[i] + "</p><br>";

    // }



    loadingWheel.toggleClass('hidden');
    currentCopyBtn.toggleClass('hidden');

    //Added in breaks to separate the sentences since they are more like paragraphs.  Helps readability.
    //If statement handles if the synopsis array is zero length.

    if (sentenceArray.length === 0) {

      responseTxt = responseTxt + "<p class='response-paragraph red-text text-darken-4'>Synopsis not available.</p><br>";
      placeSynopsisHere.html(responseTxt);


    } else { placeSynopsisHere.html(sentenceArray.join(' <br><br>')) };


  });


  previousArticleID = iamIn;
  previousSentID = iamSentID;
  previousCopyBtn = iamCopyID;


});

//mlf:  This is the onclick event to send text to the clipboard
$('#headline-results').on('click', '.copy-btn', function () {

  //Setup the objects that are used to copy the text
  const copiedFromTextArea = $(this).attr('iam-in');
  const textarea = document.createElement("textarea");
  const copiedmessage = document.createElement("copytextarea");
  const textToCopy = $("#" + copiedFromTextArea).text();


  //If the synopsis text is blank, exit the function because the synopsis has not been retrieved yet.  Alert the user.
  if (!textToCopy) {
    // alert("You must click on the synopsis button first!");
    renderMessage("SM2");
    return;
  }

  //Create a text area that holds the synopsis text to be copied to clipboard
  textarea.value = textToCopy;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  //Alert user that the synopsis has been copied to clipboard.
  // renderMessage("SM1");

});

//Function used to build messages for the user to acknowledge by clicking close.
const renderMessage = (message_code) => {

  //Declare and set the variables and constants
  const modal = $('#message-modal');

  var message_text = ""

  //Clear the modal
  $('#message-modal .modal-content').empty();

  //Decide which message was raised.
  if (message_code === "SM1") {
    message_text = "The article synopsis has been copied to the clipboard!"
  }
  else if (message_code === "SM2") {
    message_text = "Please click the synopsis button before pressing copy!"
  }

  //Header and paragraph tags that will be appended.
  const header = $('<h4>');
  const paragraph = $('<p>');

  //Set the message code and message.
  header.text(message_code);
  paragraph.text(message_text || '');

  //Append message to modal
  $('#message-modal .modal-content').append(header, paragraph);

  //Open the modal.
  modal.modal('open');

  //Close modal after 4 seconds if user doesn't click close button.
  setTimeout(function () {
    $(modal).modal('close')
  }, 4000);
};

function togglePageLoading() {
  $('#main-loading-wheel').toggleClass('hidden');
  $('#main').toggleClass('hidden');
}