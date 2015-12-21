var moment = require('moment');
var _ = require('underscore');

// Get an specific register id
exports.getFicha = function(fichaId) {
	qryObj = {
		"query": {
			"term": {
				"catalogoEspeciesId": {
					"value": fichaId
				}
			}
		}
	};

	mySearchCall = elasticSearchClient.search('biodiversity', 'catalog', qryObj);
	return mySearchCall;
};

// Search registers
exports.searchFichas = function(searchText, size, page) {
	var initial = 0;
	var totalRegs = 20;
	if((typeof size !== 'undefined')) {
		totalRegs = size;
	}
	if((typeof page !== 'undefined')) {
		initial = (page-1)*totalRegs;
	}
	qryObj = {
		"size": totalRegs,
		"from": initial,
		"_source": ["catalogoEspeciesId", "taxonNombre", "taxonCompleto", "listaNombresComunes", "imagenes", "imagenesExternas", "highlight"],
		"query": {
			"bool": {
				"must": [
					{
						"query_string": {
							"fields": [
								"taxonNombre",
								"taxonCompleto",
								"autor",
								"verificacion.nombre",
								"citacion.documentoTitulo",
								"citacion.autor",
								"citacion.publicador",
								"listaNombresComunes",
								"distribucionGeografica.departamentos",
								"distribucionGeografica.regionesNaturales",
								"distribucionGeografica.corporacionesAutonomasRegionales",
								"distribucionGeografica.organizaciones",
								"atributos.estadoDeAmenazaSegunCategoriaUICNColombia",
								"atributos.estadoDeAmenazaSegunCategoriaUICNMundo",
								"atributos.distribucionGeograficaEnColombia",
								"atributos.distribucionGeograficaEnMundo",
								"atributos.distribucionAltitudinal",
								"atributos.comportamiento",
								"atributos.reproduccion",
								"atributos.estadoActualPoblacion",
								"atributos.estadoCITES",
								"atributos.vocalizaciones",
								"atributos.etimologiaNombreCientifico",
								"atributos.habitat",
								"atributos.habito",
								"atributos.alimentacion",
								"atributo.impactos",
								"atributos.informacionAlerta",
								"atributos.informacionTipos",
								"atributos.informacionUsos",
								"atributos.invasora",
								"atributos.mecanismosControl",
								"atributos.medidasConservacion",
								"atributos.origen",
								"atributos.factoresAmenaza",
								"atributos.medidasConservacion",
								"atributos.descripcionInvasion",
								"atributos.descripcionGeneral",
								"atributos.descripcionTaxonomica",
								"atributos.ecologia",
								"atributos.ecosistema",
								"atributos.clavesTaxonomicas",
								"atributos.creditosEspecificos",
								"atributos.regionesNaturales",
								"atributos.registrosBiologicos",
								"atributos.sinonimos"
							],
							"query": searchText,
							"use_dis_max": true
						}
					}
				],
				"filter": [
					{
						"term": {
							"verificacion.estadoId": {
								"value": "2"
							}
						}
					}
				]
			}
		},
		"highlight" : {
			"fields": {
				"taxonNombre": {"fragment_size" : 100, "number_of_fragments" : 3},
				"taxonCompleto": {"fragment_size" : 100, "number_of_fragments" : 3},
				"autor": {"fragment_size" : 100, "number_of_fragments" : 3},
				"verificacion.nombre": {"fragment_size" : 100, "number_of_fragments" : 3},
				"citacion.documentoTitulo": {"fragment_size" : 100, "number_of_fragments" : 3},
				"citacion.autor": {"fragment_size" : 100, "number_of_fragments" : 3},
				"citacion.publicador": {"fragment_size" : 100, "number_of_fragments" : 3},
				"listaNombresComunes": {"fragment_size" : 100, "number_of_fragments" : 3},
				"distribucionGeografica.departamentos": {"fragment_size" : 100, "number_of_fragments" : 3},
				"distribucionGeografica.regionesNaturales": {"fragment_size" : 100, "number_of_fragments" : 3},
				"distribucionGeografica.corporacionesAutonomasRegionales": {"fragment_size" : 100, "number_of_fragments" : 3},
				"distribucionGeografica.organizaciones": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.estadoDeAmenazaSegunCategoriaUICNColombia": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.estadoDeAmenazaSegunCategoriaUICNMundo": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.distribucionGeograficaEnColombia": {"fragment_size" : 100, "number_of_fragments" : 3},
				"atributos.distribucionGeograficaEnMundo": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.distribucionAltitudinal": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.comportamiento": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.reproduccion": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.estadoActualPoblacion": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.estadoCITES": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.vocalizaciones": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.etimologiaNombreCientifico": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.habitat": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.habito": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.alimentacion": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributo.impactos": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributo.informacionAlerta": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.informacionTipos": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.informacionUsos": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.invasora": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.mecanismosControl": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.origen": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.factoresAmenaza": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.medidasConservacion": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.descripcionInvasion": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.descripcionGeneral": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.descripcionTaxonomica": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.ecologia": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.ecosistema": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.clavesTaxonomicas": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.creditosEspecificos": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.regionesNaturales": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.registrosBiologicos": {"fragment_size": 100, "number_of_fragments" : 3},
				"atributos.sinonimos": {"fragment_size": 100, "number_of_fragments" : 3}
			}
		}
	};

	mySearchCall = elasticSearchClient.search('biodiversity', 'catalog', qryObj);
	return mySearchCall;
};

// Search registers
exports.getTotalFichas = function(searchText, size, page) {
	qryObj = {
		"query": {
			"bool": {
				"must": [
					{"term": {
						"verificacion.estadoId": {
							"value": "2"
						}
					}}
				]
			}
		}
	};

	mySearchCall = elasticSearchClient.count('biodiversity', 'catalog', qryObj);
	return mySearchCall;
};

// Search registers
exports.getListFichas = function(size, page) {
	var initial = 0;
	var totalRegs = 40;
	if((typeof size !== 'undefined')) {
		totalRegs = size;
	}
	if((typeof page !== 'undefined')) {
		initial = (page-1)*totalRegs;
	}
	qryObj = {
		"size": totalRegs,
		"from": initial,
		"_source": ["catalogoEspeciesId", "taxonNombre", "taxonCompleto", "listaNombresComunes", "imagenes", "imagenesExternas"],
		"query": {
			"bool": {
				"must": [
					{
						"match_all": {}
					}
				],
				"filter": [
					{
						"term": {
							"verificacion.estadoId": {
								"value": "2"
							}
						}
					}
				]
			}
		}
	};

	mySearchCall = elasticSearchClient.search('biodiversity', 'catalog', qryObj);
	return mySearchCall;
};