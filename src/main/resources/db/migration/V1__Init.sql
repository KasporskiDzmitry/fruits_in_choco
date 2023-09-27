USE
fruits_in_choco;

create table product
(
    id          bigint unsigned not null auto_increment,
    description varchar(255),
    name        varchar(255),
    price       float unsigned not null,
    imageURL    varchar(400),
    category_id bigint unsigned not null,
    status      enum('ACTIVE', 'DELETED', 'NOT_CONFIRMED'),
    attributes  JSON not null,
    avg_rating  int unsigned not_null default 0,
    primary key (id)
);

create table cake
(
    id     bigint unsigned NOT NULL AUTO_INCREMENT,
    name   varchar(255) NOT NULL,
    price  float unsigned NOT NULL,
    weight float unsigned NOT NULL,
    status enum('CONFIRMED','NOT_CONFIRMED') DEFAULT NULL,
    primary key (`id`)
);

-- create table product_ratings
-- (
--     product_id bigint unsigned not null,
--     ratings_id bigint unsigned not null
-- );

create table rating
(
    id         bigint unsigned not null auto_increment,
    author     varchar(255),
    author_id  bigint unsigned not null,
    date       datetime(6),
    message    varchar(255),
    product_id bigint unsigned not null,
    rating     int unsigned not null,
    approved   boolean default false,
    primary key (id)
);

create table user
(
    id              bigint unsigned not null auto_increment,
    email           varchar(255),
    firstname       varchar(255),
    lastname        varchar(255),
    password        varchar(255),
    role            enum('ADMIN', 'USER'),
    status          enum('ACTIVE', 'BANNED', 'NOT_CONFIRMED'),
    activationtoken varchar(500),
    cart_id         bigint unsigned not null,
    primary key (id)
);

create table user_ratings
(
    user_id    bigint unsigned not null,
    ratings_id bigint unsigned not null
);

create table orders
(
    id                           bigint unsigned not null auto_increment,
    firstname                    varchar(255),
    lastname                     varchar(255),
    email                        varchar(255),
    phone                        varchar(255),
    date                         datetime(6),
    price                        float unsigned not null,
    is_agree_to_sending_messages boolean default false,
    status                       enum('NOT_CONFIRMED', 'CONFIRMED', 'DECLINED'),
    user_id                      bigint unsigned not null,
    primary key (id)
);

create table order_item
(
    id         bigint unsigned not null auto_increment,
    quantity   int unsigned not null,
    product_id bigint unsigned not null,
    primary key (id)
);

create table orders_order_items
(
    order_id       bigint unsigned not null,
    order_items_id bigint unsigned not null
);

create table user_orders
(
    user_id   bigint unsigned not null,
    orders_id bigint unsigned not null
);

create table ingredient
(
    id     bigint unsigned not null auto_increment,
    name   varchar(45),
    price  float unsigned not null,
    status enum('ACTIVE', 'DELETED'),
    type   enum('FILLING', 'DECORATION', 'BISCUIT'),
    primary key (id)
);

create table cake_ingredients
(
    cake_id        bigint unsigned not null,
    ingredients_id bigint unsigned not null,
    primary key (cake_id, ingredients_id)
);

create table cart
(
    id       bigint unsigned not null,
    quantity int not null,
    price    float unsigned not null,
    primary key (id)
);

create table cart_item
(
    id         bigint unsigned not null,
    quantity   int not null,
    product_id bigint unsigned not null,
    primary key (id)
);

create table cart_cart_items
(
    cart_id       bigint unsigned not null,
    cart_items_id bigint unsigned not null
);

create table slide
(
    id       bigint unsigned not null auto_increment,
    title    varchar(45),
    text     varchar(100),
    href     varchar(400),
    imageURL varchar(400),
    primary key (id)
);

create table category
(
    id          bigint unsigned not null auto_increment,
    name        varchar(45),
    description varchar(100),
    imageURL    varchar(400),
    primary key (id)
);

create table category_attribute
(
    id             bigint unsigned not null auto_increment,
    category_id    bigint unsigned not null,
    attribute_name varchar(45) not null,
    primary key (id)
);

create table token
(
    id         bigint unsigned not null auto_increment,
    token      varchar(255) not null,
    token_type enum('ACCESS','REFRESH') NOT NULL,
    user_id    bigint unsigned NOT NULL,
    primary key (id)
)

-- create table user_tokens
-- (
--     user_id   smallint unsigned not null,
--     token_id smallint unsigned not null
-- );

alter table orders_order_items
    add constraint UK_9d47gapmi35omtannusv6btu3 unique (order_items_id);
alter table user_ratings
    add constraint UK_3vob5h0cwyyfqaj4rtxwwsovv unique (ratings_id);
alter table user_orders
    add constraint UK_user_orders_orders_id unique (orders_id);
alter table product
    add constraint FKajjopj7ffr42w11bav8gut0cp foreign key (category_id) references category (id);
alter table user_ratings
    add constraint FKsdo6s1wbs9awfprtvhmd1bo7g foreign key (ratings_id) references rating (id);
alter table user_ratings
    add constraint FK85wcc1agckack64s64cu2hqxg foreign key (user_id) references user (id);
alter table orders_order_items
    add constraint FK7nw03p9mxq154wvbsonaq0qrw foreign key (order_items_id) references order_item (id);
alter table orders_order_items
    add constraint FK3l8rktw0f4w5t6tift31e2d7c foreign key (order_id) references orders (id);
alter table user
    add constraint FK_cart_id_user_table foreign key (cart_id) references cart (id);
alter table cart_item
    add constraint FK_product_id_cart_item_table foreign key (product_id) references product (id);
alter table cart_cart_items
    add constraint FK_cart_id_cart_cart_items foreign key (cart_id) references cart (id);
alter table cart_cart_items
    add constraint FK_cart_items_id_cart_cart_items foreign key (cart_items_id) references cart_item (id);
alter table user_orders
    add constraint FK3yq31b5hsh40vprb3spflxaob foreign key (orders_id) references orders (id);
alter table user_orders
    add constraint FKkuspr37yv513ga1okogyxrb7m foreign key (user_id) references user (id);
alter table cake_ingredients
    add constraint FK_cake_decorations_cake_id foreign key (cake_id) references cake (id);
alter table cake_ingredients
    add constraint FK_cake_decorations_decorations_id foreign key (ingredients_id) references ingredient (id);
alter table orders
    add constraint FK_user_id_orders foreign key (user_id) references user (id);
alter table category_attribute
    add constraint FK_category_id_ca foreign key (category_id) references category (id);
alter table token
    add constraint user_id_token_fk foreign key (user_id) references user (id)
    -- alter table user_tokens
--     add constraint FK_ut_user_id foreign key (user_id) references user (id);
-- alter table user_tokens
--     add constraint FK_ut_tokens_id foreign key (token_id) references token (id);

    insert into cart(id, quantity, price)
VALUES (1, 0, 0);
insert into user(id, email, firstname, lastname, password, role, status, activationtoken, cart_id)
values (1, 'admin@mail.com', 'Admin', 'Admin', '$2a$12$ZDTIR83cualqzXevU7FcuekzrPhOcPGX2LZzpIMHyXkaHqQ9ugESy', 'ADMIN',
        'ACTIVE', null, 1);
