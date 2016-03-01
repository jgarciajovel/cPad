angular.module('cpad.controllers', [])

    .directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
    }])

    .factory('userFactory', function($cookies) {
        return {
          nombre: function(nombreF){
              return nombreF;
          },
          foto: function(fotoF){
              return fotoF;
          },
        }

    })
    .filter('urlEncode', function() {
        return function(input) {
            return input.split(" ").join("-");
        }
    })

    .filter('startFrom', function(){
        return function(data, start){
            return data.slice(start);
        }
    })

    .service('userService',function($http){

        this.userSinfo = function(){

            userId = 'do630s';

              $http.get('api/php/login.php?id='+userId).success(function(response){
              username = response.nombre;
              fotos = response.foto;
              // console.log(username);
            });
        }

    })

    .factory('uService', function($http){
        return {
          list: function(response){
              userId = 'do630s';
              $http.get('api/php/login.php?id='+userId).success(response);
          }
        };
      })

    .controller('loginController', function($scope, $http, $location, uService, $cookies){

      $scope.inUsername;
      $scope.inPassword;

      $scope.logIn = function(){
        $http.get('api/php/login.php?username='+$scope.inUsername+'&password='+$scope.inPassword).success(function(response){
          
        });
      }

      uService.list(function(uService) {
        if(uService.nombre != ''){
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
        }else{
          console.log(uService);
        }
      });


    })

    .controller('mainController', function($scope, $http, $location, uService, $cookies){

        $scope.date = new Date();

        // var now = new Date(),
        // exp = new Date(now.getFullYear(), now.getMonth()+6, now.getDate());
        //
        // $cookies.put('userId','do630s',{
        //   expires: exp
        // });
          $http.get("api/php/dashboard.php?id="+userId).success(function(response){
            $scope.leidos = response.leidos;
            $scope.sondeo = response.sondeo;
            $scope.fotogaleria = response.fotogaleria;
            $scope.cliente = response.cliente;
            $scope.bolsas = response.bolsas;
            $scope.mercados = response.mercados;
            $scope.cifras = response.cifras;
            $scope.divisas = response.divisas;
            $scope.tasas = response.tasas;
            $scope.tops = response.tops;
          });

    })
    .controller('newArticleController', function($scope, $http, $location, userFactory){
        $scope.username = userFactory.nombre;
        console.log($scope.username);
        $scope.userphoto = userFactory.foto;
        $scope.date = new Date();
        $scope.upload = function(){
            console.log('upload');
        }
    })
    .controller('historyArticlesController', function($scope, $http, $location, userFactory){
        $scope.username = userFactory.name;
        $scope.userphoto = userFactory.photo;
        $scope.date = new Date();
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.maxSize = 4;
        $http.get("api/php/history.php").success(function(response){
          $scope.contenido = response.contenido;
        });
        $scope.totalVisitas = function(articulos){
          var total = 0;
          for (var i = 0; i < articulos.length; i++) {
            total += parseInt(articulos[i].total);
          }
          return total;
        };
    })
    .controller('photogalleryController', function($scope, $http, $location, userFactory){
        $scope.username = userFactory.name;
        $scope.userphoto = userFactory.photo;
        $scope.date = new Date();
        $scope.upload = function(){
            console.log('upload');
        }
        $scope.currentPage = 1;
        $scope.pageSize = 5;
        $scope.maxSize = 4;
        $http.get('api/php/photogallery.php').success(function(response){
          $scope.fotogalerias = response.fotogalerias;
        });
    })
    .controller('adsController', function($scope, $http, $location, userFactory){
        $scope.username = userFactory.name;
        $scope.userphoto = userFactory.photo;
        $scope.date = new Date();
    })
    .controller('positionController', function($scope, $http, $location, userFactory){
        $scope.username = userFactory.name;
        $scope.userphoto = userFactory.photo;
        $scope.date = new Date();

        $scope.clientImg = 'https://yt3.ggpht.com/-JFUghiFoWZE/AAAAAAAAAAI/AAAAAAAAAAA/dQEFJROgpdU/s900-c-k-no/photo.jpg';
    })

    .controller('analyticsController', function($scope, $http, $location, userFactory){
        $scope.username = userFactory.name;
        $scope.userphoto = userFactory.photo;
        $scope.date = new Date();

        $http.get("api/php/analytics.php").success(function(response){
          $scope.clientePopular = response.clientePopular;
          $scope.publicidadPopular = response.publicidadPopular;
          $scope.posicionP = response.posicionP;
          $scope.posicionM = response.posicionM;
          $scope.total = response.total;
        });

    })

    .controller('sondeoController', function($scope, $http, $location){
        $scope.username = userFactory.name;
        $scope.userphoto = userFactory.photo;
        $scope.date = new Date();

        $scope.pDisponibles = '315';
        $scope.pOcupadas = '120';
        $scope.pPorcentaje = ($scope.pOcupadas * 100) / $scope.pDisponibles;
        console.log($scope.pPorcentaje);
        $scope.currentPage = 1;
        $scope.pageSize = 5;
        $scope.maxSize = 4;
        $http.get('api/php/sondeos.php').success(function(response){
          $scope.sondeos = response.sondeos;
        });

    });
