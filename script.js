
getEverything({q: 'pole vault'}).then((response) => {
  const { articles } = response;
  const { url } = articles[0];
  console.log({url, googleResults: response})
  return getAnalysis({ url });
}).then((response) => {
  console.log({response})
})

// https://api.aylien.com/api/v1/combined?url=https://mashable.com/article/doomsday-vault-cherokee-nation/&endpoint=sentiment&endpoint=summarize