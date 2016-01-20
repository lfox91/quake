var request = require('request');

var usgsController = {

  // /////////////////////////////////////////////
  // GETDATA METHOD:  runs request for usgs data
  // for the last 24hours.
  //
  // NOTICE: This api is updated every 5 minutes.
  // ApiCache middleware handles the both caching
  // and intervals.
  // /////////////////////////////////////////////

  getData: function(req, res, next) {

    // /////////////////////////////////////////////
    // get usgs data
    // /////////////////////////////////////////////
    request('http://earthquake.usgs.gov/fdsnws/event/1/application.json',
            function (error, response, body) {


        if(error){
            return console.log('Error:', error);
        }

        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        console.log(res);
        //console.log(n);
        res.send(response);

    });//end request

 }//end getData method


}//usgsController obj

module.exports = usgsController;
