const apiKey = '19a918446d7447a9b93c6157cfbc5140';

const buildParamString = (params) => {
  let paramList = Object.entries(params).map(([ key, value ]) => `${key}=${value}`);
  return paramList.join('&');
}

const getHeadlines = (params) => {

  let url = 'https://newsapi.org/v2/top-headlines?';
  url += buildParamString(params);
  
  const settings = {
    url,
    method: 'GET',
    headers: {
      "X-Api-Key": "19a918446d7447a9b93c6157cfbc5140"
    },
  };

  return $.ajax(settings);
}
