// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('myPiApp', ['ionic', 'myPiApp.controllers', 'myPiApp.services','ngStorage'])

.run(function($ionicLoading, $ionicPlatform, $localStorage, $sessionStorage, $http, $timeout, $state) {
  $ionicLoading.show({
    content: '',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 100,
    showDelay: 100,
    duration: 3000
  }).then(function(){
    console.log("The loading indicator is now displayed");
  });
  $ionicPlatform.ready(function() {

    // Checa se o usuário já estava logado ou não!
    if($localStorage.token != null) {
      if ($localStorage.token.length != 0) $state.go('tab.dash');
      else $state.go('login');
    }
    else {$state.go('login');}

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    $storage = $localStorage.$default({
      templog: {},
      token: [],
      user: [],
      usuarios:{}
    });
    $storage = $sessionStorage.$default({
      user: []
    })

  });

  var retrieve  = function () {

    $http.get("http://technikservicos.com.br/serverstatus/getAllHistory.php", {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    .success(function (res) {
      $localStorage.templog = res;
      // console.log($localStorage);
    })

    $http.get("http://technikservicos.com.br/serverstatus/getUserData.php", {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    .success(function (res) {
      console.log(res);
      $localStorage.usuarios = res;
    })

    $timeout(retrieve, 60000); //290000
    // alert($localStorage.templog.length);
  }
  // delete $localStorage.usuarios;
  $timeout(retrieve, 500);
})

// Mantém as tabs sempre em baixo
.config(['$ionicConfigProvider', function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom'); // other values: top
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })

  .state('tab',{
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tab.html'
  })

  .state('tab.dash',{
    url: '/dash',
    views: {
      'dash': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.live',{
    url: '/live',
    views: {
      'live': {
        templateUrl: 'templates/liveTemp.html',
        controller: 'LiveCtrl'
      }
    }
  })

  .state('tab.history',{
    url: '/history',
    views: {
      'history': {
        templateUrl: 'templates/historyTemp.html',
        controller: 'HistoryCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/login');

})
