
document.querySelector('.getpics').addEventListener('click', getFetch)

function getFetch(){
  const apiUrl = 'https://api.waifu.im/search';  // Replace with the actual API endpoint URL
  const params = {
    included_tags: document.querySelector('input').value.toString().toLowerCase(),
    height: '>=2000'
  };

  const queryParams = new URLSearchParams();

  for (const key in params) {
    if (Array.isArray(params[key])) {
      params[key].forEach(value => {
        queryParams.append(key, value);
      });
    } else {
      queryParams.set(key, params[key]);
    }
  }
  const requestUrl = `${apiUrl}?${queryParams.toString()}`;

  fetch(requestUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed with status code: ' + response.status);
      }
    })
    .then(data => {
      // Process the response data as needed
      console.log(data);
      document.querySelector('img').src = data.images[0].url
    })
    .catch(error => {
      console.error('An error occurred:', error.message);
    });

}

