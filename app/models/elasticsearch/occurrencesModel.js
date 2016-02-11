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
exports.searchFichas = function(searchText, size, page, order, sort, department, taxonomy, collection, facets) {
	var initial = 0;
	var totalRegs = 20;
	var sortType = null;
	var direction = 'asc';
	if((typeof size !== 'undefined')) {
		totalRegs = size;
	}
	if((typeof page !== 'undefined')) {
		initial = (page-1)*totalRegs;
	}
	if((typeof sort !== 'undefined')) {
		sortType = sort;
	}
	if((typeof order !== 'undefined')) {
		if(order === 'desc') {
			direction = 'desc';
		}
	}
	if((typeof searchText !== 'undefined') && searchText !== '') {
		qryObj = {
			"size": totalRegs,
			"from": initial,
			"_source": ["catalogoEspeciesId", "taxonNombre", "autor", "atributos.descripcionGeneral", "atributos.descripcionTaxonomica", "atributos.habitat", "taxonCompleto", "listaNombresComunes", "imagenes", "imagenesExternas", "taxonomia.reino", "taxonomia.filo", "taxonomia.clase", "highlight", "colecciones", "distribucionGeografica.departamentos"],
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
									"atributos.sinonimos",
									"colecciones.tipo"
								],
								"query": searchText,
								"use_dis_max": true
							}
						}
					],
					"filter": {
						"bool": {
							"must": [
								{
									"term": {
										"verificacion.estadoId": {
											"value": "2"
										}
									}
								},
								{
									"term": {
										"active": {
											"value": "0"
										}
									}
								}
							]
						}
					}
				}
			},
			"highlight" : {
				"fields": {
					"taxonNombre": {"fragment_size" : 300, "number_of_fragments" : 3},
					"taxonCompleto": {"fragment_size" : 300, "number_of_fragments" : 3},
					"autor": {"fragment_size" : 300, "number_of_fragments" : 3},
					"verificacion.nombre": {"fragment_size" : 300, "number_of_fragments" : 3},
					"citacion.documentoTitulo": {"fragment_size" : 300, "number_of_fragments" : 3},
					"citacion.autor": {"fragment_size" : 300, "number_of_fragments" : 3},
					"citacion.publicador": {"fragment_size" : 300, "number_of_fragments" : 3},
					"listaNombresComunes": {"fragment_size" : 300, "number_of_fragments" : 3},
					"distribucionGeografica.departamentos": {"fragment_size" : 300, "number_of_fragments" : 3},
					"distribucionGeografica.regionesNaturales": {"fragment_size" : 300, "number_of_fragments" : 3},
					"distribucionGeografica.corporacionesAutonomasRegionales": {"fragment_size" : 300, "number_of_fragments" : 3},
					"distribucionGeografica.organizaciones": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.estadoDeAmenazaSegunCategoriaUICNColombia": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.estadoDeAmenazaSegunCategoriaUICNMundo": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.distribucionGeograficaEnColombia": {"fragment_size" : 300, "number_of_fragments" : 3},
					"atributos.distribucionGeograficaEnMundo": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.distribucionAltitudinal": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.comportamiento": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.reproduccion": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.estadoActualPoblacion": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.estadoCITES": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.vocalizaciones": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.etimologiaNombreCientifico": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.habitat": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.habito": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.alimentacion": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributo.impactos": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributo.informacionAlerta": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.informacionTipos": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.informacionUsos": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.invasora": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.mecanismosControl": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.origen": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.factoresAmenaza": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.medidasConservacion": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.descripcionInvasion": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.descripcionGeneral": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.descripcionTaxonomica": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.ecologia": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.ecosistema": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.clavesTaxonomicas": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.creditosEspecificos": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.regionesNaturales": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.registrosBiologicos": {"fragment_size": 300, "number_of_fragments" : 3},
					"atributos.sinonimos": {"fragment_size": 300, "number_of_fragments" : 3},
					"colecciones.tipo": {"fragment_size": 300, "number_of_fragments" : 3}
				}
			}
		};
	} else {
		qryObj = {
			"size": totalRegs,
			"from": initial,
			"_source": ["catalogoEspeciesId", "autor", "atributos.descripcionGeneral", "atributos.descripcionTaxonomica", "atributos.habitat", "taxonNombre", "taxonCompleto", "listaNombresComunes", "imagenes", "imagenesExternas", "taxonomia.reino", "taxonomia.filo", "taxonomia.clase", "colecciones"],
			"query": {
				"bool": {
					"must": [
						{
							"match_all": {}
						}
					],
					"filter": {
						"bool": {
							"must": [
								{
									"term": {
										"verificacion.estadoId": {
											"value": "2"
										}
									}
								},
								{
									"term": {
										"active": {
											"value": "0"
										}
									}
								}
							]
						}
					}
				}
			}
		};
	}

	if(sortType !== null) {
		sortType = sortType+'.untouched';
		qryObj.sort = {};
		qryObj.sort[sortType] = direction;
	}

	// Include filter for departments
	if(typeof department !== 'undefined') {
		if(typeof department === 'string') {
			qryObj.query.bool.filter.bool.must.push({
				match_phrase: {
					"distribucionGeografica.departamentos.spanish": department
				}
			});
		} else {
			var currentMustElement = qryObj.query.bool.filter.bool.must.length;
			qryObj.query.bool.filter.bool.must[currentMustElement] = {
				bool: {
					should: []
				}
			};
			_.forEach(department, function(n,key) {
				qryObj.query.bool.filter.bool.must[currentMustElement].bool.should.push({
					match_phrase: {
						"distribucionGeografica.departamentos.spanish": n
					}
				});
			});
		}
	}

	// Include filter for collections
	if(typeof collection !== 'undefined') {
		if(typeof collection === 'string') {
			qryObj.query.bool.filter.bool.must.push({
				match_phrase: {
					"colecciones.tipo.spanish": collection
				}
			});
		} else {
			var currentMustElement = qryObj.query.bool.filter.bool.must.length;
			qryObj.query.bool.filter.bool.must[currentMustElement] = {
				bool: {
					should: []
				}
			};
			_.forEach(collection, function(n,key) {
				qryObj.query.bool.filter.bool.must[currentMustElement].bool.should.push({
					match_phrase: {
						"colecciones.tipo.spanish": n
					}
				});
			});
		}
	}

	// Include filters for taxonomy
	if(typeof taxonomy !== 'undefined') {
		if(typeof taxonomy === 'string') {
			switch(taxonomy.toLowerCase()) {
				case 'insects':
					qryObj.query.bool.filter.bool.must.push({
						match_phrase: {
							"taxonomia.clase.spanish": "insecta"
						}
					});
					break;
				case 'birds':
					qryObj.query.bool.filter.bool.must.push({
						match_phrase: {
							"taxonomia.clase.spanish": "aves"
						}
					});
					break;
				case 'plants':
					qryObj.query.bool.filter.bool.must.push({
						match_phrase: {
							"taxonomia.reino.spanish": "plantae"
						}
					});
					break;
				case 'mammals':
					qryObj.query.bool.filter.bool.must.push({
						match_phrase: {
							"taxonomia.clase.spanish": "mammalia"
						}
					});
					break;
				case 'reptiles':
					qryObj.query.bool.filter.bool.must.push({
						match_phrase: {
							"taxonomia.clase.spanish": "reptilia"
						}
					});
					break;
				case 'amphibians':
					qryObj.query.bool.filter.bool.must.push({
						match_phrase: {
							"taxonomia.clase.spanish": "amphibia"
						}
					});
					break;
				case 'mushrooms':
					qryObj.query.bool.filter.bool.must.push({
						match_phrase: {
							"taxonomia.reino.spanish": "fungi"
						}
					});
					break;
			}
		} else {
			var currentMustElement = qryObj.query.bool.filter.bool.must.length;
			qryObj.query.bool.filter.bool.must[currentMustElement] = {
				bool: {
					should: []
				}
			};
			_.forEach(taxonomy, function(n,key) {
				switch(n.toLowerCase()) {
					case 'insects':
						qryObj.query.bool.filter.bool.must[currentMustElement].bool.should.push({
							match_phrase: {
								"taxonomia.clase.spanish": "insecta"
							}
						});
						break;
					case 'birds':
						qryObj.query.bool.filter.bool.must[currentMustElement].bool.should.push({
							match_phrase: {
								"taxonomia.clase.spanish": "aves"
							}
						});
						break;
					case 'plants':
						qryObj.query.bool.filter.bool.must[currentMustElement].bool.should.push({
							match_phrase: {
								"taxonomia.reino.spanish": "plantae"
							}
						});
						break;
					case 'mammals':
						qryObj.query.bool.filter.bool.must[currentMustElement].bool.should.push({
							match_phrase: {
								"taxonomia.clase.spanish": "mammalia"
							}
						});
						break;
					case 'reptiles':
						qryObj.query.bool.filter.bool.must[currentMustElement].bool.should.push({
							match_phrase: {
								"taxonomia.clase.spanish": "reptilia"
							}
						});
						break;
					case 'amphibians':
						qryObj.query.bool.filter.bool.must[currentMustElement].bool.should.push({
							match_phrase: {
								"taxonomia.clase.spanish": "amphibia"
							}
						});
						break;
					case 'mushrooms':
						qryObj.query.bool.filter.bool.must[currentMustElement].bool.should.push({
							match_phrase: {
								"taxonomia.reino.spanish": "fungi"
							}
						});
						break;
				}
			});
		}
	}

	if(typeof facets !== 'undefined') {
		if(facets === 'true') {
			qryObj.size = 0;
			qryObj.aggs = {
				"groups": {
					"filters": {
						"filters": {
							"insects": {
								"terms": {
									"taxonomia.clase.untouched": [
										"insecta",
										"Insecta"
									]
								}
							},
							"birds": {
								"terms": {
									"taxonomia.clase.untouched": [
										"Aves",
										"aves"
									]
								}
							},
							"plants": {
								"terms": {
									"taxonomia.reino.untouched": [
										"Plantae",
										"plantae"
									]
								}
							},
							"mammals": {
								"terms": {
									"taxonomia.clase.untouched": [
										"Mammalia",
										"mammalia"
									]
								}
							},
							"reptiles": {
								"terms": {
									"taxonomia.clase.untouched": [
										"Reptilia",
										"reptilia"
									]
								}
							},
							"amphibians": {
								"terms": {
									"taxonomia.clase.untouched": [
										"Amphibia",
										"amphibia"
									]
								}
							},
							"mushrooms": {
								"terms": {
									"taxonomia.reino.untouched": [
										"Fungi",
										"fungi"
									]
								}
							},
							"paramo": {
								"terms": {
									"colecciones.tipo.untouched": [
										"Paramo",
										"Páramo",
										"paramo",
										"páramo"
									]
								}
							},
							"humedal": {
								"terms": {
									"colecciones.tipo.untouched": [
										"Humedal",
										"humedal"
									]
								}
							},
							"invasora": {
								"terms": {
									"colecciones.tipo.untouched": [
										"Invasora",
										"invasora"
									]
								}
							},
							"amazonas": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Amazonas",
										"amazonas"
									]
								}
							},
							"antioquia": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Antioquia",
										"antioquia"
									]
								}
							},
							"arauca": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Arauca",
										"arauca"
									]
								}
							},
							"atlantico": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Atlántico",
										"atlántico",
										"Atlantico",
										"atlantico"
									]
								}
							},
							"bolivar": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Bolívar",
										"bolívar",
										"Bolivar",
										"bolivar"
									]
								}
							},
							"boyaca": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Boyacá",
										"boyacá",
										"Boyaca",
										"boyaca"
									]
								}
							},
							"caldas": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Caldas",
										"caldas"
									]
								}
							},
							"caqueta": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Caquetá",
										"caquetá",
										"Caqueta",
										"caqueta"
									]
								}
							},
							"casanare": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Casanare",
										"casanare"
									]
								}
							},
							"cauca": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Cauca",
										"cauca"
									]
								}
							},
							"cesar": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Cesar",
										"cesar"
									]
								}
							},
							"choco": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Chocó",
										"chocó",
										"Choco",
										"choco"
									]
								}
							},
							"cordoba": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Córdoba",
										"córdoba",
										"Cordoba",
										"cordoba"
									]
								}
							},
							"cundinamarca": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Cundinamarca",
										"cundinamarca"
									]
								}
							},
							"bogota": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Bogotá D.C.",
										"bogotá D.C.",
										"Bogota D.C.",
										"bogota D.C."
									]
								}
							},
							"guainia": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Guainía",
										"guainía",
										"Guainia",
										"guainia"
									]
								}
							},
							"guajira": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Guajira",
										"guajira"
									]
								}
							},
							"guaviare": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Guaviare",
										"guaviare"
									]
								}
							},
							"huila": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Huila",
										"huila"
									]
								}
							},
							"magdalena": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Magdalena",
										"magdalena"
									]
								}
							},
							"meta": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Meta",
										"meta"
									]
								}
							},
							"narino": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Nariño",
										"nariño",
										"Narino",
										"narino"
									]
								}
							},
							"norteSantander": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Norte de Santander",
										"norte de santander"
									]
								}
							},
							"santander": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Santander",
										"santander"
									]
								}
							},
							"putumayo": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Putumayo",
										"putumayo"
									]
								}
							},
							"quindio": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Quindío",
										"quindío",
										"Quindio",
										"quindio"
									]
								}
							},
							"risaralda": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Risaralda",
										"risaralda"
									]
								}
							},
							"sanAndres": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"San Andrés y Providencia",
										"san Andres y providencia"
									]
								}
							},
							"sucre": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Sucre",
										"sucre"
									]
								}
							},
							"tolima": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Tolima",
										"tolima"
									]
								}
							},
							"valleCauca": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Valle del Cauca",
										"valle del cauca"
									]
								}
							},
							"vaupes": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Vaupés",
										"vaupés",
										"Vaupes",
										"vaupes"
									]
								}
							},
							"vichada": {
								"terms": {
									"distribucionGeografica.departamentos.untouched": [
										"Vichada",
										"vichada"
									]
								}
							}
						}
					}
				}
			};
		}
	}

	//console.log(JSON.stringify(qryObj));

	mySearchCall = elasticSearchClient.search('biodiversity', 'catalog', qryObj);
	return mySearchCall;
};

