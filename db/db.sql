create table me_user (
    me_user_id uuid primary key,
    username text not null,
    password text not null,
    localisation text not null,
    mail text not null
);

create table me_message (
    me_message_id uuid primary key,
    time timestamp with time zone default now() not null,
    content text not null,
    me_user_id uuid not null
);


alter table only 
me_message add constraint me_user_me_user_id_fkey foreign key (me_user_id) references me_user(me_user_id);
