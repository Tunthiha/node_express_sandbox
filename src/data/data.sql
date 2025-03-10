CREATE TABLE IF NOT EXISTS purchase_prices (
    id SERIAL PRIMARY KEY,
    Brand INT NULL,
    Description TEXT NULL,
    Price DECIMAL(10,2) NULL,
    Size TEXT NULL,
    Volume TEXT NULL,
    Classification INT NULL,
    PurchasePrice DECIMAL(10,2) NULL,
    VendorNumber INT NULL,
    VendorName TEXT NULL
);
