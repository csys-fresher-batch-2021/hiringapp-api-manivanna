create table joboffers(
    id serial primary key,
    jobtitle text,
    jobtype text,
    description text,
    skills text,
    minyears int,
    maxyears int,
    minsalary int,
    maxsalary int,
    location text,
    created_at varchar(10),
    end_date varchar(10)
);

create table applicant(
    id serial primary key,
    name text,
    email text,
    password text
);

create table applications(
    id serial primary key,
    jobid int,
    jobtitle text,
    name text,
    email text,
    mobile text,
    yop int,
    experience int,
    address text,
    score int,
    status text,
    comments text,
    created_at date
);

create table selectedlist(
    id serial primary key,
    jobid int,
    applicationid int,
    name text,
    email text,
    jobtitle text,
    score int,
    created_at date
);