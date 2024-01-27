$(document).ready(function() {
	// Declare variables
	var counter = localStorage.getItem("tm-counter");
	var prestigeLevel = localStorage.getItem("prestiveLevel");
	var start = 0;
	var clicks = 0;
	var frequency = 0;

	// Clickspark
 	clickSpark.setParticleCount(5);
  clickSpark.setParticleImagePath('img/misc/clickspark-square.png');
  clickSpark.setParticleRotationSpeed(10);
  clickSpark.setAnimationType('falloff');
	clickSpark.setParticleSize(10);
	clickSpark.setParticleSpeed(10);
	clickSpark.setParticleDuration(100);

	// Fade in wrapper
	$('.container').hide();
	$('.container').fadeIn(1000);

	// Display current count
	if (counter === null) {
		$('.counter').html("0");
		localStorage.setItem("tm-counter", (parseInt("0")));
		location.reload();
	} else {
		$('.counter').html(fnum(counter));
	}

	// Get current prestige level
	if (prestigeLevel === null) {
		prestigeLevel = 0;
	} else {
		prestigeLevel = prestigeLevel;
	}

	// Touch start
	$(document).on('touchstart', function(e) {
		// Check if user click on any of these buttons
		if($(e.target).closest("#trophy-btn").length > 0 || $(e.target).closest("#settings-btn a").length > 0 || $(e.target).closest("#prestige-btn a").length > 0) {
			return true;
		}
		
		/*
		// Write click count to tag
		if (counter === null) {
			$('.counter').html("0");
		} else {
			$('.counter').html(fnum(parseInt((counter)) +1));
			localStorage.setItem("tm-counter", (parseInt(++counter)));
		}
		*/

		// Ensure counter is initialized as a number
    if (counter === null || isNaN(counter)) {
        counter = 0;
    }

    console.log("Before Click: counter =", counter);

    // Calculate clicks based on prestige level
    var clicksToAdd = 1 + (5 * prestigeLevel);

    // Update click count (convert to number explicitly)
    counter = Number(counter) + clicksToAdd;

    console.log("After Click: counter =", counter);

    $('.counter').html(fnum(counter));
    localStorage.setItem("tm-counter", counter);



		// Shake animation
		$('#count-progress').addClass('shake');

		setTimeout(function(){
			$('#count-progress').removeClass('shake');
		},300);

		// Check clicks per second
		if (!start) {
			start = new Date();
		}
		frequency = ++clicks / (new Date() - start) * 1000;

		if (!frequency.toString().includes("Infinity")) {
			$('.tps').html(Math.round(frequency * 100) / 100);
		}
	});

	// Touch end
	$(document).on('touchend', function(e) {
		// Check if user click on any of these buttons
		if($(e.target).closest("#trophy-btn").length > 0 || $(e.target).closest("#settings-btn a").length > 0 || $(e.target).closest("#prestige-btn a").length > 0) {
			return true;
		}

		// Clickspark
		clickSpark.fireParticles($('#spark'));

		// Play pop sound
		var popSound = new Audio("audio/pop.mp3");
		popSound.play();
	});

	// Trophy button click
	$('#trophy-btn').click(function() {
	  //window.location = "trophies.html";
	});

	// Display level
	window.setInterval(function() {
		var levels = [0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000, 66000, 78000, 91000, 105000, 120000, 136000, 153000, 171000, 190000, 210000, 231000, 253000, 276000, 300000, 325000, 351000, 378000, 406000, 463000];
		var level = 0;
		var xp = localStorage.getItem("tm-counter");
		var maxXP;
		var percentage;
		var XPmin;
		var XPmax;

	  if (xp === null) {
	  	$("#level").text("1");
	  	$("#progress span").width("0%");
		} else {
			levels.forEach((v, i) => {
			  if (xp >= v) {
			    level = i + 1;
			    XPmax = levels[i + 1];
			    XPmin = levels[i];
			    percentage = 100 * (xp - XPmin) / (XPmax - XPmin);
			    maxXP = levels[i + 1];
			  }
			});

			if (xp >= 463000) {
				$("#display-level").text("MAX LVL");
				//$("#level").text("30");
				$("#progress-bar-fill").width("100%");
			} else {
				$("#level").text(level);
				$("#progress-bar-fill").width(percentage + "%");
			}
		}
	}, 10);

	//Disable right click
	document.addEventListener("contextmenu", function (e) {
		e.preventDefault();
	}, false);

	// Format numbers
	function fnum(x) {
	  if (isNaN(x)) return x;

	  if (x < 99999) {
	    return x;
	  }

	  if (x < 1000000) {
	    return Math.round(x / 1000) + "K";
	  }
	  if (x < 10000000) {
	    return (x / 1000000).toFixed(2) + "M";
	  }

	  if (x < 1000000000) {
	    return Math.round((x / 1000000)) + "M";
	  }

	  if (x < 1000000000000) {
	    return Math.round((x / 1000000000)) + "B";
	  }

	  return "1T+";
	}
});

/*
Level   XP      Difference
1       0       -
2       1000    1000
3       3000    2000
4       6000    3000
5       10000   4000
6				15000 	5000
7				21000		6000
8				28000		7000
9				36000		8000
10			45000		9000
11			55000		10000
12			66000		11000
13			78000		12000
14			91000		13000
15			105000	14000
16			120000	15000
17			136000	16000
18			153000	17000
19			171000	18000
20			190000	19000
21			210000	20000
22			231000	21000
23			253000	22000
24			276000	23000
25			300000	24000
26			325000	25000
27			351000	26000
28			378000	27000
29			406000	28000
30			463000	29000
*/
