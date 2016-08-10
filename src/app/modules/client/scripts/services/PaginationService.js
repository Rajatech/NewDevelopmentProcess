(function() {

	'use strict';

	function PaginationService() {
		
		var pageService = {};
		pageService.getPager = getPager;
		return pageService;

		function getPager(recordPerPage, totalRecords){

			var vm = this;
			vm.recordPerPage = recordPerPage;
			vm.totalRecords = totalRecords;
			vm.currentPage = 1;

			return {
				currentPageNo : function(){
					return vm.currentPage;
				},
				recordPerPage : vm.recordPerPage,
				totalPages : Math.ceil(vm.totalRecords/vm.recordPerPage),
				
				getPrevPage : function(){
					if(vm.currentPage > 1){
						vm.currentPage = vm.currentPage -1;
					}
					
				},
				getNextPage : function(){
					if(vm.currentPage < this.totalPages){
						vm.currentPage = vm.currentPage +1;
					}
					
				},
						getStartIndex : function(){
					var cp = vm.currentPage;
					if(cp == 1){
						return  0;
					}else{
						return  (cp-1)*vm.recordPerPage;
					}
				},
				getEndIndex : function(){
					var cp = vm.currentPage;
					if(cp == 1){
						return vm.recordPerPage;
					}else{
						return cp*vm.recordPerPage;
					}
				}
			};
		}

	}

	angular.module('billingApp')
		.factory('PaginationService', PaginationService);

})();