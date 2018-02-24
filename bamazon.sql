DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price_sold INT NOT NULL,
  inventory_amount INT NOT NULL
  PRIMARY KEY (item_id)
);


INSERT INTO products (item_id, product_name, department_name, price_sold, inventory_amount)
VALUES (1, "Socks", "Clothing", 5, 1000)