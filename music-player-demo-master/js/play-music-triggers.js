var musicList=[];
// var likeList=[];
var currentIndex=0;
var uName=localStorage.getItem('u_username');
fetch('http://localhost:3000/getMusicList', {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json'
  }
  })
  .then(response => response.json())
  .then(data => {
  if (data) {
      musicList = data.searchResult;
      render(musicList[currentIndex]);
      renderMusicList(musicList);
      renderLikeList(musicList);
   }
  })
  .catch(error => {
  console.log("Error:", error);
});
// 初始化当前音乐播放器，音乐列表以及喜欢列表


$("#playBtn").on("click", function () {
  if ($("audio").get(0).paused) {
    // 暂停状态，应该播放
    
    $(this).removeClass("fa fa-play iconfont icon-bofang").addClass("fa fa-pause iconfont icon-zanting1");
    // 修改播放按钮的图标状态

    $(".player-info").animate(
      {
        top: "-100%",
        opacity: 1,
      },
      "slow"
    );
    // 让音乐信息卡片显示出来

    $(".cover").css({
      "animation-play-state": "running",
    });
    // 让封面旋转起来
    
    $("audio").get(0).play();
    // 让音乐播放起来
  } else {
    // 播放状态，应该暂停

    $(this).removeClass("fa fa-pause iconfont icon-zanting1").addClass("fa fa-play iconfont icon-bofang");
    // 让音乐信息卡片消失

    $(".player-info").animate(
      {
        top: "0%",
        opacity: 0,
      },
      "slow"
    );
    $(".cover").css({
      "animation-play-state": "paused",
    });
    // 让封面旋转暂停

    $("audio").get(0).pause();
    // 让音乐暂停
  }
  renderMusicList(musicList);
  renderLikeList(musicList);
});
// 给播放按钮绑定点击事件


$("#likeBtn").on("click", function() {
  fetch('http://localhost:3000/getLikeList?username='+uName, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data && data.searchResult) {
      var likeList = data.searchResult.map(item => item.like_id);
      var currentSong = {
        u_username: uName,
        like_id: musicList[currentIndex].music_id
      };
      if (likeList.includes(currentSong.like_id)) {
        deleteLike(currentSong);
      } else {
        addLike(currentSong);
      }
      // 连接数据库修改用户喜欢歌曲的信息

    }
  })
  .catch(error => {
    console.log("Error:", error);
  });
});
// 给喜欢按钮绑定点击事件



$("#prevBtn").on("click", function () {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = musicList.length - 1;
  }
  // 重新渲染歌曲信息
  render(musicList[currentIndex]);
  
  $("#playBtn").trigger("click");
  // 让音乐播放
});
// 给上一首按钮绑定点击事件


