

angular.module("cpad", ['cpad.controllers','angular.filter','ngRoute','textAngular','ui.bootstrap','ngCookies','ngFileUpload'])
    .config(function($routeProvider){
        $routeProvider
            .when("/", {
                controller: "mainController",
                templateUrl: "templates/main.html"
            })
            .when("/login", {
                controller: "loginController",
                templateUrl: "templates/login.html"
            })
            .when("/new-article", {
                controller: "newArticleController",
                templateUrl: "templates/n-articulo/new.html"
            })
            .when("/edit-article/:tipo/:id", {
                controller: "editArticleController",
                templateUrl: "templates/n-articulo/edit.html"
            })
            .when("/history", {
                controller: "historyArticlesController",
                templateUrl: "templates/n-articulo/history.html"
            })
            .when("/photogallery", {
                controller: "photogalleryController",
                templateUrl: "templates/fotogaleria/main.html"
            })
            .when("/ads", {
                controller: "adsController",
                templateUrl: "templates/publicidad/main.html"
            })
            .when("/sondeo", {
                controller: "sondeoController",
                templateUrl: "templates/sondeo/main.html"
            })
            .when("/caricaturas", {
                controller: "CaricaturasController",
                templateUrl: "templates/caricaturas/main.html"
            })
            .when("/ads/:posicion", {
                controller: "positionController",
                templateUrl: "templates/publicidad/posicion.html"
            })
            .when("/ads/metrics/analytics", {
                controller: "analyticsController",
                templateUrl: "templates/publicidad/analytics.html"
            })
            .when("/caricaturas", {
                controller: "CaricaturasController",
                templateUrl: "templates/caricaturas/main.html"
            })
            .when("/personal", {
                controller: "personalController",
                templateUrl: "templates/mantenimientos/personal.html"
            })
            .otherwise({
                redirectTo: "/"
        });
    })
