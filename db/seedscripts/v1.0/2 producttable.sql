create table products (
"id" serial Primary key,
"name" varchar(250) not null,
"price" float not null,
"discount" float  not null,
"image" text[] not null,
"description" varchar(500),
"keywords" text[], 
"meta" jsonb
)



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