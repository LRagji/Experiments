CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

create table products (
"id" serial Primary key,
"name" varchar(250) not null,
"offerprice" float not null,
"price" float not null,
"imageName" varchar(50) not null,
"faq" integer[] not null,
"keywords"varchar(250),
"meta" jsonb,
"description" text,
"ingredients" text,
"healthTopics" integer[],
"brand" integer
);

SELECT * INTO products_archive FROM products;

-- create table users(
-- 	"id" serial Primary Key,
-- 	"first" varchar(100) not null,
-- 	"last" varchar(100),
-- 	"mobile" varchar(100) not null,
-- 	"email" varchar(100) not null,
-- 	"password" varchar(100) not null,
-- 	"meta" jsonb
-- );

-- Insert Into users (first,last,mobile,email,password,meta)values
-- (
-- 	'Laukik','R','123456789','Laukik.Ragji@gmail.com','81d7df2cd5d931a654f48a43a8442d5d','{"type":"admin"}'
-- );

