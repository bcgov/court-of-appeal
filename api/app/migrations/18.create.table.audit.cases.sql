CREATE TABLE IF NOT EXISTS "audit_cases" (
        id SERIAL PRIMARY KEY,
        created timestamp default current_timestamp,
        person_id integer,
        ip_address varchar,
        case_number varchar,
        "type" varchar
);
