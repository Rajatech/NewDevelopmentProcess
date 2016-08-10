(function(){

'use strict';
angular.module('billingApp').directive('myLogout', function(){
	return {
      template: '<span class="logout"> <a href="#/logout"> Log Out </a> </span>'
    };
}).directive('mySubmitBtn', function($state){

	return {
		scope : {
			href : '@submitHref',
			module : '@accessModule'
		},
		
		restrict : 'E',
		
		replace: true,
		
		template : '<button ng-click="formSubmitHandler()" class="btn btn-success pull-right spaceLeft" href="{{href}}" module="{{module}}"> SUBMIT </button>',

		controller : function($scope, $element, $attrs){
			
			$scope.formSubmitHandler = function(){
				
				var $mainScope = angular.element("#content").scope();

                if($mainScope.submit()){
					//window.location.href= "#/cEntryConfirm";
					$state.go('home.clientEntryConfirm');
                }

			};

		}
	};
}).directive('myConfirmBtn', function($state){

	return {
		scope : {
			btnLink 	    : '@',
		    btnName         : '@'
		},
		
		restrict : 'E',

		replace : true,
		
		template: '<button href="{{btnLink}}" class="btn btn-success"> {{btnName}} </button>',

		link : function(scope, element, attrs){
			
			element.on('click', function () {

				var $mainScope = angular.element("#content").scope();
				$state.go('home.clientEntrySystem');
				$mainScope.confirm(scope.btnLink);

			});

		}
	};
}).directive('myBackBtn', function(){

	return {
		scope : {
			btnLink 	    : '@',
		    btnName         : '@'
		},
		
		restrict : 'E',

		replace : true,
		
		template: '<button href="{{btnLink}}" class="btn btn-danger"> {{btnName}} </button>',

		link : function(scope, element, attrs){
			
			element.on('click', function () {
				window.location.href= '#'+scope.btnLink + '/true';

			});

		}
	};
}).directive('myOkBtn', function($state){

	return {
		scope : {
			btnLink 	    : '@',
		    btnName         : '@'
		},
		
		restrict : 'E',

		replace : true,
		
		template: '<button href="{{btnLink}}" class="btn btn-success"> {{btnName}} </button>',

		link : function(scope, element, attrs){
			
			element.on('click', function () {

				var $mainScope = angular.element("#content").scope();
                $mainScope.initEntry(scope.btnLink);

				$state.go('home.clientEntry', {back:true});

			});

		}
	};
}).directive('pagination', function(PaginationService){

	return {
		scope : {
			manipulateGridFunct	: '&',
			pager				: '=',
			gridOption			: '=',
			gridData			: '='
		},
		
		restrict : 'E',
		
		replace: true,
		
		template : '<div id="my-pagination"><span id="page-link-prev"> <- </span> <span> Page </span> <span id="current-page-no"> {{pager.currentPageNo()}} </span> <span> of {{pager.totalPages}}</span> <span id="page-link-next"> -> </span></div>',
		
		link : function (scope,element,attrs) {

			angular.element('#page-link-prev').on('click', function(){
				scope.pager.getPrevPage();
				scope.currentPage = scope.pager.currentPageNo();
				scope.gridOption.data = scope.gridData.slice(scope.pager.getStartIndex(),scope.pager.getEndIndex());
				scope.$apply();
			});

			angular.element('#page-link-next').on('click', function(){
				scope.pager.getNextPage();
				scope.currentPage = scope.pager.currentPageNo();
				scope.gridOption.data = scope.gridData.slice(scope.pager.getStartIndex(),scope.pager.getEndIndex());
				scope.$apply();
			});


		}		

		
	};
});

})();