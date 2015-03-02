
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
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.bird_intro = slide({
	  	name : "bird_intro",
	  	start : function() {
	  		var scale = 0.5;
		    //properties sampled around specified mean:
			var birds = new Ecosystem.Genus("bird", {
				"var":0.6 //overall variance (overwritten by any specified variances)
			});
			tar_a = "tar1"
			//draw the pimwits: 75% tar1, 100% tar2
			var pim_tar = _.shuffle([true,true,true,true,true,true,false,false]);
			for (var i=0; i<pim_tar.length; i++) {
				birds.draw("bird_a_"+i, {"tar1" : pim_tar[i], "tar2" : true}, scale);
			};
			//draw the daxes: 25% tar1, 0% tar2
			var dax_tar = _.shuffle([true,true,false,false,false,false,false,false]);
			for (var i=0; i<dax_tar.length; i++) {
				birds.draw("bird_b_"+i, {"tar1" : dax_tar[i], "tar2" : false}, scale);
			}
	  	},
	  	button : function() {
	      exp.go(); //use exp.go() if and only if there is no "present" data.
	    }
	  });

  slides.bird_slider = slide({
	    name : "bird_slider",
	    /* trial information for this block
	     (the variable 'stim' will change between each of these values,
	      and for each of these, present_handle will be run.) */
	    present : _.shuffle([
	    	{type: "indirect", evidence: "you see a tail:",path: "m 132.22211,134.52966 c 191.10251,80.71415 113.01869,78.03341 2.84222,9.61677 63.9837,23.64523 215.07401,187.78265 -1.1188,7.99662 123.08528,103.16261 103.98773,125.24613 -5.52127,2.16374 51.46787,47.51483 104.03178,177.03548 -9.92371,-3.66861 82.41766,117.57582 24.7014,98.14746 -11.75615,-7.14977"},
	    	{type: "direct", evidence: "you see a crest:",path: "M 68.998189,51.444834 C 29.266918,8.8463783 54.774859,-23.966711 79.178014,49.452194 55.45242,-32.318599 86.17406,3.34127 87.47028,48.404097 c -6.752454,-60.351739 18.46215,-69.484532 8.33515,2.21967 11.22067,-81.250238 27.66133,-41.2482689 8.12437,4.603553 21.46103,-73.743476 42.28583,-75.437662 4.9047,6.30698 27.0571,-72.938091 69.57097,-85.29053 -0.2684,4.974874 97.61204,-111.124987 45.76332,-19.663736 -1.94517,4.833631 135.25621,-91.227061 55.46185,-14.557556 -0.46447,1.037058 36.0982,-22.141872 172.89205,-35.881013 -2.41942,2.363961 159.97243,-29.73347 94.71493,-9.896787 20.5901,1.992641 92.68096,-11.725204 80.48663,-3.936569 16.60419,3.892767 72.51341,-9.249468 52.48157,10.901133 19.31953,7.7745 -6.13279,-3.190188 -10.16888,-8.899088 -56.17929,-13.671245 1.40105,-1.235818 3.15887,0.05674 4.68998,-13.053739 C 94.41531,40.704404 80.375709,51.076633 68.998189,51.444834 z"},
	    	{type: "report", evidence: "your frind tells you he saw a pimwit.",path: "" }
	    	//{evidence: "report"}
	    	]),
	    //this gets run only at the beginning of the block
	    present_handle : function(stim) {
	      $(".err").hide();
	      this.stim = stim; //I like to store this information in the slide so I can record it later.

	      $(".evidence1").html("Imagine "+stim.evidence);
	      var paper = new Raphael(document.getElementById("evidence2"),250,250);
	      var p = stim.path;
	      var mark = paper.path(p);
	      this.init_sliders();
	      exp.sliderPost = null; //erase current slider value
	    },
	    button : function() {
	      if (exp.sliderPost == null) {
	        $(".err").show();
	      } else {
	        this.log_responses();
	        $(".evidence2").empty();
	        /* use _stream.apply(this); if and only if there is
	        "present" data. (and only *after* responses are logged) */
	        _stream.apply(this);
	      }
	    },
	    init_sliders : function() {
	      utils.make_slider("#single_slider", function(event, ui) {
	        exp.sliderPost = ui.value;
	      });
	    },
	    log_responses : function() {
	      exp.data_trials.push({
	        "evidence_type" : this.stim.type,
	        "response" : exp.sliderPost
	      });
	    }
	  });

  slides.bug_intro = slide({
	  	name : "bug_intro",
	  	start : function() {
	  		var scale = 0.5;
		    //properties sampled around specified mean:
			var bugs = new Ecosystem.Genus("bug", {
				"var":0.6 //overall variance (overwritten by any specified variances)
			});
			//decide which tar is deterministic and which is indirect
			var tars = _.shuffle(["tar1","tar2"]);
			//draw the pimwits: 75% tar1, 100% tar2
			var pim_tar = _.shuffle([true,true,true,true,true,true,false,false]);
			for (var i=0; i<pim_tar.length; i++) {
				bugs.draw("bug_a_"+i, {"tar1" : pim_tar[i], "tar2" : true}, scale);
			};
			//draw the daxes: 25% tar1, 0% tar2
			var dax_tar = _.shuffle([true,true,false,false,false,false,false,false]);
			for (var i=0; i<dax_tar.length; i++) {
				bugs.draw("bug_b_"+i, {"tar1" : dax_tar[i], "tar2" : false}, scale);
			}
	  	},
	  	button : function() {
	      exp.go(); //use exp.go() if and only if there is no "present" data.
	    }
	  });

  slides.bug_slider = slide({
	    name : "bug_slider",
	    /* trial information for this block
	     (the variable 'stim' will change between each of these values,
	      and for each of these, present_handle will be run.) */
	    present : [
	    	{evidence: "antennae"},
	    	{evidence: "wings"},
	    	{evidence: "full bug"},
	    	{evidence: "report"}],
	    //this gets run only at the beginning of the block
	    present_handle : function(stim) {
	      $(".err").hide();
	      this.stim = stim; //I like to store this information in the slide so I can record it later.
	      $(".evidence").html("Here you see a "+stim.evidence);
	      this.init_sliders();
	      exp.sliderPost = null; //erase current slider value
	    },
	    button : function() {
	      if (exp.sliderPost == null) {
	        $(".err").show();
	      } else {
	        this.log_responses();

	        /* use _stream.apply(this); if and only if there is
	        "present" data. (and only *after* responses are logged) */
	        _stream.apply(this);
	      }
	    },
	    init_sliders : function() {
	      utils.make_slider("#single_slider", function(event, ui) {
	        exp.sliderPost = ui.value;
	      });
	    },
	    log_responses : function() {
	      exp.data_trials.push({
	        "trial_type" : "one_slider",
	        "response" : exp.sliderPost
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
  exp.critters = _.shuffle(["bird","bird"])
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "instructions",exp.critters[0]+'_intro',exp.critters[0]+'_slider','subj_info', 'thanks'];
  
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