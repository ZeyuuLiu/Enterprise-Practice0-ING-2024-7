# Enterprise-Practice0-ING-2024-7
2024年南开大学软件学院暑期实训测试项目————幻音视界

# 项目介绍
  本项目是一个前端网页音乐播放器，具有基本的播放音乐、播放MV的功能以及针对不同用户的喜欢歌曲列表以及个性化定制功能。
## 功能特性

- **用户登录功能**：经过注册后，用户可以登录该网页的账号。
- **基本播放控制**：播放、暂停、停止、上一曲、下一曲。
- **歌曲信息展示**：显示当前播放歌曲的名称、歌手、专辑等信息。
- **播放列表管理**：添加、删除、搜索和过滤播放列表中的歌曲。
- **查找歌曲**：支持在音乐列表查找歌曲
- **主题切换**：支持暗黑模式切换和背景模糊效果。

## 技术栈
- **前端**：
  - HTML
  - CSS
  - JavaScript
  - jQuery
- **数据库**：
  - MySQL
    
- **工具**：
  - Git
  - GitHub
    
## 安装与使用

- **克隆仓库**：
   git clone (https://github.com/ZeyuuLiu/Enterprise-Practice0-ING-2024-7)
   
- **打开login.html**：
   使用浏览器打开login.html即可使用音乐播放器

- **注意**：
   在使用前应先在login.html的同级目录下创建MV文件，并在其中添加对应的MV资源，并在music-videos.js文件中的存储数组中更改对应元素。
   audios文件资源仅供学习参考使用。

## 功能演示
- **注册功能**：若用户为新用户或是想要创建新账号，可以点击注册，输入相应的账号信息即可注册。
- **登录功能**：输入已经存在账号和密码后，用户可以在经过系统验证后进入到播放界面中。
- **侧边栏菜单**：点击左上角菜单按钮，展示或隐藏侧边栏。
- **推荐列表**：在侧边栏菜单中查看推荐歌曲列表。
- **喜欢的歌曲**：查看用户喜欢的歌曲列表,该列表对不同的用户是不同的。
- **播放控制**：通过播放控制区域，进行播放、暂停、上一曲、下一曲等操作。
- **播放进度**：查看当前播放进度，及歌曲相关信息。
- **播放列表**：点击播放列表按钮，展示所有可播放的歌曲列表。
- **主题切换**：切换暗黑模式和背景模糊效果。

## 联系信息
如有任何问题或建议，欢迎通过以下方式联系我：

- GitHub: ZeyuuLiu
- Email: 2211813@mail.nankai.edu.cn
  
- 感谢您使用我们的音乐播放器！希望您能享受愉快的音乐体验！
  
# 使用说明
-  歌曲MV文件太大，在此不再上传，使用前应先创建music-videos文件夹，并将对应的歌曲MV文件存入其中，若有更改，请在数据库中，同步进行更改。
歌曲音频在此也不在上传，使用前应先创建audios文件夹，并将对应歌曲的音频资源存入其中，若有更改，请在数据库中，同步进行更改。
server.zip文件需要解压缩，其本体是一个文件夹，应放置在music-player-demo-master的子目录中。

-  此外，需要注意的是，在使用前，应当在本地自主创建数据库，具体要求详见本项目的数据库设计（登录子系统与播放子系统）文档。
