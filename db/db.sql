create table user (
    user_id uuid primary key,
    username text not null,
    password text not null,
    localisation text not null,
    mail text not null
);

create table message (
    message_id uuid primary key,
    time timestamp with time zone default now() not null,
    content text not null,
    user_id uuid not null
);


alter table only 
message add constraint user_user_id_fkey foreign key (user_id) references user(user_id);
