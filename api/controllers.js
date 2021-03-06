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
        var normalize = (function() {
        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
            to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
            mapping = {};

        for(var i = 0, j = from.length; i < j; i++ )
            mapping[ from.charAt( i ) ] = to.charAt( i );

        return function( str ) {
            var ret = [];
            for( var i = 0, j = str.length; i < j; i++ ) {
                var c = str.charAt( i );
                if( mapping.hasOwnProperty( str.charAt( i ) ) )
                    ret.push( mapping[ c ] );
                else
                    ret.push( c );
            }
            return ret.join( '' );
        }

      })();


          var var_new = normalize(input);
          var x = var_new.replace(/[&\/\\#,+()$~%.'":*?¿<>{}]/g,"");
          var y = x.replace(/[^a-zA-Z0-9]/g,"-");
          var z = y.replace("--","-");
          return z.toLowerCase();

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
        $http.post('api/php/login.php',{'username':$scope.inUsername,'password':$scope.inPassword}).success(function(response){
          var now = new Date(),
          exp = new Date(now.getFullYear(), now.getMonth()+6, now.getDate());

          if(response.id != null){
            $cookies.put('usercpid',response.id,{
              expires: exp
            });
            $location.path('/');
          }else{
          $scope.error = "¡Hay un problema con su usuario ó contraseña!";
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
    .controller('mainController', function($scope, $http, $location, uService, $cookies, Upload, $timeout){
          $scope.date = new Date();

          $scope.logout = function(){
              $cookies.remove('usercpid');
              $location.path('/login');
          };

          uService.list(function(uService) {
            if(userId && userId != 'null'){
              $scope.userid = uService.id;
              $scope.username = uService.nombre;
              $scope.userphoto = uService.foto;
              $scope.userbio = uService.bio;
              $scope.userCargo = uService.cargo;
              $scope.usermail = uService.mail;
              $scope.userFacebook = uService.facebook;
              $scope.userTwitter = uService.twitter;
              $scope.userGoogleplus = uService.googleplus;
              $scope.userLinkedin = uService.linkedin;
            }else{
              $cookies.remove('usercpid');
              $location.path('/login');            }
          });

          $scope.vserie = [1,2,3,4,5,6,7,8,9];

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
            $scope.usuarios = response.usuarios;

          });
          $scope.control;
          $scope.valor = function(val){
            $scope.control = val;
          }
          $scope.editBolsa = function(id,nombre,porcentaje,valor,ciudad){
            // $http.post("api/php/modulos.php?id="+id+"&nombre="+nombre+"&porcentaje="+porcentaje+"&valor="+valor+"&tipo=1&modulo=1",{'selectSeccion':$scope.userId}).success(function(data,status,headers,config,response){
            if(!isNaN(porcentaje) && !isNaN(valor) && porcentaje!= undefined && valor!= undefined && nombre!= undefined && ciudad!= undefined){
              $http.post('api/php/modulos.php?tipo=1&modulo=1',{'id':id, 'nombre': nombre, 'porcentaje': porcentaje, 'valor': valor, 'ciudad': ciudad}).success(function(response){
                alert("Cambios guardados");
                  $scope.bolsas = response.bolsas;
              });
            }else{
              alert("Ingrese contenido valido");
            }
          }
          $scope.addBolsa = function(nombre,porcentaje,valor,ciudad){
              if(!isNaN(porcentaje) && !isNaN(valor) && porcentaje!= undefined && valor!= undefined && nombre!= undefined && ciudad!= undefined){
                $http.post('api/php/modulos.php?tipo=3&modulo=1',{'nombre': nombre, 'porcentaje': porcentaje, 'valor': valor, 'ciudad': ciudad}).success(function(response){
                  $scope.bolsas = response.bolsas;
                  $scope.newBolsaNombre ="";
                  $scope.newBolsaPorcentaje ="";
                  $scope.newBolsaValor ="";
                  $scope.newBolsaCiudad ="";
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
          $scope.personalNewPhoto = function(file, errFiles, userid) {
              $scope.f = file;
              $scope.filePersonalNewPhoto = 'img/perfiles/'+file.name;

              $scope.errFile = errFiles && errFiles[0];
              if (file) {
                  file.upload = Upload.upload({
                      url: 'api/php/settings.php?tipo=img&userid='+userid + '&foto='+ $scope.filePersonalNewPhoto + '',
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
          $scope.settings = function(ruta,mail,bio,twitter,facebook,googleplus,linkedin,id){
            $http.post("api/php/settings.php",{'ruta':ruta,'mail':mail,'bio':bio,'twitter':twitter,'facebook':facebook,'googleplus':googleplus,'linkedin':linkedin,'id':id}).success(function(response){
                alert("Cambios realizados correctamente");
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
          $scope.userid = uService.id;
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
          $scope.userbio = uService.bio;
          $scope.userCargo = uService.cargo;
          $scope.usermail = uService.mail;
          $scope.userFacebook = uService.facebook;
          $scope.userTwitter = uService.twitter;
          $scope.userGoogleplus = uService.googleplus;
          $scope.userLinkedin = uService.linkedin;
        }else{
          $location.path('/login');
        }
      });
      $scope.destacado = 0;
      $http.get('api/php/article.php').success(function(response){
          $scope.subsecciones = response.subsecciones;
          $scope.autores = response.autores;
          $scope.fotografos = response.fotografos;
          $scope.autorSeparado = response.autorSeparado;
       });
       $scope.htmlToPlaintext = function(text) {
        var ex = /<br>/g;
        return text ? String(text).replace(/<br[^>]*>/gm, ' ') : ' ';
        }
       $scope.settings = function(ruta,mail,bio,twitter,facebook,googleplus,linkedin,id){
         $http.post("api/php/settings.php",{'ruta':ruta,'mail':mail,'bio':bio,'twitter':twitter,'facebook':facebook,'googleplus':googleplus,'linkedin':linkedin,'id':id}).success(function(response){
             alert("Cambios realizados correctamente");
         });
       }
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
           if(categoria == 1 || categoria == 3 || categoria == 4 || categoria == 49){
             if(title != undefined && entradilla != undefined  && contenido != undefined && categoria != undefined && autor != undefined){
               $http.post('api/php/marticulo.php?tipo=2',{'categoria':categoria,'preview':entradilla,'autor':autor,'contenido':contenido,'destacado':0,'creador':$scope.userid,'titulo':title}).success(function(response){
                 alert("Nuevo articulo registrado");
                 $location.path('/history');
              });
             }else{
               alert("Complete todos los campos");
             }
           }else{
             if(title != undefined && entradilla != undefined && contenido != undefined && categoria != undefined && autor != undefined && fotografo != undefined && ruta != undefined){
               $http.post('api/php/marticulo.php?tipo=1',{'categoria':categoria,'preview':entradilla,'autor':autor,'contenido':contenido,'destacado':checkbox,'creador':$scope.userid,'titulo':title,'fotografo':fotografo,'ruta':ruta}).success(function(response){
               alert("Nuevo articulo registrado");
               $location.path('/history');
              });
             }else{
               alert("Complete todos los campos");
             }
           }
         }else{
           if(title != undefined  && contenido != undefined && autor != undefined && columna != undefined){
             $http.post('api/php/marticulo.php?tipo=3',{'autor':autor,'contenido':contenido,'creador':$scope.userid,'titulo':title, 'columna':columna}).success(function(response){
             alert("Nuevo articulo registrado");
             $location.path('/history');
            });
           }else{
             alert("Complete todos los campos");
           }
         }
       }
       $scope.uploadPersonal = function(file, errFiles) {
           $scope.f = file;
           $scope.filenamePsave = 'img/perfiles/'+file.name;

           $scope.errFile = errFiles && errFiles[0];
           if (file) {
               file.upload = Upload.upload({
                   url: 'api/php/mantenimientoP.php?tipo=img',
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
       $scope.uploadNewPersonal = function(file, errFiles,autorid) {
           $scope.f = file;
           $scope.filenameNPsave = 'img/perfiles/'+file.name;

           if (file) {
               file.upload = Upload.upload({
                   url: 'api/php/mantenimientoP.php?tipo=editImg&autor='+ autorid + '&foto='+ $scope.filenameNPsave + '',
                   data: {file: file, autor: autorid, fileName: $scope.filenameNPsave}
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
       $scope.nPersonal = function(nombre,fotonueva,apellido,bio,personalTipo){
         if(nombre != undefined  && apellido != undefined && bio != undefined && personalTipo != undefined){
           $http.post('api/php/mantenimientoP.php?tipo=1',{'foto':fotonueva,'nombre':nombre,'apellido':apellido,'bio':bio,'personalTipo':personalTipo}).success(function(response){
              $http.get('api/php/article.php').success(function(response){
                 $scope.autores = response.autores;
                 $scope.autorSeparado = response.autorSeparado;
              });
             alert("¡Autor creado!");
          });
         }else{
           alert("Complete todos los campos");
         }
       }
       $scope.editPersonal = function(autor,nombre,fotonueva,apellido,bio,personalTipo){

         if(nombre != undefined  && apellido != undefined && bio != undefined && autor != undefined){
           $http.post('api/php/mantenimientoP.php?tipo=3',{'autor':autor,'nombre':nombre,'apellido':apellido,'bio':bio,'personalTipo':personalTipo,'foto':fotonueva}).success(function(response){
              $http.get('api/php/article.php').success(function(response){
                 $scope.autores = response.autores;
                 $scope.autorSeparado = response.autorSeparado;
              });
             alert("¡Autor editado!");
          });
         }else{
           alert("Complete todos los campos");
         }
       }
    })
    .controller('editArticleController', function($scope, $http, $location, uService, $cookies, $routeParams, Upload, $timeout){
      $scope.logout = function(){
          $cookies.remove('usercpid');
          $location.path('/login');
      };

      uService.list(function(uService) {
        if(userId && userId != 'null'){
          $scope.userid = uService.id;
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
          $scope.userbio = uService.bio;
          $scope.userCargo = uService.cargo;
          $scope.usermail = uService.mail;
          $scope.userFacebook = uService.facebook;
          $scope.userTwitter = uService.twitter;
          $scope.userGoogleplus = uService.googleplus;
          $scope.userLinkedin = uService.linkedin;
        }else{
          $location.path('/login');
        }
      });
      $scope.destacado = 0;
      var tipo = $routeParams.tipo;
      var id = $routeParams.id;
      if(tipo == 'articulo' || tipo == 'columnistas'){
        $http.get('api/php/edit-article.php?tipo='+tipo+'&id='+id).success(function(response){
            $scope.subsecciones = response.subsecciones;
            $scope.autores = response.autores;
            $scope.fotografos = response.fotografos;
            $scope.articulo = response.articulo;
            if($scope.articulo.especial == 1){
              $scope.tcheck = true;
            }else{
              $scope.tcheck = false;
            }
            if($scope.articulo.activo == 1){
              $scope.act = true;
            }else{
              $scope.act = false;
            }
         });
      }else{
        alert("No se ha encontrado el articulo buscado");
        $location.path('/');
      }
      $scope.settings = function(ruta,mail,bio,twitter,facebook,googleplus,linkedin,id){
        $http.post("api/php/settings.php",{'ruta':ruta,'mail':mail,'bio':bio,'twitter':twitter,'facebook':facebook,'googleplus':googleplus,'linkedin':linkedin,'id':id}).success(function(response){
            alert("Cambios realizados correctamente");
        });
      }
      $scope.htmlToPlaintext = function(text) {
       var ex = /<br>/g;
       return text ? String(text).replace(/<br[^>]*>/gm, ' ') : ' ';
       }
      $scope.editFilesCliente = function(file, errFiles) {
          $scope.f = file;
          $scope.filenamesave = 'img/articulos/'+file.name;

          $scope.errFile = errFiles && errFiles[0];
          if (file) {
              file.upload = Upload.upload({
                  url: 'api/php/editarArticulo.php?tipo=img',
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

       $scope.editArticle = function(id,categoria,columna,entradilla,autor,contenido,checkbox,title,fotografo,ruta,activo){
         if(checkbox == true){
           checkbox = 1;
         }else{
           checkbox = 0;
         }
         if(activo == true){
           activo = 1;
         }else{
           activo = 0;
         }
         if(categoria != 2){
           if(categoria == 1 || categoria == 3 || categoria == 4 || categoria == 49){
             if(title != undefined && entradilla != undefined  && contenido != undefined && categoria != undefined && autor != undefined){
               $http.post('api/php/editarArticulo.php?tipo=2',{'categoria':categoria,'preview':entradilla,'autor':autor,'contenido':contenido,'destacado':0,'titulo':title,'id':id,'activo':activo}).success(function(response){
                 $location.path('/history');
              });
             }else{
               alert("Complete todos los campos");
             }
           }else{
             if(title != undefined && entradilla != undefined && contenido != undefined && categoria != undefined && autor != undefined && fotografo != undefined && ruta != undefined){
               $http.post('api/php/editarArticulo.php?tipo=1',{'categoria':categoria,'preview':entradilla,'autor':autor,'contenido':contenido,'destacado':checkbox,'titulo':title,'fotografo':fotografo,'ruta':ruta,'id':id,'activo':activo}).success(function(response){
               $location.path('/history');
              });
             }else{
               alert("Complete todos los campos");
             }
           }
         }else{
           if(title != undefined  && contenido != undefined && autor != undefined && columna != undefined){
             $http.post('api/php/editarArticulo.php?tipo=3',{'autor':autor,'contenido':contenido,'titulo':title, 'columna':columna,'id':id,'activo':activo}).success(function(response){
             $location.path('/history');
            });
           }else{
             alert("Complete todos los campos");
           }
         }
       }
       $scope.deleteArticle = function(id,sub){
         if(sub == 2){
           $http.post('api/php/editarArticulo.php?tipo=4',{'id':id}).success(function(response){
             alert("Artículo borrado");
             $location.path('/history');
           });
         }else{
           $http.post('api/php/editarArticulo.php?tipo=5',{'id':id}).success(function(response){
             alert("Artículo borrado");
             $location.path('/history');
           });
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
          $scope.userid = uService.id;
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
          $scope.userbio = uService.bio;
          $scope.userCargo = uService.cargo;
          $scope.usermail = uService.mail;
          $scope.userFacebook = uService.facebook;
          $scope.userTwitter = uService.twitter;
          $scope.userGoogleplus = uService.googleplus;
          $scope.userLinkedin = uService.linkedin;
        }else{
          $location.path('/login');
        }
      });

        $scope.date = new Date();
        $scope.currentPage = 1;
        $scope.pageSize = 7;
        $scope.maxSize = 4;
        $http.get("api/php/history.php").success(function(response){
          $scope.contenido = response.contenido;
          $scope.paginadorf = response.paginador;
          console.log($scope.paginadorf.length);
        });
        $scope.settings = function(ruta,mail,bio,twitter,facebook,googleplus,linkedin,id){
          $http.post("api/php/settings.php",{'ruta':ruta,'mail':mail,'bio':bio,'twitter':twitter,'facebook':facebook,'googleplus':googleplus,'linkedin':linkedin,'id':id}).success(function(response){
              alert("Cambios realizados correctamente");
          });
        }
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
          $scope.userid = uService.id;
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
          $scope.userbio = uService.bio;
          $scope.userCargo = uService.cargo;
          $scope.usermail = uService.mail;
          $scope.userFacebook = uService.facebook;
          $scope.userTwitter = uService.twitter;
          $scope.userGoogleplus = uService.googleplus;
          $scope.userLinkedin = uService.linkedin;
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
        $scope.settings = function(ruta,mail,bio,twitter,facebook,googleplus,linkedin,id){
          $http.post("api/php/settings.php",{'ruta':ruta,'mail':mail,'bio':bio,'twitter':twitter,'facebook':facebook,'googleplus':googleplus,'linkedin':linkedin,'id':id}).success(function(response){
              alert("Cambios realizados correctamente");
          });
        }
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
          $scope.userid = uService.id;
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
          $scope.userbio = uService.bio;
          $scope.userCargo = uService.cargo;
          $scope.usermail = uService.mail;
          $scope.userFacebook = uService.facebook;
          $scope.userTwitter = uService.twitter;
          $scope.userGoogleplus = uService.googleplus;
          $scope.userLinkedin = uService.linkedin;
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
        $scope.settings = function(ruta,mail,bio,twitter,facebook,googleplus,linkedin,id){
          $http.post("api/php/settings.php",{'ruta':ruta,'mail':mail,'bio':bio,'twitter':twitter,'facebook':facebook,'googleplus':googleplus,'linkedin':linkedin,'id':id}).success(function(response){
              alert("Cambios realizados correctamente");
          });
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
          $scope.userid = uService.id;
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
          $scope.userbio = uService.bio;
          $scope.userCargo = uService.cargo;
          $scope.usermail = uService.mail;
          $scope.userFacebook = uService.facebook;
          $scope.userTwitter = uService.twitter;
          $scope.userGoogleplus = uService.googleplus;
          $scope.userLinkedin = uService.linkedin;
        }else{
          $location.path('/login');
        }
      });
        $scope.date = new Date();
        $scope.settings = function(ruta,mail,bio,twitter,facebook,googleplus,linkedin,id){
          $http.post("api/php/settings.php",{'ruta':ruta,'mail':mail,'bio':bio,'twitter':twitter,'facebook':facebook,'googleplus':googleplus,'linkedin':linkedin,'id':id}).success(function(response){
              alert("Cambios realizados correctamente");
          });
        }
    })
    .controller('positionController', function($scope, $http, $location, uService, $cookies, $routeParams, Upload, $timeout, $window){
      $scope.logout = function(){
          $cookies.remove('usercpid');
          $location.path('/login');
      };

      uService.list(function(uService) {
        if(userId && userId != 'null'){
          $scope.userid = uService.id;
          $scope.username = uService.nombre;
          $scope.userphoto = uService.foto;
          $scope.userbio = uService.bio;
          $scope.userCargo = uService.cargo;
          $scope.usermail = uService.mail;
          $scope.userFacebook = uService.facebook;
          $scope.userTwitter = uService.twitter;
          $scope.userGoogleplus = uService.googleplus;
          $scope.userLinkedin = uService.linkedin;
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
        $scope.settings = function(ruta,mail,bio,twitter,facebook,googleplus,linkedin,id){
          $http.post("api/php/settings.php",{'ruta':ruta,'mail':mail,'bio':bio,'twitter':twitter,'facebook':facebook,'googleplus':googleplus,'linkedin':linkedin,'id':id}).success(function(response){
              alert("Cambios realizados correctamente");
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

        $scope.editarTiempo = function(id,tiempo,pos){
          if(!isNaN(tiempo) && tiempo!= undefined){
            $http.post('api/php/mantenimientoBanner.php?tipo=4',{ 'id': id, 'tiempo': tiempo}).success(function(response){
              $http.get("api/php/posicion.php?posicion=" + pos).success(function(response){
                alert("Cambios realizados");
                $scope.banners = response.banners;
                $scope.posiciones = response.posiciones;
                $scope.clientes = response.clientes;
                $scope.f.progress = '';
              });
            });
          }else{
            alert("Ingrese contenido valido");
          }
        }

    })

    .controller('analyticsController', function($scope, $http, $location, uService, $cookies){
        $scope.logout = function(){
            $cookies.remove('usercpid');
            $location.path('/login');
        };

        uService.list(function(uService) {
          if(userId && userId != 'null'){
            $scope.userid = uService.id;
            $scope.username = uService.nombre;
            $scope.userphoto = uService.foto;
            $scope.userbio = uService.bio;
            $scope.userCargo = uService.cargo;
            $scope.usermail = uService.mail;
            $scope.userFacebook = uService.facebook;
            $scope.userTwitter = uService.twitter;
            $scope.userGoogleplus = uService.googleplus;
            $scope.userLinkedin = uService.linkedin;
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
        $scope.settings = function(ruta,mail,bio,twitter,facebook,googleplus,linkedin,id){
          $http.post("api/php/settings.php",{'ruta':ruta,'mail':mail,'bio':bio,'twitter':twitter,'facebook':facebook,'googleplus':googleplus,'linkedin':linkedin,'id':id}).success(function(response){
              alert("Cambios realizados correctamente");
          });
        }
    })

    .controller('sondeoController', function($scope, $http, $location, uService, $cookies, Upload, $timeout){
        $scope.logout = function(){
            $cookies.remove('usercpid');
            $location.path('/login');
        };

        uService.list(function(uService) {
          if(userId && userId != 'null'){
            $scope.userid = uService.id;
            $scope.username = uService.nombre;
            $scope.userphoto = uService.foto;
            $scope.userbio = uService.bio;
            $scope.userCargo = uService.cargo;
            $scope.usermail = uService.mail;
            $scope.userFacebook = uService.facebook;
            $scope.userTwitter = uService.twitter;
            $scope.userGoogleplus = uService.googleplus;
            $scope.userLinkedin = uService.linkedin;
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
        $scope.settings = function(ruta,mail,bio,twitter,facebook,googleplus,linkedin,id){
          $http.post("api/php/settings.php",{'ruta':ruta,'mail':mail,'bio':bio,'twitter':twitter,'facebook':facebook,'googleplus':googleplus,'linkedin':linkedin,'id':id}).success(function(response){
              alert("Cambios realizados correctamente");
          });
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
