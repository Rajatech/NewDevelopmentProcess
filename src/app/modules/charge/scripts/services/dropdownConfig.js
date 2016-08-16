 (function () {
	 'use strict';

	 function DropdownConfig () {

	 	 var dropdowns = {};
	 	 dropdowns.dropdown = {};

	 	 /**
			Charge Entry Dropdown Values
	 	 **/
	 	 var option = [];
	 	 option.push({id:'Hour', name:'Hour'});
	 	 option.push({id:'Day', name:'Day'});
	 	 option.push({id:'Month', name:'Month'});

	 	 dropdowns.dropdown.charge = {};
	 	 dropdowns.dropdown.charge.entry = {};
	 	 dropdowns.dropdown.charge.entry.chargeTimeBasis = option;

	 	 var client = {
	 	 		entry : {
	 	 			uidTypes : [
								{id:'Adhar Card', name:'Adhar Card'},
								{id:'Voter Card', name:'Voter Card'}
							]
	 	 		}
	 	 };
	 	 client.entry.clientTypes = [
								{id:'Student', name:'Student'},
								{id:'Servicer', name:'Servicer'},
								{id:'Corporate', name:'Corporate'}
							];
	 	 dropdowns.dropdown.client = client;

	 	  var scheme = {
	 	 		entry : {
	 	 			chargeTypes : [
								{id:'Net Usage Charge', name:'Net Usage Charge'},
								{id:'Cable Usage Charge', name:'Cable Usage Charge'}
							]
	 	 		}
	 	 };
	 	 
	 	 dropdowns.dropdown.scheme = scheme;

	 	 return dropdowns;

	 }


	 angular.module('billingApp').factory('DropdownConfig', DropdownConfig);
})();


/*

dropdowns = {
  
  dropdown :{
    charge : {
      entry :{
        option : []
      }
    }
  }

}

*/