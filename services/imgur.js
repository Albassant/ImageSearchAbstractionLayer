var request = require("request");

exports.getImages = function(search, pages=1) {
  return new Promise((resolve, reject) => {
    var options = {
      url: 'https://api.imgur.com/3/gallery/search/' + pages + '?q=' + search,
      headers: {
        'Authorization': 'Client-ID ' + process.env.CLIENT_ID
      },
      json: true
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var images = body.data.filter((item) => {
          return item.is_album == false;
        }).map((image) => {
          return {
            url: image.link,
            snippet: image.title,
            context: 'https://imgur.com/' + image.id
          }
        });
        
        resolve(images);
      }
      else {
        reject(new Error("Request failed"));
      }
    }
    request(options, callback);
  });
}

