create database bankingDatebase;

use bankingDatebase;

-- admin settings etc...
CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON mydatabase.* TO 'myuser'@'localhost';
FLUSH PRIVILEGES;

-- Test dummies
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    realname VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    userpassword VARCHAR(255) NOT NULL,
    user_id VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    savings_account_balance DECIMAL(10, 2),
    savings_account_iban VARCHAR(50),
    checking_account_balance DECIMAL(10, 2),
    checking_account_iban VARCHAR(50)
);

INSERT INTO clients (realname, username, userpassword, user_id, address, phone, email, savings_account_balance, savings_account_iban, checking_account_balance, checking_account_iban)
VALUES
('John Doe', 'test', 'idinaxoy', 'xLo_aqua', '123 Main St, Anytown, USA', '+1 123-456-7890', 'john.doe@email.com', 5000.56, 'US12345678901234567890', 2500.75, 'US09876543210987654321'),
('Jane Smith', 'jane_smith', 'password456', 'xLo_ukraine', '456 Elm St, Anytown, USA', '+1 123-456-7891', 'jane.smith@email.com', 7500.30, 'US11223344556677889900', 3000.90, 'US99887766554433221100'),
('Michael Johnson', 'michael_johnson', 'password789', 'xLo_sahbi', '789 Oak St, Anytown, USA', '+1 123-456-7892', 'michael.johnson@email.com', 4000.20, 'US11223344556677889911', 4500.60, 'US99887766554433221122'),
('Emily Brown', 'emily_brown', 'passwordabc', 'xLo_asia', '101 Pine St, Anytown, USA', '+1 123-456-7893', 'emily.brown@email.com', 6000.10, 'US11223344556677889922', 3800.40, 'US99887766554433221133'),
('William Taylor', 'william_taylor', 'passwordxyz', 'xLo_naxoy', '202 Maple St, Anytown, USA', '+1 123-456-7894', 'william.taylor@email.com', 5500.95, 'US11223344556677889933', 3200.30, 'US99887766554433221144');


CREATE TABLE TransactionHistory (Transaction_Id INT AUTO_INCREMENT PRIMARY KEY, userID VARCHAR(50), amount INT, destinantName VARCHAR(100), destinantIBAN VARCHAR(100));

SET SQL_SAFE_UPDATES = 0;