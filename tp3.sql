CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Cards (
    card_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    card_number VARCHAR(16) NOT NULL,
    card_type VARCHAR(10) NOT NULL,
    expiry_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Transfers (
    transfer_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    recipient_name VARCHAR(100) NOT NULL,
    recipient_account VARCHAR(100) NOT NULL,
    send_amount DECIMAL(10, 2) NOT NULL,
    send_currency VARCHAR(10) NOT NULL,
    receive_amount DECIMAL(10, 2) NOT NULL,
    receive_currency VARCHAR(10) NOT NULL,
    transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE ConversionRates (
    currency_from VARCHAR(10),
    currency_to VARCHAR(10),
    rate DECIMAL(10, 4) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (currency_from, currency_to)
);
INSERT INTO ConversionRates (currency_from, currency_to, rate) VALUES 
('USD', 'EUR', 0.85),
('USD', 'CAD', 1.25),
('EUR', 'USD', 1.18),
('EUR', 'CAD', 1.47),
('CAD', 'USD', 0.80),
('CAD', 'EUR', 0.68);