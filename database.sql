CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    email VARCHAR (250) NOT NULL UNIQUE,
    hash_password VARCHAR (300) NOT NULL
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL UNIQUE
);

CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE user_product_favorite(
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      product_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (product_id) REFERENCES product (id)
);