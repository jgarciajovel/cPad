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
          $scope.date = new Date();

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
            var ar = $scope.bolsas[0].fecha.split("-");
            $scope.fechaBolsadia = ar[2];
            $scope.fechaBolsames = ar[1];
            $scope.fechaBolsaanio = ar[0];
            var er = $scope.mercados[0].fecha.split("-");
            $scope.fechaMerdia = er[2];
            $scope.fechaMermes = er[1];
            $scope.fechaMeranio = er[0];
            var dv = $scope.divisas[0].fecha.split("-");
            $scope.fechaDivdia = dv[2];
            $scope.fechaDivmes = dv[1];
            $scope.fechaDivanio = dv[0];
            var ta = $scope.divisas[0].fecha.split("-");
            $scope.fechaTadia = ta[2];
            $scope.fechaTames = ta[1];
            $scope.fechaTaanio = ta[0];
            $scope.caricatura = response.caricatura;

          });
          $scope.control;
          $scope.valor = function(val){
            $scope.control = val;
          }
          $scope.editBolsa = function(id,nombre,porcentaje,valor){
            // $http.post("api/php/modulos.php?id="+id+"&nombre="+nombre+"&porcentaje="+porcentaje+"&valor="+valor+"&tipo=1&modulo=1",{'selectSeccion':$scope.userId}).success(function(data,status,headers,config,response){
            if(!isNaN(porcentaje) && !isNaN(valor) && porcentaje!= undefined && valor!= undefined && nombre!= undefined){
              $http.post('api/php/modulos.php?tipo=1&modulo=1',{'id':id, 'nombre': nombre, 'porcentaje': porcentaje, 'valor': valor}).success(function(response){
                alert("Cambios guardados");
                  $scope.bolsas = response.bolsas;
              });
            }else{
              alert("Ingrese contenido valido");
            }
          }
          $scope.addBolsa = function(nombre,porcentaje,valor){
              if(!isNaN(porcentaje) && !isNaN(valor) && porcentaje!= undefined && valor!= undefined && nombre!= undefined){
                $http.post('api/php/modulos.php?tipo=3&modulo=1',{'nombre': nombre, 'porcentaje': porcentaje, 'valor': valor}).success(function(response){
                  $scope.bolsas = response.bolsas;
                  $scope.newBolsaNombre ="";
                  $scope.newBolsaPorcentaje ="";
                  $scope.newBolsaValor ="";
                });
              }else{
                alert("Ingrese contenido valido");
              }
          }
          $scope.borrarBolsa = function(id){
            $http.post("api/php/modulos.php?tipo=2&modulo=1",{'id':id}).success(function(response){

                $scope.bolsas = response.bolsas;

            });

          }
          $scope.editFecha = function(dia,mes,anio){
            var fecha = [anio,mes,dia];
            var f = fecha.join("-");
            console.log(f);
            $http.post("api/php/modulos.php?tipo=4&modulo=1",{'fecha':f}).success(function(response){
                alert("Cambios realizados correctamente");
                $scope.bolsas = response.bolsas;
            });
          }
          $scope.editMercado = function(id,nombre,descripcion,ultimo,cambio,porcentaje,menor,masAlto){
            if(!isNaN(porcentaje) && !isNaN(ultimo) && !isNaN(cambio) && !isNaN(menor) && !isNaN(masAlto) && descripcion!= undefined && nombre!= undefined){
              $http.post('api/php/modulos.php?tipo=1&modulo=2',{'id':id, 'nombre': nombre, 'descripcion': descripcion, 'ultimo': ultimo,'cambio': cambio,'porcentaje': porcentaje,'menor': menor,'masAlto': masAlto}).success(function(response){
                alert("Cambios guardados");
                  $scope.mercados = response.mercados;
              });
            }else{
              alert("Ingrese contenido valido");
            }
          }
          $scope.borrarMercado = function(id){

              $http.post('api/php/modulos.php?tipo=2&modulo=2',{'id':id}).success(function(response){
                  $scope.mercados = response.mercados;
              });

          }
          $scope.addMercado = function(nombre,descripcion,ultimo,cambio,porcentaje,menor,masAlto){
            if(!isNaN(porcentaje) && !isNaN(ultimo) && !isNaN(cambio) && !isNaN(menor) && !isNaN(masAlto) && descripcion!= undefined && nombre!= undefined){
              $http.post('api/php/modulos.php?tipo=3&modulo=2',{'nombre': nombre, 'descripcion': descripcion, 'ultimo': ultimo,'cambio': cambio,'porcentaje': porcentaje,'menor': menor,'masAlto': masAlto}).success(function(response){
                  $scope.mercados = response.mercados;
                  $scope.newMercadosNombre = "";
                  $scope.newMercadosDes = "";
                  $scope.newMercadosUltimo = "";
                  $scope.newMercadosCambio = "";
                  $scope.newMercadosPorcentaje = "";
                  $scope.newMercadosMenor = "";
                  $scope.newMercadosAlto = "";
              });
            }else{
              alert("Ingrese contenido valido");
            }
          }
          $scope.editFechaM = function(dia,mes,anio){
            var fecha = [anio,mes,dia];
            var f = fecha.join("-");
            console.log(f);
            $http.post("api/php/modulos.php?tipo=4&modulo=2",{'fecha':f}).success(function(response){
                alert("Cambios realizados correctamente");
                $scope.mercados = response.mercados;
            });
          }
          $scope.editCifra = function(id,indicador,periodo,cifras,enlace){
            if(!isNaN(cifras) && indicador!= undefined && periodo!= undefined && enlace!= undefined){
              $http.post('api/php/modulos.php?tipo=1&modulo=3',{'id':id, 'indicador': indicador, 'periodo': periodo, 'cifras': cifras,'enlace': enlace}).success(function(response){
                alert("Cambios guardados");
                  $scope.cifras = response.cifras;
              });
            }else{
              alert("Ingrese contenido valido");
            }
          }
          $scope.borrarCifra = function(id){

              $http.post('api/php/modulos.php?tipo=2&modulo=3',{'id':id}).success(function(response){
                  $scope.cifras = response.cifras;
              });

          }
          $scope.addCifra = function(indicador,periodo,cifras,enlace){
            if(!isNaN(cifras) && indicador!= undefined && periodo!= undefined && enlace!= undefined){
              $http.post('api/php/modulos.php?tipo=3&modulo=3',{'indicador': indicador, 'periodo': periodo, 'cifras': cifras,'enlace': enlace}).success(function(response){
                  $scope.cifras = response.cifras;
                  $scope.newCifrasIndicador = "";
                  $scope.newCifrasPeriodo ="";
                  $scope.newCifrasCifras = "";
                  $scope.newCifrasDetalles = "";
              });
            }else{
              alert("Ingrese contenido valido");
            }
          }
          $scope.editDivisa = function(id,nombre,pais,cambio){
            if(!isNaN(cambio) && nombre!= undefined && pais!= undefined){
              $http.post('api/php/modulos.php?tipo=1&modulo=4',{'id':id, 'nombre': nombre, 'pais': pais, 'cambio': cambio}).success(function(response){
                alert("Cambios guardados");
                  $scope.divisas = response.divisas;
              });
            }else{
              alert("Ingrese contenido valido");
            }
          }
          $scope.borrarDivisa = function(id){

              $http.post('api/php/modulos.php?tipo=2&modulo=4',{'id':id}).success(function(response){
                  $scope.divisas = response.divisas;
              });

          }
          $scope.addDivisa = function(nombre,pais,cambio){
            if(!isNaN(cambio) && nombre!= undefined && pais!= undefined){
              $http.post('api/php/modulos.php?tipo=3&modulo=4',{ 'nombre': nombre, 'pais': pais, 'cambio': cambio}).success(function(response){
                  $scope.divisas = response.divisas;
                  $scope.newDivisaNombre ="";
                  $scope.newDivisaPais = "";
                  $scope.newDivisaValor = "";
              });
            }else{
              alert("Ingrese contenido valido");
            }
          }
          $scope.editFechaD = function(dia,mes,anio){
            var fecha = [anio,mes,dia];
            var f = fecha.join("-");
            $http.post("api/php/modulos.php?tipo=4&modulo=4",{'fecha':f}).success(function(response){
                alert("Cambios realizados correctamente");
                $scope.divisas = response.divisas;
            });
          }
          $scope.editTasa = function(id,nombre,porcentaje){
            if(!isNaN(porcentaje) && nombre!= undefined){
              $http.post('api/php/modulos.php?tipo=1&modulo=5',{'id':id, 'nombre': nombre, 'porcentaje': porcentaje}).success(function(response){
                alert("Cambios guardados");
                  $scope.tasas = response.tasas;
              });
            }else{
              alert("Ingrese contenido valido");
            }
          }
          $scope.borrarTasa = function(id){

              $http.post('api/php/modulos.php?tipo=2&modulo=5',{'id':id}).success(function(response){
                  $scope.tasas = response.tasas;
              });

          }
          $scope.addTasa = function(nombre,porcentaje){
            if(!isNaN(porcentaje) && nombre!= undefined){
              $http.post('api/php/modulos.php?tipo=3&modulo=5',{ 'nombre': nombre, 'porcentaje': porcentaje}).success(function(response){
                  $scope.tasas = response.tasas;
                  $scope.newTasaNombre = "";
                  $scope.newTasaPorcentaje = "";
              });
            }else{
              alert("Ingrese contenido valido");
            }
          }
          $scope.editFechaT = function(dia,mes,anio){
            var fecha = [anio,mes,dia];
            var f = fecha.join("-");
            console.log(f);
            $http.post("api/php/modulos.php?tipo=4&modulo=5",{'fecha':f}).success(function(response){
                alert("Cambios realizados correctamente");
                $scope.tasas = response.tasas;
            });
          }
    })
    .controller('newArticleController', function($scope, $http, $location, uService, $cookies, Upload, $timeout){
      $scope.date = new Date();

      $scope.logout = function(){
          $cookies.remove('usercpid');
          $location.path('/login');
      };

      uService.list(function(uService) {
        if(userId && userId != 'null'){
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
          $scope.userid = uService.id;
        }else{
          $location.path('/login');
        }
      });
      $scope.destacado = 0;
      $http.get('api/php/article.php').success(function(response){
          $scope.subsecciones = response.subsecciones;
          $scope.autores = response.autores;
          $scope.fotografos = response.fotografos;
       });
       $scope.uploadFiles = function(file, errFiles) {
           $scope.f = file;
           $scope.filenamesave = 'img/articulos/'+file.name;

           $scope.errFile = errFiles && errFiles[0];
           if (file) {
               file.upload = Upload.upload({
                   url: 'api/php/marticulo.php?tipo=img',
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
       $scope.newArticle = function(categoria,columna,entradilla,autor,contenido,checkbox,title,fotografo,ruta){
         if(categoria != 2){
           if(categoria == 1 || categoria == 3 || categoria == 4){
             if(title != undefined && entradilla != undefined  && contenido != undefined && categoria != undefined && autor != undefined){
               $http.post('api/php/marticulo.php?tipo=2',{'categoria':categoria,'preview':entradilla,'autor':autor,'contenido':contenido,'destacado':0,'creador':$scope.userid,'titulo':title}).success(function(response){
               alert("Nuevo articulo registrado");
               $scope.htmlContent = "";
               $scope.title = "";
               $scope.entradilla = "";
              });
             }else{
               alert("Complete todos los campos");
             }
           }else{
             if(title != undefined && entradilla != undefined && contenido != undefined && categoria != undefined && autor != undefined && fotografo != undefined && ruta != undefined){
               $http.post('api/php/marticulo.php?tipo=1',{'categoria':categoria,'preview':entradilla,'autor':autor,'contenido':contenido,'destacado':checkbox,'creador':$scope.userid,'titulo':title,'fotografo':fotografo,'ruta':ruta}).success(function(response){
               alert("Nuevo articulo registrado");
               $scope.htmlContent = "";
               $scope.title = "";
               $scope.entradilla = "";
              });
             }else{
               alert("Complete todos los campos");
             }
           }
         }else{
           if(title != undefined  && contenido != undefined && autor != undefined && columna != undefined){
             $http.post('api/php/marticulo.php?tipo=3',{'autor':autor,'contenido':contenido,'creador':$scope.userid,'titulo':title, 'columna':columna}).success(function(response){
             alert("Nuevo articulo registrado");
             $scope.htmlContent = "";
             $scope.title = "";
             $scope.entradilla = "";
            });
           }else{
             alert("Complete todos los campos");
           }
         }
       }
    })
    .controller('editArticleController', function($scope, $http, $location, uService, $cookies, $routeParams){
      $scope.logout = function(){
          $cookies.remove('usercpid');
          $location.path('/login');
      };

      uService.list(function(uService) {
        if(userId && userId != 'null'){
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
          $scope.userid = uService.id;
        }else{
          $location.path('/login');
        }
      });
      $scope.destacado = 0;
      var tipo = $routeParams.tipo;
      var id = $routeParams.id;
      if(tipo == 'articulo' || tipo == 'columnistas'){
        $http.get('api/php/edit-article.php?tipo='+tipo).success(function(response){
            $scope.subsecciones = response.subsecciones;
            $scope.autores = response.autores;
            $scope.fotografos = response.fotografos;
         });
      }else{
        alert("No se ha encontrado el articulo buscado");
        $location.path('/');
      }
       $scope.newArticle = function(categoria,columna,entradilla,autor,contenido,checkbox,title,fotografo,ruta){
         if(categoria != 2){
           if(categoria == 1 || categoria == 3 || categoria == 4){
             if(title != undefined && entradilla != undefined  && contenido != undefined && categoria != undefined && autor != undefined){
               $http.post('api/php/marticulo.php?tipo=2',{'categoria':categoria,'preview':entradilla,'autor':autor,'contenido':contenido,'destacado':0,'creador':$scope.userid,'titulo':title}).success(function(response){
               alert("Nuevo articulo registrado");
               $scope.htmlContent = "";
               $scope.title = "";
               $scope.entradilla = "";
              });
             }else{
               alert("Complete todos los campos");
             }
           }else{
             if(title != undefined && entradilla != undefined && contenido != undefined && categoria != undefined && autor != undefined && fotografo != undefined && ruta != undefined){
               $http.post('api/php/marticulo.php?tipo=1',{'categoria':categoria,'preview':entradilla,'autor':autor,'contenido':contenido,'destacado':checkbox,'creador':$scope.userid,'titulo':title,'fotografo':fotografo,'ruta':ruta}).success(function(response){
               alert("Nuevo articulo registrado");
               $scope.htmlContent = "";
               $scope.title = "";
               $scope.entradilla = "";
              });
             }else{
               alert("Complete todos los campos");
             }
           }
         }else{
           if(title != undefined  && contenido != undefined && autor != undefined && columna != undefined){
             $http.post('api/php/marticulo.php?tipo=3',{'autor':autor,'contenido':contenido,'creador':$scope.userid,'titulo':title, 'columna':columna}).success(function(response){
             alert("Nuevo articulo registrado");
             $scope.htmlContent = "";
             $scope.title = "";
             $scope.entradilla = "";
            });
           }else{
             alert("Complete todos los campos");
           }
         }
       }
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
    .controller('photogalleryController', function($scope, $http, $location, uService, $cookies, Upload, $timeout){
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
          $scope.fotografos = response.fotografos;
          $scope.fotito = '';
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

        $scope.uploadFiles = function(file, errFiles) {
            $scope.f = file;
            $scope.filenamesave = 'img/fotogalerias/'+file.name;

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'api/php/mantenimientoF.php?tipo=1',
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

        $scope.postFotogaleria = function(idAutor,fileroot,titulo,link){
          console.log(fileroot);
          $http.post('api/php/mantenimientoF.php?tipo=1',{autor: idAutor, filer: fileroot, tituloF: titulo, linkF: link}).success(function(response){
            $http.get('api/php/photogallery.php').success(function(response){
              $scope.fotogalerias = response.fotogalerias;
              $scope.fotografos = response.fotografos;
              $scope.fotito = '';
              $scope.link = '';
              $scope.titulo = '';
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
            $scope.filenamesave = 'img/caricaturas/'+file.name;

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'api/php/mantenimientoC.php?tipo=1',
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
          $http.post('api/php/mantenimientoC.php?tipo=1',{autor: idAutor, filer: fileroot}).success(function(response){
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
    .controller('positionController', function($scope, $http, $location, uService, $cookies, $routeParams, Upload, $timeout, $window){
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
        $scope.pos = $routeParams.posicion;
        $http.get("api/php/posicion.php?posicion=" + $scope.pos).success(function(response){
          $scope.banners = response.banners;
          $scope.posiciones = response.posiciones;
          $scope.clientes = response.clientes;
        });

        $scope.control;
        $scope.valor = function(val){
          $scope.control = val;
        }
        $scope.uploadFilesCliente = function(file, errFiles) {
            $scope.f = file;
            $scope.clienteimg = 'img/clientes/'+file.name;

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'api/php/mantenimientoClientes.php?tipo=clienteimg',
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
        $scope.editFilesCliente = function(file, errFiles, ideditcliente) {
            $scope.f = file;
            $scope.editclienteimg = 'img/clientes/'+file.name;

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'api/php/mantenimientoClientes.php?tipo=editclienteimgss&editid='+ideditcliente,
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
        $scope.editCliente = function(id,nombre,pos,editclienteimg){
          if(nombre != undefined){
            $http.post('api/php/mantenimientoClientes.php?tipo=1',{'id':id,'nombre':nombre,'editruta':editclienteimg}).success(function(response){
              $http.get("api/php/posicion.php?posicion=" + pos).success(function(response){
                $scope.posiciones = response.posiciones;
                $scope.clientes = response.clientes;
                $scope.cliente = '';
              });
            });
            $window.location.reload();
          }else{
            alert("Ingrese contenido valido");
          }
        }
        $scope.borrarCliente = function(id,pos){
          $http.post('api/php/mantenimientoClientes.php?tipo=2',{'id':id}).success(function(response){
            $http.get("api/php/posicion.php?posicion=" + pos).success(function(response){
              $scope.banners = response.banners;
              $scope.posiciones = response.posiciones;
              $scope.clientes = response.clientes;
              $scope.cliente = '';
              $scope.fotito = '';
              $scope.cliente.foto = '';
              $scope.f.progress = '';
            });
          });
        }
        $scope.addCliente = function(nombre,pos,clienteimg){
          if(nombre != undefined){
            $http.post('api/php/mantenimientoClientes.php?tipo=3',{'nombre':nombre,'clientefoto':clienteimg}).success(function(response){
              $http.get("api/php/posicion.php?posicion=" + pos).success(function(response){
                $scope.banners = response.banners;
                $scope.posiciones = response.posiciones;
                $scope.clientes = response.clientes;
                $scope.cliente.nombre = '';
                $scope.cliente = '';
                $scope.cliente.foto = '';
                alert("Cambios realizados exitosamente");
              });
            });
            $window.location.reload();
          }else{
            alert("Ingrese contenido valido");
          }
        }
        $scope.borrarBanner = function(id,pos){
          $http.post('api/php/mantenimientoBanner.php?tipo=2',{'id':id}).success(function(response){
            $http.get("api/php/posicion.php?posicion=" + pos).success(function(response){
              $scope.banners = response.banners;
              $scope.posiciones = response.posiciones;
              $scope.clientes = response.clientes;
            });
          });
        }
        $scope.activeBanner = function(id,act,pos){
          if(act == 1){
            act = 0;
          }else{
            act = 1;
          }
          $http.post('api/php/mantenimientoBanner.php?tipo=3',{'id':id,'act':act}).success(function(response){
            $http.get("api/php/posicion.php?posicion=" + pos).success(function(response){
              $scope.banners = response.banners;
              $scope.posiciones = response.posiciones;
              $scope.clientes = response.clientes;
            });
          });
        }
        $scope.uploadFiles = function(file, errFiles) {
            $scope.f = file;
            $scope.filenamesave = 'img/banners/'+file.name;

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'api/php/mantenimientoBanner.php?tipo=banner',
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
        $scope.addBanner = function(posicion,cliente,url,pos,bannerurl){
          $http.post('api/php/mantenimientoBanner.php?tipo=1',{'posicion':posicion,'cliente':cliente,'url':url,'banner':bannerurl}).success(function(response){
            $http.get("api/php/posicion.php?posicion=" + pos).success(function(response){
              $scope.banners = response.banners;
              $scope.posiciones = response.posiciones;
              $scope.clientes = response.clientes;
              $scope.client = null;
              $scope.position = null;
              $scope.fotito = null;
              $scope.newUrl = null;
              $scope.f.progress = '';
            });
          });
        }

        $scope.uploadFilesCliente = function(file, errFiles) {
            $scope.f = file;
            $scope.clienteimg = 'img/clientes/'+file.name;

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'api/php/mantenimientoClientes.php?tipo=clienteimg',
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

    .controller('sondeoController', function($scope, $http, $location, uService, $cookies, Upload, $timeout){
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
            $http.get('api/php/sondeos.php').success(function(response){
              $scope.sondeos = response.sondeos;
            });
          });
        };
        $scope.uploadFiles = function(file, errFiles) {
            $scope.f = file;
            $scope.filenamesave = 'img/sondeos/'+file.name;

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'api/php/mantenimientoS.php?tipo=img',
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

        $scope.postSondeo = function(titulo,fileroot,pregunta,opcion1,opcion2){
          $http.post('api/php/mantenimientoS.php?tipo=1',{iTitulo: titulo, filer: fileroot, iPregunta: pregunta, iOpcion1: opcion1, iOpcion2: opcion2}).success(function(response){
            $http.get('api/php/sondeos.php').success(function(response){
              $scope.sondeos = response.sondeos;
              $scope.titulo = null;
              $scope.pregunta = null;
              $scope.opcion1 = null;
              $scope.opcion2 = null;
              $scope.fotito = null;
            });
          });
        };


        /*edit sondeo*/
        $scope.delOpcion = function(idRespuesta){
          $http.post('api/php/mantenimientoS.php?tipo=delRespuesta',{idres: idRespuesta}).success(function(response){
            $http.get('api/php/sondeos.php').success(function(response){
              $scope.sondeos = response.sondeos;
              $scope.nuevaRespuesta = null;
            });
          });
        }
        $scope.addOpcion = function(sondeoId, nRespuesta){
          $http.post('api/php/mantenimientoS.php?tipo=addRespuesta',{nres: nRespuesta, nidsondeo: sondeoId}).success(function(response){
            $http.get('api/php/sondeos.php').success(function(response){
              $scope.sondeos = response.sondeos;
              $scope.nuevaRespuesta = null;
            });
          });
        }

    });
