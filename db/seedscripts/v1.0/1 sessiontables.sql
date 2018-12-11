CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

create table manufacturer (
"id" serial primary key,
"name" varchar(250) not null,
"image" text[],
"website" varchar(250)
);

create table products (
"id" serial Primary key,
"mid" integer REFERENCES manufacturer(id) not null,
"name" varchar(250) not null,
"price" float not null,
"discount" float  not null,
"image" text[] not null,
"description" varchar(2000),
"ingredients" varchar(2000),
"keywords" text[], 
"meta" jsonb,
"sys_meta" jsonb
);

create table users(
	"id" serial Primary Key,
	"first" varchar(100) not null,
	"last" varchar(100),
	"mobile" varchar(100) not null,
	"email" varchar(100) not null,
	"password" varchar(100) not null,
	"meta" jsonb
);

Insert Into users (first,last,mobile,email,password,meta)values
(
	'Laukik','R','123456789','Laukik.Ragji@gmail.com','81d7df2cd5d931a654f48a43a8442d5d','{"type":"admin"}'
);

