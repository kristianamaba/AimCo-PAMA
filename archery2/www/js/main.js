
function viewTextOnly(){


	if(document.getElementById("modal_body_contents").innerHTML.length < 50){
		var div = document.createElement('div');

		div.innerHTML = document.getElementById("whole_content").innerHTML;

		div.querySelectorAll('script').forEach(function(scriptTag) {
		  scriptTag.parentNode.removeChild(scriptTag);
		});
		
		div.querySelectorAll('button').forEach(function(scriptTag) {
		  scriptTag.parentNode.removeChild(scriptTag);
		});
		
		div.querySelectorAll('img').forEach(function(scriptTag) {
		  scriptTag.parentNode.removeChild(scriptTag);
		});
		
		
		

		var divt =  div.innerHTML;


		var a = divt;
		a = a.replace(/<\/?[^>]+(>|$)/g, function(match) {       
			  return !/br|b/i.test(match) ? "" : match
		});
		
		a = a.replace( /\s\s+/g, '');
		
		
		document.getElementById("modal_body_contents").innerHTML = a;
	}
}




//Event Listener
function speakClick(ids){
	voiceText = "";
	
	
	// Extend the TTS object with the new stop method.
	window.TTS["stop"] = function(){
		TTS.speak({text: ''});
	};
	
	voiceText = "";
	for (i = 0; i < ids.length; i++) {
		  voiceText +=  document.getElementById(ids[i]).innerHTML;
	}
	
	speakText(voiceText);

	
}



function speakText(str){
	// Speak some text
	window.TTS.speak({
		
		text: str,
		locale: 'en-US',
		rate: 1
	}, function () {
		console.log('Text succesfully spoken');
	}, function (reason) {
		console.log(reason);
	});
}

function stopClick(){
	
	// Extend the TTS object with the new stop method.
	window.TTS["stop"] = function(){
		TTS.speak({text: ''});
	};
	TTS.stop();
	
}


// Handle results
function startRecognition(){
	
	
	
	
	
	window.plugins.speechRecognition.startListening(function(result){
		window.androidVolume.set(window.localStorage.getItem("sound_lvl"), false, null, null);
		// Show results in the console
		if(result.includes("scroll down")){
		  
		  var hash = "#bottom-part"
		  
		  $('html, body').animate({
			scrollTop: $(hash).offset().top
		  }, 60000, function(){
	   
			// Add hash (#) to URL when done scrolling (default click behavior)
		  window.location.hash = hash;
		  });
		}
		else if(result.includes("scroll up")){
		  
		  var hash = "#top-part"
		  
		  $('html, body').animate({
			scrollTop: $(hash).offset().top
		  }, 20000, function(){
	   
			// Add hash (#) to URL when done scrolling (default click behavior)
		  window.location.hash = hash;
		  });
		}
		else if(result.includes("scroll stop")){
			document.location.reload(true);
		}
		else if(result.includes("read stop")){
			stopClick();
		}
		else if(result.includes("open tabs")){
			document.getElementById("open-tabs").click();
		}
		else {
			result.forEach(function(str) {
				if(str.includes("go to")){
					str = str.replace(/\s/g, '-');
					str = "#read" + str.substring(5);
					
					var hash = str;
					
		  
					  $('html, body').animate({
						scrollTop: $(hash).offset().top
					  }, 4000, function(){
				   
						// Add hash (#) to URL when done scrolling (default click behavior)
					  window.location.hash = hash;
					  });
				}
				else{
					str = str.replace(/\s/g, '-');
					var test_element2 = document.getElementById("open-"+str);
					var test_element = document.getElementById(str);
					if(test_element2){
						
						test_element2.click();
					}
					else if(test_element){
						test_element.click();
						
						if(!str.includes("select")&&str.includes("read")){
						
							var hash = "#"+str;
							
							$('html, body').animate({
								scrollTop: $(hash).offset().top
							  }, 2000, function(){
						   
								// Add hash (#) to URL when done scrolling (default click behavior)
							  window.location.hash = hash;
							  });
						}
					}
				}
				
			});
		}
		
		
		
		
	}, function(err){
		window.androidVolume.set(window.localStorage.getItem("sound_lvl"), false, null, null);
	}, {
		language: "en-US",
		showPopup: true
	});
}




