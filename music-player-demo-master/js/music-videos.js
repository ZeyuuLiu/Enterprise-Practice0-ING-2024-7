document.addEventListener("DOMContentLoaded", function() {

  const video = document.getElementById("bgVideo");
  const videoSource = document.getElementById("videoSource");
  const playPauseButton = document.getElementById("playBtn");
  const prevButton = document.getElementById("prevBtn");
  const nextButton = document.getElementById("nextBtn");
  const blurButton = document.getElementById("blurBtn");
  const musicListElement = document.querySelector('.music-list');
  const likeListElement = document.querySelector('.like-list');
  const warp = document.getElementById("warp");
  
  //创建videos变量，存储MV的相对地址
  var videos;
  
  //从 http://localhost:3000/getMusicList 端口中获得videos数组
  fetch('http://localhost:3000/getMusicList', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data) {
        // 假设data是一个对象，其中的searchResult是一个数组
        videos = data.searchResult.map(item => item.m_video);     
    }
  })
  .catch(error => {
    console.log("Error:", error);
  });
      
  let currentVideoIndex = 0;

  //初始化，加载所有歌曲
  function loadVideo(index) {
    
    video.pause();
    if (typeof videos !== 'undefined'){
      videoSource.src = videos[index];
    }
    
    video.load();
  }

  //播放歌曲
  function playVideo() {
    video.play();
  }

  //暂停歌曲
  function pauseVideo() {
    video.pause();
  }

  //下一首歌
  function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    loadVideo(currentVideoIndex);
    playVideo();
  }

  //上一首歌
  function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    loadVideo(currentVideoIndex);
    playVideo();
  }

  //开始与暂停，同一个按钮，由paused来判断
  playPauseButton.addEventListener("click", function() {
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  });

  //背景虚化与还原函数
  function toggleBlur() {
    if (video.style.filter === "none") {

        video.style.filter = "blur(50px)";
        video.style.justifyContent = "center";

        warp.style.left = "40%";
        warp.style.top = "50%";
        warp.style.transition = "all 1s";

    } else {
        video.style.filter = "none";
        video.style.transition = "all 1s";

        warp.style.left = "5%";
        warp.style.top = "90%";
        warp.style.transition = "all 1s";
    }
  }

  //链接侧边连里面的点击按钮
  musicListElement.addEventListener('click', (event) => {
    
    if (event.target.classList.contains('play-circle')) {
      var index = event.target.getAttribute('data-index');
      if(currentVideoIndex==index){
        pauseVideo();
      }else{
        currentVideoIndex = index;
        loadVideo(currentVideoIndex);
        playVideo();
      }
      
    }
  });

  //链接喜欢列表里面的点击按钮
  likeListElement.addEventListener('click', (event) => {
    
    if (event.target.classList.contains('play-circle')) {
      var index = event.target.getAttribute('data-index');
      if(currentVideoIndex==index){
        pauseVideo();
      }else{
        currentVideoIndex = index;
        loadVideo(currentVideoIndex);
        playVideo();
      }
      
    }
  });


  //链接按钮与事件
  nextButton.addEventListener("click", nextVideo);
  prevButton.addEventListener("click", prevVideo);
  blurButton.addEventListener("click", toggleBlur);
  video.addEventListener("ended", nextVideo);

  //初始状态：暂停
  loadVideo(currentVideoIndex);
  pauseVideo();
});



