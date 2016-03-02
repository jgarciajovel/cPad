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

    .controller('loginController', function($scope, $http, $location, uService, $cookies){

      $scope.inUsername;
      $scope.inPassword;

      $scope.logIn = function(){
        $http.get('api/php/login.php?username='+$scope.inUsername+'&password='+$scope.inPassword).success(function(response){
          var now = new Date(),
          exp = new Date(now.getFullYear(), now.getMonth()+6, now.getDate());

          if(response.id != null){
            $cookies.put('usercpid',response.id,{
              expires: exp
            });
            $location.path('/');
          }else{
          $scope.error = "!Hay un problema con su usuario ó contraseña¡";
          }

        });
      }

    })

    .factory('uService', function($http,$cookies){
        return {
          list: function(response){
              userId = $cookies.get('usercpid');
              $http.post('api/php/login.php',{id: userId}).success(response);
          }
        };
      })

      .directive('ngInitial', function() {
        return {
          restrict: 'A',
          controller: [
            '$scope', '$element', '$attrs', '$parse', function($scope, $element, $attrs, $parse) {
              var getter, setter, val;
              val = $attrs.ngInitial || $attrs.value;
              getter = $parse($attrs.ngModel);
              setter = getter.assign;
              setter($scope, val);
            }
          ]
        };
      })
    .controller('mainController', function($scope, $http, $location, uService, $cookies){

          $scope.logout = function(){
              $cookies.remove('usercpid');
              $location.path('/login');
          };

          uService.list(function(uService) {
            if(userId && userId != 'null'){
              $scope.username = uService.nombre;
              $scope.userphoto = uService.foto;
            }else{
              $cookies.remove('usercpid');
              $location.path('/login');            }
          });


          $http.post("api/php/dashboard.php",{id: userId}).success(function(response){

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
            $scope.caricatura = response.caricatura;
          });
          $scope.control;
          $scope.valor = function(val){
            $scope.control = val;
          }
          $scope.editBolsa = function(id,nombre,porcentaje,valor){
            $http.post("api/php/modulos.php?id="+id+"&nombre="+nombre+"&porcentaje="+porcentaje+"&valor="+valor+"&tipo=1&modulo=1",{'selectSeccion':$scope.userId}).success(function(data,status,headers,config,response){
              alert("Cambios guardados");
              $http.get("api/php/modulos.php?id="+id+"&nombre="+nombre+"&porcentaje="+porcentaje+"&valor="+valor+"&tipo=1&modulo=1").success(function(response){
                $scope.bolsas = response.bolsas;
              });
            });
          }
          $scope.addBolsa = function(nombre,porcentaje,valor){

              $http.get("api/php/modulos.php?nombre="+nombre+"&porcentaje="+porcentaje+"&valor="+valor+"&tipo=3&modulo=1").success(function(response){
                $scope.bolsas = response.bolsas;
              });

          }
          $scope.borrarBolsa = function(id){
            $http.post("api/php/modulos.php?id="+id+"&tipo=2&modulo=1",{'selectSeccion':$scope.userId}).success(function(data,status,headers,config,response){
              alert("Cambios guardados");
              $http.get("api/php/modulos.php?id="+id+"&tipo=2&modulo=1").success(function(response){
                $scope.bolsas = response.bolsas;
              });
            });
          }

    })
    .controller('newArticleController', function($scope, $http, $location, uService, $cookies){
      $scope.logout = function(){
          $cookies.remove('usercpid');
          $location.path('/login');
      };

      uService.list(function(uService) {
        if(userId && userId != 'null'){
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
        }else{
          $location.path('/login');
        }
      });
    })
    .controller('historyArticlesController', function($scope, $http, $location, uService, $cookies,$anchorScroll){

      $scope.top = function(){
        $anchorScroll();
      };

      $scope.logout = function(){
          $cookies.remove('usercpid');
          $location.path('/login');
      };

      uService.list(function(uService) {
        if(userId && userId != 'null'){
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
        }else{
          $location.path('/login');
        }
      });

        $scope.date = new Date();
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.maxSize = 4;
        $http.get("api/php/history.php").success(function(response){
          $scope.contenido = response.contenido;
          $scope.paginadorf = response.paginador;
          console.log($scope.paginadorf.length);
        });
        $scope.totalVisitas = function(articulos){
          var total = 0;
          for (var i = 0; i < articulos.length; i++) {
            total += parseInt(articulos[i].total);
          }
          return total;
        };
    })
    .controller('photogalleryController', function($scope, $http, $location, uService, $cookies){
      $scope.logout = function(){
          $cookies.remove('usercpid');
          $location.path('/login');
      };

      uService.list(function(uService) {
        if(userId && userId != 'null'){
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
        }else{
          $location.path('/login');
        }
      });
        $scope.date = new Date();
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
    .controller('CaricaturasController', function($scope, $http, $location, uService, $cookies, Upload, $timeout){
      $scope.logout = function(){
          $cookies.remove('usercpid');
          $location.path('/login');
      };

      uService.list(function(uService) {
        if(userId && userId != 'null'){
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
        }else{
          $location.path('/login');
        }
      });

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
          $scope.caricaturista = response.caricaturista;
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

        $scope.uploadFiles = function(file, errFiles) {
            $scope.f = file;
            $scope.filenamesave = 'img/'+file.name;

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'http://intuls.com/cPad/api/php/insertCaricatura.php',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                                             evt.loaded / evt.total));
                });
            }
        };

        $scope.postCaricatura = function(idAutor,fileroot){
          console.log(fileroot);
          $http.post('api/php/insertCaricatura.php',{autor: idAutor, filer: fileroot}).success(function(response){
            $http.get('api/php/caricaturas.php').success(function(response){
              $scope.caricaturas = response.caricaturas;
              $scope.caricaturista = response.caricaturista;
              $scope.fotito = '';
            });
          });
        };
    })
    .controller('adsController', function($scope, $http, $location, uService, $cookies){
      $scope.logout = function(){
          $cookies.remove('usercpid');
          $location.path('/login');
      };

      uService.list(function(uService) {
        if(userId && userId != 'null'){
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
        }else{
          $location.path('/login');
        }
      });
        $scope.date = new Date();
    })
    .controller('positionController', function($scope, $http, $location, uService, $cookies){
      $scope.logout = function(){
          $cookies.remove('usercpid');
          $location.path('/login');
      };

      uService.list(function(uService) {
        if(userId && userId != 'null'){
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
        }else{
          $location.path('/login');
        }
      });
        $scope.date = new Date();

        $scope.clientImg = 'https://yt3.ggpht.com/-JFUghiFoWZE/AAAAAAAAAAI/AAAAAAAAAAA/dQEFJROgpdU/s900-c-k-no/photo.jpg';
    })

    .controller('analyticsController', function($scope, $http, $location, uService, $cookies){
        $scope.logout = function(){
            $cookies.remove('usercpid');
            $location.path('/login');
        };

        uService.list(function(uService) {
          if(userId && userId != 'null'){
            $scope.username = uService.nombre;
            $scope.userphoto = uService.foto;
          }else{
            $location.path('/login');
          }
        });
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

    .controller('sondeoController', function($scope, $http, $location, uService, $cookies){
        $scope.logout = function(){
            $cookies.remove('usercpid');
            $location.path('/login');
        };

        uService.list(function(uService) {
          if(userId && userId != 'null'){
            $scope.username = uService.nombre;
            $scope.userphoto = uService.foto;
          }else{
            $location.path('/login');
          }
        });

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
