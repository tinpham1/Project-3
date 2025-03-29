-- Table: public.launches

-- DROP TABLE IF EXISTS public.launches;

CREATE TABLE IF NOT EXISTS public.launches
(
    id integer NOT NULL DEFAULT nextval('launches_id_seq'::regclass),
    mission_name text COLLATE pg_catalog."default",
    launch_date text COLLATE pg_catalog."default",
    launch_year integer,
    success boolean,
    failure_reason text COLLATE pg_catalog."default",
    agency text COLLATE pg_catalog."default",
    payload_mass_kg double precision,
    source_id text COLLATE pg_catalog."default",
    company text COLLATE pg_catalog."default",
    location text COLLATE pg_catalog."default",
    date date,
    "time" text COLLATE pg_catalog."default",
    rocket text COLLATE pg_catalog."default",
    mission text COLLATE pg_catalog."default",
    rocket_status text COLLATE pg_catalog."default",
    price text COLLATE pg_catalog."default",
    mission_status text COLLATE pg_catalog."default",
    CONSTRAINT launches_pkey PRIMARY KEY (id),
    CONSTRAINT launches_source_id_key UNIQUE (source_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.launches
    OWNER to postgres;