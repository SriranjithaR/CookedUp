/*******************************************************************************************
@
@	Custom Plugin for HD Toggle For Brightcove Player | The Scene - Conde Nast India
@	Author: Abir Maiti
@	Date: 17th November, 2015
@	Version: v0.1
@
@	Description: 1. Creates a HD toggle button for every instance of Brightcove player.
@				 2. Stores current playtime
@				 3. Stores current source
@				 4. Fetches all available sources from Brightcove Video Library
@				 5. Checks current video MIME type
@				 6. Gets matching (MIME) videos sources in an array
@				 7. Sorts the array
@				 8. If the HD source is same as current source, skips the toggle
@				 9. Otherwise changes video player source
@				 10. Notifies user
@
@	NOTE: This plugin currently searches and updates only .MP4 videos, as that is the
@		  only format currently supported by Brightcove. But this plugin should be
@		  updated again, once they start supporting .OGV & .WebM videos
@
*******************************************************************************************/

videojs.plugin('toggleHDPlugin', function() {
  var cniPlayer = this, // reference to the current player instance
  	playerId = this.id(), // get current player ID
    videoID, // storage for current video ID
	currentMIMEType, // storage for current MIME type
	currentTime, // storage for current time
	currentSource, // storage for current source
	_HDon = false, // flag for HD on or off
	availableSources, // storage for all available sources
    totalAvailableSources, // storage for number of available sources
    sourceArray=[], // storage for matched sources array
    highestQuality, // storage for highest quality source
	removeHDClasses, // storage to store remove class function
    controlBar, // selector for current player controlbar
    newHDButton; // storage for new HD toggle button
    
  videoID = cniPlayer.options()['data-video-id']; // get current video ID
  cniPlayer.options().inactivityTimeout = 4000;
  
  // remove all HD classes
  removeHDClasses = function(){
	document.getElementById(playerId).className=document.getElementById(playerId).className.replace('cni-hd-overlay-on',""); // first remove earlier HD on class
	document.getElementById(playerId).className=document.getElementById(playerId).className.replace('cni-hd-overlay-off',""); // first remove earlier HD off class
	document.getElementById(playerId).className=document.getElementById(playerId).className.replace('cni-hd-overlay-same',""); // first remove earlier HD same class
  }
  
  // reload the video from Brightcove to get all information of the video
  cniPlayer.catalog.getVideo(videoID, function(error, video) {
    cniPlayer.catalog.load(video); // load the video
  	currentMIMEType = cniPlayer.currentType(); // get current MIME type
	currentSource = cniPlayer.currentSrc(); // get current MIME type
  	//console.log(currentMIMEType+' | '+currentSource);
	
    availableSources = cniPlayer.mediainfo.sources; // get all information from the video
	//console.log(availableSources);
    totalAvailableSources = availableSources.length;
	// get all .MP4 video sources in an array
    for (var i = 0; i < totalAvailableSources; i++) {
      if (availableSources[i].container === "MP4" && availableSources[i].hasOwnProperty('src')) {
        sourceArray.push(availableSources[i]);
      };
    };
	
	// sort the .MP4 array in ascending order
    sourceArray.sort( function (a,b){
      return b.size - a.size;
    });
	
    highestQuality = sourceArray[0].src; // the source in zeroth index is the one with highest quality
	//console.log('CurrentSource: '+currentSource);
	//console.log('HighQuality: '+highestQuality);
	//console.log('LowQuality: '+sourceArray[sourceArray.length-1].src);
	
	// check if Highest quality is same as current source, if they are equal, activate HD button and set _HDon flag true
	if(highestQuality == currentSource){
		// make HD toggle button active
		document.getElementById(playerId).className=document.getElementById(playerId).className.replace('hd-on',"");
		document.getElementById(playerId).className += ' hd-on';
		
		// set current source to lowest source
		currentSource = sourceArray[sourceArray.length - 1].src;
		
		// set flag to indicate HD is enabled
		_HDon = true;
	}
	else{
		// make HD toggle button inactive
		document.getElementById(playerId).className=document.getElementById(playerId).className.replace('hd-on',"");
		
		// set flag to indicate HD is not enabled
		_HDon = false;
	}
	
	// create HD on overlay and append to player
	newHDOnOverlay = document.createElement('div');
	newHDOnOverlay.className = 'cni-hd-on cni-hd-overlay';
    newHDOnOverlay.innerHTML = '<i class="fa fa-check"></i><div class="cni-hd-content"><strong>HD</strong> <span>On</span></div>';
	document.getElementById(playerId).appendChild(newHDOnOverlay);
	
	// create HD off overlay and append to player
	newHDOffOverlay = document.createElement('div');
	newHDOffOverlay.className = 'cni-hd-off cni-hd-overlay';
    newHDOffOverlay.innerHTML = '<i class="fa fa-times"></i><div class="cni-hd-content"><strong>HD</strong> <span>Off</span></div>';
	document.getElementById(playerId).appendChild(newHDOffOverlay);
	
	// create HD toggle control button
    newHDButton = document.createElement('div');
    newHDButton.className = 'vjs-hd-control vjs-control';
    newHDButton.innerHTML = '<strong>HD</strong><div class="vjs-control-content"><span class="vjs-control-text">HD</span></div>';
	
	// attach click event handlers to newly created HD toggle button
	newHDButton.onclick = function(e){
		currentTime = cniPlayer.currentTime(); // get current play time
		
		// if _HDon flag is false, then change current video source and trigger HD on notification
		if(_HDon == false){
			//alert('for HD: '+_HDon);
			//change video source, brightcove currently supports only .MP4 videos, update code when they support webM and OGG videos as well
			cniPlayer.src([
			  { type: "video/mp4", src: highestQuality }//,
			  //{ type: "video/webm", src: "http://www.example.com/path/to/video.webm" },
			  //{ type: "video/ogg", src: "http://www.example.com/path/to/video.ogv" }
			]);
			
			// make HD toggle button active
			document.getElementById(playerId).className=document.getElementById(playerId).className.replace('hd-on',"");
			document.getElementById(playerId).className += ' hd-on';
			
			// display HD on overlay
			removeHDClasses; // first remove HD Classes
			document.getElementById(playerId).className += ' cni-hd-overlay-on'; // then assign HD on class
			
			// remove HD on overlay after 1.5 milliseconds
			cniPlayer.setTimeout(removeHDClasses, 1500);
			
			// set video play time again and play
			cniPlayer.currentTime(currentTime).play();
			
			// set flag to indicate HD is enabled
			_HDon = true;
		}
		// END if
		
		// if _HDon flag is true , then change to current video source and trigger HD off notification
		else if(_HDon == true){
			//alert('for non HD: '+_HDon);
			//change video source, brightcove currently supports only .MP4 videos, update code when they support webM and OGG videos as well
			cniPlayer.src([
			  { type: "video/mp4", src: currentSource }//,
			  //{ type: "video/webm", src: "http://www.example.com/path/to/video.webm" },
			  //{ type: "video/ogg", src: "http://www.example.com/path/to/video.ogv" }
			]);
			
			// make HD toggle button inactive
			document.getElementById(playerId).className=document.getElementById(playerId).className.replace('hd-on',"");
			
			// display HD on overlay
			removeHDClasses; // first remove HD Classes
			document.getElementById(playerId).className += ' cni-hd-overlay-off'; // then assign HD off class
			
			// remove HD off overlay after 1.5 milliseconds
			cniPlayer.setTimeout(removeHDClasses, 1500);
			
			// set video play time again and play
			cniPlayer.currentTime(currentTime).play();
			
			// set flag to indicate HD is disabled
			_HDon = false;
		}
		// END if
	}
	// END attach click event handlers to newly created HD toggle button
	
	// get player control bar and append HD toggle button
    controlBar = document.getElementById(playerId).getElementsByClassName('vjs-control-bar');
    controlBar[0].appendChild(newHDButton);
  });
  // END reload the video from Brightcove to get all information of the video
  
});