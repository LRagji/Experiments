USE [healthm_live]
GO
/****** Object:  Table [dbo].[attributes_health_condition]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[attributes_health_condition](
	[attributes_id] [int] IDENTITY(500,1) NOT NULL,
	[attributes_name] [varchar](200) NULL,
	[image] [varchar](50) NULL,
	[details] [text] NULL,
	[meta_title] [varchar](500) NULL,
	[meta_keyword] [varchar](500) NULL,
	[meta_description] [varchar](500) NULL,
	[position] [int] NULL,
	[status] [char](1) NULL,
	[left_display] [char](1) NULL,
	[url] [varchar](500) NULL,
 CONSTRAINT [PK_master_attributes] PRIMARY KEY CLUSTERED 
(
	[attributes_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_attributes_health_condition_name] UNIQUE NONCLUSTERED 
(
	[attributes_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[banner_images]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[banner_images](
	[banner_image_id] [int] IDENTITY(1,1) NOT NULL,
	[banner_name] [varchar](250) NULL,
	[banner_url] [varchar](250) NULL,
	[image_name] [varchar](250) NULL,
	[image_type] [char](1) NULL,
	[status] [char](1) NULL,
 CONSTRAINT [PK_banner_images] PRIMARY KEY CLUSTERED 
(
	[banner_image_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[brand]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[brand](
	[brand_id] [int] IDENTITY(500,1) NOT NULL,
	[brand_name] [varchar](200) NULL,
	[image] [varchar](50) NULL,
	[image_frontend] [varchar](50) NULL,
	[brand_url] [varchar](200) NULL,
	[details] [text] NULL,
	[meta_title] [varchar](500) NULL,
	[meta_keyword] [varchar](500) NULL,
	[meta_description] [varchar](500) NULL,
	[position] [int] NULL,
	[status] [char](1) NULL,
	[left_display] [char](1) NULL,
	[url] [varchar](500) NULL,
 CONSTRAINT [PK_master_brand] PRIMARY KEY CLUSTERED 
(
	[brand_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_brand_name] UNIQUE NONCLUSTERED 
(
	[brand_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[card_info]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[card_info](
	[card_info_id] [int] NOT NULL,
	[bank_name] [varchar](50) NOT NULL,
	[bank_short_name] [varchar](50) NULL,
	[bank_code] [varchar](50) NOT NULL,
	[bank_id] [varchar](50) NOT NULL,
	[card_type] [int] NOT NULL,
	[status] [char](1) NOT NULL,
 CONSTRAINT [PK_card_info1] PRIMARY KEY CLUSTERED 
(
	[card_info_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category](
	[category_id] [int] IDENTITY(500,1) NOT NULL,
	[category_name] [varchar](200) NULL,
	[image] [varchar](50) NULL,
	[details] [text] NULL,
	[meta_title] [varchar](500) NULL,
	[meta_keyword] [varchar](500) NULL,
	[meta_description] [varchar](500) NULL,
	[position] [int] NULL,
	[status] [char](1) NULL,
	[left_display] [char](1) NULL,
	[url] [varchar](500) NULL,
 CONSTRAINT [PK_master_category] PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_category_name] UNIQUE NONCLUSTERED 
(
	[category_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[createxml]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[createxml](
	[xmldate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customer_amazon]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customer_amazon](
	[customer_amazon_id] [int] IDENTITY(1,1) NOT NULL,
	[customer_name] [varchar](250) NULL,
	[shipping_name] [varchar](250) NULL,
	[mobile_no] [varchar](50) NULL,
	[state_name] [varchar](250) NULL,
	[pincode] [varchar](25) NULL,
	[remarks] [text] NULL,
	[status] [char](1) NULL,
 CONSTRAINT [PK_customer_amazon] PRIMARY KEY CLUSTERED 
(
	[customer_amazon_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customer_referral]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customer_referral](
	[referral_id] [int] IDENTITY(1,1) NOT NULL,
	[customer_referral_id] [int] NOT NULL,
	[customer_id] [int] NOT NULL,
	[position] [int] NOT NULL,
	[percentage] [int] NOT NULL,
	[status] [char](1) NULL,
 CONSTRAINT [PK_customer_referral] PRIMARY KEY CLUSTERED 
(
	[referral_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customer_wishlist]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customer_wishlist](
	[customer_wishlist_id] [int] IDENTITY(1,1) NOT NULL,
	[customer_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
	[date_added] [datetime] NOT NULL,
 CONSTRAINT [PK_customer_wishlist] PRIMARY KEY CLUSTERED 
(
	[customer_wishlist_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customers]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customers](
	[customer_id] [int] IDENTITY(1,1) NOT NULL,
	[usertype_id] [int] NOT NULL,
	[title_id] [int] NOT NULL,
	[firstname] [varchar](150) NOT NULL,
	[lastname] [varchar](150) NULL,
	[mobile_no] [varchar](25) NOT NULL,
	[email_id] [varchar](200) NOT NULL,
	[password] [varchar](500) NOT NULL,
	[active_code] [varchar](50) NOT NULL,
	[reference_emailid] [varchar](200) NULL,
	[qualification_specialization] [varchar](500) NULL,
	[status] [char](1) NOT NULL,
	[remarks] [text] NULL,
	[ipaddress] [varchar](50) NOT NULL,
	[browser] [varchar](50) NOT NULL,
	[add_date] [datetime] NOT NULL,
	[last_date] [datetime] NOT NULL,
	[reference_id] [int] NULL,
	[reg_via] [char](1) NULL,
 CONSTRAINT [PK_members] PRIMARY KEY CLUSTERED 
(
	[customer_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_members_email_id] UNIQUE NONCLUSTERED 
(
	[email_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_members_mobile_no] UNIQUE NONCLUSTERED 
(
	[mobile_no] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customers_address]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customers_address](
	[address_id] [int] IDENTITY(1,1) NOT NULL,
	[sales_id] [int] NOT NULL,
	[member_id] [int] NOT NULL,
	[bill_title_id] [int] NOT NULL,
	[bill_first_name] [varchar](200) NOT NULL,
	[bill_last_name] [varchar](200) NOT NULL,
	[bill_address1] [varchar](500) NOT NULL,
	[bill_address2] [varchar](500) NOT NULL,
	[bill_address3] [varchar](500) NULL,
	[bill_city] [varchar](200) NOT NULL,
	[bill_pincode] [varchar](10) NOT NULL,
	[bill_state] [int] NOT NULL,
	[bill_country] [int] NOT NULL,
	[bill_telephone] [varchar](50) NOT NULL,
	[bill_mobile_no] [varchar](50) NOT NULL,
	[ship_title_id] [int] NULL,
	[ship_first_name] [varchar](200) NULL,
	[ship_last_name] [varchar](200) NULL,
	[ship_address1] [varchar](500) NULL,
	[ship_address2] [varchar](500) NULL,
	[ship_address3] [varchar](500) NULL,
	[ship_city] [varchar](200) NULL,
	[ship_pincode] [varchar](10) NULL,
	[ship_state] [int] NULL,
	[ship_country] [int] NULL,
	[ship_telephone] [varchar](50) NULL,
	[ship_mobile_no] [varchar](50) NULL,
	[instructions] [varchar](250) NULL,
 CONSTRAINT [PK_customer_address] PRIMARY KEY CLUSTERED 
(
	[address_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[d10exchnrate]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[d10exchnrate](
	[exchange_id] [int] NOT NULL,
	[exchage_date] [datetime] NOT NULL,
	[usd] [decimal](18, 2) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[d10ingredients]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[d10ingredients](
	[ingrident_id] [int] NOT NULL,
	[ingredient_name] [varchar](250) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[d10usertype]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[d10usertype](
	[usertype_id] [int] NOT NULL,
	[usertype_name] [varchar](50) NOT NULL,
	[usertype_status] [char](1) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[error_log]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[error_log](
	[error_log_id] [int] IDENTITY(1,1) NOT NULL,
	[error_datetime] [datetime] NOT NULL,
	[url] [varchar](max) NOT NULL,
	[url_exception] [varchar](max) NOT NULL,
	[ipaddress] [varchar](50) NOT NULL,
	[browser] [varchar](255) NOT NULL,
 CONSTRAINT [PK_error_log] PRIMARY KEY CLUSTERED 
(
	[error_log_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[experts_articles]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[experts_articles](
	[articles_id] [int] IDENTITY(1,1) NOT NULL,
	[articles_name] [varchar](255) NULL,
	[articles_description] [varchar](500) NULL,
	[articles_details] [text] NULL,
	[articles_pubdate] [datetime] NOT NULL,
	[articles_home] [char](1) NOT NULL,
	[articles_position] [int] NOT NULL,
	[articles_status] [char](1) NOT NULL,
	[articles_adddate] [datetime] NOT NULL,
 CONSTRAINT [PK_articles] PRIMARY KEY CLUSTERED 
(
	[articles_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_articles_name] UNIQUE NONCLUSTERED 
(
	[articles_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[fedex_shipper]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[fedex_shipper](
	[company_name] [varchar](150) NOT NULL,
	[sernder_name] [varchar](150) NULL,
	[address1] [varchar](150) NULL,
	[address2] [varchar](150) NULL,
	[city] [varchar](150) NULL,
	[state] [varchar](150) NULL,
	[pincode] [varchar](15) NULL,
	[phone] [varchar](150) NULL,
	[weight_unit] [varchar](150) NULL,
	[length] [varchar](150) NULL,
	[width] [varchar](150) NULL,
	[height] [varchar](150) NULL,
	[label_size] [nchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[feed_amazon]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[feed_amazon](
	[feed_amazon_id] [int] IDENTITY(1,1) NOT NULL,
	[feed_amazon_date] [datetime] NOT NULL,
	[feed_amazon_data] [text] NULL,
	[feed_amazon_no_of_orders] [int] NOT NULL,
	[feed_amazon_no_of_orders_unique] [int] NOT NULL,
	[feed_amazon_status] [char](1) NOT NULL,
 CONSTRAINT [PK_feed_amazon_1] PRIMARY KEY CLUSTERED 
(
	[feed_amazon_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[feed_amazon_details]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[feed_amazon_details](
	[feed_amazon_details_id] [int] IDENTITY(1,1) NOT NULL,
	[feed_amazon_id] [int] NOT NULL,
	[feed_amazon_order_id] [varchar](50) NOT NULL,
	[feed_amazon_order_data] [text] NULL,
	[feed_amazon_order_status] [char](1) NULL,
 CONSTRAINT [PK_feed_amazon_details] PRIMARY KEY CLUSTERED 
(
	[feed_amazon_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[feed_teamnutra]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[feed_teamnutra](
	[feed_teamnutra_id] [int] IDENTITY(1,1) NOT NULL,
	[feed_amazon_date] [datetime] NOT NULL,
	[feed_amazon_data] [text] NULL,
	[feed_amazon_no_of_orders] [int] NOT NULL,
	[feed_amazon_no_of_orders_unique] [int] NOT NULL,
	[feed_amazon_status] [char](1) NOT NULL,
 CONSTRAINT [PK_feed_teamnutra] PRIMARY KEY CLUSTERED 
(
	[feed_teamnutra_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[feed_teamnutra_details]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[feed_teamnutra_details](
	[feed_teamnutra_details_id] [int] IDENTITY(1,1) NOT NULL,
	[feed_teamnutra_id] [int] NOT NULL,
	[feed_amazon_order_id] [varchar](50) NOT NULL,
	[feed_amazon_order_data] [text] NULL,
	[feed_amazon_order_status] [char](1) NULL,
 CONSTRAINT [PK_feed_teamnutra_details] PRIMARY KEY CLUSTERED 
(
	[feed_teamnutra_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[health_faq]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[health_faq](
	[faq_id] [int] IDENTITY(1,1) NOT NULL,
	[question] [varchar](900) NOT NULL,
	[answer] [text] NULL,
	[position] [int] NOT NULL,
	[status] [char](1) NOT NULL,
 CONSTRAINT [PK_health_faq] PRIMARY KEY CLUSTERED 
(
	[faq_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_health_faq_question] UNIQUE NONCLUSTERED 
(
	[question] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[health_library]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[health_library](
	[health_library_id] [int] IDENTITY(1,1) NOT NULL,
	[health_library_name] [varchar](255) NULL,
	[health_library_description] [varchar](500) NULL,
	[health_library_details] [text] NULL,
	[health_library_pubdate] [datetime] NOT NULL,
	[health_library_home] [char](1) NOT NULL,
	[health_library_position] [int] NOT NULL,
	[health_library_status] [char](1) NOT NULL,
	[health_library_adddate] [datetime] NOT NULL,
	[meta_title] [text] NULL,
	[meta_keyword] [text] NULL,
	[meta_description] [text] NULL,
 CONSTRAINT [PK_health_library] PRIMARY KEY CLUSTERED 
(
	[health_library_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_health_library_name] UNIQUE NONCLUSTERED 
(
	[health_library_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[health_video]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[health_video](
	[health_video_id] [int] IDENTITY(1,1) NOT NULL,
	[health_video_name] [varchar](255) NULL,
	[health_video_description] [varchar](500) NULL,
	[health_video_details] [text] NULL,
	[health_video_video] [text] NULL,
	[health_video_minutes] [varchar](50) NULL,
	[health_video_pubdate] [datetime] NOT NULL,
	[health_video_home] [char](1) NOT NULL,
	[health_video_position] [int] NOT NULL,
	[health_video_status] [char](1) NOT NULL,
	[health_video_adddate] [datetime] NOT NULL,
	[meta_title] [text] NULL,
	[meta_keyword] [text] NULL,
	[meta_description] [text] NULL,
 CONSTRAINT [PK_health_video] PRIMARY KEY CLUSTERED 
(
	[health_video_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_health_video_name] UNIQUE NONCLUSTERED 
(
	[health_video_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[health_video_condition]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[health_video_condition](
	[health_video_condition_id] [int] IDENTITY(1,1) NOT NULL,
	[health_condition_id] [int] NOT NULL,
	[health_video_id] [int] NOT NULL,
 CONSTRAINT [PK_health_video_condition] PRIMARY KEY CLUSTERED 
(
	[health_video_condition_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[health_video_ingredients]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[health_video_ingredients](
	[health_video_ingredients_id] [int] IDENTITY(1,1) NOT NULL,
	[health_ingredients_id] [int] NOT NULL,
	[health_video_id] [int] NOT NULL,
 CONSTRAINT [PK_health_video_ingredients] PRIMARY KEY CLUSTERED 
(
	[health_video_ingredients_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[health_video_library]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[health_video_library](
	[health_video_library_id] [int] IDENTITY(1,1) NOT NULL,
	[health_library_id] [int] NOT NULL,
	[health_video_id] [int] NOT NULL,
 CONSTRAINT [PK_health_video_library] PRIMARY KEY CLUSTERED 
(
	[health_video_library_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[home_listing]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[home_listing](
	[home_listing_id] [int] IDENTITY(1,1) NOT NULL,
	[home_listing_name] [varchar](250) NOT NULL,
	[product_id1] [int] NOT NULL,
	[product_id2] [int] NOT NULL,
	[product_id3] [int] NOT NULL,
	[product_id4] [int] NOT NULL,
	[product_id5] [int] NOT NULL,
	[product_id6] [int] NOT NULL,
	[product_id7] [int] NOT NULL,
	[product_id8] [int] NOT NULL,
	[product_id9] [int] NOT NULL,
	[product_id10] [int] NOT NULL,
	[product_id11] [int] NOT NULL,
	[product_id12] [int] NOT NULL,
	[product_id13] [int] NOT NULL,
	[product_id14] [int] NOT NULL,
	[product_id15] [int] NOT NULL,
	[product_id16] [int] NOT NULL,
	[product_id17] [int] NOT NULL,
	[product_id18] [int] NOT NULL,
	[product_id19] [int] NOT NULL,
	[product_id20] [int] NOT NULL,
	[postion] [int] NOT NULL,
	[link_name] [varchar](250) NULL,
	[link] [varchar](250) NULL,
	[status] [char](1) NULL,
 CONSTRAINT [PK_home_listing] PRIMARY KEY CLUSTERED 
(
	[home_listing_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ingredients]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ingredients](
	[ingrident_id] [int] IDENTITY(1,1) NOT NULL,
	[ingredient_name] [varchar](250) NOT NULL,
 CONSTRAINT [PK_ingredients] PRIMARY KEY CLUSTERED 
(
	[ingrident_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[inventory]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inventory](
	[inventory_id] [int] IDENTITY(1,1) NOT NULL,
	[company_name] [varchar](250) NULL,
	[address] [varchar](500) NULL,
	[inventory_type] [char](1) NOT NULL,
	[invoice_no] [varchar](50) NOT NULL,
	[invoice_date] [datetime] NOT NULL,
	[invoice_amount] [decimal](10, 2) NOT NULL,
	[total_items] [int] NOT NULL,
	[total_quantity] [int] NOT NULL,
	[added_by] [int] NOT NULL,
	[added_date] [datetime] NOT NULL,
	[last_update_by] [int] NOT NULL,
	[last_update_date] [datetime] NOT NULL,
	[remarks] [text] NULL,
	[status] [char](1) NULL,
	[po_no] [varchar](50) NULL,
	[exp_arrival_date] [datetime] NULL,
	[new_exp_arrival_date] [datetime] NULL,
 CONSTRAINT [PK_inventory] PRIMARY KEY CLUSTERED 
(
	[inventory_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[inventory_details]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inventory_details](
	[inventory_details_id] [int] IDENTITY(1,1) NOT NULL,
	[inventory_id] [int] NOT NULL,
	[sku] [varchar](50) NOT NULL,
	[product_id] [int] NOT NULL,
	[product_price] [decimal](10, 2) NULL,
	[batch_id] [varchar](50) NOT NULL,
	[exp_date] [datetime] NULL,
	[quantity] [int] NOT NULL,
	[healthmall] [int] NULL,
	[amazon] [int] NULL,
	[healthcart] [int] NULL,
 CONSTRAINT [PK_inventory_details] PRIMARY KEY CLUSTERED 
(
	[inventory_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[inventory_product]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inventory_product](
	[inventory_product_id] [int] IDENTITY(1,1) NOT NULL,
	[inventory_details_id] [int] NOT NULL,
	[inventory_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
	[product_price] [decimal](10, 2) NOT NULL,
	[batch_id] [varchar](50) NOT NULL,
	[exp_date] [datetime] NULL,
	[order_id] [varchar](200) NOT NULL,
	[reference_no] [varchar](200) NOT NULL,
	[product_status] [int] NOT NULL,
	[remarks] [text] NULL,
	[ship_date] [datetime] NULL,
	[product_stock_type] [char](1) NULL,
 CONSTRAINT [PK_inventory_product] PRIMARY KEY CLUSTERED 
(
	[inventory_product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[inventory_product_temp]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inventory_product_temp](
	[inventory_product_id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NOT NULL,
	[upc] [varchar](250) NULL,
	[product_price] [decimal](10, 2) NOT NULL,
	[batch_id] [varchar](50) NOT NULL,
	[exp_date] [datetime] NULL,
	[quantity] [int] NULL,
	[file_name] [varchar](250) NULL,
 CONSTRAINT [PK_inventory_product_temp] PRIMARY KEY CLUSTERED 
(
	[inventory_product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[inventory_product_update]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inventory_product_update](
	[inventory_product_temp_id] [int] IDENTITY(1,1) NOT NULL,
	[inventory_product_id] [int] NOT NULL,
	[inventory_details_id] [int] NOT NULL,
	[inventory_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
	[trans_date] [datetime] NULL,
	[inventory_id_new] [int] NULL,
	[product_price] [decimal](10, 2) NULL,
	[batch_id] [varchar](50) NULL,
	[exp_date] [datetime] NULL,
	[status] [char](1) NULL,
 CONSTRAINT [PK_inventory_product_update] PRIMARY KEY CLUSTERED 
(
	[inventory_product_temp_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[inventory_report]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inventory_report](
	[inventory_report_id] [int] IDENTITY(1,1) NOT NULL,
	[inventory_date] [datetime] NULL,
	[inventory_no_records] [int] NULL,
	[inventory_by] [char](100) NULL,
	[file_name] [varchar](200) NULL,
	[page_name] [varchar](200) NULL,
	[status] [char](1) NULL,
 CONSTRAINT [PK_inventory_report] PRIMARY KEY CLUSTERED 
(
	[inventory_report_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[inventory_report_details]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inventory_report_details](
	[inventory_report_details_id] [int] IDENTITY(1,1) NOT NULL,
	[inventory_report_id] [int] NULL,
	[product_id] [int] NULL,
	[product_name] [varchar](500) NULL,
	[old_stock] [int] NULL,
	[new_stock] [int] NULL,
	[status] [char](100) NULL,
 CONSTRAINT [PK_inventory_report_details] PRIMARY KEY CLUSTERED 
(
	[inventory_report_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[loginfo]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[loginfo](
	[log_id] [int] IDENTITY(1,1) NOT NULL,
	[log_date] [datetime] NULL,
	[usertype_id] [int] NULL,
	[username] [varchar](255) NULL,
	[status] [char](1) NULL,
	[ipaddress] [varchar](255) NULL,
	[browser] [varchar](255) NULL,
	[city] [varchar](255) NULL,
	[country] [varchar](255) NULL,
	[login_at] [char](1) NULL,
 CONSTRAINT [PK_loginfo] PRIMARY KEY CLUSTERED 
(
	[log_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_company]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_company](
	[company_name] [varchar](500) NOT NULL,
	[company_address] [varchar](500) NOT NULL,
	[company_contact] [varchar](500) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_country]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_country](
	[country_id] [int] IDENTITY(1,1) NOT NULL,
	[country_name] [varchar](200) NULL,
	[country_status] [char](1) NULL,
 CONSTRAINT [PK_master_country] PRIMARY KEY CLUSTERED 
(
	[country_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_courier]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_courier](
	[courier_id] [int] IDENTITY(1,1) NOT NULL,
	[courier_name] [varchar](200) NULL,
	[amazon_name] [varchar](200) NULL,
	[courier_url] [varchar](200) NULL,
	[courier_default] [char](1) NULL,
	[status] [char](1) NULL,
 CONSTRAINT [PK_master_courier] PRIMARY KEY CLUSTERED 
(
	[courier_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_exchange_rate]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_exchange_rate](
	[exchange_id] [int] IDENTITY(1,1) NOT NULL,
	[exchage_date] [datetime] NOT NULL,
	[usd] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_master_exchange_rate] PRIMARY KEY CLUSTERED 
(
	[exchange_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_ip_block]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_ip_block](
	[block_ip_id] [int] IDENTITY(1,1) NOT NULL,
	[ip_address] [varchar](250) NULL,
	[status] [char](1) NULL,
 CONSTRAINT [PK_master_ip_block] PRIMARY KEY CLUSTERED 
(
	[block_ip_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_market_place]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_market_place](
	[market_place_id] [int] IDENTITY(1,1) NOT NULL,
	[healthmall] [int] NULL,
	[amazon] [int] NULL,
	[healthkart] [int] NULL,
 CONSTRAINT [PK_master_market_place] PRIMARY KEY CLUSTERED 
(
	[market_place_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_pack_size]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_pack_size](
	[pack_id] [int] IDENTITY(1,1) NOT NULL,
	[pack_size_name] [varchar](250) NULL,
	[length] [int] NULL,
	[width] [int] NULL,
	[height] [int] NULL,
	[weight] [varchar](50) NULL,
 CONSTRAINT [PK_master_pack_size] PRIMARY KEY CLUSTERED 
(
	[pack_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_paymentsetup]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_paymentsetup](
	[paymentsetup_id] [int] NOT NULL,
	[payment_type] [varchar](250) NOT NULL,
	[online] [char](1) NOT NULL,
	[admin] [char](1) NOT NULL,
	[remarks] [text] NULL,
	[position] [char](1) NULL,
 CONSTRAINT [PK_master_paymentsetup] PRIMARY KEY CLUSTERED 
(
	[paymentsetup_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_payu]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_payu](
	[payu_id] [int] IDENTITY(1,1) NOT NULL,
	[MERCHANT_KEY] [varchar](100) NULL,
	[SALT] [varchar](100) NULL,
	[PAYU_BASE_URL] [varchar](250) NULL,
	[action] [varchar](100) NULL,
	[hashSequence] [nchar](100) NULL,
	[service_provider] [varchar](100) NULL,
	[url_success] [varchar](100) NULL,
	[url_failure] [varchar](100) NULL,
	[url_cancel] [varchar](100) NULL,
	[status] [char](1) NULL,
 CONSTRAINT [PK_master_payu] PRIMARY KEY CLUSTERED 
(
	[payu_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_pincode]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_pincode](
	[pincode_id] [int] IDENTITY(1,1) NOT NULL,
	[country_id] [int] NULL,
	[state_id] [int] NULL,
	[city_name] [varchar](250) NULL,
	[pincode] [varchar](25) NULL,
	[fedex_service] [char](1) NULL,
	[fedex_cod] [char](1) NULL,
	[bluedart_service] [char](1) NULL,
	[bluedart_cod] [char](1) NULL,
 CONSTRAINT [PK_master_pincode] PRIMARY KEY CLUSTERED 
(
	[pincode_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_settings]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_settings](
	[master_settings_id] [int] IDENTITY(1,1) NOT NULL,
	[nostock_msg] [varchar](250) NULL,
	[promo_amount] [decimal](18, 2) NULL,
	[cart_amount] [decimal](18, 2) NULL,
	[status] [int] NULL,
 CONSTRAINT [PK_master_settings] PRIMARY KEY CLUSTERED 
(
	[master_settings_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_sms_setting]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_sms_setting](
	[smsset_id] [int] IDENTITY(1,1) NOT NULL,
	[sms_url] [varchar](255) NULL,
	[sms_dr] [varchar](255) NULL,
	[sms_balance] [varchar](255) NULL,
	[sms_userid] [varchar](255) NULL,
	[sms_pass] [varchar](255) NULL,
	[sms_apipass] [varchar](255) NULL,
	[gsm] [varchar](255) NULL,
	[cdma] [varchar](255) NULL,
	[status] [char](1) NULL,
	[sms_priceach] [float] NULL,
 CONSTRAINT [PK_master_sms] PRIMARY KEY CLUSTERED 
(
	[smsset_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_state]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_state](
	[state_id] [int] IDENTITY(1,1) NOT NULL,
	[country_id] [int] NOT NULL,
	[state_name] [varchar](50) NOT NULL,
	[status] [char](1) NOT NULL,
	[state_default] [char](1) NULL,
 CONSTRAINT [PK_master_state] PRIMARY KEY CLUSTERED 
(
	[state_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_tax]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_tax](
	[tax_id] [int] IDENTITY(1,1) NOT NULL,
	[tax] [decimal](18, 0) NOT NULL,
	[tax_date] [datetime] NOT NULL,
 CONSTRAINT [PK_tax] PRIMARY KEY CLUSTERED 
(
	[tax_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_title]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_title](
	[title_id] [int] IDENTITY(1,1) NOT NULL,
	[title_name] [varchar](200) NULL,
	[status] [char](1) NULL,
	[position] [int] NULL,
 CONSTRAINT [PK_master_title] PRIMARY KEY CLUSTERED 
(
	[title_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_master_title_name] UNIQUE NONCLUSTERED 
(
	[title_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_users]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[usertype_id] [int] NOT NULL,
	[name] [varchar](150) NOT NULL,
	[email_id] [varchar](250) NOT NULL,
	[mobile_no] [varchar](25) NOT NULL,
	[telephone_no] [varchar](25) NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[status] [char](1) NOT NULL,
	[ipaddress] [varchar](255) NULL,
	[lock] [char](1) NOT NULL,
 CONSTRAINT [PK_general_users] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_general_users_email_id] UNIQUE NONCLUSTERED 
(
	[email_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_general_users_username] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[master_usertype]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master_usertype](
	[usertype_id] [int] IDENTITY(1,1) NOT NULL,
	[usertype_name] [varchar](50) NOT NULL,
	[usertype_status] [char](1) NOT NULL,
 CONSTRAINT [PK_general_usertype] PRIMARY KEY CLUSTERED 
(
	[usertype_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[news]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[news](
	[news_id] [int] IDENTITY(1,1) NOT NULL,
	[news_name] [varchar](255) NULL,
	[news_description] [varchar](500) NULL,
	[news_details] [text] NULL,
	[news_pubdate] [datetime] NOT NULL,
	[news_home] [char](1) NOT NULL,
	[news_position] [int] NOT NULL,
	[news_status] [char](1) NOT NULL,
	[news_adddate] [datetime] NOT NULL,
 CONSTRAINT [PK_news] PRIMARY KEY CLUSTERED 
(
	[news_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_news_name] UNIQUE NONCLUSTERED 
(
	[news_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order](
	[order_id] [int] IDENTITY(1,1) NOT NULL,
	[sales_channel] [int] NOT NULL,
	[order_id_feed] [varchar](100) NOT NULL,
	[purchase_date] [datetime] NOT NULL,
	[buyer_email] [varchar](850) NULL,
	[buyer_name] [varchar](850) NULL,
	[shipping_name] [varchar](850) NULL,
	[addressline1] [varchar](850) NULL,
	[addressline2] [varchar](850) NULL,
	[city] [varchar](850) NULL,
	[state] [varchar](850) NULL,
	[country] [varchar](850) NULL,
	[postalcode] [varchar](850) NULL,
	[phone] [varchar](850) NULL,
	[amount] [decimal](10, 2) NULL,
	[payment_method] [varchar](850) NULL,
	[number_of_items] [int] NULL,
	[number_of_items_shipped] [int] NULL,
	[order_status] [varchar](850) NULL,
	[shipped_by] [varchar](850) NULL,
	[earliest_ship_date] [datetime] NULL,
	[latest_ship_date] [datetime] NULL,
	[earliest_delivery_date] [datetime] NULL,
	[latest_delivery_date] [datetime] NULL,
	[address_edit_status] [nchar](10) NULL,
 CONSTRAINT [PK_order] PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_details]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_details](
	[order_details_id] [int] IDENTITY(1,1) NOT NULL,
	[feed_amazon_id] [int] NULL,
	[feed_amazon_details_id] [int] NULL,
	[order_id] [int] NOT NULL,
	[order_item_id] [varchar](50) NOT NULL,
	[asin] [varchar](100) NULL,
	[seller_sku] [varchar](100) NULL,
	[product_id] [int] NULL,
	[product_name] [text] NULL,
	[quantity_ordered] [int] NULL,
	[quanity_shipped] [int] NULL,
	[amount] [decimal](10, 2) NULL,
	[amount_tax] [decimal](10, 2) NULL,
	[amount_shipping] [decimal](10, 2) NULL,
	[amount_shipping_tax] [decimal](10, 2) NULL,
	[amount_gift] [decimal](10, 2) NULL,
	[amount_gift_tax] [decimal](10, 2) NULL,
	[amount_shipping_discount] [decimal](10, 2) NULL,
	[amount_promotion] [decimal](10, 2) NULL,
 CONSTRAINT [PK_order_details] PRIMARY KEY CLUSTERED 
(
	[order_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_ship]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_ship](
	[order_ship_id] [int] IDENTITY(1,1) NOT NULL,
	[market_place_id] [int] NOT NULL,
	[order_id] [varchar](50) NOT NULL,
	[order_details_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
	[quantity] [int] NOT NULL,
	[courier_id] [int] NOT NULL,
	[tracking_no] [varchar](150) NOT NULL,
	[code] [varchar](100) NULL,
	[weight_kg] [decimal](18, 2) NULL,
	[dimension_length] [decimal](18, 2) NULL,
	[dimension_width] [decimal](18, 2) NULL,
	[dimension_height] [decimal](18, 2) NULL,
	[ship_date] [datetime] NULL,
	[current_status] [varchar](250) NULL,
	[courier_name] [varchar](500) NULL,
	[awb_no] [varchar](50) NULL,
	[image_name] [varchar](500) NULL,
 CONSTRAINT [PK_order_ship] PRIMARY KEY CLUSTERED 
(
	[order_ship_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[payment_verify]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[payment_verify](
	[payment_verify_id] [int] IDENTITY(1,1) NOT NULL,
	[payment_date] [datetime] NULL,
	[transactionlog_id] [int] NULL,
	[paymentsetup_id] [int] NULL,
	[payment_amount] [decimal](18, 2) NULL,
	[status] [char](1) NULL,
 CONSTRAINT [PK_payment_verify] PRIMARY KEY CLUSTERED 
(
	[payment_verify_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[payout_referral]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[payout_referral](
	[payout_referral_id] [int] IDENTITY(1,1) NOT NULL,
	[payout_date] [datetime] NOT NULL,
	[customer_id] [int] NOT NULL,
	[total_amount] [decimal](18, 2) NOT NULL,
	[payment_status] [char](1) NOT NULL,
	[payment_type] [int] NOT NULL,
	[cheque_dd_no] [varchar](50) NOT NULL,
	[cheque_dd_date] [datetime] NOT NULL,
	[cheque_dd_bank] [varchar](200) NOT NULL,
	[cheque_dd_bankbranch] [varchar](200) NOT NULL,
	[reference_no] [varchar](200) NOT NULL,
	[remarks] [varchar](500) NULL,
 CONSTRAINT [PK_payout_referral] PRIMARY KEY CLUSTERED 
(
	[payout_referral_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[payout_referral_details]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[payout_referral_details](
	[payout_referral_det_id] [int] IDENTITY(1,1) NOT NULL,
	[payout_referral_id] [int] NOT NULL,
	[customer_id] [int] NOT NULL,
	[customer_registered_id] [int] NOT NULL,
	[sales_product_id] [int] NOT NULL,
	[sales_total_amount] [decimal](18, 2) NOT NULL,
	[percentage] [int] NOT NULL,
	[total_amount] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_payout_referral_details] PRIMARY KEY CLUSTERED 
(
	[payout_referral_det_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product](
	[product_id] [int] IDENTITY(1000,1) NOT NULL,
	[brand_id] [int] NOT NULL,
	[product_name] [varchar](250) NOT NULL,
	[part_no] [varchar](100) NULL,
	[asin] [varchar](100) NULL,
	[one_line_info] [varchar](250) NULL,
	[serving_size] [varchar](500) NULL,
	[product_code] [varchar](50) NOT NULL,
	[price_offer] [decimal](10, 2) NOT NULL,
	[price_final] [decimal](10, 2) NOT NULL,
	[image_bg] [varchar](250) NOT NULL,
	[image_sm] [varchar](250) NOT NULL,
	[image_bg1] [varchar](250) NULL,
	[image_sm1] [varchar](250) NULL,
	[serving_per_container] [varchar](500) NULL,
	[package_details] [varchar](250) NULL,
	[key_points] [text] NULL,
	[description] [text] NULL,
	[ingredients] [text] NULL,
	[product_faq] [text] NULL,
	[product_review] [text] NULL,
	[weight] [decimal](10, 2) NOT NULL,
	[max_order] [int] NOT NULL,
	[stock] [int] NOT NULL,
	[sku] [varchar](500) NULL,
	[display] [char](1) NOT NULL,
	[is_new_product] [char](1) NULL,
	[is_top_product] [char](1) NULL,
	[is_special_product] [char](1) NULL,
	[specialproduct_date] [datetime] NULL,
	[home_display] [char](1) NOT NULL,
	[position] [int] NULL,
	[search_keywords] [varchar](500) NULL,
	[meta_title] [varchar](500) NULL,
	[meta_keyword] [varchar](500) NULL,
	[meta_description] [varchar](500) NULL,
	[remarks] [varchar](500) NULL,
	[add_date] [datetime] NULL,
	[last_date] [datetime] NULL,
	[ipaddress] [varchar](50) NULL,
	[browser] [varchar](50) NULL,
	[user_id] [int] NULL,
	[date_inactivation] [datetime] NULL,
	[url] [varchar](500) NULL,
	[allow_to_buy] [char](1) NULL,
	[sales] [char](1) NULL,
	[healthkart] [char](1) NULL,
	[amazon] [char](1) NULL,
	[amazon_blocked] [char](1) NULL,
	[hsn_code] [varchar](50) NULL,
	[is_liquid] [char](1) NULL,
 CONSTRAINT [PK_product] PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_product_code] UNIQUE NONCLUSTERED 
(
	[product_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_product_name] UNIQUE NONCLUSTERED 
(
	[product_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_attribute]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_attribute](
	[product_attribute_id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NOT NULL,
	[attributes_id] [int] NOT NULL,
 CONSTRAINT [PK_product_attribute] PRIMARY KEY CLUSTERED 
(
	[product_attribute_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_details]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_details](
	[product_details_id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NOT NULL,
	[category_id] [int] NOT NULL,
	[subcategory_id] [int] NOT NULL,
 CONSTRAINT [PK_product_details] PRIMARY KEY CLUSTERED 
(
	[product_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_health_library]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_health_library](
	[product_health_library_id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NOT NULL,
	[health_library_id] [int] NOT NULL,
 CONSTRAINT [PK_product_health_library] PRIMARY KEY CLUSTERED 
(
	[product_health_library_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_health_video]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_health_video](
	[product_health_video_id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NOT NULL,
	[health_video_id] [int] NOT NULL,
 CONSTRAINT [PK_product_health_video] PRIMARY KEY CLUSTERED 
(
	[product_health_video_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_hit_details------]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_hit_details------](
	[product_hit_details_id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NOT NULL,
	[customer_id] [int] NOT NULL,
	[hit_datetime] [datetime] NOT NULL,
	[city] [varchar](200) NULL,
	[country] [varchar](200) NULL,
	[ipaddress] [varchar](25) NOT NULL,
	[browser] [varchar](255) NOT NULL,
 CONSTRAINT [PK_product_hit_details] PRIMARY KEY CLUSTERED 
(
	[product_hit_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_hits------]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_hits------](
	[product_hit_id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NOT NULL,
	[hit_date] [datetime] NOT NULL,
	[total_hits] [int] NOT NULL,
 CONSTRAINT [PK_product_hit] PRIMARY KEY CLUSTERED 
(
	[product_hit_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_related ]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_related ](
	[product_related _id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NOT NULL,
	[productrelated_id] [int] NOT NULL,
 CONSTRAINT [PK_product_related ] PRIMARY KEY CLUSTERED 
(
	[product_related _id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_review]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_review](
	[review_id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NOT NULL,
	[customer_id] [int] NOT NULL,
	[usertype_id] [int] NOT NULL,
	[review_date] [datetime] NOT NULL,
	[status] [char](1) NULL,
	[ipaddress] [varchar](50) NULL,
	[brower] [varchar](50) NULL,
	[automated_email] [char](1) NULL,
	[add_date] [datetime] NULL,
 CONSTRAINT [PK_product_review] PRIMARY KEY CLUSTERED 
(
	[review_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_review_details]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_review_details](
	[review_det_id] [int] IDENTITY(1,1) NOT NULL,
	[review_id] [int] NULL,
	[product_id] [int] NULL,
	[your_name] [varchar](200) NULL,
	[your_city] [varchar](200) NULL,
	[your_title] [varchar](200) NULL,
	[your_review] [text] NULL,
	[display_info] [char](1) NULL,
	[email_id] [varchar](255) NULL,
	[overall_rating] [char](1) NULL,
 CONSTRAINT [PK_product_review_details] PRIMARY KEY CLUSTERED 
(
	[review_det_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_same]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_same](
	[product_same_id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NOT NULL,
	[product_same_name] [varchar](500) NOT NULL,
 CONSTRAINT [PK_product_same] PRIMARY KEY CLUSTERED 
(
	[product_same_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[promo_code]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[promo_code](
	[promo_code_id] [int] IDENTITY(1,1) NOT NULL,
	[allowed_for] [int] NOT NULL,
	[promo_code] [varchar](50) NOT NULL,
	[brands] [int] NULL,
	[product] [int] NULL,
	[amount_type] [char](1) NOT NULL,
	[promo_amount] [decimal](18, 2) NOT NULL,
	[cart_amount] [decimal](18, 2) NOT NULL,
	[valid_from] [datetime] NOT NULL,
	[valid_to] [datetime] NOT NULL,
	[usage] [char](1) NOT NULL,
	[allow_edit] [char](1) NOT NULL,
	[promo_status] [char](1) NOT NULL,
	[promo_remarks] [text] NULL,
	[expiry_date] [datetime] NOT NULL,
	[used] [char](1) NOT NULL,
	[created_date] [datetime] NULL,
	[created_by] [char](1) NULL,
 CONSTRAINT [PK_promo_code] PRIMARY KEY CLUSTERED 
(
	[promo_code_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_promo_code] UNIQUE NONCLUSTERED 
(
	[promo_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[promocode_brandlist]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[promocode_brandlist](
	[promocode_brand_id] [int] IDENTITY(1,1) NOT NULL,
	[promo_code_id] [int] NOT NULL,
	[brand_id] [int] NOT NULL,
 CONSTRAINT [PK_promocode_brandlist] PRIMARY KEY CLUSTERED 
(
	[promocode_brand_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[reference]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[reference](
	[reference_id] [int] IDENTITY(1,1) NOT NULL,
	[reference_name] [varchar](100) NULL,
	[reference_code] [varchar](10) NULL,
	[status] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sales_product]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sales_product](
	[sales_product_id] [int] IDENTITY(500,1) NOT NULL,
	[transaction_log_id] [int] NOT NULL,
	[sales_date] [datetime] NOT NULL,
	[member_id] [int] NOT NULL,
	[total_weight] [decimal](18, 2) NOT NULL,
	[total_amount] [decimal](18, 2) NOT NULL,
	[tax] [decimal](18, 2) NOT NULL,
	[promo_code_id] [int] NULL,
	[promo_code] [varchar](200) NULL,
	[promo_amount_type] [char](1) NULL,
	[promo_amount] [decimal](18, 2) NULL,
	[shipping_amount] [decimal](18, 2) NULL,
	[cod] [decimal](18, 2) NOT NULL,
	[grandtotal] [decimal](18, 2) NOT NULL,
	[payment_status] [char](1) NOT NULL,
	[order_status] [char](1) NULL,
	[sales_review] [varchar](50) NOT NULL,
	[sales_admin] [int] NULL,
	[sales_admin_code] [varchar](50) NULL,
	[reference_po_date] [datetime] NULL,
	[reference_exp_arrv_date] [datetime] NULL,
	[sales_at] [char](2) NULL,
	[login_at] [char](2) NULL,
	[reference_id] [int] NULL,
 CONSTRAINT [PK_sales_product] PRIMARY KEY CLUSTERED 
(
	[sales_product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sales_product_details]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sales_product_details](
	[sales_product_details_id] [int] IDENTITY(1,1) NOT NULL,
	[sales_product_id] [int] NOT NULL,
	[member_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
	[product_code] [varchar](200) NULL,
	[product_name] [varchar](200) NOT NULL,
	[category_id] [int] NOT NULL,
	[subcategory_id] [int] NOT NULL,
	[quantity] [int] NOT NULL,
	[amount] [decimal](18, 2) NOT NULL,
	[weight] [decimal](18, 2) NOT NULL,
	[total_amount] [decimal](18, 2) NOT NULL,
	[total_weight] [decimal](18, 2) NOT NULL,
	[discount_offer] [decimal](18, 2) NULL,
	[discount_type] [char](1) NULL,
	[order_status] [char](1) NULL,
	[stock_info] [int] NULL,
 CONSTRAINT [PK_sales_product_details] PRIMARY KEY CLUSTERED 
(
	[sales_product_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sales_product_payment]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sales_product_payment](
	[sales_payment_id] [int] IDENTITY(1,1) NOT NULL,
	[sales_product_id] [int] NOT NULL,
	[payment_type] [int] NOT NULL,
	[amount] [decimal](18, 2) NOT NULL,
	[cheque_dd_no] [varchar](50) NOT NULL,
	[cheque_dd_date] [datetime] NOT NULL,
	[cheque_dd_bank] [varchar](200) NOT NULL,
	[cheque_dd_bankbranch] [varchar](200) NOT NULL,
	[cheque_dd_deposited] [varchar](200) NULL,
	[reference_no] [varchar](200) NOT NULL,
	[remarks] [varchar](500) NULL,
 CONSTRAINT [PK_sales_product_payment] PRIMARY KEY CLUSTERED 
(
	[sales_payment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sales_referral]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sales_referral](
	[sales_referral_id] [int] IDENTITY(1,1) NOT NULL,
	[sales_product_id] [int] NOT NULL,
	[customer_referral_id] [int] NOT NULL,
	[customer_id] [int] NOT NULL,
	[sales_total_amount] [decimal](18, 2) NOT NULL,
	[percentage] [int] NOT NULL,
	[total_amount] [decimal](18, 2) NOT NULL,
	[status] [char](1) NULL,
 CONSTRAINT [PK_sales_referral] PRIMARY KEY CLUSTERED 
(
	[sales_referral_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sales_tracking]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sales_tracking](
	[tracking_id] [int] IDENTITY(1,1) NOT NULL,
	[tracking_date] [datetime] NOT NULL,
	[sales_product_id] [int] NOT NULL,
	[order_status] [char](1) NOT NULL,
 CONSTRAINT [PK_sales_tracking] PRIMARY KEY CLUSTERED 
(
	[tracking_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sales_tracking_details]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sales_tracking_details](
	[tracking_det_id] [int] IDENTITY(1,1) NOT NULL,
	[tracking_id] [int] NOT NULL,
	[tracking_info] [text] NULL,
	[tracking_det_date] [datetime] NULL,
	[order_status] [char](1) NULL,
 CONSTRAINT [PK_sales_tracking_details] PRIMARY KEY CLUSTERED 
(
	[tracking_det_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[search]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[search](
	[search_id] [int] IDENTITY(1,1) NOT NULL,
	[customer_id] [int] NOT NULL,
	[keyword] [varchar](500) NOT NULL,
	[search_count] [int] NOT NULL,
	[search_date] [datetime] NOT NULL,
	[ip_address] [varchar](50) NOT NULL,
	[browser] [varchar](50) NOT NULL,
	[city] [varchar](250) NOT NULL,
	[country] [varchar](250) NOT NULL,
 CONSTRAINT [PK_search] PRIMARY KEY CLUSTERED 
(
	[search_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[search_details]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[search_details](
	[search_details_id] [int] IDENTITY(1,1) NOT NULL,
	[search_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
 CONSTRAINT [PK_search_details] PRIMARY KEY CLUSTERED 
(
	[search_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[search_product]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[search_product](
	[search_id] [int] IDENTITY(1,1) NOT NULL,
	[hits_id] [int] NOT NULL,
	[product_id] [int] NULL,
	[product_name] [varchar](250) NULL,
	[price_offer] [decimal](10, 2) NULL,
	[category_id] [int] NULL,
	[subcategory_id] [int] NULL,
	[price_final] [decimal](10, 2) NULL,
	[position] [int] NULL,
	[pricesave] [decimal](10, 2) NULL,
	[is_top_product] [char](1) NULL,
	[productsmimg] [varchar](250) NULL,
	[one_line_info] [varchar](250) NULL,
	[flag] [int] NULL,
	[stock] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[seo_update_info]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[seo_update_info](
	[seo_update_id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NULL,
	[product_name] [varchar](250) NULL,
	[seo_update_date] [datetime] NULL,
	[file_name] [varchar](250) NULL,
	[status] [varchar](50) NULL,
 CONSTRAINT [PK_seo_update_info] PRIMARY KEY CLUSTERED 
(
	[seo_update_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[shipping]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[shipping](
	[shipping_id] [int] IDENTITY(1,1) NOT NULL,
	[coutry_id] [int] NOT NULL,
	[state_id] [int] NOT NULL,
	[slot_1] [int] NOT NULL,
	[slot_2] [int] NOT NULL,
	[slot_3] [int] NOT NULL,
	[slot_4] [int] NOT NULL,
	[slot_5] [int] NOT NULL,
	[last_modified] [datetime] NOT NULL,
	[slot_position] [int] NULL,
 CONSTRAINT [PK_shipping] PRIMARY KEY CLUSTERED 
(
	[shipping_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sms_sent]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sms_sent](
	[sms_id] [int] IDENTITY(1,1) NOT NULL,
	[usertype_id] [int] NOT NULL,
	[message] [varchar](250) NOT NULL,
	[mobile] [varchar](15) NULL,
	[sms_datetime] [datetime] NOT NULL,
 CONSTRAINT [PK_master_sms_send] PRIMARY KEY CLUSTERED 
(
	[sms_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[subcategory]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[subcategory](
	[subcategory_id] [int] IDENTITY(500,1) NOT NULL,
	[category_id] [int] NULL,
	[subcategory_name] [varchar](200) NULL,
	[image] [varchar](50) NULL,
	[details] [text] NULL,
	[meta_title] [varchar](500) NULL,
	[meta_keyword] [varchar](500) NULL,
	[meta_description] [varchar](500) NULL,
	[position] [int] NULL,
	[status] [char](1) NULL,
	[left_display] [char](1) NULL,
	[url] [varchar](500) NULL,
 CONSTRAINT [PK_master_subcategory] PRIMARY KEY CLUSTERED 
(
	[subcategory_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[temp_packing_slip]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[temp_packing_slip](
	[transaction_log_id] [int] NULL,
	[product_id] [int] NULL,
	[qty] [int] NULL,
	[amount] [decimal](10, 2) NULL,
	[total_amount] [decimal](10, 2) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[transaction_log]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[transaction_log](
	[transaction_log_id] [int] IDENTITY(500,3) NOT NULL,
	[member_id] [int] NOT NULL,
	[trans_date] [datetime] NOT NULL,
	[description] [text] NULL,
	[payby] [char](2) NOT NULL,
	[total_amount] [decimal](18, 2) NOT NULL,
	[checksum] [varchar](1000) NULL,
	[transaction_log_id1] [int] NOT NULL,
	[referenceno] [varchar](255) NULL,
	[total_amount1] [decimal](18, 2) NOT NULL,
	[authdesc] [varchar](50) NOT NULL,
	[log_response] [text] NULL,
	[login_at] [char](2) NULL,
 CONSTRAINT [PK_transaction_log] PRIMARY KEY CLUSTERED 
(
	[transaction_log_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[web_hit_details------]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[web_hit_details------](
	[web_site_hit_details_id] [int] IDENTITY(1,1) NOT NULL,
	[hit_datetime] [datetime] NOT NULL,
	[city] [varchar](200) NULL,
	[country] [varchar](200) NULL,
	[ipaddress] [varchar](25) NOT NULL,
	[browser] [varchar](255) NOT NULL,
	[reference_id] [varchar](10) NULL,
	[url] [varchar](500) NULL,
	[reference] [varchar](255) NULL,
	[hits_at] [char](1) NULL,
 CONSTRAINT [PK_web_site_hit_details] PRIMARY KEY CLUSTERED 
(
	[web_site_hit_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[web_hits]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[web_hits](
	[web_site_hit_id] [int] IDENTITY(1,1) NOT NULL,
	[hit_date] [datetime] NOT NULL,
	[total_hits] [int] NOT NULL,
 CONSTRAINT [PK_web_site_hit] PRIMARY KEY CLUSTERED 
(
	[web_site_hit_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[webpage]    Script Date: 05/12/2018 4.02.58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[webpage](
	[page_id] [int] IDENTITY(1,1) NOT NULL,
	[page_name] [varchar](50) NOT NULL,
	[mainpage_id] [int] NOT NULL,
	[page_heading] [varchar](500) NULL,
	[page_details] [text] NULL,
	[page_title] [varchar](500) NULL,
	[page_keywords] [varchar](500) NULL,
	[page_description] [varchar](500) NULL,
	[page_metatags] [varchar](500) NULL,
	[page_status] [char](1) NULL,
 CONSTRAINT [PK_general_webpage] PRIMARY KEY CLUSTERED 
(
	[page_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[customers] ADD  CONSTRAINT [DF_customers_usertype_id]  DEFAULT ((3)) FOR [usertype_id]
GO
ALTER TABLE [dbo].[customers] ADD  CONSTRAINT [DF_customers_reg_via]  DEFAULT ('W') FOR [reg_via]
GO
ALTER TABLE [dbo].[feed_amazon] ADD  CONSTRAINT [DF_feed_amazon_feed_amazon_status]  DEFAULT ((0)) FOR [feed_amazon_status]
GO
ALTER TABLE [dbo].[feed_amazon_details] ADD  CONSTRAINT [DF_feed_amazon_details_feed_amazon_order_status]  DEFAULT ((0)) FOR [feed_amazon_order_status]
GO
ALTER TABLE [dbo].[feed_teamnutra] ADD  CONSTRAINT [DF_feed_teamnutra_feed_amazon_status]  DEFAULT ((0)) FOR [feed_amazon_status]
GO
ALTER TABLE [dbo].[feed_teamnutra_details] ADD  CONSTRAINT [DF_feed_teamnutra_details_feed_amazon_order_status]  DEFAULT ((0)) FOR [feed_amazon_order_status]
GO
ALTER TABLE [dbo].[loginfo] ADD  CONSTRAINT [DF_loginfo_login_at]  DEFAULT ('W') FOR [login_at]
GO
ALTER TABLE [dbo].[master_exchange_rate] ADD  CONSTRAINT [DF_master_exchange_rate_usd]  DEFAULT ((0.00)) FOR [usd]
GO
ALTER TABLE [dbo].[master_users] ADD  CONSTRAINT [DF_general_users_lock]  DEFAULT ((0)) FOR [lock]
GO
ALTER TABLE [dbo].[news] ADD  CONSTRAINT [DF_news_news_home_1]  DEFAULT ((0)) FOR [news_home]
GO
ALTER TABLE [dbo].[order] ADD  CONSTRAINT [DF_order_address_edit_status]  DEFAULT ((0)) FOR [address_edit_status]
GO
ALTER TABLE [dbo].[payment_verify] ADD  CONSTRAINT [DF_payment_verify_status]  DEFAULT ((0)) FOR [status]
GO
ALTER TABLE [dbo].[product] ADD  CONSTRAINT [DF_product_brand_id]  DEFAULT ((0)) FOR [brand_id]
GO
ALTER TABLE [dbo].[product] ADD  CONSTRAINT [DF_product_price_offer]  DEFAULT ((0.00)) FOR [price_offer]
GO
ALTER TABLE [dbo].[product] ADD  CONSTRAINT [DF_product_price_final]  DEFAULT ((0.00)) FOR [price_final]
GO
ALTER TABLE [dbo].[product] ADD  CONSTRAINT [DF_product_weight]  DEFAULT ((0.00)) FOR [weight]
GO
ALTER TABLE [dbo].[product] ADD  CONSTRAINT [DF_product_stock]  DEFAULT ((0)) FOR [stock]
GO
ALTER TABLE [dbo].[product] ADD  CONSTRAINT [DF_product_display]  DEFAULT ((1)) FOR [display]
GO
ALTER TABLE [dbo].[product] ADD  CONSTRAINT [DF_product_display1]  DEFAULT ((1)) FOR [home_display]
GO
ALTER TABLE [dbo].[product] ADD  CONSTRAINT [DF_product_user_id]  DEFAULT ((0)) FOR [user_id]
GO
ALTER TABLE [dbo].[product] ADD  CONSTRAINT [DF_product_allow_to_buy]  DEFAULT ((1)) FOR [allow_to_buy]
GO
ALTER TABLE [dbo].[product] ADD  CONSTRAINT [DF_product_healthkart]  DEFAULT ((0)) FOR [healthkart]
GO
ALTER TABLE [dbo].[product] ADD  CONSTRAINT [DF_product_amazon]  DEFAULT ((0)) FOR [amazon]
GO
ALTER TABLE [dbo].[product_hit_details------] ADD  CONSTRAINT [DF_product_hit_details_customer_id]  DEFAULT ((0)) FOR [customer_id]
GO
ALTER TABLE [dbo].[promo_code] ADD  CONSTRAINT [DF_promo_code_amount_type]  DEFAULT ((0)) FOR [amount_type]
GO
ALTER TABLE [dbo].[promo_code] ADD  CONSTRAINT [DF_promo_code_promo_amount]  DEFAULT ((0.00)) FOR [promo_amount]
GO
ALTER TABLE [dbo].[promo_code] ADD  CONSTRAINT [DF_promo_code_cart_amount]  DEFAULT ((0.00)) FOR [cart_amount]
GO
ALTER TABLE [dbo].[promo_code] ADD  CONSTRAINT [DF_promo_code_used]  DEFAULT ((0)) FOR [used]
GO
ALTER TABLE [dbo].[promo_code] ADD  CONSTRAINT [DF_promo_code_created_by]  DEFAULT ('C') FOR [created_by]
GO
ALTER TABLE [dbo].[promocode_brandlist] ADD  CONSTRAINT [DF_promocode_brandlist_promo_code_id]  DEFAULT ((0)) FOR [promo_code_id]
GO
ALTER TABLE [dbo].[promocode_brandlist] ADD  CONSTRAINT [DF_promocode_brandlist_brand_id]  DEFAULT ((0)) FOR [brand_id]
GO
ALTER TABLE [dbo].[sales_product] ADD  CONSTRAINT [DF_sales_product_total_weight]  DEFAULT ((0)) FOR [total_weight]
GO
ALTER TABLE [dbo].[sales_product] ADD  CONSTRAINT [DF_sales_product_cod]  DEFAULT ((0.00)) FOR [cod]
GO
ALTER TABLE [dbo].[sales_product] ADD  CONSTRAINT [DF_sales_product_order_status]  DEFAULT ((0)) FOR [order_status]
GO
ALTER TABLE [dbo].[sales_product] ADD  CONSTRAINT [DF_sales_product_sales_at]  DEFAULT ('W') FOR [sales_at]
GO
ALTER TABLE [dbo].[sales_product] ADD  CONSTRAINT [DF_sales_product_login_at]  DEFAULT ('W') FOR [login_at]
GO
ALTER TABLE [dbo].[sales_product_details] ADD  CONSTRAINT [DF_sales_product_details_category_id]  DEFAULT ((0)) FOR [category_id]
GO
ALTER TABLE [dbo].[sales_product_details] ADD  CONSTRAINT [DF_sales_product_details_quantity]  DEFAULT ((0)) FOR [quantity]
GO
ALTER TABLE [dbo].[sales_product_details] ADD  CONSTRAINT [DF_sales_product_details_total_amount]  DEFAULT ((0.00)) FOR [total_amount]
GO
ALTER TABLE [dbo].[sales_product_details] ADD  CONSTRAINT [DF_sales_product_details_total_weight]  DEFAULT ((0)) FOR [total_weight]
GO
ALTER TABLE [dbo].[sales_referral] ADD  CONSTRAINT [DF_sales_customer_referral_status]  DEFAULT ((0)) FOR [status]
GO
ALTER TABLE [dbo].[search] ADD  CONSTRAINT [DF_search_customer_id]  DEFAULT ((0)) FOR [customer_id]
GO
ALTER TABLE [dbo].[transaction_log] ADD  CONSTRAINT [DF_transaction_log_login_at]  DEFAULT ('W') FOR [login_at]
GO
ALTER TABLE [dbo].[web_hit_details------] ADD  CONSTRAINT [DF_web_hit_details_hits_at]  DEFAULT ('W') FOR [hits_at]
GO
ALTER TABLE [dbo].[webpage] ADD  CONSTRAINT [DF_general_webpage_mainpage_id]  DEFAULT ((0)) FOR [mainpage_id]
GO
ALTER TABLE [dbo].[webpage] ADD  CONSTRAINT [DF_general_webpage_status]  DEFAULT ((1)) FOR [page_status]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 - Left | 1 - Right' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'banner_images', @level2type=N'COLUMN',@level2name=N'image_type'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1=Active | ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'customers', @level2type=N'COLUMN',@level2name=N'status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'W-Web | M - Mob | A - Api' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'customers', @level2type=N'COLUMN',@level2name=N'reg_via'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-Pending | 1-Updated | 2-In Process | 3-Error' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'feed_amazon', @level2type=N'COLUMN',@level2name=N'feed_amazon_status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-Pending | 1-Updated | 2-In Process | 3-Error' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'feed_amazon_details', @level2type=N'COLUMN',@level2name=N'feed_amazon_order_status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-Pending | 1-Updated | 2-In Process | 3-Error' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'feed_teamnutra', @level2type=N'COLUMN',@level2name=N'feed_amazon_status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-Pending | 1-Updated | 2-In Process | 3-Error' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'feed_teamnutra_details', @level2type=N'COLUMN',@level2name=N'feed_amazon_order_status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 - Pending | 1 - Ordered | 2 - Received' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'inventory', @level2type=N'COLUMN',@level2name=N'status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 - HealthMall | 1 - Amazon | 2 - HealthKart' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'inventory_product', @level2type=N'COLUMN',@level2name=N'product_stock_type'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-disable|1,2 (yes  no)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'master_paymentsetup', @level2type=N'COLUMN',@level2name=N'online'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-disable|1,2 (yes  no)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'master_paymentsetup', @level2type=N'COLUMN',@level2name=N'admin'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 - No | 1 - Yes' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'master_pincode', @level2type=N'COLUMN',@level2name=N'fedex_service'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 - No | 1 - Yes' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'master_pincode', @level2type=N'COLUMN',@level2name=N'fedex_cod'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 - No | 1 - Yes' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'master_pincode', @level2type=N'COLUMN',@level2name=N'bluedart_service'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 - No | 1 - Yes' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'master_pincode', @level2type=N'COLUMN',@level2name=N'bluedart_cod'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1 - Active | 0 - Inactive' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'master_settings', @level2type=N'COLUMN',@level2name=N'status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1-Amazon | 2-SnapDeal | 3-FlipKart' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'order', @level2type=N'COLUMN',@level2name=N'sales_channel'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 - Pending | 1 - Received' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'payment_verify', @level2type=N'COLUMN',@level2name=N'status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-Free | 1-Payment-Gateway | 2-Cheque / DD | 3-COD |4-Cash |5-Bank Transfer' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'payout_referral', @level2type=N'COLUMN',@level2name=N'payment_type'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1-Active | 0-Inactive' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'product', @level2type=N'COLUMN',@level2name=N'display'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1-Active | 0-Inactive' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'product', @level2type=N'COLUMN',@level2name=N'home_display'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-Pending | 1-process' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'product_review', @level2type=N'COLUMN',@level2name=N'status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-send | 1- sent' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'product_review', @level2type=N'COLUMN',@level2name=N'automated_email'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0- Rs | 1-%' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'promo_code', @level2type=N'COLUMN',@level2name=N'amount_type'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-One Time | 1-One-Time / Customer | 2- Multiple Times' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'promo_code', @level2type=N'COLUMN',@level2name=N'usage'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-no | 1-yes' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'promo_code', @level2type=N'COLUMN',@level2name=N'allow_edit'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0- Rs | 1-%' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'sales_product', @level2type=N'COLUMN',@level2name=N'promo_amount_type'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'''''-Free | 0-Pending | 1-Paid' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'sales_product', @level2type=N'COLUMN',@level2name=N'payment_status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-Pending | 1- Process | 2 - Cancel | 9- No Transaction' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'sales_product', @level2type=N'COLUMN',@level2name=N'order_status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-Free | 1-Payment-Gateway | 2-Cheque / DD | 3-COD |4-Cash |5-Bank Transfer' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'sales_product_payment', @level2type=N'COLUMN',@level2name=N'payment_type'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-Not Paid  | 1-Paid' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'sales_referral', @level2type=N'COLUMN',@level2name=N'status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'transaction_log', @level2type=N'COLUMN',@level2name=N'transaction_log_id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0-Free | 1-Payment-Gateway | 2-Cheque / DD | 3-COD |4-Cash |5-Bank Transfer' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'transaction_log', @level2type=N'COLUMN',@level2name=N'payby'
GO
