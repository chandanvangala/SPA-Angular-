	// create the module and name it mainApp
	var app = angular.module('myApp', ['ngRoute']);

	// configure our routes
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/home', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			});
	}]);

	// create the controller and inject Angular's $scope
	app.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Check About and Contacts for more data';
	}); 

	app.controller('aboutController', function($scope) {
		$scope.message = 'You are in About Page';
		$scope.personalDetails = [
        {
            'fname':'Sachin',
            'lname':'Tendulkar',
            'email':'sachin@Tendulkar.com'
        },
        {
            'fname':'Amitabh',
            'lname':'Bachan',
            'email':'Amitabh@Bachan.com'
        },
        {
            'fname':'Subramaniam',
            'lname':'Swamy',
            'email':'Subramaniam@swamy.com'
        }];
    
        $scope.addNew = function(personalDetails){
            $scope.personalDetails.push({ 
                'fname': personalDetails.fname, 
                'lname': personalDetails.lname,
                'email': personalDetails.email,
            });
            $scope.PD = {};
        };
    
        $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.personalDetails, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            $scope.personalDetails = newDataList;
        };
    
        $scope.checkAll = function () {
            if (!$scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.personalDetails, function (personalDetails) {
                personalDetails.selected = $scope.selectedAll;
            });
        }; 
	});


	
	app.controller('contactController', function($scope,$http) {
		$scope.message = 'Contacts using $http service to load Json Data';

	 

    $scope.loadPeople = function() {
        var httpRequest = $http({
            method: 'GET',
            url: '/SPA_Angular/data/data.json'
            

        }).success(function(response, status) {
            $scope.people = response;
        });

    };


	});