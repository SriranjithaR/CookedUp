/*
*
*	Custom Javascript for The Scene
*
*/

/*
(function(window, document, $, undefined){
	*/

	// Global Vars
	var scrollPos, // window scrolltop
		thePlayer = [], // Array to hold players
		currentVidIndex = 0,// to store current vid index
		currentSideVidIndex = 0,
		videoplaying = 0;

var myPlayer,
          requestData,
          apiRequest,
          proxyURL = 'http://www.vogue.in/brightcove-proxy.php',
          cmsURL = 'https://cms.api.brightcove.com/v1/accounts/',
		  videoData = [];
	// function to handle onscroll autoplay
	function onScrollAutoplay(thePlayer){
		var thePlayer = thePlayer;

		if(thePlayer) {

			if(thePlayer.ads && thePlayer.ads.state == "content-playback")
			{

				if(thePlayer.ended()){ // if already played once and ended, then do nothing
					return;
				}
				else if(thePlayer.paused() && thePlayer.hasClass("pausedbyscroll")){ // else continue playing
					thePlayer.play();
					thePlayer.removeClass("pausedbyscroll");
				}
		 	}
		 	else
		 	{
		 		if(thePlayer.ended()){ // if already played once and ended, then do nothing
					return;
				}
				else if(thePlayer.paused() && thePlayer.hasClass("pausedbyscroll")){ // else continue playing
					thePlayer.play();
					thePlayer.removeClass("pausedbyscroll");
				}
		 	}
		}
	}
	// END function to handle onscroll autoplay

	// function to handle onscroll autopause
	function onScrollAutopause(thePlayer){
		var thePlayer = thePlayer;
		if(thePlayer)
		{
			if(thePlayer.ads && thePlayer.ads.state == "content-playback")
			{
				if(thePlayer.paused() == false)
				{
					thePlayer.pause();
					thePlayer.addClass("pausedbyscroll");
					console.log('player_paused');
				}
		 	}
		 	else
		 	{
		 		if(thePlayer.paused() == false)
				{
					thePlayer.pause();
					thePlayer.addClass("pausedbyscroll");
					console.log('player_paused');
				}
		 	}
		}
	}
	// END function to handle onscroll autopause

	// function to add social share and embed code
	function insertSocialSharer(id,videoIndex){
		var id = id,
			shareOverlay = document.createElement("div"); // create share overlay

			var sharelink = "", sharecount = 0;
			var shareUrl = "http://www.vogue.in/brightcove_share_count.php?brightcove_id=" + $('#'+id).attr("data-video-id");

			$.ajax({ url: shareUrl, async: false, dataType: 'json' }).done(function(data) { 
				//console.log(data); 
				sharelink = data.link; sharecount = data.share_count; });

			videoLink = document.createElement('div');
			videoLink.className = 'vjs-control vjs-prev-link-control';
			videoLink.innerHTML = '<a href="'+sharelink+'"><i class="fa fa-external-link"></i></a>';

			controlBar = document.getElementById(id).getElementsByClassName('vjs-control-bar');
			
			if(hasClass(controlBar,'vjs-prev-link')) {
				return;
			} else {
				controlBar.className += " vjs-prev-link";
				controlBar[0].appendChild(videoLink);
			}

			var options = {
							"url": sharelink,
							"deeplinking": true,
							"services": {
									"facebook": true,
									"google": true,
									"twitter": true,
									"tumblr": true,
									"pinterest": true,
									"linkedin": true
							}
					};

						thePlayer[videoIndex].social(options);

						var directLink = $('#'+id).find('.direct-link-textbox').val(), // get direct link
						embedCode = $('#'+id).find('.embed-code-textbox').val(), // get embed code
						facebookURL = $('#'+id).find('.vjs-share-facebook').attr('href'), // get fb url
						twitterURL = $('#'+id).find('.vjs-share-twitter').attr('href'), // get twitter url
						gplusURL = $('#'+id).find('.vjs-share-gplus').attr('href'), // get google plus url
						pinterestURL = $('#'+id).find('.vjs-share-pinterest').attr('href'), // get pinterest url
						tumblerURL = $('#'+id).find('.vjs-share-tumblr').attr('href'), // get tumbler url
						mailTo = 'mailto:?body=Check%20Out%20This%20Video : '+directLink; // mailto format
						embedTo = $('#'+id).attr("data-video-id"); // mailto format

			// prepare share html
			//sharerHtml = '<div class="tscene-share-body"><a class="tscene-share-close" title="Close"><i class="fa fa-times"></i></a><a class="tscene-share-back" title="Back"><i class="fa fa-angle-left"> Back</i></a><div class="tscene-share-icons block"><div class="content"><div class="row"><a class="btns ts-facebook" title="Facebook" href="'+facebookURL+'" target="_blank"><i class="fa fa-facebook-square"></i></a><a class="btns ts-twitter" title="Twitter" href="'+twitterURL+'" target="_blank"><i class="fa fa-twitter-square"></i></a><a class="btns ts-gplus" title="Google Plus" href="'+gplusURL+'" target="_blank"><i class="fa fa-google-plus-square"></i></a><a class="btns ts-pinterest" title="Pinterest" href="'+pinterestURL+'" target="_blank"><i class="fa fa-pinterest-square"></i></a></div><div class="row"><a class="btns ts-tumbler" title="Tumbler" href="'+tumblerURL+'" target="_blank"><i class="fa fa-tumblr-square"></i></a><a class="btns ts-mail" title="Email"  href="'+mailTo+'"><i class="fa fa-envelope-square"></i></a><a class="btns ts-embed" title="Embed Code"><i class="fa fa-code"></i></a><a class="btns ts-link" title="Direct Link"><i class="fa fa-link"></i></a></div></div></div><div class="tscene-embed-code block"><h2>EMBED THIS VIDEO</h2><p>Copy and paste the code below to display this video on your blog or website</p><input type="text" class="embed-code" readonly value="'+embedCode+'" onClick="this.setSelectionRange(0, this.value.length)"></div><div class="tscene-direct-link block"><h2>URL</h2><input type="text" class="direct-link" readonly value="'+directLink+'" onClick="this.setSelectionRange(0, this.value.length)"></div></div>';

			sharerHtml = '<div class="tscene-share-body"><a class="tscene-share-close" title="Close"><i class="fa fa-times"></i></a><a class="tscene-share-back" title="Back"><i class="fa fa-angle-left"> Back</i></a><div class="post-social post_cont bcoveShare"> <div class="socialShare socialShare-top social-sharer-buttons-article-top"> <ul><li class="total_view_share"><span><strong>' + sharecount + '</strong></span></li><li> <a href="'+facebookURL+'" rel="facebook" target="_blank" class="fa fa-facebook facebook fb social_share single-story-top-facebook"></a></li> <li> <a href="'+twitterURL+'" target="_blank" rel="twitter" class="fa fa-twitter twitter twt social_share single-story-top-twitter"></a></li><li> <a href="'+pinterestURL+'" target="_blank" rel="printerest" class="fa fa-pinterest-p pinterest social_share single-story-top-pinterest"></a></li> <li> <a href="'+mailTo+'" title="" class="fa fa-envelope mail social_share single-story-top-mail"></a></li>   \
			<li><a href="javascript:;" data-content="<input type=\'text\' onfocus=\'this.select();\' value=\'&lt;iframe width=&quot;560&quot; height=&quot;315&quot; src=&quot;//players.brightcove.net/4626510587001/6031dab4-7241-4f64-9d54-4d51fb9f787b_default/index.html?videoId='+embedTo + '&quot; allowfullscreen&gt;&lt;/iframe&gt; \' />" class="embed embed-popover social_share"><i class="fa fa-angle-left"></i><i class="fa fa-angle-right"></i></a> </li> \
			</ul> </div> </div></div>';

			/*sharerHtml = '<div class="tscene-share-body"><a class="tscene-share-close" title="Close"><i class="fa fa-times"></i></a><a class="tscene-share-back" title="Back"><i class="fa fa-angle-left"> Back</i></a><div class="tscene-share-icons block"><div class="content"><div class="row"><a class="btns ts-facebook" title="Facebook" href="'+facebookURL+'" target="_blank"><i class="fa fa-facebook-square"></i></a><a class="btns ts-twitter" title="Twitter" href="'+twitterURL+'" target="_blank"><i class="fa fa-twitter-square"></i></a><a class="btns ts-gplus" title="Google Plus" href="'+gplusURL+'" target="_blank"><i class="fa fa-google-plus-square"></i></a><a class="btns ts-pinterest" title="Pinterest" href="'+pinterestURL+'" target="_blank"><i class="fa fa-pinterest-square"></i></a></div><div class="row"><a class="btns ts-tumbler" title="Tumbler" href="'+tumblerURL+'" target="_blank"><i class="fa fa-tumblr-square"></i></a><a class="btns ts-mail" title="Email"  href="'+mailTo+'"><i class="fa fa-envelope-square"></i></a></div></div></div></div>';*/

		// add overlay class
		shareOverlay.className = "tscene-share-overlay";

		// append the share html
		document.getElementById(id).appendChild(shareOverlay).innerHTML = sharerHtml;
	}
	// END function to add social share and embed code

	// Document Ready Handlers
	$(document).ready(function(e){

		// add Font Awesome stylesheet at head
		// $('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">').appendTo('head');

		// attach events for custom social overlay
		// Open Custom Social Modal
		$('body').on('click', '.vjs-share-control', function(e){
			$(this).parents('.vjs-control-bar').siblings('.tscene-share-overlay').addClass('opened');
		});

		// Close Custom Social Modal
		$('body').on('click', '.tscene-share-body .tscene-share-close', function(e){
			$(this).parents('.tscene-share-overlay').removeClass('opened').removeClass('embed-open').removeClass('dlink-open');
			// play video
			if(!thePlayer[currentVidIndex].ended()){
				thePlayer[currentVidIndex].play();
			}
		});

		// back to main panel
		$('body').on('click', '.tscene-share-body .tscene-share-back', function(e){
			$(this).parents('.tscene-share-overlay').removeClass('embed-open').removeClass('dlink-open');
		});

		// copy embed code button click handler
		$('body').on('click', '.tscene-share-body .block .row a.ts-embed', function(e){
			$(this).parents('.tscene-share-overlay').addClass('embed-open');
		});

		// direct link button click handler
		$('body').on('click', '.tscene-share-body .block .row a.ts-link', function(e){
			$(this).parents('.tscene-share-overlay').addClass('dlink-open');
		});




		// END attach events for custom social overlay

		// find and get and attach events for each player instance
		$('body').find('.video-js').each(function(index){

			// check of already added
			if($(this).hasClass('tscene-video')){
				return;
			}
			else{
				// Declare variables
				var videoID = $(this).attr('id'), // Get video element ID
					videoIndex = index; // get video index

				// start video player thread
				videojs(videoID).ready(function(){


					// reference to the video object
					thePlayer[videoIndex] = this;

					thePlayer[videoIndex].addClass("tscene-video").addClass('vjs-white-skin');
					// mute all videos
					// thePlayer[videoIndex].muted(true); // mute the volume

					/*thePlayer[videoIndex].ads(); */
					// set volume to 20%
					thePlayer[videoIndex].volume(0);

					thePlayer[videoIndex].controls(false);

					thePlayer[videoIndex].on('mouseover', function(e) {
						thePlayer[videoIndex].controls(true);
					});

					thePlayer[videoIndex].on('mouseout', function(e) {
						thePlayer[videoIndex].controls(false);
					});



					thePlayer[videoIndex].toggleHDPlugin();
						//thePlayer[videoIndex].customOverlay();



		var options = {
						"url": window.location.href,
						"embedCode": "<iframe src='http://scene.cnidigital.in/'" + videoID + ">",
						"deeplinking": true,
						"services": {
								"facebook": true,
								"google": true,
								"twitter": true,
								"tumblr": true,
								"pinterest": true,
								"linkedin": true
						}
				};

			thePlayer[videoIndex].social(options);

					// insert social sharer
					//console.log("found video " + videoID);
					insertSocialSharer(videoID,videoIndex);

		// textTrack = thePlayer[videoIndex].addTextTrack('metadata', 'Timed Cue Point');

      	/*var tt = thePlayer[videoIndex].textTracks()[0];
      	tt.oncuechange = function() {
	        if(tt.activeCues[0] !== undefined){
	        	$('#videoLeftSlideTag'+videoID).html(tt.activeCues[0].text);
	        	$('#videoLeftSlideTag'+videoID).animate({ "left": 0 }, "700");
				//var dynamicHTML = "id: " + tt.activeCues[0].id + ", ";
				// var dynamicHTML = "text: <strong>" + tt.activeCues[0].text + "</strong>, ";
				// dynamicHTML += "startTime: <strong>" + tt.activeCues[0].startTime + "</strong>,  ";
				// dynamicHTML += "endTime: <strong>" + tt.activeCues[0].endTime + "</strong>";
				// console.log(dynamicHTML);
	        } else {
	        	$('#videoLeftSlideTag'+videoID).animate({ "left": '-28%' }, "700");
	        }
    	}*/

/*
					var overlayHTML = ' \
					<div class="videoInfoOverlay"> \
						<div class="upcomingVids">  \
							<div class="upcomingVidInfo"> \
								<h2><a href="#">Movie Title</a></h2> \
								<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span> \
							</div> \
						</div> \
					 \
						 \
						<a href="javascript:void(0)" class="closeInfo">X</a> \
					</div>';
*/
var rands = Math.floor((Math.random() * 100000) + 1);
var overlayHTML = ' \
	<div class="videoInfoOverlay subOverlay" id="subOverlay'+videoID+'">  \
		<div class="videoInfoScroller"> \
					<div class="subscribePic"><a href="/subscription" target="_blank"><img src="/wp-content/themes/vogue/images/header-subscribe.jpg"></a></div> \
					      <div class="subscribeBlock vogue-subscribe-form" data-post-id="'+rands+'"> \
					        <h2>Subscribe to Newsletter</h2> \
					        <form name="mc-embedded-subscribe-form" method="post" action=""> \
					          <div> \
					            <input name="subscribe_email" id="subscribe_email' + rands + '" type="text" value="Subscribe" onfocus="if (this.value==\'Subscribe\') this.value=\'\';"> \
					            <input type="submit" value="Go"> \
					          </div> \
					        </form> \
					        <div class="newsletter-msg" id="newsletter_msg'+rands+'"></div>\
					      </div> \
								</div> \
								<a href="javascript:void(0);" class="closeSub">X</a> \
								</div> \
								';

						var videoLinkHTML = '<div class="videoLeftSlideTag" id="videoLeftSlideTag'+videoID+'"> \
								      Subscribe to Newsletter <a href="javascript:;"><i class="fa fa-external-link"></i></a> \
								      <a href="http://www.vogue.in/subscription" target="_blank" class="closeSlideTag">x</a> \
								    </div>';

					var listenToSoundHTML = '<div class="listenTosound"><a href="javascript:;" vid="'+videoIndex+'">Listen To Sound <i class="fa fa-volume-off"></i></a></div>';


					var infoButton = document.createElement("div");
					infoButton.className = 'infoBtn';
					infoButton.id = "infobutton_" + videoID;
					document.getElementById(videoID).appendChild(infoButton).innerHTML = "...";





						var infoOverlay = document.createElement("div")
						document.getElementById(videoID).appendChild(infoOverlay).innerHTML = overlayHTML;

						var videoLinkOverlay = document.createElement("div");
						document.getElementById(videoID).appendChild(videoLinkOverlay).innerHTML = videoLinkHTML;

						var listenToSoundOverlay = document.createElement("div");
						document.getElementById(videoID).appendChild(listenToSoundOverlay).innerHTML = listenToSoundHTML;

						/*$(".infoBtn").click(function () {
							$(this).next('div').find(".subOverlay").animate({ "right": 0 }, "700");
							//$(".videoInfoOverlay").show();
							//$(".vidsOpen").hide();
						});

						$(".closeSub").click(function () {
							$(".subOverlay").animate({ "right": -180 }, "700");

						});*/
						/*$(document).on('click',".infoBtn",function () {
							$(this).next('div').find(".subOverlay").animate({ "right": 0 }, "700");
							//$(".videoInfoOverlay").show();
							//$(".vidsOpen").hide();
						});

						$(document).on('click',".closeSub",function () {
							var curr = $(this).parent("div.subOverlay");
							curr.animate({ "right":  -curr.outerWidth() }, "700");
						});*/

				thePlayer[videoIndex].on('error', function(e) {
						e.stopImmediatePropagation();
						thePlayer[videoIndex].error(null);

				});

/*
				thePlayer[videoIndex].on('useractive', function (e)
				{
						thePlayer[videoIndex].volume(50);
				}
			);

			thePlayer[videoIndex].on('userinactive', function (e)
			{
					thePlayer[videoIndex].volume(0);
			}
		);
*/
				thePlayer[videoIndex].on('timeupdate', function(e)
				{
					if(this.duration() == 0)
						return;

					/*if($('#'+thePlayer[videoIndex].player_.id_).attr('data-player')!='NkwE0K9Fx')
					{
						if(this.currentTime()>9&&this.currentTime()<13){
							console.log('showing','#videoLeftSlideTag'+videoID);
							$('#videoLeftSlideTag'+videoID).animate({ "left": 0 }, "700");
						} else {
							$('#videoLeftSlideTag'+videoID).animate({ "left": '-28%' }, "700");
						}
					}*/

						timeRemaining = Math.round(this.duration() - this.currentTime());
						if((timeRemaining < 11) && (this.hasClass("suboverlayshown") == false)) {
							this.addClass("suboverlayshown");
							$("#subOverlay"+this.id_).animate({ "right": 0 }, "700");
							$("#videoLeftSlideTag"+this.id_).animate({ "left": 0 }, "700");
						}


				});



				thePlayer[videoIndex].on('ima3-started', function(e) {
						thePlayer[videoIndex].ima3.adsManager.setVolume(0);

				});

				thePlayer[videoIndex].on('loadedmetadata', function(e) {



					var currentPlayer = $('#'+thePlayer[index].id_).attr('data-player');
					// console.log('metadata loaded');
					// console.log($('#'+thePlayer[videoIndex].player_.id_).attr('data-player'));
					if(currentPlayer=="41uMNOUhl"||currentPlayer=="E1tKU2f5g"||currentPlayer=="NkwE0K9Fx")
					{
						if(this.sidebarvideoid) { } else
							this.sidebarvideoid = this.mediainfo.id;
					} else {
						if(this.mainvideoid) { } else
							this.mainvideoid = this.mediainfo.id;
					}
					if(currentPlayer==="41uMNOUhl"||currentPlayer==="NkwE0K9Fx") { } else 
					{
						this.play(); // autoplay first video
					}

					// if(/*post_format=='story'||*/$('#'+thePlayer[index].id_).attr('data-player')!=="NkwE0K9Fx")
					// {
						requestData = setRequestData(videoIndex);
						getRelatedVideos(requestData, function(relatedVideos) {

							// extract the needed video data into an array
							videoData = extractVideoData(relatedVideos);

							// generate the HTML for the overlay
							videoList = createVideoDiv(videoData,videoIndex);

							if($('#subOverlay'+videoID).hasClass('videoListShow'))
							{} else {
								$('#subOverlay'+videoID+' .videoInfoScroller').append(videoList);
								$('#subOverlay'+videoID).addClass('videoListShow');
								$('#subOverlay'+videoID+' .videoInfoScroller').slimscroll({
									height: 'auto',
		    						size: '5px',
		    						color: '#f00',
		    						/*alwaysVisible: true,*/
		    						railVisible: true,
		    						railColor: '#333',
		    						railOpacity: 1
								});
							}

							// add the overlay
							// addOverlayText(videoList,videoIndex);
						});
					// }

					// console.log(this.mediainfo.cue_points);
					var trackIndex = this.textTracks().length -1;
        			var tt = this.textTracks()[trackIndex];
        			var cue_points = this.mediainfo.cue_points;
        			if (typeof tt.cues_  !== "undefined")
        			{
	        			tt.cues_.forEach( function (cue,index)
						{
							//console.log(cue_points[index].metadata);
							var vmeta = JSON.parse(cue_points[index].metadata);
							cue.text = 	cue_points[index].name+ '<a href="'+vmeta.link+'"><i class="fa fa-external-link"></i></a> \
									      <a href="javascript:;" class="closeSlideTag">x</a>';
						    cue.endTime = vmeta.endtime;
						});
	        		}

			      	tt.oncuechange = function() {
				        if(tt.activeCues[0] !== undefined){
				        	$('#videoLeftSlideTag'+videoID).html(tt.activeCues[0].text);
				        	$('#videoLeftSlideTag'+videoID).animate({ "left": 0 }, "700");
				        } else {
				        	$('#videoLeftSlideTag'+videoID).animate({ "left": '-28%' }, "700");
				        }
			    	}

					newUserButton = document.createElement('div');
					newUserButton.setAttribute('cid','openVC'+videoID);
					newUserButton.className = 'vjs-control vjs-user-control';
					newUserButton.innerHTML = '<i class="fa fa-user"></i>';

					var creditsHTML = ' \
					<div class="videoInfoOverlay creditsOverlay" id="openVC'+videoID+'"> \
						<div class="upcomingVids">  \
							<div class="upcomingVidInfo"> \
								<h2>Video Credits</h2> \
								<span>' + this.mediainfo.custom_fields.videocredits + '</span> \
							</div> \
						</div> \
					 \
						 \
						<a href="javascript:void(0);" class="closeInfo">X</a> \
					</div>';

					var creditsOverlay = document.createElement("div");
					document.getElementById(videoID).appendChild(creditsOverlay).innerHTML = creditsHTML;


					if(this.mediainfo.custom_fields.videocredits)
					{
						controlBar = document.getElementById(videoID).getElementsByClassName('vjs-control-bar');

						if(hasClass(controlBar,'vjs-video-credits-block')) {
							return;
						} else {
							controlBar.className += " vjs-video-credits-block";
							controlBar[0].appendChild(newUserButton);
						}
						// controlBar[0].appendChild(newUserButton);

						/*$(".vjs-user-control").click(function () {
							$(".creditsOverlay").animate({ "right": 0 }, "700");

						});*/

						/*$(document).on('click',".closeInfo",function () {
							var curr = $(this).parent("div.creditsOverlay");
							curr.animate({ "right": -curr.outerWidth() }, "700");
						});*/

					}





					//	thePlayer[videoIndex].autoplay(true); // autoplay first video
		});

				thePlayer[videoIndex].on('ended', function(e) {

					//console.log(postvideos);
					if($('#'+thePlayer[videoIndex].player_.id_).attr('data-player')=='NkwE0K9Fx')
					{
						this.removeClass("suboverlayshown");
						$(".subOverlay").animate({ "right": "-25%" }, "700");
						$("#videoLeftSlideTag"+this.id_).animate({ "left": "-28%" }, "700");
						var nextvideoid = sidebarvideos[this.sidebarvideoid].shift();
						// return;
						getVideoDetails(videoIndex,nextvideoid, function(parsedData) {

							thePlayer[videoIndex].catalog.getVideo(nextvideoid, function(error, video) {
								try {
									thePlayer[currentSideVidIndex].catalog.load(video);
								} catch (e) {
									thePlayer[currentSideVidIndex].catalog.load(video);
								}
								thePlayer[currentSideVidIndex].play();

							});

						});
						return;
					}

					else if($('#'+thePlayer[videoIndex].player_.id_).attr('data-player')=='E1tKU2f5g')
					{
						this.removeClass("suboverlayshown");
						$(".subOverlay").animate({ "right": "-25%" }, "700");
						$("#videoLeftSlideTag"+this.id_).animate({ "left": "-28%" }, "700");
						var nextvideoid = sidebarvideos[this.sidebarvideoid].shift();
						// return;
						getVideoDetails(videoIndex,nextvideoid, function(parsedData) {

							thePlayer[videoIndex].catalog.getVideo(nextvideoid, function(error, video) {
								try {
									thePlayer[currentSideVidIndex].catalog.load(video);
								} catch (e) {
									thePlayer[currentSideVidIndex].catalog.load(video);
								}
								thePlayer[currentSideVidIndex].play();

							});

						});
						return;
					}

					if(post_format = "viral_video")
					{
						var nextvideoid = postvideos[global_video_id].shift();
						//console.log(nextvideoid);
						window.location = nextvideoid;
						return;
					}


});
					// add a class
					thePlayer[videoIndex].addClass("tscene-video").addClass('vjs-white-skin');



				/*
		 thePlayer[videoIndex].one('loadedmetadata', function(){
				  // set up data for CMS API request
				  requestData = setRequestData(videoIndex);
				  // make the CMS API request
				  getRelatedVideos(requestData, function(relatedVideos) {
					  // extract the needed video data into an array
					  videoData = extractVideoData(relatedVideos);
					  // generate the HTML for the overlay
					  videoList = createVideoList(videoData);
					  // add the overlay
					  addOverlayText(videoList,videoIndex);
				  });
			  });
*/


			//thePlayer[videoIndex].customEndscreen({"content": "<div class='magazineInfoOverlay Cnt'><div class='upcomingMagazine'><div class='vidOverImg'><img src='/wp-content/themes/vogue/images/december.jpg'></div><div class='subscribeNow'><div class='subscribeTxt'><h2>Subscribe to Newsletter</h2><p>Proin mollis aliquet arcu quis placerat. Sed ligula leo, venenatis vitae lacus accumsan, cursus cursus ligula. Nunc quis velit lectus. Vivamus in ornare libero, sed elementum leo. Aenean turpis nulla, rhoncus et commodo nec, hendrerit malesuada est. Vestibulum faucibus pellentesque ligula eget interdum</p><a href='#'>Subscribe</a> </div></div></div></div>"});

					// autoplay the first video

				});



				// call cuepoint overlay plugin
				//videojs(videoID).cuepointOverlayPlugin();
				// END video player thread

			// END checking
}

		});
		// END find and get and attach events for each player instance


	});
	// END Document Ready Handlers



	function getVideoDetails(videoIndex,videoId,callback) {
		//console.log("getVideoDetails");
		var endPoint = '',
				accountId,
				videoName,
				requestURL,
				endPoint,
				tagValue,
				requestData = {},
				dataReturned = false;

		accountId = thePlayer[videoIndex].mediainfo.account_id;

		requestURL = cmsURL + accountId + '/videos/' + videoId;
		// return up to 9 videos which have a tag value equal to the current video, excluding the current video by name

		requestData.url = requestURL;
		requestData.requestType = 'GET';

		var httpRequest = new XMLHttpRequest(),
				responseRaw,
				parsedData,
				requestParams;
		// set up request data
		requestParams = 'url=' + encodeURIComponent(requestData.url) + '&requestType=' + requestData.requestType;
		// set response handler
		httpRequest.onreadystatechange = getResponse;
		// open the request
		httpRequest.open('POST', proxyURL);
		// set headers
		httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// open and send request
		httpRequest.send(requestParams);
		// response handler
		function getResponse() {
				dataReturned = false;
				try {
						if (httpRequest.readyState === 4) {
								if (httpRequest.status === 200) {
										responseRaw = httpRequest.responseText;
										parsedData = JSON.parse(responseRaw);
										console.log(parsedData);
										dataReturned = true;
								} else {
										alert('There was a problem with the request. Request returned ' + httpRequest.status);
								}
						}
				} catch (e) {
						alert('Caught Exception: ' + e);
				}
				if (dataReturned) {
						callback(parsedData);
				}
		}
	}

	function setRequestData(videoIndex) {
		//console.log("setRequestData");
		var endPoint = '',
			accountId,
			videoName,
			requestURL,
			endPoint,
			tagValue,
			requestData = {},
			dataReturned = false;

		accountId = thePlayer[videoIndex].mediainfo.account_id;
		tagValue = thePlayer[videoIndex].mediainfo.tags.join('+');
		videoName = encodeURI(thePlayer[videoIndex].mediainfo.name);
		tagValue = encodeURI(tagValue);

		requestURL = cmsURL + accountId + '/videos';
		// return up to 9 videos which have a tag value equal to the current video, excluding the current video by name
		endPoint = '?q=tags:' + tagValue + '-name:' + videoName + '&limit=9';

		requestData.url = requestURL + endPoint;
		requestData.requestType = 'GET';
		return requestData;
	}

	function getRelatedVideos(options, callback) {
		var httpRequest = new XMLHttpRequest(),
		responseRaw,
		parsedData,
		requestParams;
          // set up request data
          requestParams = 'url=' + encodeURIComponent(options.url) + '&requestType=' + options.requestType;
          // set response handler
          httpRequest.onreadystatechange = getResponse;
          // open the request
          httpRequest.open('POST', proxyURL);
          // set headers
          httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          // open and send request
          httpRequest.send(requestParams);
          // response handler

          function getResponse() {
          	dataReturned = false;
          	try {
          		if (httpRequest.readyState === 4) {
          			if (httpRequest.status === 200) {
          				responseRaw = httpRequest.responseText;
          				parsedData = JSON.parse(responseRaw);
          				dataReturned = true;
          			} else {
          				console.log('There was a problem with the request. Request returned ' + httpRequest.status);
          			}
          		}
          	} catch (e) {
          		console.log('Caught Exception: ' + e);
          	}
          	if (dataReturned) {
          		callback(parsedData);
          	}
        }
    }

	/**
	* extract video data from CMS API response
	* @param {array} cmsData the data from the CMS API
	* @return {array} videoData array of video info
	*/
	function extractVideoData(cmsData) {
		var i,
		iMax = cmsData.length,
		videoItem;
		for (i = 0; i < iMax; i++) {
			if (cmsData[i].id !== null || cmsData[i].images.thumbnail.src !== null) {
				videoItem = {};

				videoItem.id = cmsData[i].id;
				videoItem.name = cmsData[i].name;
				if(cmsData[i].images.thumbnail)
				{
					videoItem.thumbnail = cmsData[i].images.thumbnail.src;
				}

				videoData.push(videoItem);
			}
		}
		return videoData;
	}


	/**
	* create the html for the overlay
	* @param {array} videoData array of video objects
	* @return {HTMLElement} videoList the div element containing the overlay
	*/
	function createVideoList(videoData) {
		//console.log("createVideoList", videoData);
		var i,
		iMax = videoData.length,
		videoList = createEl('div', {
			id: 'videoList'
		}),
		videoWrapper = createEl('div'),
		thumbnailLink,
		thumbnailImage;

		videoList.appendChild(videoWrapper);
		for (i = 0; i < iMax; i++) {
			thumbnailLink = createEl('a', {
				href: 'javascript:loadAndPlay(' + i + ')'
			})
			thumbnailImage = createEl('img', {
				class: 'video-thumbnail',
				src: videoData[i].thumbnail
			});
			videoWrapper.appendChild(thumbnailLink);
			thumbnailLink.appendChild(thumbnailImage);
		}
		return videoList;
	}

	/**
	* Get the related stories HTML
	*/
	function createVideoDiv(videoData,videoindex) {
		var videoList = "";
		videoData.forEach( function (video,index)
		{
			videoList += '<div class="upcomingVids"> \
			<a href="javascript:loadAndPlay('+index+','+videoindex+')"> \
			<img src="'+video.thumbnail+'"> \
			<div class="upcomingVidInfo"> \
			<h2><a href="javascript:;">'+video.name+'</a></h2> \
			</div> \
			</a> \
			</div>'
		});
		return videoList;
	}

	/**
	* create an element
	*
	* @param  {string} type - the element type
	* @param  {object} attributes - attributes to add to the element
	* @return {HTMLElement} the HTML element
	*/
	function createEl(type, attributes) {
		var el,
		attr;

		el = document.createElement(type);
		if (attributes !== null) {
			for (attr in attributes) {
				el.setAttribute(attr, attributes[attr]);
			}
			return el;
		}
	}

	/**
	* adds text content to an element
	* @param {HTMLElement} el the element
	* @param {string} str the text content
	*/
	function addText(el, str) {
		el.appendChild(document.createTextNode(str));
	}

	/**
	* intializes the overlay plugin with the related video thumbnails
	* @param {HTML} overlayContent the HTML for the overlay
	*/
	function addOverlayText(overlayContent,videoIndex) {
		thePlayer[videoIndex].overlay({
			content: '<strong>Default overlay content</strong>',
			overlays: [{
				content: overlayContent,
				start: 'pause',
				end: 'play'
			},
			{
				content: overlayContent,
				start: 'end',
				end: 'play'
			}]
		});
	}


	loadAndPlay = function(idx,videoindex) {
		var currentId = videoData[idx].id;
		thePlayer[videoindex].catalog.getVideo(currentId, function(error, video) {
			try {
				thePlayer[videoindex].catalog.load(video);
			} catch (e) {
				thePlayer[videoindex].catalog.load(video);
			}
			thePlayer[videoindex].play();
		});
	}


	function isScrolledIntoView(elem)
	{
		var $elem = $(elem);
		var $window = $(window);

		var docViewTop = $window.scrollTop();
		var docViewBottom = docViewTop + $window.height();

		var elemTop = $elem.offset().top;
		var elemBottom = elemTop + $elem.height();

		//return ((elemBottom <= (docViewBottom)) && (elemTop >= (docViewTop)));
		return ( ((elemTop <= (docViewBottom)) && (elemTop >= (docViewTop)))  || ((elemBottom > (docViewBottom)) && (elemTop < (docViewTop))) || ((elemBottom > (docViewTop)) && (elemBottom < (docViewBottom))) );
	}

	function isScrolledIntoViewport(elem) {
	    var $elem = $(elem);
	    var $window = $(window);

	    var docViewTop = $window.scrollTop();
	    var docViewBottom = docViewTop + $window.height();

	    var elemTop = $elem.offset().top;
	    var elemBottom = elemTop + $elem.height();

	    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}




	jQuery(window).scroll(function(e){

		// Code for inview video autoplay
		$('body').find('.video-js').each(function(index){
			if(isScrolledIntoView($(this)))
			{
				currentVidIndex = index;
				if (typeof thePlayer[index] !== 'undefined')
				{
					if($('#'+thePlayer[index].id_).attr('data-player')=="NkwE0K9Fx")
					{
						currentSideVidIndex = index;
					}
					
					if(index==0||$('#'+thePlayer[index].id_).attr('data-player')!=="NkwE0K9Fx")
					{
						onScrollAutoplay(thePlayer[index]);
						//console.log(index+': onScrollAutoplay');
					}
				}
			}
			else
			{

				if (typeof thePlayer[index] !== 'undefined')
				{
					if(index==0||$('#'+thePlayer[index].id_).attr('data-player')!=="NkwE0K9Fx")
					{
						onScrollAutopause(thePlayer[index]);
						//console.log(index+'onScrollAutopause');
					}
				}
			}

		});
		// END Code for inview video autoplay

		// Code for inview video autoplay '.fluid-width-video-wrapper'
		var re = /autoplay=0/i;
		var re1 = /autoplay=1/i;
		$('.fluid-width-video-wrapper').each(function(index){
			var $elm = $('.fluid-width-video-wrapper').children().eq(index);
			if(isScrolledIntoViewport($('.fluid-width-video-wrapper').eq(index))) {
				re.test($elm.attr('src')) && $elm.attr('src', $elm.attr('src').replace('autoplay=0', 'autoplay=1'));
			} else {
				re1.test($elm.attr('src')) && $elm.attr('src', $elm.attr('src').replace('autoplay=1', 'autoplay=0'));
			}

		});
		// END Code for inview video autoplay
	});



	// END Window Scroll Handlers
	/*
})(window, document, jQuery);
*/

	function processBrightcoveVideos()
	{

		//console.log("Processing videos on timeout");

		// attach events for custom social overlay
		// Open Custom Social Modal
		$('body').on('click', '.vjs-share-control', function(e){
			$(this).parents('.vjs-control-bar').siblings('.tscene-share-overlay').addClass('opened');
		});

		// Close Custom Social Modal
		$('body').on('click', '.tscene-share-body .tscene-share-close', function(e){
			$(this).parents('.tscene-share-overlay').removeClass('opened').removeClass('embed-open').removeClass('dlink-open');
			// play video
			if(!thePlayer[currentVidIndex].ended()){
				thePlayer[currentVidIndex].play();
			}
		});

		// back to main panel
		$('body').on('click', '.tscene-share-body .tscene-share-back', function(e){
			$(this).parents('.tscene-share-overlay').removeClass('embed-open').removeClass('dlink-open');
		});

		// copy embed code button click handler
		$('body').on('click', '.tscene-share-body .block .row a.ts-embed', function(e){
			$(this).parents('.tscene-share-overlay').addClass('embed-open');
		});

		// direct link button click handler
		$('body').on('click', '.tscene-share-body .block .row a.ts-link', function(e){
			$(this).parents('.tscene-share-overlay').addClass('dlink-open');
		});
		// END attach events for custom social overlay

		// find and get and attach events for each player instance
		$('body').find('.video-js').each(function(index){
			// check of already added
			if($(this).hasClass('tscene-video')){
				return;
			}
			else{
				// Declare variables
				var videoID = $(this).attr('id'), // Get video element ID
					videoIndex = index; // get video index

					//console.log("videoID",videoID);

				if (typeof videoID === "undefined") {
					setTimeout(function(){ processBrightcoveVideos(); }, 2000);
					//console.log("looping the process");
				} else {
					loadBrightcoveVideo(videoID,videoIndex);
				}
			}
			// END checking

		});

	}


