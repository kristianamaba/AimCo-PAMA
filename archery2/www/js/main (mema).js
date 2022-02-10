
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
		if(result.includes("scroll")){
			if(result.includes("stop")){
				document.location.reload(true);
			}
			else if(result.includes("down")){
				 var hash = "#bottom-part"
			}
			else if(result.includes("down")){
				 var hash = "#top-part"
			}
			  $('html, body').animate({
				scrollTop: $(hash).offset().top
			  }, 60000, function(){
		   
				// Add hash (#) to URL when done scrolling (default click behavior)
			  window.location.hash = hash;
			  });
		}
		else if(result.includes("open")){
			if(result.includes("tabs")){
				document.getElementById("open-tabs").click();
			}
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
					var test_element = document.getElementById(str);
					if(test_element){
						test_element.click();
						
						if(!str.includes("select")){
						
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
