// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function caps(a) {return a.substring(0,1).toUpperCase() + a.substring(1,a.length);}

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

  slides.cause_effect_prior = slide({
    name : "cause_effect_prior",
    present : exp.all_stims,
    start : function() {
	$(".err").hide();
      $(".slidererr").hide();	
    },
      present_handle : function(stim) {
    	this.trial_start = Date.now();
	    $(".sliderbutton").show();    	
	//$("#eventdescription").val("");	
      this.init_sliders();
      exp.sliderPost = {};
      $("#number_guess").html("?");
	  this.stim = stim;
	  console.log(this.stim);
	var contextsentence = '<p>'+stim.context + '</p><p>' + stim.evidence +'</p>';
	console.log(stim.sentenceorder);	


	$("#contextsentence").html(contextsentence);
	
	var radiotablehtml = "";

      for (var i=1; i<5; i++) {
		radiotablehtml = radiotablehtml + '<tr><td align="left"><input type="radio" name="radioresponse" class="radio'+i+'" value="'+stim.sentenceorder[i-1]+'"/><label for="radio'+i+'">'+stim[stim.sentenceorder[i-1]]+'</label></td></tr>';	
      }				
      
	  $("#radiotable").html(radiotablehtml);
        $(".contbutton").click(function() {
	  var ok_to_go_on = true;
//	  console.log($("#eventdescription").val());
		console.log($("input[name=radioresponse]:checked").val());
	  if ($("input[name=radioresponse]:checked").val() == undefined) {
	  	ok_to_go_on = false;
	  }
      if (ok_to_go_on) {
	$(".contbutton").unbind("click");      	
	console.log(stim.evidencetype);
	stim.form = $("input[name=radioresponse]:checked").val();         	
        exp.data_trials.push({
          "evidence_type" : stim.evidencetype,
          "evidence" : stim.evidence,          
          "slide_number_in_experiment" : exp.phase,
          "item": stim.item,
          "rt" : Date.now() - _s.trial_start,
	      "response" : stim.form
        });
          $(".err").hide();
          _stream.apply(_s); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
	});
//        $(".err").hide();
//        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
//      } else {
//        $(".err").show();
//      }
//    },
	  
      },

      
//      contbutton : function() {
//	  var ok_to_go_on = true;
//	  console.log($("#eventdescription").val());
//	  if ($("#eventdescription").val().length < 5) {
//	  	ok_to_go_on = false;
//      }
//      if (ok_to_go_on) {
//	this.stim.evidenceexplanation = $("#eventdescription").val();         	
//        this.log_responses();
    init_sliders : function() {
      var slider_ids = ["mainslider"];
      for (var i=0; i<slider_ids.length; i++) {
        var slider_id = slider_ids[i];
        utils.make_slider("#slider_" + slider_id,
          function(which_slider_id_is_this) {
            return function(event, ui) {
              exp.sliderPost[which_slider_id_is_this] = ui.value;
            };
          }(slider_id) //wraps up index variable slider_id
        )
      }
    },

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
          "condition" : exp.condition,
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

  var items = _.shuffle([
    {
	  "context": "Imagine that you are sitting in a room.",
	  "bare" : "It's raining.",
	  "must" : "It must be raining.",
	  "might" : "It might be raining.",	  
	  "probably" : "It's probably raining.",	  
	  "think" : "I think it's raining.",
	  "know" : "I know it's raining.",	  	  
	  "item" : "rain",
	"complement" : "it's raining",
	"evidence_question" : "knows about the weather",
	"evidence1" : "You look out the window and see raindrops falling from the sky.",
	"evidence2" : "You hear the sound of water dripping on the roof.",
	"evidence3" : "You see a person come in from outside with wet hair and wet clothes.",	
	"evidence4" : "You check the weather report on the Internet, which says it is raining.",
	"evidence5" : "Earlier today, you had seen dark clouds in the sky."
    },
//    {
//	  "context": "You are inside your windowless office.",
//	  "bare" : "It's sunny out.",
//	  "must" : "It must be sunny out.",
//	  "might" : "It might be sunny out.",	  
//	  "probably" : "It's probably sunny out.",	  
//	  "think" : "I think it's sunny out.",
//	  "know" : "I know it's sunny out.",	  	  
//	"item" : "sun",
//	  "complement" : "it's sunny out",
//	"evidence_question" : "knows about the weather"	
//    },
//    {
//	  "context": "You are inside your windowless office.",
//	  "bare" : "The train is late.",
//	  "must" : "The train must be late.",
//	  "might" : "The train might be late.",	  
//	  "probably" : "The train is probably late.",	  
//	  "think" : "I think the train is late.",
//	  "know" : "I know the train is late.",	  	  
//	"item" : "train",
//	  "complement" : "the train is late",
//	"evidence_question" : "knows about the train"	
//	
//    },
    {
	  "context": "Imagine that you are at home.",
	  "bare" : "Dinner is ready.",
	  "must" : "Dinner must be ready.",
	  "might" : "Dinner might be ready.",	  
	  "probably" : "Dinner is probably ready.",	  
	  "think" : "I think dinner is ready.",
	  "know" : "I know dinner is ready.",	  	  
	"item" : "dinner",
	  "complement" : "dinner is ready",
	"evidence_question" : "knows about dinner",
	"evidence1" : "You just prepared dinner and set it out on the table.",
	"evidence2" : "Your spouse tells you that dinner is ready.",
	"evidence3" : "Dinner is usually ready at around 6pm. You look at the clock and it is 6pm.",	
	"evidence4" : "You smell food coming from the dining room.",
	"evidence5" : "You're hungry."	
    },
    {
	  "context": "Imagine that there is a cup of coffee on the table in front of you.",
	  "bare" : "The coffee is cold.",
	  "must" : "The coffee must be cold.",
	  "might" : "The coffee might be cold.",	  
	  "probably" : "The coffee is probably cold.",	  
	  "think" : "I think the coffee is cold.",
	  "know" : "I know the coffee is cold.",	  	  
	"item" : "coffee",
	  "complement" : "the coffee is cold",
	"evidence_question" : "knows about the coffee",
	"evidence1" : "You take a sip of the coffee and feel that it is cold.",
	"evidence2" : "You touch the coffee cup and feel that it is cold.",
	"evidence3" : "You know that the coffee has been on the table for an hour.",
	"evidence4" : "You see that there isn't any steam coming from the coffee.",
	"evidence5" : "You see that the cup isn't insulated."
		
    },
    {
	  "context": "Imagine that you are sitting in your living room in the evening.",
	  "bare" : "The neighbor's dog is barking.",
	  "must" : "The neighbor's dog must be barking.",
	  "might" : "The neighbor's dog might be barking.",	  
	  "probably" : "The neighbor's dog is probably barking.",	  
	  "think" : "I think the neighbor's dog is barking.",
	  "know" : "I know the neighbor's dog is barking.",	  	  
	"item" : "dog",
	  "complement" : "the neighbor's dog is barking",
	"evidence_question" : "knows about the dog",
	"evidence1" : "You look outside and see Fluffy, the neighbor's dog, standing on the porch and barking.",
	"evidence2" : "You hear the sound of a dog barking.",
	"evidence3" : "You are listening to music with your earphones. You look out the window and see that the mailman has just arrived at your neighbor's doorstep, when all of a sudden he jumps back.",			
	"evidence4" : "You are listening to music with your earphones. You know that your neighbor's dog often barks in the evening.",
	"evidence5" : "Your neighbor just got a new dog."
    }      
  ]);

  var names = _.shuffle([
    {
      "name":"James",
      "gender":"M"
    },
    {
      "name":"John",
      "gender":"M"
    },
    {
      "name":"Robert",
      "gender":"M"
    },
    {
      "name":"Michael",
      "gender":"M"
    },
    {
      "name":"William",
      "gender":"M"
    },
    {
      "name":"David",
      "gender":"M"
    },
    {
      "name":"Richard",
      "gender":"M"
    },
    {
      "name":"Joseph",
      "gender":"M"
    },
    {
      "name":"Charles",
      "gender":"M"
    },
    {
      "name":"Thomas",
      "gender":"M"
    },
    {
      "name":"Christopher",
      "gender":"M"
    },
    {
      "name":"Daniel",
      "gender":"M"
    },
    {
      "name":"Matthew",
      "gender":"M"
    },
    {
      "name":"Donald",
      "gender":"M"
    },
    {
      "name":"Anthony",
      "gender":"M"
    },
    {
      "name":"Paul",
      "gender":"M"
    },
    {
      "name":"Mark",
      "gender":"M"
    },
    {
      "name":"George",
      "gender":"M"
    },
    {
      "name":"Steven",
      "gender":"M"
    },
    {
      "name":"Kenneth",
      "gender":"M"
    },
    {
      "name":"Andrew",
      "gender":"M"
    },
    {
      "name":"Edward",
      "gender":"M"
    },
    {
      "name":"Joshua",
      "gender":"M"
    },
    {
      "name":"Brian",
      "gender":"M"
    },
    {
      "name":"Kevin",
      "gender":"M"
    },
    {
      "name":"Ronald",
      "gender":"M"
    },
    {
      "name":"Timothy",
      "gender":"M"
    },
    {
      "name":"Jason",
      "gender":"M"
    },
    {
      "name":"Jeffrey",
      "gender":"M"
    },
    {
      "name":"Gary",
      "gender":"M"
    },
    {
      "name":"Ryan",
      "gender":"M"
    },
    {
      "name":"Nicholas",
      "gender":"M"
    },
    {
      "name":"Eric",
      "gender":"M"
    },
    {
      "name":"Jacob",
      "gender":"M"
    },
    {
      "name":"Jonathan",
      "gender":"M"
    },
    {
      "name":"Larry",
      "gender":"M"
    },
    {
      "name":"Frank",
      "gender":"M"
    },
    {
      "name":"Scott",
      "gender":"M"
    },
    {
      "name":"Justin",
      "gender":"M"
    },
    {
      "name":"Brandon",
      "gender":"M"
    },
    {
      "name":"Raymond",
      "gender":"M"
    },
    {
      "name":"Gregory",
      "gender":"M"
    },
    {
      "name":"Samuel",
      "gender":"M"
    },
    {
      "name":"Benjamin",
      "gender":"M"
    },
    {
      "name":"Patrick",
      "gender":"M"
    },
    {
      "name":"Jack",
      "gender":"M"
    },
    {
      "name":"Dennis",
      "gender":"M"
    },
    {
      "name":"Jerry",
      "gender":"M"
    },
    {
      "name":"Alexander",
      "gender":"M"
    },
    {
      "name":"Tyler",
      "gender":"M"
    },
    {
      "name":"Mary",
      "gender":"F"
    },
    {
      "name":"Jennifer",
      "gender":"F"
    },
    {
      "name":"Elizabeth",
      "gender":"F"
    },
    {
      "name":"Linda",
      "gender":"F"
    },
    {
      "name":"Emily",
      "gender":"F"
    },
    {
      "name":"Susan",
      "gender":"F"
    },
    {
      "name":"Margaret",
      "gender":"F"
    },
    {
      "name":"Jessica",
      "gender":"F"
    },
    {
      "name":"Dorothy",
      "gender":"F"
    },
    {
      "name":"Sarah",
      "gender":"F"
    },
    {
      "name":"Karen",
      "gender":"F"
    },
    {
      "name":"Nancy",
      "gender":"F"
    },
    {
      "name":"Betty",
      "gender":"F"
    },
    {
      "name":"Lisa",
      "gender":"F"
    },
    {
      "name":"Sandra",
      "gender":"F"
    },
    {
      "name":"Helen",
      "gender":"F"
    },
    {
      "name":"Ashley",
      "gender":"F"
    },
    {
      "name":"Donna",
      "gender":"F"
    },
    {
      "name":"Kimberly",
      "gender":"F"
    },
    {
      "name":"Carol",
      "gender":"F"
    },
    {
      "name":"Michelle",
      "gender":"F"
    },
    {
      "name":"Emily",
      "gender":"F"
    },
    {
      "name":"Amanda",
      "gender":"F"
    },
    {
      "name":"Melissa",
      "gender":"F"
    },
    {
      "name":"Deborah",
      "gender":"F"
    },
    {
      "name":"Laura",
      "gender":"F"
    },
    {
      "name":"Stephanie",
      "gender":"F"
    },
    {
      "name":"Rebecca",
      "gender":"F"
    },
    {
      "name":"Sharon",
      "gender":"F"
    },
    {
      "name":"Cynthia",
      "gender":"F"
    },
    {
      "name":"Kathleen",
      "gender":"F"
    },
    {
      "name":"Ruth",
      "gender":"F"
    },
    {
      "name":"Anna",
      "gender":"F"
    },
    {
      "name":"Shirley",
      "gender":"F"
    },
    {
      "name":"Amy",
      "gender":"F"
    },
    {
      "name":"Angela",
      "gender":"F"
    },
    {
      "name":"Virginia",
      "gender":"F"
    },
    {
      "name":"Brenda",
      "gender":"F"
    },
    {
      "name":"Catherine",
      "gender":"F"
    },
    {
      "name":"Nicole",
      "gender":"F"
    },
    {
      "name":"Christina",
      "gender":"F"
    },
    {
      "name":"Janet",
      "gender":"F"
    },
    {
      "name":"Samantha",
      "gender":"F"
    },
    {
      "name":"Carolyn",
      "gender":"F"
    },
    {
      "name":"Rachel",
      "gender":"F"
    },
    {
      "name":"Heather",
      "gender":"F"
    },
    {
      "name":"Diane",
      "gender":"F"
    },
    {
      "name":"Joyce",
      "gender":"F"
    },
    {
      "name":"Julie",
      "gender":"F"
    },
    {
      "name":"Emma",
      "gender":"F"
    }
  ]);

//  , "think","know"]);    
//  for (var k = 1; k<5; k++)
//  {
//	console.log(item_type);
//  	item_type = item_type.concat(_.shuffle(["evidence1", "evidence2", "evidence3", "evidence4","evidence5"]).slice(0,3));
//  }
  
	var sentenceorder = _.shuffle(["must","bare","probably","might"]);    

  function makeStim(i) {
	var item_type = _.shuffle(["evidence1", "evidence2", "evidence3", "evidence4","evidence5"]).slice(0,3);  	
    //get item
    var item = items[i];
    //get name
    var name_data = names[i];
    var name = name_data.name;
    var gender = name_data.gender;
   
    //get pronouns
    var nom = gender == "M" ? "he" : "she";
    var acc = gender == "M" ? "him" : "her";
    var gen = gender == "M" ? "his" : "her";
    //get cause and effect elements
    var item_id = item.item;
      var complement = item.complement;
      var evidence_question = item.evidence_question;
      var threeitems = [];
   
   for (var k = 0; k < 3; k++)
   {
       var evidence = item[item_type[k]];   
      threeitems.push({
	  "context": item.context,
      "evidence": evidence,
      "evidencetype": item_type[k],
      "item": item_id,
      "bare": item.bare,
      "must": item.must,
      "might": item.might,
      "probably": item.probably,
      "sentenceorder": sentenceorder
      })
   }
   return threeitems;
  }
  
  all_stims = [];
  for (var i=0; i<items.length; i++) {
   // exp.all_stims.push(makeStim(i));
  	all_stims = all_stims.concat(makeStim(i));
  }
  exp.all_stims = _.shuffle(all_stims);     

  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = {}; //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "instructions", "cause_effect_prior", 'subj_info', 'thanks'];
  
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined
  $(".nQs").html(exp.nQs);

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
