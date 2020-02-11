const buildParamString = (params) => {
  let paramList = Object.entries(params).map(([ key, value ]) => `${key}=${value}`);
  return paramList.join('&');
}

const getHeadlines = (params) => {

  const apiKey = '19a918446d7447a9b93c6157cfbc5140';

  let url = 'https://newsapi.org/v2/top-headlines?';
  url += buildParamString(params);
  
  const settings = {
    url,
    method: 'GET',
    headers: {
      "X-Api-Key": apiKey
    },
  };

  return $.ajax(settings);
}

const getEverything = (params) => {

  const apiKey = '19a918446d7447a9b93c6157cfbc5140';

  let url = 'https://newsapi.org/v2/everything?';
  url += buildParamString(params);
  
  const settings = {
    url,
    method: 'GET',
    headers: {
      "X-Api-Key": apiKey
    },
  };

  return $.ajax(settings);
}

const getAnalysis = (params) => {

  const appId = '37fd0209';
  const apiKey = '2571ec5c9424b9f064fa1ada9a5b7947';


  // delete https://cors-anywhere.herokuapp.com/ before pulling into production!!!!
  // this   ^                                   just enables the request to complete without 
  // getting blocked by CORS when running locally from the browser
  let url = 'https://cors-anywhere.herokuapp.com/https://api.aylien.com/api/v1/combined?';
  url += buildParamString(params);
  url += '&endpoint=sentiment';
  url += '&endpoint=summarize';

  const settings = {
    url,
    method: 'GET',
    headers: {
      "X-AYLIEN-TextAPI-Application-ID": appId,
      "X-AYLIEN-TextAPI-Application-Key": apiKey,
      // also delete this 
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Credentials": true
    },
  };

  return $.ajax(settings);
}