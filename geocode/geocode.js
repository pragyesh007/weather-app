const request = require('request');

var geocodeAddress = (address , callback) =>
{
  var encodedAddress = encodeURIComponent(address);
 request({
   url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyC6h7jR0uMp5lEGUr4rDE2Pb1x75SPipVA`,
   json:true
 },(error,response,body) =>
 {
   if(error)
   {
     callback('Unable to connect to Google servers.');
   }
   else if(body.status === 'ZERO_RESULTS')
   {
     callback('Unable to find that Address.');
   }
   else if(body.status === 'OK')
   {
     callback(undefined , {
       Address : body.results[0].formatted_address,
       Latitude : body.results[0].geometry.location.lat,
       Longitude : body.results[0].geometry.location.lng
     });
   }
 });

};

  module.exports =
  {
    geocodeAddress
  };

  //b6fdeb0046e75c655f40fd7ac7725605
