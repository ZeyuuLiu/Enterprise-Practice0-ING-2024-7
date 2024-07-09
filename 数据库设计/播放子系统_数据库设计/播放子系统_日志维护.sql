
-- 删除可能存在的旧触发器
DROP TRIGGER IF EXISTS trg_user_like_insert;
DROP TRIGGER IF EXISTS trg_user_like_delete;
DROP TRIGGER IF EXISTS trg_music_list_insert;
DROP TRIGGER IF EXISTS trg_music_list_update;
DROP TRIGGER IF EXISTS trg_music_list_delete;
DELIMITER //

-- 创建触发器：在插入到 user_like 表时记录日志
CREATE TRIGGER trg_user_like_insert
AFTER INSERT ON user_like
FOR EACH ROW
BEGIN
    INSERT INTO music_logs (u_username, l_action, l_description)
    VALUES (NEW.u_username, 'INSERT', CONCAT('User liked song with id ', NEW.like_id));
END;
//

-- 创建触发器：在删除 user_like 表时记录日志
CREATE TRIGGER trg_user_like_delete
AFTER DELETE ON user_like
FOR EACH ROW
BEGIN
    INSERT INTO music_logs (u_username, l_action, l_description)
    VALUES (OLD.u_username, 'DELETE', CONCAT('User unliked song with id ', OLD.like_id));
END;
//

-- 创建触发器：在插入到 music_list 表时记录日志
CREATE TRIGGER trg_music_list_insert
AFTER INSERT ON music_list
FOR EACH ROW
BEGIN
    INSERT INTO music_logs (u_username, l_action, l_description)
    VALUES (NULL, 'INSERT', CONCAT('Added song with id ', NEW.music_id, ' and name ', NEW.m_name));
END;
//

-- 创建触发器：在更新 music_list 表时记录日志
CREATE TRIGGER trg_music_list_update
AFTER UPDATE ON music_list
FOR EACH ROW
BEGIN
    INSERT INTO music_logs (u_username, l_action, l_description)
    VALUES (NULL, 'UPDATE', CONCAT('Updated song with id ', NEW.music_id, ' from ', OLD.m_name, ' to ', NEW.m_name));
END;
//

-- 创建触发器：在删除 music_list 表时记录日志
CREATE TRIGGER trg_music_list_delete
AFTER DELETE ON music_list
FOR EACH ROW
BEGIN
    INSERT INTO music_logs (u_username, l_action, l_description)
    VALUES (NULL, 'DELETE', CONCAT('Deleted song with id ', OLD.music_id, ' and name ', OLD.m_name));
END;
//

DELIMITER ;
