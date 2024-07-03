USE
marina_cupcake;

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

create table token
(
    id         bigint unsigned not null auto_increment,
    token      varchar(255) not null,
    token_type enum('ACCESS','REFRESH') NOT NULL,
    user_id    bigint unsigned NOT NULL,
    primary key (id)
);

alter table token
    add constraint user_id_token_fk foreign key (user_id) references user (id);

insert into user(id, email, firstname, lastname, password, role, status, activationtoken)
values (1, 'admin@mail.com', 'Admin', 'Admin', '$2a$12$ZDTIR83cualqzXevU7FcuekzrPhOcPGX2LZzpIMHyXkaHqQ9ugESy', 'ADMIN',
        'ACTIVE', null);
