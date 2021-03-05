CREATE TABLE IF NOT EXISTS efiling_submissions (
        id SERIAL PRIMARY KEY,
        created timestamp default current_timestamp,
        updated timestamp default current_timestamp,
        submission_id varchar,
        transaction_id varchar,
        package_number varchar,
        package_url varchar
);
