/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var storage = [];

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var handlePost = function(request, response) {
  var body = "";
  request.on('data', function (chunk) {
    body += chunk;
  });

  request.on('end', function(){
    var test = JSON.parse(body);
    storage.unshift(test);
    response.end();
  });
};

var handleGet = function(request, response){
  response.write(JSON.stringify({results: storage.slice(0)}));
  response.end();
};


var handleRequest = function(request, response) {
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  response.writeHead(statusCode, headers);

  if(request.method === 'POST'){
    handlePost(request, response);
   } else if (request.method === 'GET') {
    handleGet(request, response);
  } else {
    response.write(JSON.stringify("statusCode: " + statusCode));
  }
  response.end();
};

exports.handleRequest = handleRequest;