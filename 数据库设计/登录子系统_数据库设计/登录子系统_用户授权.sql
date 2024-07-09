GRANT ALL PRIVILEGES ON music_player.user_login TO 'app_user_login'@'localhost';
GRANT ALL PRIVILEGES ON music_player.user_email TO 'app_user_login'@'localhost';
GRANT ALL PRIVILEGES ON music_player.user_logs TO 'admin_user_login'@'localhost' WITH GRANT OPTION;
GRANT INSERT ON music_player.user_logs TO 'app_user_login'@'localhost';


