USE
fruits_in_choco;

create table product
(
    id          smallint unsigned not null auto_increment,
    description varchar(255),
    name        varchar(255),
    price       float unsigned not null,
    imageURL    varchar(400),
    category_id smallint,
    status      enum('ACTIVE', 'DELETED', 'NOT_CONFIRMED'),
    attributes  JSON not null,
    primary key (id)
);

create table product_type
(
    id   smallint unsigned not null auto_increment,
    name varchar(45),
    primary key (id)
);

create table cake
(
    id     smallint unsigned NOT NULL AUTO_INCREMENT,
    name   varchar(255) NOT NULL,
    price  float unsigned NOT NULL,
    weight float unsigned NOT NULL,
    status enum('CONFIRMED','NOT_CONFIRMED') DEFAULT NULL,
    primary key (`id`)
);

create table product_ratings
(
    product_id smallint unsigned not null,
    ratings_id smallint unsigned not null
);

create table rating
(
    id         smallint unsigned not null auto_increment,
    author     varchar(255),
    author_id  smallint unsigned not null,
    date       datetime(6),
    message    varchar(255),
    product_id smallint unsigned not null,
    rating     smallint unsigned not null,
    approved   boolean default false,
    primary key (id)
);

create table user
(
    id              smallint unsigned not null auto_increment,
    email           varchar(255),
    firstname       varchar(255),
    lastname        varchar(255),
    password        varchar(255),
    role            enum('ADMIN', 'USER'),
    status          enum('ACTIVE', 'BANNED', 'NOT_CONFIRMED'),
    activationtoken varchar(500),
    cart_id         smallint unsigned,
    primary key (id)
);

create table user_ratings
(
    user_id    smallint unsigned not null,
    ratings_id smallint unsigned not null
);

create table orders
(
    id                           smallint unsigned not null auto_increment,
    firstname                    varchar(255),
    lastname                     varchar(255),
    email                        varchar(255),
    phone                        varchar(255),
    date                         datetime(6),
    price                        float unsigned not null,
    is_agree_to_sending_messages boolean default false,
    status                       enum('NOT_CONFIRMED', 'CONFIRMED', 'DECLINED'),
    user_id                      smallint unsigned,
    primary key (id)
);

create table order_item
(
    id         smallint unsigned not null auto_increment,
    quantity   smallint unsigned not null,
    product_id smallint unsigned not null,
    primary key (id)
);

create table orders_order_items
(
    order_id       smallint unsigned not null,
    order_items_id smallint unsigned not null
);

create table user_orders
(
    user_id   smallint unsigned not null,
    orders_id smallint unsigned not null
);

create table ingredient
(
    id     smallint unsigned not null auto_increment,
    name   varchar(45),
    price  float unsigned not null,
    status enum('ACTIVE', 'DELETED'),
    type   enum('FILLING', 'DECORATION', 'BISCUIT'),
    primary key (id)
);

create table cake_ingredients
(
    cake_id        smallint unsigned not null,
    ingredients_id smallint unsigned not null,
    primary key (cake_id, ingredients_id)
);

create table cart
(
    id       smallint unsigned not null,
    quantity int not null,
    price    float unsiged not null,
    primary key (id)
);

create table cart_item
(
    id         smallint unsigned not null,
    quantity   int not null,
    product_id smallint unsigned not null,
    primary key (id)
);

create table cart_cart_items
(
    cart_id       smallint unsigned not null,
    cart_items_id smallint unsigned not null
);

create table slide
(
    id       smallint unsigned not null auto_increment,
    title    varchar(45),
    text     varchar(100),
    href     varchar(400),
    imageURL varchar(400),
    primary key (id)
);

create table category
(
    id          smallint unsigned not null auto_increment,
    name        varchar(45),
    description varchar(100),
    imageURL    varchar(400),
    primary key (id)
);

create table category_attribute
(
    id             smallint unsigned not null auto_increment,
    category_id    smallint    not null unsigned,
    attribute_name varchar(45) not null,
    primary key (id)
);

alter table orders_order_items
    add constraint UK_9d47gapmi35omtannusv6btu3 unique (order_items_id);
alter table product_ratings
    add constraint UK_onx7x3bfabrhsua5vtme36juu unique (ratings_id);
alter table user_ratings
    add constraint UK_3vob5h0cwyyfqaj4rtxwwsovv unique (ratings_id);
alter table user_orders
    add constraint UK_user_orders_orders_id unique (orders_id);
alter table if exists product add constraint FKajjopj7ffr42w11bav8gut0cp foreign key (category_id) references category (id);
alter table if exists product_type add constraint FK_product_type_id_p foreign key (product_type_id) references product_type (id);
alter table if exists product_ratings add constraint FKpwv98ikq73aspcs31gvlx1fu3 foreign key (ratings_id) references rating (id);
alter table if exists product_ratings add constraint FKmpdgsire4ct7cepv7rt250fvs foreign key (product_id) references product (id);
alter table if exists user_ratings add constraint FKsdo6s1wbs9awfprtvhmd1bo7g foreign key (ratings_id) references rating (id);
alter table if exists user_ratings add constraint FK85wcc1agckack64s64cu2hqxg foreign key (user_id) references user (id);
alter table if exists orders_order_items add constraint FK7nw03p9mxq154wvbsonaq0qrw foreign key (order_items_id) references order_item (id);
alter table if exists orders_order_items add constraint FK3l8rktw0f4w5t6tift31e2d7c foreign key (order_id) references orders (id);
alter table if exists user add constraint FK_cart_id_user_table foreign key (cart_id) references cart (id);
alter table if exists cart_item add constraint FK_product_id_cart_item_table foreign key (product_id) references product (id);
alter table if exists cart_cart_items add constraint FK_cart_id_cart_cart_items foreign key (cart_id) references cart (id);
alter table if exists cart_cart_items add constraint FK_cart_items_id_cart_cart_items foreign key (cart_items_id) references cart_item (id);
alter table if exists user_orders add constraint FK3yq31b5hsh40vprb3spflxaob foreign key (orders_id) references orders (id);
alter table if exists user_orders add constraint FKkuspr37yv513ga1okogyxrb7m foreign key (user_id) references user (id);
alter table if exists cake_ingredients add constraint FK_cake_decorations_cake_id foreign key (cake_id) references cake (id);
alter table if exists cake_ingredients add constraint FK_cake_decorations_decorations_id foreign key (ingredients_id) references ingredient (id);
alter table if exists orders add constraint FK_user_id_orders foreign key (user_id) references user (id);
alter table if exists category_attribute add constraint FK_category_id_ca foreign key (category_id) references category (id);
