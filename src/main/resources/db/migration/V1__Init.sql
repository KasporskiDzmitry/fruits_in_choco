create table product
(
    id          bigint  not null auto_increment,
    description varchar(255),
    name        varchar(255),
    price       integer not null,
    imageURL    varchar(400),
    category_id bigint,
    status      enum('ACTIVE', 'DELETED', 'NOT_CONFIRMED'),
    primary key (id)
);

create table product_ratings
(
    product_id bigint not null,
    ratings_id bigint not null
);

create table rating
(
    id        bigint  not null auto_increment,
    author    varchar(255),
    author_id bigint  not null,
    date      datetime(6),
    message   varchar(255),
    rating    integer not null,
    primary key (id),
    approved  boolean default false
);

create table user
(
    id              bigint not null auto_increment,
    email           varchar(255),
    firstname       varchar(255),
    lastname        varchar(255),
    password        varchar(255),
    role            enum('ADMIN', 'USER'),
    status          enum('ACTIVE', 'BANNED', 'NOT_CONFIRMED'),
    primary key (id),
    activationtoken varchar(500)
);

create table user_ratings
(
    user_id    bigint not null,
    ratings_id bigint not null
);

create table orders
(
    id                           bigint not null auto_increment,
    firstname                    varchar(255),
    lastname                     varchar(255),
    email                        varchar(255),
    phone                        varchar(255),
    date                         datetime(6),
    price                        double not null,
    is_agree_to_sending_messages boolean default false,
    status                       enum('NOT_CONFIRMED', 'CONFIRMED')
        primary key (id)
);

create table order_item
(
    id         bigint  not null auto_increment,
    quantity   integer not null,
    product_id bigint  not null,
    primary key (id)
);

create table orders_order_items
(
    order_id       bigint not null,
    order_items_id bigint not null
);

create table user_orders
(
    user_id   bigint not null,
    orders_id bigint not null
);

create table ingredient
(
    id     bigint not null auto_increment,
    name   varchar(45),
    price  double not null,
    status enum('ACTIVE', 'DELETED'),
    type   enum('FILLING', 'DECORATION', 'BISCUIT')
);

create table cake_ingredients
(
    cake_id        bigint not null,
    ingredients_id bigint not null
);
create table notifications
(
    id   bigint not null,
    date datetime(6),
    type enum('ORDER', 'REVIEW')
);

alter table if exists orders_order_items add constraint UK_9d47gapmi35omtannusv6btu3 unique (order_items_id);
alter table if exists product_ratings add constraint UK_onx7x3bfabrhsua5vtme36juu unique (ratings_id);
alter table if exists user_ratings add constraint UK_3vob5h0cwyyfqaj4rtxwwsovv unique (ratings_id);
alter table if exists user_orders add constraint UK_user_orders_orders_id unique (orders_id);
alter table if exists product add constraint FKajjopj7ffr42w11bav8gut0cp foreign key (category_id) references category (id);
alter table if exists product_ratings add constraint FKpwv98ikq73aspcs31gvlx1fu3 foreign key (ratings_id) references rating (id);
alter table if exists product_ratings add constraint FKmpdgsire4ct7cepv7rt250fvs foreign key (product_id) references product (id);
alter table if exists user_ratings add constraint FKsdo6s1wbs9awfprtvhmd1bo7g foreign key (ratings_id) references rating (id);
alter table if exists user_ratings add constraint FK85wcc1agckack64s64cu2hqxg foreign key (user_id) references user (id);
alter table if exists orders_order_items add constraint FK7nw03p9mxq154wvbsonaq0qrw foreign key (order_items_id) references order_item;
alter table if exists orders_order_items add constraint FK3l8rktw0f4w5t6tift31e2d7c foreign key (order_id) references orders;
alter table if exists user_orders add constraint FK3yq31b5hsh40vprb3spflxaob foreign key (orders_id) references orders (id);
alter table if exists user_orders add constraint FKkuspr37yv513ga1okogyxrb7m foreign key (user_id) references user (id);
alter table if exists cake_ingredients add constraint FK_cake_decorations_cake_id foreign key (cake_ingr_id_fk) references cake (id);
alter table if exists cake_ingredients add constraint FK_cake_decorations_decorations_id foreign key (ingredients_id_fk) references ingredients (id);
