                                                           --Website Related

-- Master

select * from master_pack_size                      -- To display pack size with product details
select * from master_pincode                        -- For Shopping Cart Validation of Pincode
select * from master_paymentsetup                   -- To Display Various Payment Options in Shopping Cart and Select one
select * from master_state                          -- To Validate State in Shopping Cart
select * from master_tax                            -- In Shopping Cart, On checkout Addiing Taxes to Gross Amt to Calculate Net Payable Amount
select * from master_users                          -- List of Users who can log in to Admin Module
select * from master_usertype                       -- Types of Users and their authorites
select * from master_ip_block                       -- List of Ip Addresses, that are not allowed to access the ecomm site
select * from master_company                        -- Company Master , Used when placing order, By default is Health-Mall

select * from product                               -- Product Master and Details of Product stored in 4 tables
select * from product_details
select * from product_attribute
select * from attributes_health_condition
select * from product_health_library
select * from product_related 

select * from ingredients
select * from category                              -- Category Master for filtering product in home page (Products are subcategorized)
select * from subcategory                           -- SubCategory Master for filtering product in home page (Products are categorized)
select * from brand                                 -- Supplier / Manufacturer of the proucts
select * from customers                             -- Customer who can login at time of checkout in shopping cart
select * from customers_address                     -- Multiple addresses of same customer
select * from customers_address

select * from reference                             -- Social Media List



-- Dynamic Information to Be displayed on Screen
select * from health_faq
select * from health_library
select * from health_video_library
select * from health_video
select * from health_video_ingredients
select * from health_video_condition
select * from news
select * from product_health_video
select * from experts_articles

-- Display on Page -- Location / position / Content
select * from home_listing
select * from webpage
select * from card_info
select * from banner_images

-- Input Received from Website given by customer
select * from product_review
select * from product_review_details
select * from [product_hits------]
--select * from [product_hit_details------]
select * from customer_wishlist
select * from payout_referral
select * from sales_referral
select * from customer_referral
select * from web_hits
select * from payment_verify

-- Checkout of Shopping Cart
select * from [order]                                -- Order
select * from order_details
select * from sales_product
select * from sales_product_details

select * from promo_code
select * from promocode_brandlist
select * from sms_sent
select * from sales_product_payment
select * from search_product

                                                       --Inventory Related

-- Masters for Inventory Only

select * from master_courier
select * from master_shyplite
select * from fedex_shipper

-- Transactions for Inventory Only

select * from inventory
select * from inventory_details
select * from inventory_product
select * from inventory_product_temp
select * from inventory_report
select * from inventory_report_details
select * from inventory_product_update
select * from shipping
select * from [order]
select * from order_details
select * from sales_product
select * from sales_product_details
select * from feed_amazon_details
select * from feed_amazon
select * from feed_teamnutra
select * from feed_teamnutra_details
select * from order_ship
select * from sales_tracking
select * from sales_tracking_details
select * from temp_packing_slip
select * from v_order_details_Purchasecode
select * from customer_amazon

-- Master Not Required 
--select * from master_market_place
--select * from master_exchange_rate
--select * from master_title
--select * from master_payu
--select * from master_country
--select * from master_settings
--select * from master_sms_setting

-----------------------------------------------------------------------------

--select * from createxml
--select * from error_log
--select * from search
--select * from search_details
--select * from [web_hit_details------]
--select * from payout_referral_details
--select * from sysdiagrams
--select * from loginfo
--select * from transaction_log
--select * from seo_update_info
--select * from product_same
