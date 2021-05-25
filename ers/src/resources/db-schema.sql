create database ers;
create type expense_type as enum ('lodging', 'travel', 'food', 'other');
create type user_type as enum ('employee', 'manager');
create type status as enum ('pending', 'approved', 'denied');

set timezone = 'America/Los_Angeles';

create table reimbursement_status (
    id serial primary key,
    status status
);

create table reimbursement_type (
    id serial primary key,
    expense_type expense_type
);

create table users_roles (
    id serial primary key,
    role user_type
);

create table users (
    id serial primary key,
     username varchar(150) unique,
    password varchar(20),
    email varchar(150) unique,
    fist_name varchar(30),
    last_name varchar(30)
);

create table reimbursement (
    id serial primary key,
    amount numeric,
    submitted timestamp,
    resolved timestamp,
    description varchar(250),
    receipt varchar(250),
    author_id int references users(id),
    resolver_id int references users(id),
    status_id int references reimbursement_status(id),
    reimbursement_type_id int references reimbursement_type(id)
);