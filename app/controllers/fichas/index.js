var occurrencesES = require("../../models/elasticsearch/occurrencesModel");
var _ = require('underscore');

exports.getFichaDetailsOrSearchFichas = function(req, res) {
	if(req.params._fichaid === "search") {
		occurrences = occurrencesES.searchFichas(req.query.q, req.query.size, req.query.page);
	} else {
		occurrences = occurrencesES.getFicha(req.params._fichaid);
	}
	occurrences.exec(function(err, data){
		if(JSON.parse(data).error) {
			res.jsonp(JSON.parse(data));	
		} else {
			res.jsonp(JSON.parse(data).hits);
		}
	});
};

exports.getCountFichas =  function(req, res) {
	occurrences = occurrencesES.getTotalFichas();
	occurrences.exec(function(err, data){
		res.jsonp(JSON.parse(data).count);
	});
};