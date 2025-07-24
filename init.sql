CREATE DATABASE IF NOT EXISTS server_db_shw;

GRANT ALL PRIVILEGES ON server_db.* TO 'user'@'%';
GRANT ALL PRIVILEGES ON server_db_shw.* TO 'user'@'%';
FLUSH PRIVILEGES;
