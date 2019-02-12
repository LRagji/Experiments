CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" DROP CONSTRAINT IF EXISTS "session_pkey";
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE TABLE IF NOT EXISTS "products" (
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
"brand" integer,
"categories" integer[],
"subcategories" integer[]
);

CREATE TABLE IF NOT EXISTS "products_archive" (
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
"brand" integer,
"categories" integer[],
"subcategories" integer[]
);

CREATE TABLE IF NOT EXISTS "categories" (
"id" serial Primary key,
"name" varchar(250) not null
);

CREATE TABLE IF NOT EXISTS "videos" (
"id" serial Primary key,
"name" varchar(250),
"tag" varchar(1000),
"text" text,
"ingredients" integer[],
"healthConditions" integer[]
);

CREATE TABLE IF NOT EXISTS "ingredients" (
"id" serial Primary key,
"name" varchar(250) not null
);

CREATE TABLE IF NOT EXISTS "healthConditions" (
"id" serial Primary key,
"name" varchar(250) not null
);

CREATE TABLE IF NOT EXISTS "wishlist" (
"id" serial Primary key,
"productId" integer not null,
"userId" integer not null
);

CREATE TABLE IF NOT EXISTS "subCategories" (
"id" serial Primary key,
"categoryId" integer not null,
"name" varchar(250) not null
);

CREATE TABLE IF NOT EXISTS "appSettings" (
"id" serial Primary key,
"key" varchar(250) not null,
"value" varchar(250) not null
);

CREATE TABLE IF NOT EXISTS "brands" (
"id" serial Primary key,
"name" varchar(250) not null,
"website" varchar(500) not null
);

CREATE TABLE IF NOT EXISTS "healthLinks" (
"id" serial Primary key,
"name" varchar(250) not null,
"url" varchar(500) not null,
"contents" text
);

CREATE TABLE IF NOT EXISTS "healthTopics" (
"id" serial Primary key,
"name" varchar(250) not null
);

CREATE TABLE IF NOT EXISTS "orders" (
"id" serial Primary key,
"userId" integer not null,
"date" bigint not null,
"status" varchar(250),
"tax" integer not null,
"products" jsonb[],
"shippingDetails" jsonb,
"payment" jsonb
);

INSERT INTO "appSettings" (key,value) values ('tsk',10);