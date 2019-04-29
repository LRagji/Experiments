CREATE TABLE IF NOT EXISTS "feedback" (
"id" serial Primary key,
"userid" integer not null,
"rating" integer,
"productid" integer not null,
"timestamp" bigint not null,
"comment" varchar(250) not null,
"status"integer not null,
"reply" integer not null default -1
);