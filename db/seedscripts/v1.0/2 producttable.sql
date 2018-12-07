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

insert into manufacturer (name,image,website) 
values(
'HEALTHY ORIGINS',
 '{"./static/resources/images/M1.jpg",
 "./static/resources/images/M2.jpg",
 "./static/resources/images/M3.jpg",
 "./static/resources/images/M4.jpg"}',
 'http://www.healthyorigins.com/'
);

	insert into products (mid,name,price, discount,image,description,ingredients,keywords,meta,sys_meta) 
values
(1,
'Complete Product',
 100,
 1,
 '{"./static/resources/images/Product1.jpg",
 "./static/resources/images/Product2.jpg",
 "./static/resources/images/Product3.jpg",
 "./static/resources/images/Product4.jpg"}',
 '<ul><li>Protection from heart attack and stroke.</li><li>Lowers triglycerides, LDL and increases HDL.</li><li>Helps maintain healthy joints.</li><li>Key component of the brain and eye.</li><li>Important in the growth and development of the foetal brain during pregnancy.</li><li>Improves skin and eye health.</li><li>Helps in psoriasis and eczema.</li><li>Provide lubrication to the skin, arteries, veins and intestinal tract.</li><li>Helps in reducing depression.</li><li>Helps in Attention Deficit/Hyperactivity Disorder (ADHD)</li><li>Helps maintain normal blood sugar levels.</li><li>Lowers blood pressure.</li><li>Helps in Reducing breast, colon and prostate cancer.</li></ul>',
 '<table border="1" cellpadding="0" cellspacing="0" style="width:84.36%;" width="84%"><tbody><tr><td colspan="3" style="width:100.0%;"><p><strong>Supplement Facts:</strong></p></td></tr><tr><td colspan="3" style="width:100.0%;"><p><strong>Serving Size:</strong>&nbsp;1 Capsule</p></td></tr><tr><td>&nbsp;</td><td style="width:21.72%;"><p align="center"><strong>Amount Per Serving</strong></p></td><td style="width:20.22%;"><p align="center"><strong>% DV</strong></p></td></tr><tr><td><p>MegaNatural-BP<br>Grape Seed Extract<br>Vitus Vinifera Seed Standardized to 90% Polyphenols</p></td><td style="width:21.72%;"><p align="center">300 mg</p></td><td style="width:20.22%;"><p align="center">*</p></td></tr><tr><td colspan="3" style="width:100.0%;"><p>*Daily Value (DV) not established.</p></td></tr></tbody></table>',
 '{"Search","Me","Product","Hello","World"}',
 '{
	 "Category":"Diet",
 "Sub-Category":"Unknown",
 "code":"HO7914",
 "package_detail":"60veggie capsules",
 "serving_per_container":"This bottle will last 60 days",
 "serving_size":"1 capsule",
 "max_quantity":10,
 "shipping_time":"Ships in 3 days"
 }',
 '{
	 "position":20,
	 "sale":false,
	 "isNew":false,
	 "isTop":false,
	 "isActive":true,
	 "amazon":false,
	 "is_amazon_blocked":false,
	 "is_liquid":true
 }');

 	-- [product_id] [int] IDENTITY(1000,1) NOT NULL,
	-- [brand_id] [int] NOT NULL,
	-- [product_name] [varchar](250) NOT NULL,
	-- [part_no] [varchar](100) NULL,
	-- [asin] [varchar](100) NULL,
	-- [one_line_info] [varchar](250) NULL,
	-- [serving_size] [varchar](500) NULL,
	-- [product_code] [varchar](50) NOT NULL,

	-- [price_offer] [decimal](10, 2) NOT NULL,
	-- [price_final] [decimal](10, 2) NOT NULL,

	-- [image_bg] [varchar](250) NOT NULL,
	-- [image_sm] [varchar](250) NOT NULL,
	-- [image_bg1] [varchar](250) NULL,
	-- [image_sm1] [varchar](250) NULL,

	-- [serving_per_container] [varchar](500) NULL,
	-- [package_details] [varchar](250) NULL,
	-- [key_points] [text] NULL,

	-- [description] [text] NULL,

	-- [ingredients] [text] NULL,
	-- [product_faq] [text] NULL,
	-- [product_review] [text] NULL,
	-- [weight] [decimal](10, 2) NOT NULL,
	-- [max_order] [int] NOT NULL,
	
    -- [stock] [int] NOT NULL,
	
    -- [sku] [varchar](500) NULL,
	-- [display] [char](1) NOT NULL,
	-- [is_new_product] [char](1) NULL,
	-- [is_top_product] [char](1) NULL,
	-- [is_special_product] [char](1) NULL,
	-- [specialproduct_date] [datetime] NULL,
	-- [home_display] [char](1) NOT NULL,
	-- [position] [int] NULL,
	-- [search_keywords] [varchar](500) NULL,
	-- [meta_title] [varchar](500) NULL,
	-- [meta_keyword] [varchar](500) NULL,
	-- [meta_description] [varchar](500) NULL,
	-- [remarks] [varchar](500) NULL,
	-- [add_date] [datetime] NULL,
	-- [last_date] [datetime] NULL,
	-- [ipaddress] [varchar](50) NULL,
	-- [browser] [varchar](50) NULL,
	-- [user_id] [int] NULL,
	-- [date_inactivation] [datetime] NULL,
	-- [url] [varchar](500) NULL,
	-- [allow_to_buy] [char](1) NULL,
	-- [sales] [char](1) NULL,
	-- [healthkart] [char](1) NULL,
	-- [amazon] [char](1) NULL,
	-- [amazon_blocked] [char](1) NULL,
	-- [hsn_code] [varchar](50) NULL,
	-- [is_liquid] [char](1) NULL,
