begin;

create table if not exists account
(
    account_id bigserial primary key,
    name       varchar not null default '',
    age        smallint
        constraint chk_age check ( age >= 0 )
);

comment on table account is 'Collection of users';
comment on column account.account_id is 'Primary key for user';
comment on column account.age is 'Age of the user, must be positive';

create table if not exists category
(
    category_id     varchar primary key,
    description     text,
    age_restriction smallint
);

create table if not exists product
(
    product_id  bigserial primary key,
    name        varchar                                             not null default '',
    category    varchar
        constraint fk_category_id references category (category_id) not null,
    description text                                                not null default ''
);

create table if not exists product_price
(
    product_price_id          bigserial primary key,
    product_id                bigint                      not null
        constraint fk_product_id references product (product_id),
    created_datetime          timestamp without time zone not null,
    note                      text,
    previous_product_price_id bigint
        constraint fk_previous_product_price_id references product_price (product_price_id),
    price                     decimal(19, 2)              not null default 0
        constraint chk_price_must_be_positive check ( price > 0 )
);


comment on table product_price is 'Price of the product in time';
comment on column product_price.product_price_id is 'Primary key for product price in time';
comment on column product_price.created_datetime is 'Date time when price changed';
comment on column product_price.note is 'Optional note about reason of price change';
comment on column product_price.product_id is 'Foreign key for table product';
comment on column product_price.previous_product_price_id is 'Foreign key for previous product price. It is a good way of painlessly comparing two prices without too many queries';

create table if not exists transaction
(
    transaction_id   bigserial primary key,
    created_datetime timestamp without time zone not null,
    status           varchar
        constraint chk_status_types check ( status = any (array ['NEW', 'PAID', 'DELIVERED', 'CANCELLED']) )
);
comment on table transaction is 'Represents collection of the transaction products for one account at one time';
comment on column transaction.transaction_id is 'Primary key for transaction';
comment on column transaction.created_datetime is 'Date time when transaction was created. That means account created transaction containing collection of transaction products';
comment on column transaction.status is 'Status of the transaction. Transaction is NEW when account finalises the transaction. Transaction is PAID when system recognises the payment for transaction has been successfully completed. Transaction is DELIVERED when system confirms delivery to account. Transaction is CANCELLED if transaction could not be DELIVERED or account doesnt pay';


create table if not exists transaction_product
(
    transaction_product_id bigserial primary key,
    transaction_id         bigint not null
        constraint fk_transaction_id references transaction (transaction_id),
    product_price_id       bigint not null
        constraint fk_product_price_id references product_price (product_price_id)
);

comment on table transaction_product is 'Single product in transaction';
comment on column transaction_product.transaction_product_id is 'Primary key of transaction product';
comment on column transaction_product.product_price_id is 'Reference to price of the product in time. Use this to get to the product itself';
comment on column transaction_product.transaction_id is 'Reference to transaction which contains collection of transaction products';

commit;

