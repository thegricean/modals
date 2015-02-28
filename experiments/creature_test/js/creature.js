
	var scale = 0.5;



	Ecosystem.draw("bird", {}, "BIRD", scale); // randomly samples bird properties
	Ecosystem.draw("bug", {}, "BUG", scale);
	Ecosystem.draw("flower", {}, "FLOWER", scale);
	Ecosystem.draw("fish", {}, "FISH", scale);

	var genus = new Ecosystem.Genus("bird", {
	    "col1":{"mean":"#ff0000"},
	    "col2":{"mean":"#00ff00"},
	    "col3":{"mean":"#0000ff"},
	    "tar1":0.1, //almost never has a tail
	    "tar2":0.9, //almost always has a crest
	    "prop1":{"mean":0, "var":0.05}, //low height variance
	    "prop1":{"mean":0, "var":0.5}, //high fatness variance
	    "var":0.3 //overall variance (overwritten by any specified variances)
	});

	var properties = {};

	genus.draw("svg1", {}, scale);

	Ecosystem.draw(
    "bird", {"col1":"#ff0000",
             "col2":"#00ff00",
             "col3":"#0000ff",
             "tar1":false,
             "tar2":true,
             "prop1":0,
             "prop2":0},
    "sBIRD", scale)
