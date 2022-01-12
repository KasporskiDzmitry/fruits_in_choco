create table product
(
    id bigint not null auto_increment,
    description varchar(255),
    name varchar(255),
    price integer not null,
    imageURL varchar(400),
    type_id bigint, primary key (id)
);

create table product_ratings
(
    product_id bigint not null,
    ratings_id bigint not null
);

create table product_type
(
    id          bigint not null auto_increment,
    name        varchar(255),
    category_id bigint,
    primary key (id)
);

create table rating
(
    id bigint not null auto_increment,
    author varchar(255),
    author_id bigint not null,
    date datetime(6),
    message varchar(255),
    rating integer not null, primary key (id),
    approved boolean default false
);

create table user
(
    id bigint not null auto_increment,
    email varchar(255),
    firstname varchar(255),
    lastname varchar(255),
    password varchar(255),
    role varchar(255),
    status varchar(255), primary key (id),
    activationtoken varchar(500)
);

create table user_ratings
(
    user_id bigint not null,
    ratings_id bigint not null
);

alter table if exists product_ratings add constraint UK_onx7x3bfabrhsua5vtme36juu unique (ratings_id);
alter table if exists user_ratings add constraint UK_3vob5h0cwyyfqaj4rtxwwsovv unique (ratings_id);
alter table if exists product add constraint FKajjopj7ffr42w11bav8gut0cp foreign key (type_id) references product_type (id);
alter table if exists product_ratings add constraint FKpwv98ikq73aspcs31gvlx1fu3 foreign key (ratings_id) references rating (id);
alter table if exists product_ratings add constraint FKmpdgsire4ct7cepv7rt250fvs foreign key (product_id) references product (id);
alter table if exists product_type add constraint FKq3dcgs3t1cilv7ujqx6s5iiag foreign key (category_id) references category (id);
alter table if exists user_ratings add constraint FKsdo6s1wbs9awfprtvhmd1bo7g foreign key (ratings_id) references rating (id);
alter table if exists user_ratings add constraint FK85wcc1agckack64s64cu2hqxg foreign key (user_id) references user (id);