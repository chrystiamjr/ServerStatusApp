// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('myPiApp.controllers', ['ngStorage'])

.controller('LogoutCtrl', function($state, $localStorage, $sessionStorage, $scope, $ionicHistory){
  $scope.logout = function(){
    $localStorage.$reset({ token: [], user: [] });
    $sessionStorage.$reset({ user: [] });
    $ionicHistory.clearHistory();
    $ionicHistory.clearHistory();
    $state.go('login');
  }
})

.controller('LoginCtrl', function ($scope, $ionicModal, $state, $http, $ionicPopup, $localStorage, $sessionStorage) {

  console.log('Login Controller Initialized');

  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });


  // $scope.data = [];

  $scope.createUser = function (user) {
    var link = 'http://technikservicos.com.br/serverstatus/cadUser.php';
    // alert(user.password.length);
    if(user.username.length >= 5 && user.password.length >= 5){
      if (user && user.username && user.password) {
        var dados = {
          username: user.username,
          password: user.password
        }
        $http.post(link, dados, {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
        .then(function (res) {
          var teste = res.data;
          var resultado = teste.length;
          if (resultado <= 7) {
            var alertPopup = $ionicPopup.alert({
              title: 'Sucesso!',
              template: 'Credenciais cadastradas com sucesso!'
            });
            $scope.modal.hide();
          }
          $scope.response = res.data;

        });
      }
    }else{
      var alertPopup = $ionicPopup.alert({
        title: 'Erro: Tamanho insuficente!',
        template: 'Username e Senha não podem ser menores que 5 caracteres!'
      });
    }
  };
  var result = null;

  $scope.signIn = function (userLogin) {
    if (userLogin && userLogin.username && userLogin.passwordLogin) {
      for(var i = 0; i<$localStorage.usuarios.length;i++) {
        if ($localStorage.usuarios[i].username == userLogin.username && $localStorage.usuarios[i].senha == userLogin.passwordLogin){
          console.log("OK");
          result = "sucesso";

          if(userLogin.reminder){
            // Atribui um token codificado em base64 associado ao usuário
            // alert(btoa(userLogin.username));
            $localStorage.token.push(btoa(userLogin.username));
            $localStorage.user.push(userLogin.username);
            // $localStorage.token.user.push(userLogin.username);
          }else{
            $sessionStorage.user.push(userLogin.username);
          }

          $state.go('tab.dash');
          break;
        } else {
          result = "falhou";
        }
      }

      if(result == "sucesso"){

        userLogin.username = null;
        userLogin.passwordLogin = null;
        userLogin.reminder = null;

        var alertPopup = $ionicPopup.alert({
          title: 'Sucesso!',
          template: 'Usuário Logado!'
        });
      } else {

        userLogin.username = null;
        userLogin.passwordLogin = null;
        userLogin.reminder = null;

        var alertPopup = $ionicPopup.alert({
          title: 'Erro ao efetuar login!',
          template: 'Email ou Senha estão incorretos!'
        });
      }
      // var link = 'http://pi2016.16mb.com/php/loginUsuario.php';
      // var dados = {
      //   username: userLogin.username,
      //   password: userLogin.passwordLogin
      // }
      // $http.post(link, dados, {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      // .then(function (res) {
      //   var teste2 = res.data;
      //   var resultado2 = teste2.length;
      //   if (resultado2 <= 7) {
    }
  };
})

.controller('DashCtrl', function($scope, $http, $localStorage, $sessionStorage){
  $scope.$watch(function(){
    if($localStorage.user[0]){
      $scope.usuario = $localStorage.user[0];
    }else{
      $scope.usuario = $sessionStorage.user[0];
    }
  })
})

.controller('LiveCtrl', function ($scope, $timeout, $http, $ionicLoading) {

  // console.log($localStorageProvider.get('history'));
  $scope.live = [];
  $ionicLoading.show({
    content: 'Carregando Dados',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 100,
    duration: 2000
  }).then(function(){
    console.log("The loading indicator is now displayed");
  });
  var getLive = function () {
    $http.get("http://technikservicos.com.br/serverstatus/getLiveTemp.php", {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    .success(function (res) {
      $scope.live = res;
    })

    // if($localStorage.templog){
    //   $scope.live = $localStorage.templog; // Funciona no safari
    // }else {
    //   $scope.live = $localStorage.templog.data; // Funciona no mozilla
    // }

    $timeout(getLive, 500); // Timeout de quase 5 min
  }
  $timeout(getLive, 500); // Timeout de quase 5 min

})

.controller('HistoryCtrl', function ($scope, $ionicModal, $localStorage) {

  $scope.resultados = [];

  $ionicModal.fromTemplateUrl('templates/AllHistory.html', {
    scope: $scope
  }).then(function (geral) {
    $scope.geral = geral;
  });

  if($localStorage.templog){
    $scope.resultados = $localStorage.templog; // Funciona no safari
  }else {
    $scope.resultados = $localStorage.templog.data; // Funciona no mozilla
  }

})

.controller('AllHistoryCtrl', function ($scope, $localStorage) {

  $scope.resultadosGerais = [];

  if($localStorage.templog){
    $scope.resultadosGerais = $localStorage.templog; // Funciona no safari
  }else {
    $scope.resultadosGerais = $localStorage.templog.data; // Funciona no mozilla
  }

});
