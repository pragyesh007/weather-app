const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address , (errorMessage , results) =>
{
  if(errorMessage)
  {
    console.log(errorMessage);
  }
  else
  {
    console.log(results.Address);
    weather.weatherAddress(results.Latitude,results.Longitude, (error, weatherResults) =>
  {
    if(error)
    {
      console.log(error);
    }
    else
    {
      console.log(`It's currently ${weatherResults.currentTemp} and it feels like ${weatherResults.apparentTemp}.`);
    }
  });

  }
});
