DO
$do$
BEGIN
    IF NOT EXISTS (
        select column_name
        FROM information_schema.columns
        where table_name='efiling_submissions' and column_name='person_id'
    ) THEN
        alter table efiling_submissions add column person_id integer;
    END IF;
    IF NOT EXISTS (
        select column_name
        FROM information_schema.columns
        where table_name='efiling_submissions' and column_name='form_id'
    ) THEN
        alter table efiling_submissions add column form_id integer;
    END IF;
    IF NOT EXISTS (
        select column_name
        FROM information_schema.columns
        where table_name='forms' and column_name='last_efiling_submission_id'
    ) THEN
        alter table forms add column last_efiling_submission_id integer;
    END IF;
    IF EXISTS (
        select column_name
        FROM information_schema.columns
        where table_name='person' and column_name='customization'
    ) THEN
        alter table person drop customization;
    END IF;
    IF EXISTS (
        select column_name
        FROM information_schema.columns
        where table_name='person' and column_name='account_id'
    ) THEN
        alter table person drop account_id;
    END IF;
    IF EXISTS (
        select column_name
        FROM information_schema.columns
        where table_name='person' and column_name='client_id'
    ) THEN
        alter table person drop client_id;
    END IF;
    IF EXISTS ( 
        select column_name 
        FROM information_schema.columns
        where table_name='person' and column_name='login' and is_nullable='YES'
    ) THEN 
        alter table person add unique (login);
        alter table person alter column login set not null;
    END IF;
END
$do$
