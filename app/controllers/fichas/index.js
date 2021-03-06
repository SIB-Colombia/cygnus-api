var occurrencesES = require("../../models/elasticsearch/occurrencesModel");
var _ = require('underscore');

exports.getFichaDetailsOrSearchFichas = function(req, res) {
	if(req.params._fichaid === "search") {
		occurrences = occurrencesES.searchFichas(req.query.q, req.query.pagesize, req.query.page, req.query.order, req.query.sort, req.query.department, req.query.taxonomy, req.query.collection, req.query.facets);
	} else if(req.params._fichaid === "random") {
		occurrences = occurrencesES.getRandomFichas(req.query.pagesize, req.query.page);
	} else {
		occurrences = occurrencesES.getFicha(req.params._fichaid);
	}
	occurrences.exec(function(err, data){
		if(JSON.parse(data).error) {
			res.jsonp(JSON.parse(data));	
		} else {
			if(req.query.facets === 'true') {
				res.jsonp(JSON.parse(data).aggregations);
			} else {
				if(req.params._fichaid === "search" || req.params._fichaid === "random") {
					res.jsonp(JSON.parse(data).hits);
				} else {
					res.jsonp(JSON.parse(data).hits.hits[0]._source);
				}
			}
		}
	});
};

exports.getCountFichas =  function(req, res) {
	occurrences = occurrencesES.getTotalFichas();
	occurrences.exec(function(err, data){
		res.jsonp(JSON.parse(data).count);
	});
};

exports.listFichas = function(req, res) {
	occurrences = occurrencesES.getListFichas(req.query.pagesize, req.query.page);
	occurrences.exec(function(err, data){
		res.jsonp(JSON.parse(data).hits);
	});
};