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

    .factory('userFactory', function($http,$location,$cookies) {
      // var userId = $cookies.get('userId');
      // $http.post('api/php/login.php?id='+userId,{'selectSeccion':userId}).success(function(data,status,headers,config,response){
      //   $http.get('api/php/login.php?id='+userId).success(function(response){
      //     if(response){
      //     return{
      //           id : response.id,
      //           photo: response.foto,
      //           name : response.nombre
      //       }
      //     }else{
      //       return{
      //         id : 'sadasd',
      //         photo: 'img/columnista1.jpg',
      //         name : 'Jose Luis'
      //       }
      //     }
      //   });
      // });
      return{
        id : 'do630s',
         photo: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSNJ4TdrDgFJM3LR4pYtbvCi_2WYZyQYDFPnlU6OlIMdi2zdku5',
         name : 'Dora Reyes',
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

    .controller('mainController', function($scope, $http, $location, userFactory, $cookies){

        $scope.username = userFactory.name;
        $scope.userphoto = userFactory.photo;
        $scope.userId = userFactory.id;
        console.log($scope.userId);
        $scope.date = new Date();

        // var now = new Date(),
        // exp = new Date(now.getFullYear(), now.getMonth()+6, now.getDate());
        //
        // $cookies.put('userId','do630s',{
        //   expires: exp
        // });
        $http.post('api/php/dashboard.php?id='+$scope.userId,{'selectSeccion':$scope.userId}).success(function(data,status,headers,config,response){
          $http.get("api/php/dashboard.php?id="+$scope.userId).success(function(response){
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
        });

    })
    .controller('newArticleController', function($scope, $http, $location, userFactory){
        $scope.username = userFactory.name;
        $scope.userphoto = userFactory.photo;
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
        $scope.control;
        $scope.valor = function(val){
          $scope.control = val;
        }
        $scope.borrarF = function(id,tipo){
          $http.post('api/php/mantenimientoF.php?id='+id+"&tipo=2",{'selectSeccion':$scope.userId}).success(function(data,status,headers,config,response){
            $http.get("api/php/mantenimientoF.php?id="+id+"&tipo=2").success(function(response){
              $scope.fotogalerias = response.fotogalerias;
            });
          });
        };
    })
    .controller('CaricaturasController', function($scope, $http, $location, userFactory){
        $scope.username = userFactory.name;
        $scope.userphoto = userFactory.photo;
        $scope.control;
        $scope.date = new Date();
        $scope.upload = function(){
            console.log('upload');
        }
        $scope.currentPage = 1;
        $scope.pageSize = 5;
        $scope.maxSize = 4;
        $http.get('api/php/caricaturas.php').success(function(response){
          $scope.caricaturas = response.caricaturas;
        });
        $scope.valor = function(val){
          $scope.control = val;
        }
        $scope.borrarC = function(id,tipo){
          $http.post('api/php/mantenimientoC.php?id='+id+"&tipo=2",{'selectSeccion':$scope.userId}).success(function(data,status,headers,config,response){
            $http.get("api/php/mantenimientoC.php?id="+id+"&tipo=2").success(function(response){
              $scope.caricaturas = response.caricaturas;
            });
          });
        };
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
          $scope.seccionPopular = response.seccionPopular;
        });

    })

    .controller('sondeoController', function($scope, $http, $location, userFactory){
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
        $scope.control;
        $scope.valor = function(val){
          $scope.control = val;
        }
        $scope.borrarS = function(id,tipo){
          $http.post('api/php/mantenimientoS.php?id='+id+"&tipo=2",{'selectSeccion':$scope.userId}).success(function(data,status,headers,config,response){
            $http.get("api/php/mantenimientoS.php?id="+id+"&tipo=2").success(function(response){
              $scope.sondeos = response.sondeos;
            });
          });
        };
    });
