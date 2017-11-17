angular.module('meteo').controller('meteoController', function($scope, $http){
function success(tutut) {
  var _details = tutut.coords;
  $scope.latitude = _details.latitude;
  $scope.longitude = _details.longitude;
  $scope.accuracy = _details.accuracy;
  $http.get('https://lit-ridge-46374.herokuapp.com/forecast/93a3bcef6b75e4629c4e593eb1d0190d/'+_details.latitude+',' + _details.longitude).then(function(response) {
  		console.log('ici ma reponse de lit-ridge-46374.herokuapp.com', response);
  		$scope.Meteo = (response.data.currently.temperature).toFixed(1);
  		$scope.temperature = (((response.data.currently.temperature) -32) * 5/9).toFixed(1);
  		$scope.Time = response.data.currently.time;
  		$scope.summary = response.data.currently.summary;
      $scope.temperatureHigh = response.data.daily.data[0].temperatureHigh;
     $scope.temperatureHighc = (((response.data.daily.data[0].temperatureHigh)-32) * 5/9).toFixed(1);
     $scope.temperaturelow = response.data.daily.data[0].temperatureLow;
     $scope.temperaturelowc = (((response.data.daily.data[0].temperatureLow)-32) * 5/9).toFixed(1);
     $scope.sunriseTime = response.data.daily.data[0].sunriseTime;
     $scope.sunsetTime = response.data.daily.data[0].sunsetTime;
     $scope.humidity = response.data.daily.data[0].humidity;
     $scope.windSpeed = response.data.daily.data[0].windSpeed;
     $scope.precipProbability = response.data.daily.data[0].precipProbability;
  });
  $http.get('http://www.mapquestapi.com/geocoding/v1/address?key=gV7euQOQaw9kpWUEtC2S115byfxOdyDe&location='+_details.latitude+',' + _details.longitude).then(function(response) {
 		console.log('ici ma reponse de mapquestapi.com', response);
 		$scope.Country = response.data.results[0].locations[0].adminArea1;
 		$scope.Region = response.data.results[0].locations[0].adminArea3;
 		$scope.Ville = response.data.results[0].locations[0].adminArea5;
  });
};
// switch ($scope.description) {
//   case 'clear':{
//     $scope.bg={
//       "background": "url('https://unsplash.com/photos/3Z70SDuYs5g')"
//       "background-size": "cover"
//     };
//   }
//
//     break;
//   default:
//
// }
navigator.geolocation.getCurrentPosition(success);
});
