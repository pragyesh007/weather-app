const request = require('request');

var weatherAddress = (lat , lng , callback) =>
{
  request({
    url:`https://api.darksky.net/forecast/b6fdeb0046e75c655f40fd7ac7725605/${lat},${lng}`,
    json:true
  },(error,response,body) =>
  {
    if(!error && response.statusCode === 200 )
    {
      var temp =
      {
        currentTemp:( body.currently.temperature - 32 )  * 5 / 9 ,
        apparentTemp:( body.currently.apparentTemperature - 32 )  * 5 / 9
      };
      callback(undefined ,temp);
    }
    else
    {
      callback('Unable to fetch the weather');
    }
  });
};

module.exports =
{
  weatherAddress
};
