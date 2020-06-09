create table auth (
    user_id serial primary key,
    username varchar(50),
    password varchar(50)
);

create table property (
    property_id serial primary key,
    name varChar(50),
    description varChar(500),
    address varchar(200),
    city varchar(50),
    state varchar(50),
    zip int,
    img text,
    loan num,
    mortgage num,
    desired_rent num
)