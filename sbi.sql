CREATE DATABASE sbi_bank;

USE sbi_bank;

CREATE TABLE transactions (
    id VARCHAR(50) PRIMARY KEY,
    amount DECIMAL(12,2),
    type VARCHAR(50),
    direction VARCHAR(20),
    partyDisplay VARCHAR(100),
    time DATETIME,
    isLoanRepay BOOLEAN,
    clearedThisTx DECIMAL(12,2),
    totalCleared DECIMAL(12,2),
    remainingLoan DECIMAL(12,2),
    hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
