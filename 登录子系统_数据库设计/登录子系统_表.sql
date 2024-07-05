DROP TABLE IF EXISTS user_logs;-- user_logs，先进行删除
DROP TABLE IF EXISTS user_email;-- 如果存在user_email，先进行删除
DROP TABLE IF EXISTS user_login; -- 如果存在user_login，先进行删除
-- 创建用户账户信息表
CREATE TABLE user_login (
    u_username VARCHAR(50) NOT NULL PRIMARY KEY, 	-- 用户名，长度限制为50字符，要求唯一且不为空
    u_password VARCHAR(255) NOT NULL				-- 密码字段，长度为255字符，存储加密后的密码
);


-- 创建用户邮箱信息表
CREATE TABLE user_email (
    u_username VARCHAR(50) NOT NULL PRIMARY KEY,		-- 用户的唯一标识符，作为外键引用 user_login 表的 u_username
    u_email VARCHAR(50),						-- 用户的邮箱，长度限制为50字符，可以为空
    FOREIGN KEY (u_username) REFERENCES user_login(u_username) ON DELETE CASCADE-- 为了维护数据库的一致性，采用级联删除
);


-- 创建登录系统日志表
CREATE TABLE user_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,		-- 日志的唯一标识符，自动递增
    u_username VARCHAR(50),					-- user_login 表的 u_username，用于记录操作日志的用户
    l_type VARCHAR(50) NOT NULL,				-- 日志类型，描述日志的类别或操作类型（例如登录、注销、密码更改等）
    l_description VARCHAR(255),					-- 日志描述，记录详细的操作信息或事件描述
    l_time DATETIME DEFAULT CURRENT_TIMESTAMP,	-- 日志创建时间，使用当前时间戳作为默认值
    FOREIGN KEY (u_username) REFERENCES user_login(u_username)
);
