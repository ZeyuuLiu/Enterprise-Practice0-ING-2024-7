-- 删除已存在的触发器
DROP TRIGGER IF EXISTS trg_user_login_insert;
DROP TRIGGER IF EXISTS trg_user_login_update;
DROP TRIGGER IF EXISTS trg_user_login_delete;
DROP TRIGGER IF EXISTS trg_user_email_insert;
DROP TRIGGER IF EXISTS trg_user_email_update;
DROP TRIGGER IF EXISTS trg_user_email_delete;
-- 更改终止符为 //
DELIMITER //

-- 创建 user_login 表的 INSERT 触发器
CREATE TRIGGER trg_user_login_insert
AFTER INSERT ON user_login
FOR EACH ROW
BEGIN
    INSERT INTO user_logs (u_username, l_type, l_description)
    VALUES (NEW.u_username, 'INSERT', 'User created');
END;
//

-- 创建 user_login 表的 UPDATE 触发器
CREATE TRIGGER trg_user_login_update
AFTER UPDATE ON user_login
FOR EACH ROW
BEGIN
    INSERT INTO user_logs (u_username, l_type, l_description)
    VALUES (NEW.u_username, 'UPDATE', CONCAT('User updated. Fields: ', OLD.u_username, ' -> ', NEW.u_username, ', ', OLD.u_password, ' -> ', NEW.u_password));
END;
//

-- 创建 user_login 表的 DELETE 触发器
CREATE TRIGGER trg_user_login_delete
AFTER DELETE ON user_login
FOR EACH ROW
BEGIN
    INSERT INTO user_logs (u_username, l_type, l_description)
    VALUES (OLD.u_username, 'DELETE', 'User deleted');
END;
//

-- 创建 user_email 表的 INSERT 触发器
CREATE TRIGGER trg_user_email_insert
AFTER INSERT ON user_email
FOR EACH ROW
BEGIN
    INSERT INTO user_logs (u_username, l_type, l_description)
    VALUES (NEW.u_username, 'INSERT', 'Email added');
END;
//

-- 创建 user_email 表的 UPDATE 触发器
CREATE TRIGGER trg_user_email_update
AFTER UPDATE ON user_email
FOR EACH ROW
BEGIN
    INSERT INTO user_logs (u_username, l_type, l_description)
    VALUES (NEW.u_username, 'UPDATE', CONCAT('Email updated. Fields: ', OLD.u_email, ' -> ', NEW.u_email));
END;
//

-- 创建 user_email 表的 DELETE 触发器
CREATE TRIGGER trg_user_email_delete
AFTER DELETE ON user_email
FOR EACH ROW
BEGIN
    INSERT INTO user_logs (u_username, l_type, l_description)
    VALUES (OLD.u_username, 'DELETE', 'Email deleted');
END;
//

-- 恢复终止符为 ;
DELIMITER ;

