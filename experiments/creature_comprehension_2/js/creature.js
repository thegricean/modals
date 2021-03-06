
	  		var scale = 0.5;
		    //properties sampled around specified mean:
			var bugs = new Ecosystem.Genus("bug", {
				"col4":{"mean":"#FF0000","var":0},
				"tar2":false,
				"var":0 //overall variance (overwritten by any specified variances)
			});

			var birds = new Ecosystem.Genus("bird", {
				"col1":{"mean":"#FF0000","var":0},
				"var":0 //overall variance (overwritten by any specified variances)
			});

			var flowers = new Ecosystem.Genus("flower", {
				"col1":{"mean":"#FF0000","var":0},
				"col5":{"mean":"#0000FF","var":0},
				"tar2":false,
				"var":0 //overall variance (overwritten by any specified variances)
			});

			var fishes = new Ecosystem.Genus("fish", {
				"var":0 //overall variance (overwritten by any specified variances)
			});

function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    start : function() {
    	//draw_rock("intro_rock");
    },
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.bird_intro = slide({
	  	name : "bird_intro",

	  	present : ([
	  		_.shuffle([
	  		{"type":"bird_a_feature1","question":"How many "+exp.birds_a+" have tails?","answer":exp.frequencies[0].freq},
			{"type":"bird_a_feature2","question":"How many "+exp.birds_a+" have crests?","answer":"100"},
			{"type":"bird_b_feature1","question":"How many "+exp.birds_b+" have tails?","answer":"25"},
			{"type":"bird_b_feature2","question":"How many "+exp.birds_b+" have crests?","answer":"0"}])
			]),
	  	
	  	present_handle : function(stim) {
	      $(".qerr").hide();
	      this.stim = stim;
		    //properties sampled around specified mean:
			
			tar_a = "tar1"
			//draw the pimwits: 75% tar1, 100% tar2
			//var pim_tar = _.shuffle([true,true,true,true,true,true,false,false]);
			var pim_tar = _.shuffle(exp.frequencies[0].tar_values);
			for (var i=0; i<pim_tar.length; i++) {
				birds.draw("bird_a_"+i, {"tar1" : pim_tar[i], "tar2" : true}, scale);
			};
			//draw the daxes: 25% tar1, 0% tar2
			var dax_tar = _.shuffle([true,true,false,false,false,false,false,false]);
			for (var i=0; i<dax_tar.length; i++) {
				birds.draw("bird_b_"+i, {"tar1" : dax_tar[i], "tar2" : false}, scale);
			};
			var q1text = stim[0].question;
			var q2text = stim[1].question;
			var q3text = stim[2].question;
			var q4text = stim[3].question;

			$("#bird_q1").html(q1text);
			$("#bird_q2").html(q2text);
			$("#bird_q3").html(q3text);
			$("#bird_q4").html(q4text);

	  	},


	  	button : function() {
	  		var ok_to_go_on = true;
	  		if ($("#bird_q1_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}
			if ($("#bird_q2_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}	  		
			if ($("#bird_q3_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}	  			
			if ($("#bird_q4_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}	  			
	  		if (ok_to_go_on) {  		  		
	        	this.log_responses();
	        	_stream.apply(this);
	        } else {
	        	$(".qerr").show();
	        }
	      },

	    log_responses : function() {
	      exp.data_trials.push({
			"question1" : this.stim[0].type,
	        "question1_response" : $("#bird_q1_a").val(),
	        "question1_answer" : this.stim[0].answer,
	        "question2" : this.stim[1].type,
	        "question2_response" : $("#bird_q2_a").val(),
	        "question2_answer" : this.stim[1].answer,	   
	        "question3" : this.stim[2].type,
	        "question3_response" : $("#bird_q3_a").val(),
	        "question3_answer" : this.stim[2].answer,  
	        "question4" : this.stim[3].type,
	        "question4_response" : $("#bird_q4_a").val(),
	        "question4_answer" : this.stim[3].answer, 
	        "item" : this.name,
	        "freq" : exp.frequencies[1].freq
	      });
	    }
	  });

  slides.bird_slider = slide({
	    name : "bird_slider",
	    /* trial information for this block
	     (the variable 'stim' will change between each of these values,
	      and for each of these, present_handle will be run.) */
	    present : ([_.shuffle([
	    	{full: "no", type: "indirect", evidence: "All she sees of the bird through the fog is its tail:",color:"#FF0000",path: "m 132.22211,134.52966 c 191.10251,80.71415 113.01869,78.03341 2.84222,9.61677 63.9837,23.64523 215.07401,187.78265 -1.1188,7.99662 123.08528,103.16261 103.98773,125.24613 -5.52127,2.16374 51.46787,47.51483 104.03178,177.03548 -9.92371,-3.66861 82.41766,117.57582 24.7014,98.14746 -11.75615,-7.14977"},
	    	{full: "no", type: "direct", evidence: "All she sees of the bird through the fog is its crest:",color:"#FF0000",path: "M 68.998189,51.444834 C 29.266918,8.8463783 54.774859,-23.966711 79.178014,49.452194 55.45242,-32.318599 86.17406,3.34127 87.47028,48.404097 c -6.752454,-60.351739 18.46215,-69.484532 8.33515,2.21967 11.22067,-81.250238 27.66133,-41.2482689 8.12437,4.603553 21.46103,-73.743476 42.28583,-75.437662 4.9047,6.30698 27.0571,-72.938091 69.57097,-85.29053 -0.2684,4.974874 97.61204,-111.124987 45.76332,-19.663736 -1.94517,4.833631 135.25621,-91.227061 55.46185,-14.557556 -0.46447,1.037058 36.0982,-22.141872 172.89205,-35.881013 -2.41942,2.363961 159.97243,-29.73347 94.71493,-9.896787 20.5901,1.992641 92.68096,-11.725204 80.48663,-3.936569 16.60419,3.892767 72.51341,-9.249468 52.48157,10.901133 19.31953,7.7745 -6.13279,-3.190188 -10.16888,-8.899088 -56.17929,-13.671245 1.40105,-1.235818 3.15887,0.05674 4.68998,-13.053739 C 94.41531,40.704404 80.375709,51.076633 68.998189,51.444834 z"},
	    	{full: "no", type: "report", evidence: "Somebody else looked through the fog and told Mary the bird was a "+exp.bird_a+":",color:"#000",transform:"t-840,-1475.000000s.08,-.07",path: "M919 3207 c-67 -28 -102 -52 -150 -104 -107 -115 -170 -254 -205 -446 -17 -98 -19 -310 -3 -404 54 -328 232 -569 436 -590 58 -6 58 -5 28 -93 -14 -40 17 -28 -410 -155 -383 -113 -497 -159 -577 -236 -32 -31 -38 -42 -38 -79 0 -57 24 -148 55 -202 65 -116 154 -187 396 -314 90 -47 170 -93 177 -102 8 -10 11 -32 9 -52 -4 -27 9 -65 55 -170 33 -74 66 -144 73 -154 26 -35 42 -12 48 68 3 50 14 93 30 128 l25 53 2 -35 c2 -19 5 -98 9 -175 l6 -140 40 -3 40 -3 1 383 c0 213 6 410 11 443 l11 60 1 -55 c1 -30 12 -201 26 -380 14 -179 25 -353 25 -387 l0 -63 46 0 45 0 -5 43 c-3 23 -7 107 -10 187 l-5 145 25 -55 c17 -36 28 -80 31 -127 7 -91 17 -107 44 -72 36 45 138 284 132 308 -12 45 11 77 170 240 90 91 181 189 204 216 58 71 132 189 173 274 l35 73 -40 36 c-100 88 -317 152 -684 203 -56 8 -95 18 -98 26 -3 7 4 44 16 82 12 38 21 76 21 84 0 8 19 26 43 40 269 158 390 680 258 1112 -38 122 -104 235 -182 313 -96 94 -230 125 -340 79z m198 -148 c72 -45 150 -163 190 -289 57 -183 57 -467 0 -650 -65 -205 -195 -336 -312 -314 -160 30 -295 323 -295 639 0 417 217 736 417 614z m-130 -1603 c-10 -24 -56 -257 -67 -335 -17 -120 -40 -417 -41 -526 -1 -118 -11 -199 -21 -172 -4 9 -51 39 -105 65 -171 84 -416 217 -478 259 -120 81 -193 183 -214 298 -14 76 -3 94 99 152 77 44 213 91 600 207 247 73 234 70 227 52z m256 -46 c328 -52 489 -97 576 -160 l41 -30 -34 -68 c-113 -225 -420 -554 -609 -653 -49 -25 -85 -52 -96 -70 -17 -28 -18 -25 -36 239 -20 285 -25 610 -12 705 10 67 -1 65 170 37z" },//{evidence: "report"}
	    	])]),

	   present_handle : function(stim) {
	   		this.stim = stim;
	    	$(".slidererr").hide();	
	    	$(".err").hide();	
	    	$(".evidence").hide();
	  		$("#radiotable").hide();
	  		$(".contbutton").hide();
	  		$(".sliderbutton").show();

	    	var sentences = {
		    	must: "\"The bird in the fog must be a "+ exp.bird_a+".\"",
		      	bare: "\"The bird in the fog is a "+ exp.bird_a+".\"",
		      	might: "\"The bird in the fog might be a "+ exp.bird_a+".\""
		      	},
		    sentence = sentences[exp.sentenceorder[0]]

		    $(".statement").html(sentence);

		    this.init_sliders();

		   	$(".sliderbutton").click(function() {
			   	if (exp.bird_sliderPost == null) {
		        	$(".slidererr").show();
		      	} else {
				    $(".sliderbutton").unbind("click"); 
				    $(".sliderbutton").hide();
				    $(".slidererr").hide();
				    $(".evidence").show();
				    $(".contbutton").show();
				}
		      });


	    	$("#evidence1").html(stim[0].evidence);
		   	var paper = new Raphael(document.getElementById("bird_evidence1"),250,250);
			var rect = paper.rect(0, 0, 250,250);
			var p = stim[0].path;
			var mark = paper.path(p);
			mark.attr("fill",stim[0].color);
			mark.transform(stim[0].transform);

			$("#evidence2").html(stim[1].evidence);
		   	var paper = new Raphael(document.getElementById("bird_evidence2"),250,250);
		   	var rect = paper.rect(0, 0, 250,250);
			var p = stim[1].path;
			var mark = paper.path(p);
			mark.attr("fill",stim[1].color);
			mark.transform(stim[1].transform);

			$("#evidence3").html(stim[2].evidence);
		   	var paper = new Raphael(document.getElementById("bird_evidence3"),250,250);
		   	var rect = paper.rect(0, 0, 250,250);
			var p = stim[2].path;
			var mark = paper.path(p);
			mark.attr("fill",stim[2].color);
			mark.transform(stim[2].transform);	

			$("#evidence4").html("She sees a bird through the fog:");
			birds.draw("bird_evidence4", {"tar1" : true, "tar2" : true}, .75);

	    },
	    
	    init_sliders : function() {
	      utils.make_slider("#bird_slider_bar", function(event, ui) {
	        exp.bird_sliderPost = ui.value;
	      });
	    }, 

	    button : function() {
	      if ($("input[name=bird_choice]:checked").val() == undefined) {
	        $(".err").show();
	      } else {
	        this.log_responses();
	        $(".evidence2").empty();
	        /* use _stream.apply(this); if and only if there is
	        "present" data. (and only *after* responses are logged) */
	        _stream.apply(this);
	      }
	    },
	    log_responses : function() {
	      exp.data_trials.push({
	        // "evidence_type" : this.stim.type,
	        "rating" : exp.bird_sliderPost,
	        "response" : $("input[name=bird_choice]:checked").val(),
	        "item" : this.name,
	        "freq" : exp.frequencies[0].freq,
	        "modal": exp.sentenceorder[0],
	        "choice1": this.stim[0].type,
	        "choice2": this.stim[1].type,
	        "choice3": this.stim[2].type,
	        "choice4": "full"
	      });
	    }
	  });

  slides.bug_intro = slide({
	  	name : "bug_intro",

	  	present : ([
	  		_.shuffle([
	  		{"type":"bug_a_feature1","question":"How many "+exp.bugs_a+" have antennae?","answer":exp.frequencies[1].freq},
			{"type":"bug_a_feature2","question":"How many "+exp.bugs_a+" have stingers?","answer":"100"},
			{"type":"bug_b_feature1","question":"How many "+exp.bugs_b+" have antennae?","answer":"25"},
			{"type":"bug_b_feature2","question":"How many "+exp.bugs_b+" have stingers?","answer":"0"}])
			]),

	  	present_handle : function(stim) {
	      $(".qerr").hide();
	      this.stim = stim;

		    //properties sampled around specified mean:
			
			//decide which tar is deterministic and which is indirect
			var tars = _.shuffle(["tar1","tar2"]);
			//draw the pimwits: 50% tar1, 100% tar3
			//var pim_tar = _.shuffle([true,true,true,true,false,false,false,false]);
			var pim_tar = _.shuffle(exp.frequencies[1].tar_values);
			for (var i=0; i<pim_tar.length; i++) {
				bugs.draw("bug_a_"+i, {"tar1" : pim_tar[i], "tar3" : true}, scale);
			};
			//draw the daxes: 25% tar1, 0% tar3
			var dax_tar = _.shuffle([true,true,false,false,false,false,false,false]);
			for (var i=0; i<dax_tar.length; i++) {
				bugs.draw("bug_b_"+i, {"tar1" : dax_tar[i], "tar3" : false}, scale);
			}

			var q1text = stim[0].question;
			var q2text = stim[1].question;
			var q3text = stim[2].question;
			var q4text = stim[3].question;

			$("#bug_q1").html(q1text);
			$("#bug_q2").html(q2text);
			$("#bug_q3").html(q3text);
			$("#bug_q4").html(q4text);

	  	},

	  	button : function() {
	        var ok_to_go_on = true;
	  		if ($("#bug_q1_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}
			if ($("#bug_q2_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}	  		
			if ($("#bug_q3_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}	  			
			if ($("#bug_q4_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}	  			
	  		if (ok_to_go_on) {  		  		
	        	this.log_responses();
	        	_stream.apply(this);
	        } else {
	        	$(".qerr").show();
	        }
	      },

	    log_responses : function() {
	      exp.data_trials.push({
			"question1" : this.stim[0].type,
	        "question1_response" : $("#bug_q1_a").val(),
	        "question1_answer" : this.stim[0].answer,
	        "question2" : this.stim[1].type,
	        "question2_response" : $("#bug_q2_a").val(),
	        "question2_answer" : this.stim[1].answer,	   
	        "question3" : this.stim[2].type,
	        "question3_response" : $("#bug_q3_a").val(),
	        "question3_answer" : this.stim[2].answer,  
	        "question4" : this.stim[3].type,
	        "question4_response" : $("#bug_q4_a").val(),
	        "question4_answer" : this.stim[3].answer, 
	        "item" : this.name,
	        "freq" : exp.frequencies[1].freq
	      });
	    }
	  });

  slides.bug_slider = slide({
	    name : "bug_slider",
	    /* trial information for this block
	     (the variable 'stim' will change between each of these values,
	      and for each of these, present_handle will be run.) */
	    present : ([_.shuffle([
	    	{full: "no", type: "indirect", evidence: "All he sees of the bug through the fog are its antennae:",color:"#FF0000",path: "m 5.419715,163.01459 c 11.961335,-3.66524 10.998423,-18.96404 15.179901,-30.92883 8.983951,-25.7065 34.010716,-45.08578 42.143043,-21.82588 L 51.922914,141.49734 C 64.326665,83.967056 31.442532,110.01215 25.42753,145.60325 21.993687,165.92146 11.888937,178.64831 5.087253,179.57328 z M 71.160253,18.211588 C 76.44653,29.55015 64.43836,39.078218 58.350997,50.195106 45.272234,74.079852 49.632881,106.09369 70.192991,96.47811 L 86.02947,64.834665 C 50.19598,120.57344 52.27524,65.855154 71.62388,44.730501 85.54198,29.534854 87.10394,12.549182 83.23691,6.877797 z"},
	    	{full: "no", type: "direct", evidence: "All he sees of the bug through the fog is its stinger:",color:"#FF0000",path: "M 216.83579,169.37132 248.5,171.11827 222.20711,157.27512 z"},
	    	{full: "no", type: "report", evidence: "Somebody else looked through the fog and told Tom the bug was a  "+exp.bug_a+":",color:"#000",transform:"t-840,-1475.000000s.08,-.07",path: "M919 3207 c-67 -28 -102 -52 -150 -104 -107 -115 -170 -254 -205 -446 -17 -98 -19 -310 -3 -404 54 -328 232 -569 436 -590 58 -6 58 -5 28 -93 -14 -40 17 -28 -410 -155 -383 -113 -497 -159 -577 -236 -32 -31 -38 -42 -38 -79 0 -57 24 -148 55 -202 65 -116 154 -187 396 -314 90 -47 170 -93 177 -102 8 -10 11 -32 9 -52 -4 -27 9 -65 55 -170 33 -74 66 -144 73 -154 26 -35 42 -12 48 68 3 50 14 93 30 128 l25 53 2 -35 c2 -19 5 -98 9 -175 l6 -140 40 -3 40 -3 1 383 c0 213 6 410 11 443 l11 60 1 -55 c1 -30 12 -201 26 -380 14 -179 25 -353 25 -387 l0 -63 46 0 45 0 -5 43 c-3 23 -7 107 -10 187 l-5 145 25 -55 c17 -36 28 -80 31 -127 7 -91 17 -107 44 -72 36 45 138 284 132 308 -12 45 11 77 170 240 90 91 181 189 204 216 58 71 132 189 173 274 l35 73 -40 36 c-100 88 -317 152 -684 203 -56 8 -95 18 -98 26 -3 7 4 44 16 82 12 38 21 76 21 84 0 8 19 26 43 40 269 158 390 680 258 1112 -38 122 -104 235 -182 313 -96 94 -230 125 -340 79z m198 -148 c72 -45 150 -163 190 -289 57 -183 57 -467 0 -650 -65 -205 -195 -336 -312 -314 -160 30 -295 323 -295 639 0 417 217 736 417 614z m-130 -1603 c-10 -24 -56 -257 -67 -335 -17 -120 -40 -417 -41 -526 -1 -118 -11 -199 -21 -172 -4 9 -51 39 -105 65 -171 84 -416 217 -478 259 -120 81 -193 183 -214 298 -14 76 -3 94 99 152 77 44 213 91 600 207 247 73 234 70 227 52z m256 -46 c328 -52 489 -97 576 -160 l41 -30 -34 -68 c-113 -225 -420 -554 -609 -653 -49 -25 -85 -52 -96 -70 -17 -28 -18 -25 -36 239 -20 285 -25 610 -12 705 10 67 -1 65 170 37z" },//{evidence: "report"}
	    	])]),
	    
	   present_handle : function(stim) {
	   		this.stim = stim;
	    	$(".slidererr").hide();	
	    	$(".err").hide();	
	    	$(".evidence").hide();
	  		$("#radiotable").hide();
	  		$(".contbutton").hide();
	  		$(".sliderbutton").show();

	    	var sentences = {
		    	must: "\"The bug in the fog must be a "+ exp.bug_a+".\"",
		      	bare: "\"The bug in the fog is a "+ exp.bug_a+".\"",
		      	might: "\"The bug in the fog might be a "+ exp.bug_a+".\""
		      	},
		    sentence = sentences[exp.sentenceorder[0]]

		    $(".statement").html(sentence);

		    this.init_sliders();

		   	$(".sliderbutton").click(function() {
			   	if (exp.bug_sliderPost == null) {
		        	$(".slidererr").show();
		      	} else {
				    $(".sliderbutton").unbind("click"); 
				    $(".sliderbutton").hide();
				    $(".slidererr").hide();
				    $(".evidence").show();
				    $(".contbutton").show();
				}
		      });


	    	$("#bg_evidence1").html(stim[0].evidence);
		   	var paper = new Raphael(document.getElementById("bug_evidence1"),250,250);
			var rect = paper.rect(0, 0, 250,250);
			var p = stim[0].path;
			var mark = paper.path(p);
			mark.attr("fill",stim[0].color);
			mark.transform(stim[0].transform);

			$("#bg_evidence2").html(stim[1].evidence);
		   	var paper = new Raphael(document.getElementById("bug_evidence2"),250,250);
		   	var rect = paper.rect(0, 0, 250,250);
			var p = stim[1].path;
			var mark = paper.path(p);
			mark.attr("fill",stim[1].color);
			mark.transform(stim[1].transform);


			$("#bg_evidence3").html("He sees a bug through the fog:");
			bugs.draw("bug_evidence3", {"tar1" : true, "tar3" : true}, .75);

			$("#bg_evidence4").html(stim[2].evidence);
		   	var paper = new Raphael(document.getElementById("bug_evidence4"),250,250);
		   	var rect = paper.rect(0, 0, 250,250);
			var p = stim[2].path;
			var mark = paper.path(p);
			mark.attr("fill",stim[2].color);
			mark.transform(stim[2].transform);	

	    },
	    
	    init_sliders : function() {
	      utils.make_slider("#bug_slider_bar", function(event, ui) {
	        exp.bug_sliderPost = ui.value;
	      });
	    }, 

	    button : function() {
	      if ($("input[name=bug_choice]:checked").val() == undefined) {
	        $(".err").show();
	      } else {
	        this.log_responses();
	        $(".evidence2").empty();
	        /* use _stream.apply(this); if and only if there is
	        "present" data. (and only *after* responses are logged) */
	        _stream.apply(this);
	      }
	    },
	    log_responses : function() {
	      exp.data_trials.push({
	        // "evidence_type" : this.stim.type,
	        "rating" : exp.bug_sliderPost,
	        "response" : $("input[name=bug_choice]:checked").val(),
	        "item" : this.name,
	        "freq" : exp.frequencies[0].freq,
	        "modal": exp.sentenceorder[0],
	        "choice1": this.stim[0].type,
	        "choice2": this.stim[1].type,
	       	"choice3": "full",
	        "choice4": this.stim[2].type
	      });
	    }
	  });

  slides.flower_intro = slide({
	  	name : "flower_intro",

	  	present : ([
	  		_.shuffle([
	  		{"type":"flower_a_feature1","question":"How many "+exp.flowers_a+" have tendrils?","answer":exp.frequencies[2].freq},
			{"type":"flower_a_feature2","question":"How many "+exp.flowers_a+" have thorns?","answer":"100"},
			{"type":"flower_b_feature1","question":"How many "+exp.flowers_b+" have tendrils?","answer":"25"},
			{"type":"flower_b_feature2","question":"How many "+exp.flowers_b+" have thorns?","answer":"0"}])
			]),
	  	
	  	present_handle : function(stim) {
	      $(".qerr").hide();
	      this.stim = stim;
			//decide which tar is deterministic and which is indirect
			var tars = _.shuffle(["tar1","tar2"]);
			//draw the pimwits: 25% tar3, 100% tar1
			//var pim_tar = _.shuffle([true,true,false,false,false,false,false,false]);
			var pim_tar = _.shuffle(exp.frequencies[2].tar_values);
			for (var i=0; i<pim_tar.length; i++) {
				flowers.draw("flower_a_"+i, {"tar3" : pim_tar[i], "tar1" : true}, scale);
			};
			//draw the daxes: 25% tar3, 0% tar1
			var dax_tar = _.shuffle([true,true,false,false,false,false,false,false]);
			for (var i=0; i<dax_tar.length; i++) {
				flowers.draw("flower_b_"+i, {"tar3" : dax_tar[i], "tar1" : false}, scale);
			};
			var q1text = stim[0].question;
			var q2text = stim[1].question;
			var q3text = stim[2].question;
			var q4text = stim[3].question;

			$("#flower_q1").html(q1text);
			$("#flower_q2").html(q2text);
			$("#flower_q3").html(q3text);
			$("#flower_q4").html(q4text);

	  	},

	  	button : function() {
	        var ok_to_go_on = true;
	  		if ($("#flower_q1_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}
			if ($("#flower_q2_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}	  		
			if ($("#flower_q3_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}	  			
			if ($("#flower_q4_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}	  			
	  		if (ok_to_go_on) {  		  		
	        	this.log_responses();
	        	_stream.apply(this);
	        } else {
	        	$(".qerr").show();
	        }
	      },

	    log_responses : function() {
	      exp.data_trials.push({
			"question1" : this.stim[0].type,
	        "question1_response" : $("#flower_q1_a").val(),
	        "question1_answer" : this.stim[0].answer,
	        "question2" : this.stim[1].type,
	        "question2_response" : $("#flower_q2_a").val(),
	        "question2_answer" : this.stim[1].answer,	   
	        "question3" : this.stim[2].type,
	        "question3_response" : $("#flower_q3_a").val(),
	        "question3_answer" : this.stim[2].answer,  
	        "question4" : this.stim[3].type,
	        "question4_response" : $("#flower_q4_a").val(),
	        "question4_answer" : this.stim[3].answer, 
	        "item" : this.name,
	        "freq" : exp.frequencies[1].freq
	      });
	    }
	  });

	slides.flower_slider = slide({
	    name : "flower_slider",
	    /* trial information for this block
	     (the variable 'stim' will change between each of these values,
	      and for each of these, present_handle will be run.) */
	    present : ([_.shuffle([
	    	{type: "indirect", evidence: "All she sees of the flower in the fog are its tendrils:",color:"#0000FF",path: "m 97.5,109.5 3,-9.5 c 0,0 -11.298092,-31.879456 -25,-39 -10.509496,-5.461526 -25.046965,-4.068827 -35.5,1.5 -12.415342,6.614241 -24.573951,19.939155 -25,34 -0.288429,9.51899 7.136434,19.44531 15.5,24 7.172094,3.90583 17.930817,4.85183 24.5,0 5.470442,-4.04033 8.50089,-13.1758 6,-19.5 -1.976534,-4.99822 -8.799801,-9.358979 -14,-8 -3.760995,0.982868 -7.145004,6.285155 -6,10 0.702886,2.28044 4.297275,3.91785 6.5,3 1.80071,-0.75033 3.197363,-3.95991 2,-5.5 -1.028078,-1.32235 -4.23275,1.98892 -5,0.5 -0.81155,-1.574889 1.748658,-3.732249 3.5,-4 3.475455,-0.531339 7.793607,2.197618 9,5.5 1.627613,4.45543 -0.65194,10.72648 -4.5,13.5 -5.543488,3.99552 -14.541648,3.34552 -20.5,0 C 25.021341,112.0816 19.041439,103.49032 19.5,95.5 20.214406,83.051633 31.341054,71.563285 42.5,66 51.599839,61.463281 64.19205,60.419753 73,65.5 c 14.541616,8.387309 24.5,44 24.5,44 z m 52.72832,-14.884912 c 0,0 33.30187,-0.623217 41.07541,-14.058927 5.30211,-9.163961 5.2228,-26.175089 -2.51478,-33.40769 -4.31679,-4.035051 -13.12722,-6.738046 -20.37303,0.01446 -2.60709,2.429571 -0.89923,9.764339 3.06854,9.285295 1.14396,-0.138116 0.21424,-3.026667 1.35387,-3.19665 2.10137,-0.313432 4.98798,2.96328 4.11214,4.908636 -1.58639,3.523524 -8.86421,2.992032 -11.54445,0.207926 -3.47257,-3.607138 -2.89582,-11.613237 0.75132,-15.025719 6.45819,-6.042671 16.92537,-4.299204 23.95525,1.090594 10.17502,7.801157 8.03778,34.792957 7.17487,32.650854 11.41373,-8.30284 -5.14148,-34.223331 2.18947,-47.110731 4.85627,-8.537092 11.40074,-12.956469 21.18887,-13.006607 11.14945,-0.0571 23.66468,8.82225 26.04878,19.782072 1.79212,8.238484 0.54098,12.776719 -7.30421,19.910153 -5.45262,4.957933 -15.93267,3.942412 -21.05402,-1.383174 -6.05887,-6.300469 -6.11333,-16.35317 0.69583,-21.793819 3.99539,-3.192401 10.13723,-2.42008 13.15223,1.733767 2.416,3.328602 2.75371,9.611201 -0.38468,12.247389 -2.54916,2.14125 -8.21089,2.013191 -9.94073,-0.846337 -1.12543,-1.860431 0.54197,-5.083863 2.49216,-6.020923 1.06272,-0.51063 2.88189,-0.07131 3.39687,0.996241 0.44158,0.915422 -1.80655,2.060094 -1.13829,2.824271 0.80191,0.917012 2.92907,0.136818 3.51772,-0.928518 1.22737,-2.221218 -0.0984,-5.92807 -2.23241,-7.297662 -2.14758,-1.378314 -5.93609,-0.916907 -7.5613,1.049414 -3.36752,4.074303 -3.10751,12.251526 0.73153,15.896217 4.24748,4.032445 12.85532,3.335558 17.50203,-0.203075 7.15133,-5.445985 6.72299,-12.059933 3.39862,-20.456636 -2.85776,-7.218108 -12.24524,-13.007194 -19.95815,-12.714117 -9.7764,0.371485 -14.47169,2.586643 -18.96863,11.316398 -7.33514,14.239447 6.91949,33.659196 -1.71096,47.142164 C 192.10137,92.66624 153.8669,101.01757 153.8669,101.01757 z M 126.625,141.5 c -0.63676,0.0439 15.12574,-0.21583 24.125,16.75 5.35729,10.09982 -8.85963,29.00777 -21.25,33.25 -6.49369,2.22331 -17.14108,-0.97025 -20.5,-12 -1.20855,-3.96853 4.78503,-10.31432 8.5,-7.5 1.07107,0.8114 -1.54815,3.1592 -0.5,4 1.93269,1.55035 6.748,-0.0352 7,-2.5 0.45642,-4.46437 -7.17949,-8.21329 -11.5,-7 -5.59772,1.57196 -9.68273,9.93457 -8,15.5 2.97971,9.85502 14.53247,14.26568 24.75,13 14.7888,-1.83193 28.36696,-30.13906 26.25,-28.5 6.65106,15.0354 -25.11947,31.2721 -25.25,48.5 -0.0865,11.41238 3.92605,19.69138 13.75,25.5 11.19027,6.61648 28.96317,5.0808 37.75,-4.5 6.60505,-7.20187 7.99028,-12.4859 4.25,-24.25 -2.5996,-8.17638 -13.74109,-13.32411 -22,-11 -9.77076,2.74956 -15.68384,12.79182 -12,22.25 2.16156,5.54976 8.79429,8.38904 14.25,6 4.37182,-1.91441 8.37299,-8.01183 6.75,-12.5 -1.31828,-3.64553 -7.09227,-6.84801 -10.5,-5 -2.21709,1.20233 -2.41708,5.41362 -1,7.5 0.7722,1.13692 2.85948,1.76688 4,1 0.97799,-0.6576 -0.61803,-3.12732 0.5,-3.5 1.34164,-0.44721 3.02827,1.58607 3,3 -0.0589,2.94805 -3.55369,5.8829 -6.5,6 -2.96507,0.11785 -6.50987,-2.57334 -7,-5.5 -1.01557,-6.06417 4.01148,-14.106 10,-15.5 6.62564,-1.5423 14.88456,4.22009 17.5,10.5 4.02518,9.66483 -0.26031,16.041 -8.5,22.5 -7.08314,5.55239 -19.90663,5.83123 -27.5,1 -9.62488,-6.12376 -13.06048,-11.10593 -12.5,-22.5 0.91422,-18.58532 26.58054,-29.66075 25.75,-48.25 -0.88985,-19.91684 -23.13299,-28.16421 -23.13299,-28.16421 z"},
	    	{type: "direct", evidence: "All she sees of the flower in the fog are its thorns:",color:"#FF0000",path: "m 99.35953,133.29713 c -7.935314,9.67384 -14.732107,20.08698 -19.36667,31.675 -0.238071,0.59526 -27.84544,-13.68137 -28.071963,-13.07985 -0.171601,0.45568 27.035152,15.78818 26.87032,16.24751 -1.173093,3.26901 -3.298254,12.00615 -4.103738,15.47067 -0.204563,0.87986 -30.64688,-8.35793 -30.826609,-7.46319 -0.207524,1.03311 30.351734,10.20127 30.178301,11.25476 -0.885192,5.37694 -0.06947,6.14793 0.01725,12.10079 0.01564,1.07379 -33.70176,1.40756 -33.65181,2.50154 0.05595,1.22528 33.633687,0.71337 33.73378,1.96457 0.456869,5.71104 2.004567,16.94532 3.448042,23.23253 0.285417,1.24316 -29.283805,9.24816 -28.957242,10.51524 0.299005,1.16015 30.115436,-7.16958 30.449618,-5.98901 C 80.42434,236.48104 82.057641,241.40132 84,246.5 l 11,0 c -6.360467,-10.79671 -10.245848,-20.97466 -12.12091,-30.65002 -0.1217,-0.62797 34.26507,-8.75383 34.16018,-9.3776 -0.13256,-0.78832 -34.751795,5.92669 -34.857965,5.14497 -0.931753,-6.86045 -0.85713,-13.46932 0.05049,-19.86993 0.07221,-0.5092 30.774685,3.23292 30.857345,2.72633 0.0885,-0.5423 -30.442075,-5.33312 -30.341808,-5.87248 1.252887,-6.73957 3.416765,-13.25138 6.282696,-19.58769 0.260044,-0.57493 28.025872,10.85158 28.297312,10.2795 0.27957,-0.58918 -26.934911,-13.17687 -26.643586,-13.76312 4.497662,-9.05088 10.376536,-17.75646 17.009156,-26.2736 -0.53082,0.0169 -7.46071,-5.48137 -8.33337,-5.95923 z"},
	    	{type: "report", evidence: "Somebody else looked through the fog and told Janice the flower was a "+exp.flower_a+".",color:"#000",transform:"t-840,-1475.000000s.08,-.07",path: "M919 3207 c-67 -28 -102 -52 -150 -104 -107 -115 -170 -254 -205 -446 -17 -98 -19 -310 -3 -404 54 -328 232 -569 436 -590 58 -6 58 -5 28 -93 -14 -40 17 -28 -410 -155 -383 -113 -497 -159 -577 -236 -32 -31 -38 -42 -38 -79 0 -57 24 -148 55 -202 65 -116 154 -187 396 -314 90 -47 170 -93 177 -102 8 -10 11 -32 9 -52 -4 -27 9 -65 55 -170 33 -74 66 -144 73 -154 26 -35 42 -12 48 68 3 50 14 93 30 128 l25 53 2 -35 c2 -19 5 -98 9 -175 l6 -140 40 -3 40 -3 1 383 c0 213 6 410 11 443 l11 60 1 -55 c1 -30 12 -201 26 -380 14 -179 25 -353 25 -387 l0 -63 46 0 45 0 -5 43 c-3 23 -7 107 -10 187 l-5 145 25 -55 c17 -36 28 -80 31 -127 7 -91 17 -107 44 -72 36 45 138 284 132 308 -12 45 11 77 170 240 90 91 181 189 204 216 58 71 132 189 173 274 l35 73 -40 36 c-100 88 -317 152 -684 203 -56 8 -95 18 -98 26 -3 7 4 44 16 82 12 38 21 76 21 84 0 8 19 26 43 40 269 158 390 680 258 1112 -38 122 -104 235 -182 313 -96 94 -230 125 -340 79z m198 -148 c72 -45 150 -163 190 -289 57 -183 57 -467 0 -650 -65 -205 -195 -336 -312 -314 -160 30 -295 323 -295 639 0 417 217 736 417 614z m-130 -1603 c-10 -24 -56 -257 -67 -335 -17 -120 -40 -417 -41 -526 -1 -118 -11 -199 -21 -172 -4 9 -51 39 -105 65 -171 84 -416 217 -478 259 -120 81 -193 183 -214 298 -14 76 -3 94 99 152 77 44 213 91 600 207 247 73 234 70 227 52z m256 -46 c328 -52 489 -97 576 -160 l41 -30 -34 -68 c-113 -225 -420 -554 -609 -653 -49 -25 -85 -52 -96 -70 -17 -28 -18 -25 -36 239 -20 285 -25 610 -12 705 10 67 -1 65 170 37z" }
	    	])]),
	    //this gets run only at the beginning of the block
	    present_handle : function(stim) {
	   		this.stim = stim;
	    	$(".slidererr").hide();	
	    	$(".err").hide();	
	    	$(".evidence").hide();
	  		$("#radiotable").hide();
	  		$(".contbutton").hide();
	  		$(".sliderbutton").show();

	    	var sentences = {
		    	must: "\"The flower in the fog must be a "+ exp.flower_a+".\"",
		      	bare: "\"The flower in the fog is a "+ exp.flower_a+".\"",
		      	might: "\"The flower in the fog might be a "+ exp.flower_a+".\""
		      	},
		    sentence = sentences[exp.sentenceorder[2]]

		    $(".statement").html(sentence);

		    this.init_sliders();

		   	$(".sliderbutton").click(function() {
			   	if (exp.flower_sliderPost == null) {
		        	$(".slidererr").show();
		      	} else {
				    $(".sliderbutton").unbind("click"); 
				    $(".sliderbutton").hide();
				    $(".slidererr").hide();
				    $(".evidence").show();
				    $("#radiotable").show();
				    $(".contbutton").show();
				}
		      });


	    	$("#fl_evidence1").html(stim[0].evidence);
		   	var paper = new Raphael(document.getElementById("flower_evidence1"),250,250);
			var p = stim[0].path;
			var mark = paper.path(p);
			mark.attr("fill",stim[0].color);
			mark.transform(stim[0].transform);

			$("#fl_evidence2").html("She sees a flower through the fog:");
			flowers.draw("flower_evidence2", {"tar1" : true, "tar3" : true}, .75);

			$("#fl_evidence3").html(stim[1].evidence);
		   	var paper = new Raphael(document.getElementById("flower_evidence3"),250,250);
			var p = stim[1].path;
			var mark = paper.path(p);
			mark.attr("fill",stim[1].color);
			mark.transform(stim[1].transform);

			$("#fl_evidence4").html(stim[2].evidence);
		   	var paper = new Raphael(document.getElementById("flower_evidence4"),250,250);
			var p = stim[2].path;
			var mark = paper.path(p);
			mark.attr("fill",stim[2].color);
			mark.transform(stim[2].transform);	

	    },
	    
	    init_sliders : function() {
	      utils.make_slider("#flower_slider_bar", function(event, ui) {
	        exp.flower_sliderPost = ui.value;
	      });
	    }, 

	    button : function() {
	      if ($("input[name=flower_choice]:checked").val() == undefined) {
	        $(".err").show();
	      } else {
	        this.log_responses();
	        $(".evidence2").empty();
	        /* use _stream.apply(this); if and only if there is
	        "present" data. (and only *after* responses are logged) */
	        _stream.apply(this);
	      }
	    },
	    log_responses : function() {
	      exp.data_trials.push({
	        // "evidence_type" : this.stim.type,
	        "rating" : exp.flower_sliderPost,
	        "response" : $("input[name=flower_choice]:checked").val(),
	        "item" : this.name,
	        "freq" : exp.frequencies[2].freq,
	        "modal": exp.sentenceorder[2],
	        "choice1": this.stim[0].type,
	        "choice2": "full",
	        "choice3": this.stim[1].type,
	        "choice4": this.stim[2].type
	      });
	    }
	  });

  slides.fish_intro = slide({
	  	name : "fish_intro",

	  	present : ([
	  		_.shuffle([
	  		{"type":"fish_a_feature1","question":"How many "+exp.fishs_a+" have fangs?","answer":exp.frequencies[3].freq},
			{"type":"fish_a_feature2","question":"How many "+exp.fishs_a+" have whiskers?","answer":"100"},
			{"type":"fish_b_feature1","question":"How many "+exp.fishs_b+" have fangs?","answer":"25"},
			{"type":"fish_b_feature2","question":"How many "+exp.fishs_b+" have whiskers?","answer":"0"}])
			]),
	  	
	  	present_handle : function(stim) {
	      $(".qerr").hide();
	      this.stim = stim;
		    //properties sampled around specified mean:
			//decide which tar is deterministic and which is indirect
			var tars = _.shuffle(["tar1","tar2"]);
			//draw the pimwits: 100% tar1, 100% tar2
			//var pim_tar = _.shuffle([true,true,true,true,true,true,true,true]);
			var pim_tar = _.shuffle(exp.frequencies[3].tar_values);
			for (var i=0; i<pim_tar.length; i++) {
				fishes.draw("fish_a_"+i, {"tar1" : pim_tar[i], "tar2" : true}, scale);
			};
			//draw the daxes: 25% tar1, 0% tar2
			var dax_tar = _.shuffle([true,true,false,false,false,false,false,false]);
			for (var i=0; i<dax_tar.length; i++) {
				fishes.draw("fish_b_"+i, {"tar1" : dax_tar[i], "tar2" : false}, scale);
			};
			var q1text = stim[0].question;
			var q2text = stim[1].question;
			var q3text = stim[2].question;
			var q4text = stim[3].question;

			$("#fish_q1").html(q1text);
			$("#fish_q2").html(q2text);
			$("#fish_q3").html(q3text);
			$("#fish_q4").html(q4text);

	  	},

	  	button : function() {
	        var ok_to_go_on = true;
	  		if ($("#fish_q1_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}
			if ($("#fish_q2_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}	  		
			if ($("#fish_q3_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}	  			
			if ($("#fish_q4_a").val().length < 1) {
	  			ok_to_go_on = false;
	  		}	  			
	  		if (ok_to_go_on) {  		  		
	        	this.log_responses();
	        	_stream.apply(this);
	        } else {
	        	$(".qerr").show();
	        }
	      },

	    log_responses : function() {
	      exp.data_trials.push({
			"question1" : this.stim[0].type,
	        "question1_response" : $("#fish_q1_a").val(),
	        "question1_answer" : this.stim[0].answer,
	        "question2" : this.stim[1].type,
	        "question2_response" : $("#fish_q2_a").val(),
	        "question2_answer" : this.stim[1].answer,	   
	        "question3" : this.stim[2].type,
	        "question3_response" : $("#fish_q3_a").val(),
	        "question3_answer" : this.stim[2].answer,  
	        "question4" : this.stim[3].type,
	        "question4_response" : $("#fish_q4_a").val(),
	        "question4_answer" : this.stim[3].answer, 
	        "item" : this.name,
	        "freq" : exp.frequencies[1].freq
	      });
	    }
	  });

	slides.fish_slider = slide({
	    name : "fish_slider",
	    /* trial information for this block
	     (the variable 'stim' will change between each of these values,
	      and for each of these, present_handle will be run.) */
	    present : ([_.shuffle([
	    	{type: "indirect", evidence: "All he sees of the fish in the fog are its fangs:",color:"#FFF",path: "m 224.72087,128.95491 6.81853,-2.25254 c 0.57697,22.03278 -2.82062,45.16585 -7.8363,63.4702 3.19194,-21.68019 6.0638,-45.94478 1.01777,-61.21766 z"},
	    	{type: "direct", evidence: "All he sees of the fish in the fog are its whiskers:",color:"",path: "m 216.12695,132.08879 c -14.29361,23.85879 -34.75106,44.10429 -11.61675,89.90358 m 8.08122,-90.91373 c -30.52433,36.14586 -40.99373,68.74778 -24.74873,111.11677 m 22.72842,-114.14723 c -32.28674,23.34556 -51.60559,60.7522 -38.89087,107.07617"},
	    	{type: "report", evidence: "Somebody else looked through the fog and told Bob the fish was a "+exp.fish_a+":",color:"#000",transform:"t-840,-1475.000000s.08,-.07",path: "M919 3207 c-67 -28 -102 -52 -150 -104 -107 -115 -170 -254 -205 -446 -17 -98 -19 -310 -3 -404 54 -328 232 -569 436 -590 58 -6 58 -5 28 -93 -14 -40 17 -28 -410 -155 -383 -113 -497 -159 -577 -236 -32 -31 -38 -42 -38 -79 0 -57 24 -148 55 -202 65 -116 154 -187 396 -314 90 -47 170 -93 177 -102 8 -10 11 -32 9 -52 -4 -27 9 -65 55 -170 33 -74 66 -144 73 -154 26 -35 42 -12 48 68 3 50 14 93 30 128 l25 53 2 -35 c2 -19 5 -98 9 -175 l6 -140 40 -3 40 -3 1 383 c0 213 6 410 11 443 l11 60 1 -55 c1 -30 12 -201 26 -380 14 -179 25 -353 25 -387 l0 -63 46 0 45 0 -5 43 c-3 23 -7 107 -10 187 l-5 145 25 -55 c17 -36 28 -80 31 -127 7 -91 17 -107 44 -72 36 45 138 284 132 308 -12 45 11 77 170 240 90 91 181 189 204 216 58 71 132 189 173 274 l35 73 -40 36 c-100 88 -317 152 -684 203 -56 8 -95 18 -98 26 -3 7 4 44 16 82 12 38 21 76 21 84 0 8 19 26 43 40 269 158 390 680 258 1112 -38 122 -104 235 -182 313 -96 94 -230 125 -340 79z m198 -148 c72 -45 150 -163 190 -289 57 -183 57 -467 0 -650 -65 -205 -195 -336 -312 -314 -160 30 -295 323 -295 639 0 417 217 736 417 614z m-130 -1603 c-10 -24 -56 -257 -67 -335 -17 -120 -40 -417 -41 -526 -1 -118 -11 -199 -21 -172 -4 9 -51 39 -105 65 -171 84 -416 217 -478 259 -120 81 -193 183 -214 298 -14 76 -3 94 99 152 77 44 213 91 600 207 247 73 234 70 227 52z m256 -46 c328 -52 489 -97 576 -160 l41 -30 -34 -68 c-113 -225 -420 -554 -609 -653 -49 -25 -85 -52 -96 -70 -17 -28 -18 -25 -36 239 -20 285 -25 610 -12 705 10 67 -1 65 170 37z" }
	    	//{evidence: "report"}
	    	])]),
	    //this gets run only at the beginning of the block
	    present_handle : function(stim) {
	   		this.stim = stim;
	    	$(".slidererr").hide();	
	    	$(".err").hide();	
	    	$(".evidence").hide();
	  		$("#radiotable").hide();
	  		$(".contbutton").hide();
	  		$(".sliderbutton").show();

	    	var sentences = {
		    	must: "\"The fish in the fog must be a "+ exp.fish_a+".\"",
		      	bare: "\"The fish in the fog is a "+ exp.fish_a+".\"",
		      	might: "\"The fish in the fog might be a "+ exp.fish_a+".\""
		      	}

		    this.sentence = _.sample(exp.sentenceorder);

		    $(".statement").html(sentences[this.sentence]);

		    this.init_sliders();

		   	$(".sliderbutton").click(function() {
			   	if (exp.fish_sliderPost == null) {
		        	$(".slidererr").show();
		      	} else {
				    $(".sliderbutton").unbind("click"); 
				    $(".sliderbutton").hide();
				    $(".slidererr").hide();
				    $(".evidence").show();
				    $("#radiotable").show();
				    $(".contbutton").show();
				}
		      });


			$("#fi_evidence1").html("He sees a fish through the fog:");
			fishes.draw("fish_evidence1", {"tar1" : true, "tar3" : true}, .75);

	    	$("#fi_evidence2").html(stim[0].evidence);
		   	var paper = new Raphael(document.getElementById("fish_evidence2"),250,250);
			var p = stim[0].path;
			var mark = paper.path(p);
			mark.attr("fill",stim[0].color);
			mark.transform(stim[0].transform);

			$("#fi_evidence3").html(stim[1].evidence);
		   	var paper = new Raphael(document.getElementById("fish_evidence3"),250,250);
			var p = stim[1].path;
			var mark = paper.path(p);
			mark.attr("fill",stim[1].color);
			mark.transform(stim[1].transform);

			$("#fi_evidence4").html(stim[2].evidence);
		   	var paper = new Raphael(document.getElementById("fish_evidence4"),250,250);
			var p = stim[2].path;
			var mark = paper.path(p);
			mark.attr("fill",stim[2].color);
			mark.transform(stim[2].transform);	

	    },
	    
	    init_sliders : function() {
	      utils.make_slider("#fish_slider_bar", function(event, ui) {
	        exp.fish_sliderPost = ui.value;
	      });
	    }, 

	    button : function() {
	      if ($("input[name=fish_choice]:checked").val() == undefined) {
	        $(".err").show();
	      } else {
	        this.log_responses();
	        $(".evidence2").empty();
	        /* use _stream.apply(this); if and only if there is
	        "present" data. (and only *after* responses are logged) */
	        _stream.apply(this);
	      }
	    },
	    log_responses : function() {
	      exp.data_trials.push({
	        // "evidence_type" : this.stim.type,
	        "rating" : exp.fish_sliderPost,
	        "response" : $("input[name=fish_choice]:checked").val(),
	        "item" : this.name,
	        "freq" : exp.frequencies[3].freq,
	        "modal": this.sentence,
	        "choice1": "full",
	        "choice2": this.stim[0].type,
	        "choice3": this.stim[1].type,
	        "choice4": this.stim[2].type
	      });
	    }
	  });


	slides.subj_info =  slide({
    	name : "subj_info",
		    submit : function(e){
		      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
		      exp.subj_data = {
		        language : $("#language").val(),
		        enjoyment : $("#enjoyment").val(),
		        asses : $('input[name="assess"]:checked').val(),
		        age : $("#age").val(),
		        gender : $("#gender").val(),
		        education : $("#education").val(),
		        comments : $("#comments").val(),
		      };
		      exp.go(); //use exp.go() if and only if there is no "present" data.
		    }
		  });

		slides.thanks = slide({
		    name : "thanks",
		    start : function() {
		      exp.data= {
		          "trials" : exp.data_trials,
		          "catch_trials" : exp.catch_trials,
		          "system" : exp.system,
		          //"condition" : exp.condition,
		          "subject_information" : exp.subj_data,
		          "time_in_minutes" : (Date.now() - exp.startT)/60000
		      };
		      setTimeout(function() {turk.submit(exp.data);}, 1000);
		    }
		});

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  exp.critters = _.shuffle(["bird","bug","flower","fish"])
  exp.sentenceorder = _.shuffle(["must","bare","might"]); 
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };

    exp.frequencies = _.shuffle([
    	{"freq" : "25", "tar_values" : [true,true,false,false,false,false,false,false]},
    	{"freq" : "50", "tar_values" : [true,true,true,true,false,false,false,false]},
    	{"freq" : "75", "tar_values" : [true,true,true,true,true,true,false,false]},
    	{"freq" : "100", "tar_values" : [true,true,true,true,true,true,true,true]}
    ])

	exp.species = _.shuffle([
	  "wug", "dax", "fep", "tig", "speff", "zib", "gub", "wost", "wock", "thog",
	  "snim", "ript", "quog", "polt", "poch", "murp", "mulb", "mork", "mopt", "monx",
	  "mone", "moge", "lide", "hoil", "hoff", "hisp", "hinx", "hife", "hett", "fraw",
	  "fing", "fick", "blim", "zop", "blick"
	]);

	function plural(word) {
	  if (/dax|poch|monx|hinx/.test(word)) {
	    return(word + "es");
	  } else if (/fish|thorns|fangs|whiskers|antennae|wings|spots/.test(word)) {
	    return word;
	  } else {
	    return(word + "s");
	  }
	};

	exp.bird_a = exp.species[0];
	exp.bird_b = exp.species[1];
	exp.bug_a = exp.species[2];
	exp.bug_b = exp.species[3];
	exp.flower_a = exp.species[4];
	exp.flower_b = exp.species[5];
	exp.fish_a = exp.species[6];
	exp.fish_b = exp.species[7];	
	exp.birds_a = plural(exp.bird_a);
	exp.birds_b = plural(exp.bird_b);
	exp.bugs_a = plural(exp.bug_a);
	exp.bugs_b = plural(exp.bug_b);
	exp.flowers_a = plural(exp.flower_a);
	exp.flowers_b = plural(exp.flower_b);
	exp.fishs_a = plural(exp.fish_a);
	exp.fishs_b = plural(exp.fish_b);

	 $(".bird_a").html(exp.bird_a);
	 $(".bird_b").html(exp.bird_b);  
	 $(".birds_a").html(plural(exp.bird_a));
	 $(".birds_b").html(plural(exp.bird_b));  
	 $(".bug_a").html(exp.bug_a);
	 $(".bug_b").html(exp.bug_b);  
	 $(".bugs_a").html(plural(exp.bug_a));
	 $(".bugs_b").html(plural(exp.bug_b));  
	 $(".flower_a").html(exp.flower_a);
	 $(".flower_b").html(exp.flower_b);  
	 $(".flowers_a").html(plural(exp.flower_a));
	 $(".flowers_b").html(plural(exp.flower_b));  
	 $(".fish_a").html(exp.fish_a);
	 $(".fish_b").html(exp.fish_b); 
	 $(".fishs_a").html(plural(exp.fish_a));
	 $(".fishs_b").html(plural(exp.fish_b));   
  //blocks of the experiment:
  exp.structure=["i0", "instructions",exp.critters[0]+'_intro',exp.critters[0]+'_slider',exp.critters[1]+'_intro',exp.critters[1]+'_slider',exp.critters[2]+'_intro',exp.critters[2]+'_slider',exp.critters[3]+'_intro',exp.critters[3]+'_slider','subj_info', 'thanks'];
  
	// exp.structure=["fish_slider"];
  

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}