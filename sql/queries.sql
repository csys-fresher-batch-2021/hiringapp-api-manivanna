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
    location text
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
    comments text
)