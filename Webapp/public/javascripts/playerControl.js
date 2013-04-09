      // load youtube iframe api asynchronously
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    
	  
	  // playerReady boolean used to handle unexpected doulbe call to onplayerready
	  // playIndex boolean used to control which video to play
	  // vidCue is the list of videos to play
	  // player is the video player
	  // state boolean used to control unpexcted double call to onplayerstatechange
	  
	  var playerReady = false;
	  var playIndex = 0;
	  var videoCue = [];
      	  var player;
	  var state = false;
	  var array = JSON.parse(source);
	  for(var i=0; i< array.length; i++){
			var index = array[i].link.indexOf("embed/");
			var newId = array[i].link.substring(index+6,array[i].link.length);
			videoCue.push(newId);
	  }
	  
      // when youtube video api loads this function is called
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '450',
          width: '750',
          videoId: videoCue[playIndex],
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
         }
       });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
		if(playerReady == false){
			playIndex = playIndex +1;
			playerReady = true;
		}
      }

      // 5. The API calls this function when the player's state changes.
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED && !state) {
				playNext();
				state = true;
				
				// one second from this call allow player state to be checked
				setTimeout(function(){
					state = false;
				},500);          
        }
      }
	  
	  // when one video ends playNext is called
      function playNext(){
        player.loadVideoById(videoCue[playIndex]);
		playIndex = playIndex +1;
		if(playIndex == videoCue.length ) playIndex = 0;
      }
	  
