const yargs = require('yargs');

const axios = require('axios');

 var argv = yargs
.options({
   address:
   {
     demand: true,
     alias: 'a',
     describe: 'address to fetch weather for',
     string: true
   }
 })
 .help()
 .alias('help','h')
 .argv;

var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyC6h7jR0uMp5lEGUr4rDE2Pb1x75SPipVA`;

axios.get(geocodeUrl).then((response) =>
{
  if(response.data.status ==='ZERO_RESULTS')
  {
    throw new Error('Unable to find that Address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/b6fdeb0046e75c655f40fd7ac7725605/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) =>
{
  var currentTemp = ( response.data.currently.temperature - 32 )  * 5 / 9 ;
  var apparentTemp = ( response.data.currently.apparentTemperature - 32 )  * 5 / 9 ;
  console.log(`It's currently ${currentTemp} and it feels like ${apparentTemp}.`);
}).catch((e) =>
{
  if(e.code ==='ENOTFOUND')
  {
    console.log('Unable to connect to servers');
  }
  else
  {
    console.log(e.messsage);
  }
});