function speechrecog_func(){
	if(window.localStorage.getItem("recog")!=1){
		document.getElementById("speech-instructions-modal").innerHTML = "<!-- Modal Fullscreen xl --> <div class=\"modal modal-fullscreen-xl\" id=\"modal-speech-instructions\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\"> <div class=\"modal-dialog\" role=\"document\" style=\"height:100%\"> <div class=\"modal-content \" style=\"height:100%\"> <div class=\"modal-header\"> <h5 class=\"modal-title\">Speech Recognition Guide</h5> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button> </div> <div class=\"modal-body h-100 d-flex justify-content-center align-items-center\"> <div id=\"carouselControls\" class=\"carousel slide\" data-ride=\"carousel\"> <div class=\"carousel-inner\"> <div class=\"carousel-item active\"> <img class=\"d-block w-100\" src=\"assets/images/instruct/s1.png\" alt=\"First slide\"> </div> <div class=\"carousel-item\"> <img class=\"d-block w-100\" src=\"assets/images/instruct/s2.png\" alt=\"Second slide\"> </div> <div class=\"carousel-item\"> <img class=\"d-block w-100\" src=\"assets/images/instruct/s1.gif\" alt=\"First slide\"> </div> <div class=\"carousel-item\"> <img class=\"d-block w-100\" src=\"assets/images/instruct/s2.gif\" alt=\"Second slide\"> </div> <div class=\"carousel-item\"> <img class=\"d-block w-100\" src=\"assets/images/instruct/s3.gif\" alt=\"Second slide\"> </div> <div class=\"carousel-item\"> <img class=\"d-block w-100\" src=\"assets/images/instruct/s4.gif\" alt=\"Second slide\"> </div> <div class=\"carousel-item\"> <img class=\"d-block w-100\" src=\"assets/images/instruct/s5.gif\" alt=\"Second slide\"> </div> </div> <a class=\"carousel-control-prev\" href=\"#carouselControls\" role=\"button\" data-slide=\"prev\"> <span class=\"fa fa-arrow-left\" aria-hidden=\"true\"></span> <span class=\"sr-only\">Previous</span> </a> <a class=\"carousel-control-next\" href=\"#carouselControls\" role=\"button\" data-slide=\"next\"> <span class=\"fa fa-arrow-right\" aria-hidden=\"true\"></span> <span class=\"sr-only\">Next</span> </a> </div> </div> <div class=\"modal-footer\"> <button type=\"button\" class=\"btn btn-primary\" onclick=\"window.location = './help.html';\">Help Page</button> <button type=\"button\" class=\"btn btn-secondary\" onclick=\"speechrecog_func()\" data-dismiss=\"modal\">Skip Guide</button> </div> </div> </div> </div>";
		$('#modal-speech-instructions').modal('show');	
		window.localStorage.setItem("recog", 1);
	}
	else{
		window.androidVolume.getMusic(function successCallback(value){
		   window.localStorage.setItem("sound_lvl", value);
		   window.androidVolume.set(0, false, null, null);
		});
		
		// Verify if recognition is available
		window.plugins.speechRecognition.isRecognitionAvailable(function(available){
			if(!available){
				alert("Sorry, not available");
			}

			// Check if has permission to use the microphone
			window.plugins.speechRecognition.hasPermission(function (isGranted){
				if(isGranted){
					startRecognition();
				}else{
					// Request the permission
					window.plugins.speechRecognition.requestPermission(function (){
						// Request accepted, start recognition
						startRecognition();
					}, function (err){
						alert(err);
					});
				}
			}, function(err){
				alert(err);
			});
		}, function(err){
			alert(err);
		});
	}
}


$('.carousel').carousel({
	interval: 1000 * 1000
});

