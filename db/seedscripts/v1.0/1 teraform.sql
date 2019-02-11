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