function loadBrightcoveVideo(videoID,videoIndex)
{
	videojs(videoID).ready(function(){

	// reference to the video object
	thePlayer[videoIndex] = this;


	// add a class
	thePlayer[videoIndex].addClass("tscene-video").addClass('vjs-white-skin');
	// mute all videos
	// thePlayer[videoIndex].muted(true); // mute the volume

	// set volume to 20%
	thePlayer[videoIndex].volume(0);

	thePlayer[videoIndex].controls(false);

	thePlayer[videoIndex].on('mouseover', function(e) {
		thePlayer[videoIndex].controls(true);
	});

	thePlayer[videoIndex].on('mouseout', function(e) {
		thePlayer[videoIndex].controls(false);
	});

	thePlayer[videoIndex].toggleHDPlugin();
	//thePlayer[videoIndex].customOverlay();

	var options = {
		"url": window.location.href,
		"embedCode": "<iframe src='http://scene.cnidigital.in/'" + videoID + ">",
		"deeplinking": true,
		"services": {
			"facebook": true,
			"google": true,
			"twitter": true,
			"tumblr": true,
			"pinterest": true,
			"linkedin": true
		}
	};

	thePlayer[videoIndex].social(options);

	// insert social sharer
	//console.log("found video " + videoID);
	insertSocialSharer(videoID,videoIndex);



	var overlayHTML = ' \
	<div class="videoInfoOverlay subOverlay" id="subOverlay'+videoID+'" >  \
	<div class="videoInfoScroller"> \
	<div class="subscribePic"><a href="/subscription" target="_blank"><img src="/wp-content/themes/vogue/images/header-subscribe.jpg"></a></div> \
	<div class="subscribeBlock"> \
	<h2>Subscribe to Newsletter</h2> \
	<form action="#"> \
	<div> \
	<input type="text" value="Subscribe" onfocus="if (this.value==\'Subscribe\') this.value=\'\';"> \
	<input type="submit" value="Go"> \
	</div> \
	</form> \
	</div> \
	</div> \
	<a href="javascript:void(0);" class="closeSub">X</a> \
	</div> \
	';


	var infoButton = document.createElement("div");
	infoButton.className = 'infoBtn';
	infoButton.id = "infobutton_" + videoID;
	document.getElementById(videoID).appendChild(infoButton).innerHTML = "...";

	var listenToSoundHTML = '<div class="listenTosound"><a href="javascript:;" vid="'+videoIndex+'">Listen To Sound <i class="fa fa-volume-off"></i></a></div>';




	var infoOverlay = document.createElement("div")
	document.getElementById(videoID).appendChild(infoOverlay).innerHTML = overlayHTML;

	var listenToSoundOverlay = document.createElement("div");
	document.getElementById(videoID).appendChild(listenToSoundOverlay).innerHTML = listenToSoundHTML;

	thePlayer[videoIndex].on('error', function(e) {
		thePlayer[videoIndex].error(null);
		e.stopImmediatePropagation();
	});
	/*
		thePlayer[videoIndex].on('useractive', function (e)
		{
				thePlayer[videoIndex].volume(50);
		}
		);

		thePlayer[videoIndex].on('userinactive', function (e)
		{
				thePlayer[videoIndex].volume(0);
		}
		);
	*/
	thePlayer[videoIndex].on('timeupdate', function(e)
	{
		if(this.duration() == 0)
			return;

		timeRemaining = Math.round(this.duration() - this.currentTime());
		if((timeRemaining < 11) && (this.hasClass("suboverlayshown") == false))
		{
			this.addClass("suboverlayshown");
			$(".subOverlay").animate({ "right": 0 }, "700");
		}
	});


	thePlayer[videoIndex].on('ima3-started', function(e) {
			thePlayer[videoIndex].ima3.adsManager.setVolume(0);

	});

	thePlayer[videoIndex].on('loadedmetadata', function(e) {

		var currentPlayer = $('#'+thePlayer[index].id_).attr('data-player');
		// console.log('metadata loaded');
		// console.log($('#'+thePlayer[videoIndex].player_.id_).attr('data-player'));
		if(currentPlayer=="41uMNOUhl"||currentPlayer=="E1tKU2f5g"||currentPlayer=="NkwE0K9Fx")
		{
			if(this.sidebarvideoid) { } else
				this.sidebarvideoid = this.mediainfo.id;
		} else {
			if(this.mainvideoid) { } else
				this.mainvideoid = this.mediainfo.id;
		}
		if(currentPlayer==="41uMNOUhl"||currentPlayer==="NkwE0K9Fx") { } else 
		{
			this.play(); // autoplay first video
		}

		// if(/*post_format=='story'||*/$('#'+thePlayer[videoIndex].id_).attr('data-player')!=="NkwE0K9Fx")
		// {
			requestData = setRequestData(videoIndex);
			getRelatedVideos(requestData, function(relatedVideos) {

				// extract the needed video data into an array
				videoData = extractVideoData(relatedVideos);

				// generate the HTML for the overlay
				videoList = createVideoDiv(videoData,videoIndex);

				if($('#subOverlay'+videoID).hasClass('videoListShow'))
				{} else {
					$('#subOverlay'+videoID+' .videoInfoScroller').append(videoList);
					$('#subOverlay'+videoID).addClass('videoListShow');
					$('#subOverlay'+videoID+' .videoInfoScroller').slimscroll({
									height: 'auto',
		    						size: '5px',
		    						color: '#f00',
		    						/*alwaysVisible: true,*/
		    						railVisible: true,
		    						railColor: '#333',
		    						railOpacity: 1
								});
				}

				// add the overlay
				// addOverlayText(videoList,videoIndex);
			});
		// }

		newUserButton = document.createElement('div');
		newUserButton.setAttribute('cid','openVC'+videoID);
		newUserButton.className = 'vjs-control vjs-user-control';
		newUserButton.innerHTML = '<i class="fa fa-user"></i>';

		var creditsHTML = ' \
		<div class="videoInfoOverlay creditsOverlay" id="openVC'+videoID+'"> \
		<div class="upcomingVids">  \
		<div class="upcomingVidInfo"> \
		<h2>Video Credits</h2> \
		<span>' + this.mediainfo.custom_fields.videocredits + '</span> \
		</div> \
		</div> \
		\
		\
		<a href="javascript:void(0);" cid="closeVC'+videoID+'" class="closeInfo">X</a> \
		</div>';

		var creditsOverlay = document.createElement("div");
		document.getElementById(videoID).appendChild(creditsOverlay).innerHTML = creditsHTML;

		if(this.mediainfo.custom_fields.videocredits)
		{
			controlBar = document.getElementById(videoID).getElementsByClassName('vjs-control-bar');
			controlBar[0].appendChild(newUserButton);
		}
		//	thePlayer[videoIndex].autoplay(true); // autoplay first video
	});




	thePlayer[videoIndex].on('ended', function(e) {


		//console.log($('#'+thePlayer[videoIndex].player_.id_).attr('data-player'));
		if($('#'+thePlayer[videoIndex].player_.id_).attr('data-player')=="NkwE0K9Fx")
		{
			this.removeClass("suboverlayshown");
			$(".subOverlay").animate({ "right": "-25%" }, "700");
			$("#videoLeftSlideTag"+this.id_).animate({ "left": "-28%" }, "700");
			var nextvideoid = sidebarvideos[this.sidebarvideoid].shift();
			// return;
			getVideoDetails(videoIndex,nextvideoid, function(parsedData) {
				thePlayer[videoIndex].catalog.getVideo(nextvideoid, function(error, video) {
					try {
						thePlayer[currentSideVidIndex].catalog.load(video);
					} catch (e) {
						thePlayer[currentSideVidIndex].catalog.load(video);
					}
					thePlayer[currentSideVidIndex].play();
				});
			});
			return;
		}
		else if($('#'+thePlayer[videoIndex].player_.id_).attr('data-player')=="E1tKU2f5g")
		{
			this.removeClass("suboverlayshown");
			$(".subOverlay").animate({ "right": "-25%" }, "700");
			$("#videoLeftSlideTag"+this.id_).animate({ "left": "-28%" }, "700");
			var nextvideoid = sidebarvideos[this.sidebarvideoid].shift();
			// return;
			getVideoDetails(videoIndex,nextvideoid, function(parsedData) {
				thePlayer[videoIndex].catalog.getVideo(nextvideoid, function(error, video) {
					try {
						thePlayer[currentSideVidIndex].catalog.load(video);
					} catch (e) {
						thePlayer[currentSideVidIndex].catalog.load(video);
					}
					thePlayer[currentSideVidIndex].play();
				});
			});
			return;
		}
		if(post_format = "viral_video")
		{
			var nextvideoid = postvideos[global_video_id].shift();
			//console.log(nextvideoid);
			window.location = nextvideoid;
			return;
		}

	});

	// add a class
	thePlayer[videoIndex].addClass("tscene-video").addClass('vjs-white-skin');
	});
}//end video load

/*InfoBtn open/close*/
$(document).on('click',".infoBtn",function () {
	$(this).next('div').find(".subOverlay").animate({ "right": 0 }, "700");
});

$(document).on('click',".closeSub",function () {
	$(this).parent("div.subOverlay").animate({ "right":  '-25%' }, "700");
});

/*Video Credits open/close*/
$(document).on('click',".vjs-user-control",function () {
	$("#"+$(this).attr('cid')).animate({ "right": 0 }, "700");
});

$(document).on('click',".closeInfo",function () {
	$(this).parent("div.creditsOverlay").animate({ "right": '-25%' }, "700");
});

$(document).on('click',".closeSlideTag",function () {
	$(this).parent("div.videoLeftSlideTag").animate({ "left": '-28%' }, "700");
});

$(document).on('click',".listenTosound a",function () {
	thePlayer[$(this).attr('vid')].volume(0.5);
	$(this).parent("div.listenTosound").remove();
});

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function showgqbResponse(responseText, statusText, xhr, $form)  {
	$("#"+$form.attr('id')+" .gqbResponse").html(responseText);
}