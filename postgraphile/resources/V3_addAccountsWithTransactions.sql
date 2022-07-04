begin;

DO
$$
    DECLARE
        var_product_price_id         bigint;
        var_initial_created_datetime timestamp without time zone := now() - interval '1 year';
        var_previous_price           decimal(19, 2);
        var_product_id               bigint;

    BEGIN

        for i in 1..100
            loop
                var_initial_created_datetime := now() - interval '1 year' + (i || ' days')::interval;

                for var_product_id in (select product_id from product)
                    loop
                        var_previous_price := (select price from product_price where previous_product_price_id = var_product_id);

                        -- check if price exists, if not create random price
                        var_previous_price := var_previous_price * (random() - 0.4);

                        if var_previous_price is null or var_previous_price <= 0 then
                            var_previous_price := random() * 60 + 1;
                        end if;


                        INSERT INTO product_price (product_id, created_datetime, note, price, previous_product_price_id)
                        VALUES (var_product_id, var_initial_created_datetime + interval '1 day', 'History change', var_previous_price,
                                var_product_price_id)
                        RETURNING product_price_id, price INTO var_product_price_id, var_previous_price;
                    end loop;
            end loop;
    END;
$$;


DO
$$
    DECLARE
        var_account_id               bigint;
        var_initial_created_datetime timestamp without time zone := now() - interval '1 year';
        var_transaction_id           bigint;
        var_product_price_id         bigint;
    BEGIN

        for acc in 1..40
            loop
                INSERT INTO account (name, age)
                VALUES ('Spammer ' || currval('account_account_id_seq'), ceil(random() * 80 + 12))
                RETURNING account_id INTO var_account_id;

                var_initial_created_datetime := var_initial_created_datetime + interval '1 day';

                for tx in 1..10
                    loop

                        insert into transaction(created_datetime, status)
                        values (var_initial_created_datetime, 'DELIVERED')
                        returning transaction_id into var_transaction_id;

                        -- add random number of products to one transaction
                        for i in 4..(floor(
                                        random() *
                                        (select count(*) - 1 from product_price where created_datetime = var_initial_created_datetime) +
                                        1))
                            LOOP
                                -- select random product price id based on created datetime
                                with products_in_time as (select product_price_id
                                                          from product_price
                                                          where created_datetime = var_initial_created_datetime)
                                select product_price_id
                                into var_product_price_id
                                from products_in_time
                                offset floor(random() * (select count(*) from products_in_time));

                                insert into transaction_product (transaction_id, product_price_id)
                                values (var_transaction_id, var_product_price_id);
                            end loop;

                    end loop;
            end loop;

    END;

$$;
commit;
