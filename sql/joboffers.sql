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