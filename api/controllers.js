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

    .factory('userFactory', function() {
    return{
          id : 'Abc3214KB',
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

    .controller('mainController', function($scope, $http, $location, userFactory,uibDateParser){

        $scope.username = userFactory.name;
        $scope.userphoto = userFactory.photo;
        $scope.date = new Date();

        //Bolsas
        // $scope.bolsaNombre = 'Dow Jones';
        // $scope.bolsaPorcentaje = '2.39';
        // $scope.bolsaValor = '15,944.5';

        //Mercados
        $scope.mercadosNombre = 'PETROLEO';
        $scope.mercadosContrato = 'contrato nov 2015 $ / barril';
        $scope.mercadosUltimo = '26.75';
        $scope.mercadosCambios = '0.54';
        $scope.mercadosPorCambio = '2.06';
        $scope.mercadosMenor = '37.75';
        $scope.mercadosAlto = '77.83';

        //Cifras
        $scope.cifrasIndicador = 'PIB trimestral';
        $scope.cifrasPeriodo = 'II - 2015';
        $scope.cifrasCifras = '2.4%';
        $scope.cifrasDetalles = 'Tabla';

        //Divisas
        $scope.divisaNombre = 'Euro';
        $scope.divisaPais = 'EUROPA';
        $scope.divisaValor = '0.914';

        //Tasas
        $scope.tasaNombre = 'TASA FED';
        $scope.tasaPorcentaje = '0.50';

        $http.get("api/php/dashboard.php").success(function(response){
          $scope.leidos = response.leidos;
          $scope.sondeo = response.sondeo;
          $scope.fotogaleria = response.fotogaleria;
          $scope.cliente = response.cliente;
          $scope.bolsas = response.bolsas;
          $scope.mercados = response.mercados;
          $scope.cifras = response.cifras;
          $scope.divisas = response.divisas;
          $scope.tasas = response.tasas;
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

        $scope.pDisponibles = '315';
        $scope.pOcupadas = '120';
        $scope.pPorcentaje = ($scope.pOcupadas * 100) / $scope.pDisponibles;
        console.log($scope.pPorcentaje);

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

    });