$("#nextBtn").on("click", function () {
  if (currentIndex < musicList.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  render(musicList[currentIndex]);
  // 重新渲染歌曲信息

  $("#playBtn").trigger("click");
  // 让音乐播放

});
// 给下一首按钮绑定点击事件



$("#openModal").on("click", function () {
  $(".modal").show();
  $(".modal").css(
    "left","0"
  );
});
// 给音乐列表绑定点击事件


$(".clear-like").on("click",function(){
  clear(musicList);
})
// 给清空喜欢列表绑定点击事件


$(".modal-close").on("click", function () {
  $(".modal").css("left", "100%"); 
  // 将 modal 平移到屏幕右侧

  setTimeout(function () {
    $(".modal").hide(); 
    // 隐藏 modal
    
  }, 500); 
  // 延迟隐藏，等待过渡效果完成

});


$("audio").on("timeupdate", function () {
  var currentTime = $("audio").get(0).currentTime || 0;
  // 获取音乐当前到的时间，单位：秒

  var duration = $("audio").get(0).duration || 0;  
  // 获取音乐的总时长，单位：秒

  $(".current-time").text(formatTime(currentTime));  
  // 设置当前播放时间
  
  var value = (currentTime / duration) * 100;
  // 设置进度条

  $(".music_progress_line").css({
    width: value + "%",
  });
});
// 监听audio标签的 timeupdate 事件


$("audio").on("ended", function () {
  $("#playBtn").removeClass("fa-pause").addClass("fa-play");
  $(".cover").css({
    "animation-play-state": "paused",
  });
  // 让封面旋转暂停

});
// 监听音乐播放完毕的事件


$(".music-list").on("click", ".play-circle", function () {
  if ($(this).hasClass("fa-play-circle")) {
    var index = $(this).attr("data-index");
    currentIndex = index;
    render(musicList[currentIndex]);
    $("#playBtn").trigger("click");
  } else {
    $("#playBtn").trigger("click");
  }
});
// 通过事件委托给音乐列表的播放按钮绑定点击事件


$(".like-list").on("click", ".play-circle", function () {
  if ($(this).hasClass("fa-play-circle")) {
    var index = $(this).attr("data-index");
    currentIndex = index;
    render(musicList[currentIndex]);
    $("#playBtn").trigger("click");
  } else {
    $("#playBtn").trigger("click");
  }
});
// 通过事件委托给喜欢列表的播放按钮绑定点击事件


function formatTime(time) {
  // 329 -> 05:29
  var min = parseInt(time / 60);
  var sec = parseInt(time % 60);
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  return `${min}:${sec}`;
}
// 格式化时间


function render(data) {
  $(".name").text(data.m_name);
  $(".singer-album").text(`${data.m_singer} - ${data.m_album}`);
  $(".time").text(data.m_time);
  $(".cover img").attr("src", data.m_cover);
  $("audio").attr("src", data.m_audio_url);
}
// 根据信息，设置页面对应标签中的内容


function renderMusicList(list) {
  $(".music-list").empty();
  $.each(list, function (index, item) {
    var $li = $(`
      <li class="${index == currentIndex ? "playing" : ""}">
        <span>${index + 1}. ${item.m_name} - ${item.m_singer}</span>
        <span data-index="${index}" class="fa ${
      index == currentIndex && !$("audio").get(0).paused
        ? "fa-pause-circle"
        : "fa-play-circle"
    } play-circle iconfont ${index == currentIndex && !$("audio").get(0).paused
        ? "icon-zanting1":"icon-bofang"}"></span>
      </li>
    `);
    $(".music-list").append($li);
  });
}
// 根据音乐列表数据，创建li并将其添加至music-list


function renderLikeList(list){
  fetch('http://localhost:3000/getLikeList?username='+uName, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.searchResult) {
        $(".like-list").empty();
        var likeList = data.searchResult.map(item => item.like_id);
        if (likeList.length === 0) {
          var $li = $(`
            <li class="list-empty">
              喜欢列表为空，添加喜欢的音乐
            </li>
          `);
          $(".like-list").append($li);
          // 喜欢列表为空时，添加说明“喜欢列表为空”

        } else {
          likeBtn(likeList);
          list.forEach((item, index) => {
            var isLiked = likeList.includes(item.music_id);
            if (isLiked) {
              var $li = $(`
                <li class="${index == currentIndex ? "playing" : ""}">
                  <span>${index + 1}. ${item.m_name} - ${item.m_singer}</span>
                  <span data-index="${index}" class="fa ${
                index == currentIndex && !$("audio").get(0).paused
                  ? "fa-pause-circle"
                  : "fa-play-circle"
              } play-circle iconfont ${index == currentIndex && !$("audio").get(0).paused
                  ? "icon-zanting1":"icon-bofang"}"></span>
                </li>
              `);
              $(".like-list").append($li);
              // 将喜欢的音乐 添加至like-list中
            }
          });
        }
      }
    })
    .catch(error => {
      console.log("错误:", error);
    });
}
// 根据喜欢的音乐，创建li并将其添加至like-list


function clear(list){
  clearLikeList();
}
// 清空喜欢列表


function searchFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');
  // 循环遍历所有列表项，并隐藏那些与搜索查询不匹配的项

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("span")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
// 搜索功能，实现对音乐列表中音乐的搜索

function addLike(song) {
  fetch('http://localhost:3000/addLike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(song)
  })
  .then(response => response.text())
  .then(data => {
    renderLikeList(musicList);
  })
  .catch(error => {
    console.error('错误:', error);
  });
}
// 添加喜欢的歌曲，将新添加的喜欢歌曲更新至数据库中


function deleteLike(song) {
  fetch('http://localhost:3000/deleteLike', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(song)
  })
  .then(response => response.text())
  .then(data => {
    renderLikeList(musicList);
  })
  .catch(error => {
    console.error('错误:', error);
  });
}
// 删去喜欢的歌曲，将删除的歌曲从数据库信息中移除


function clearLikeList() {
  fetch('http://localhost:3000/clearLike', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ u_username: uName })
  })
  .then(response => response.text())
  .then(data => {
    renderLikeList(musicList);
    likeBtn(musicList);
  })
  .catch(error => {
    console.error('错误:', error);
  });
}
// 清空喜欢的歌曲，将喜欢的歌曲清空


function likeBtn(list){
  if(list.includes(musicList[currentIndex].music_id)) $(".fa-unlike").css({ color: "red" });
  else $(".fa-unlike").css({ color: "#b3b0b0" });
}
// 实现播放界面中喜欢按钮颜色的更新