// Search registers
exports.getTotalFichas = function(searchText, size, page) {
	qryObj = {
		"query": {
			"bool": {
				"must": [
					{
						"term": {
							"verificacion.estadoId": {
								"value": "2"
							}
						}
					},
					{
						"term": {
							"active": {
								"value": "0"
							}
						}
					}
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
		"_source": ["catalogoEspeciesId", "autor", "taxonNombre", "taxonCompleto", "atributos.descripcionGeneral", "atributos.descripcionTaxonomica", "atributos.habitat", "listaNombresComunes", "imagenes", "imagenesExternas", "taxonomia.reino", "taxonomia.filo", "taxonomia.clase", "colecciones"],
		"query": {
			"bool": {
				"must": [
					{
						"match_all": {}
					}
				],
				"filter": {
					"bool": {
						"must": [
							{
								"term": {
									"verificacion.estadoId": {
										"value": "2"
									}
								}
							},
							{
								"term": {
									"active": {
										"value": "0"
									}
								}
							}
						]
					}
				}
			}
		}
	};

	mySearchCall = elasticSearchClient.search('biodiversity', 'catalog', qryObj);
	return mySearchCall;
};

// Get random fichas
exports.getRandomFichas = function(size, page) {
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
		"sort": {
			"_script": {
				"script": "Math.random()",
				"type": "number",
				"params": {},
				"order": "asc"
			}
		},
		"_source": [
			"catalogoEspeciesId",
			"taxonNombre",
			"autor",
			"taxonCompleto",
			"atributos.descripcionGeneral",
			"atributos.descripcionTaxonomica",
			"atributos.habitat",
			"listaNombresComunes",
			"imagenes",
			"imagenesExternas",
			"taxonomia.reino",
			"taxonomia.filo",
			"taxonomia.clase",
			"colecciones"
		],
		"query": {
			"bool": {
				"must": [
					{
						"match_all": {}
					}
				],
				"filter": {
					"bool": {
						"must": [
							{
								"term": {
									"verificacion.estadoId": {
										"value": "2"
									}
								}
							},
							{
								"term": {
									"active": {
										"value": "0"
									}
								}
							}
						]
					}
				}
			}
		}
	};

	mySearchCall = elasticSearchClient.search('biodiversity', 'catalog', qryObj);
	return mySearchCall;
};