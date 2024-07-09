DROP TABLE IF EXISTS music_logs;-- music_logs，先进行删除
DROP TABLE IF EXISTS user_like;-- user_like，先进行删除
DROP TABLE IF EXISTS music_list; -- music_list，先进行删除

-- 创建音乐列表
CREATE TABLE music_list (
    music_id INT AUTO_INCREMENT,  				-- 列表的唯一标识符，自增，主键
    m_name VARCHAR(100) NOT NULL,            	-- 歌曲名字，非空，长度限制为100字符
    m_audio_url VARCHAR(255) NOT NULL,        		-- 歌曲音频地址，非空，长度限制为255字符
    m_singer VARCHAR(100) NOT NULL,           		-- 歌手名字，非空，长度限制为100字符
    m_album VARCHAR(100),                     	-- 专辑名称，长度限制为100字符，可以为空
    m_cover VARCHAR(255),                     	-- 封面地址，长度限制为255字符，可以为空
    m_time TIME NOT NULL,                     	-- 歌曲时长，非空，使用 TIME 格式
	m_video VARCHAR(255),                      	-- MV地址，长度限制为255字符，可以为空
	PRIMARY KEY (music_id)
);

-- 创建用户喜欢列表
CREATE TABLE user_like (
    u_username VARCHAR(50) NOT NULL,               						-- 当前元组所对应的用户的标识符，非空，外键
	like_id INT NOT NULL,                         						-- 当前元组所对应的音乐列表的标识符，非空，外键    
	PRIMARY KEY (u_username, like_id),             						-- 联合主键，由用户标识符和音乐列表标识符组成
	FOREIGN KEY (u_username) REFERENCES user_login(u_username) ON DELETE CASCADE,  -- 外键约束，引用 user_login 表的 u_username，支持级联删除
    FOREIGN KEY (like_id) REFERENCES music_list(music_id) ON DELETE CASCADE         	-- 外键约束，引用 music_list 表的 music_id，支持级联删除
);
-- 创建日志表
CREATE TABLE music_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,			-- 日志的唯一标识符，自增
    u_username VARCHAR(50),						-- 用户标识符
    l_action VARCHAR(50) NOT NULL,					-- 操作类型
    l_description VARCHAR(255),						-- 操作描述
    l_time DATETIME DEFAULT CURRENT_TIMESTAMP,		-- 操作时间，默认当前时间
    FOREIGN KEY (u_username) REFERENCES user_login(u_username)
);