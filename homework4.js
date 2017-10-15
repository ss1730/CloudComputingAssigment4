'use strict';


angular.module('sosaglezApp')
  .controller('Homework4Ctrl', function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
    ];
$scope.show= false;
  var url = 'https://83leawznfb.execute-api.us-east-1.amazonaws.com/dev/characters';
  var character = [];
  var common = [];
    $http.get(url).then(
      function sucess(response){
        $scope.characters=response.data;
      },
      function error(error){
        console.log(error);
      }
    );

var valor1="";
var valor2="";
$scope.valor ="";
$scope.valor2 ="";
$scope.SetComics = function (action){
var start = new Date();
  valor1=$scope.choosenItem;
  valor2=$scope.choosenItem2;
var url2 ='https://83leawznfb.execute-api.us-east-1.amazonaws.com/dev/characters';
var comicsCharacter1 = [];
var comicsCharacter2 = [];

if(valor1 != valor2){
return Promise.join(
  $http.get(url2+'/'+valor1.toString()+'/comics'),
  $http.get(url2+'/'+valor2.toString()+'/comics'),
  function(result1,result2){
    comicsCharacter1 = result1.data;
    comicsCharacter2 = result2.data;
    intersect(comicsCharacter1,comicsCharacter2);
    printLatency(start);
  })
  .catch(function (error){
    console.log(error);
  });
}
else {
  $http.get(url2+'/'+valor1.toString()+'/comics').then(function success (response){
    comicsCharacter1 = response.data;
    showResults(comicsCharacter1);
    printLatency(start);
  })
  .catch(function (error) {
    console.log(error);
  });
}
}

$scope.SetSeries = function (action){
var start = new Date();
  valor1=$scope.choosenItem;
  valor2=$scope.choosenItem2;
var url2 ='https://83leawznfb.execute-api.us-east-1.amazonaws.com/dev/characters';
var comicsCharacter1 = [];
var comicsCharacter2 = [];

if(valor1 != valor2){
return Promise.join(
  $http.get(url2+'/'+valor1.toString()+'/series'),
  $http.get(url2+'/'+valor2.toString()+'/series'),
  function(result1,result2){
    comicsCharacter1 = result1.data;
    comicsCharacter2 = result2.data;
    intersect(comicsCharacter1,comicsCharacter2);
    printLatency(start);
  })
  .catch(function (error){
    console.log(error);
  });
}
else {
  $http.get(url2+'/'+valor1.toString()+'/series').then(function success (response){
    comicsCharacter1 = response.data;
    showResults(comicsCharacter1);
    printLatency(start);
  })
  .catch(function (error) {
    console.log(error);
  });
}
}

  function intersect(result1,result2){
    var intersection = [];
    while(result1.length > 0 && result2.length >0){
        if(result1[0] < result2[0]){
          result1.shift();
        }
        else if(result1[0] > result2[0]){
          result2.shift();
        }
        else{
          intersection.push(result1.shift());
          result2.shift();
        }
    }
    showResults(intersection);
  }

  function showResults(results){
    common = [];
    for (var index = 0; index < results.length; index++){
      common.push(results[index].title);
      console.log(results[index].title);
    }
    if(common.length >0){
      $scope.common = common;
      console.log("data");
     $scope.show = true;
    }else{
      $scope.common = "No se encontro ningun comic comun";
      $scope.show = true;
    }
  }

  function printLatency(start){
    var end = new Date();
    var latency = end -start;
    $scope.latency = latency +"ms";
    console.log(latency);
  }

});
