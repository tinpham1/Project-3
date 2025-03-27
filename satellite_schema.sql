-- Table: public.satellite_data

-- DROP TABLE IF EXISTS public.satellite_data;

CREATE TABLE IF NOT EXISTS public.satellite_data
(
    "INTLDES" text COLLATE pg_catalog."default",
    "NORAD_CAT_ID" bigint,
    "OBJECT_TYPE" text COLLATE pg_catalog."default",
    "SATNAME" text COLLATE pg_catalog."default",
    "COUNTRY" text COLLATE pg_catalog."default",
    "LAUNCH" text COLLATE pg_catalog."default",
    "SITE" text COLLATE pg_catalog."default",
    "DECAY" text COLLATE pg_catalog."default",
    "PERIOD" double precision,
    "INCLINATION" double precision,
    "APOGEE" double precision,
    "PERIGEE" double precision,
    "COMMENT" text COLLATE pg_catalog."default",
    "COMMENTCODE" double precision,
    "RCSVALUE" bigint,
    "RCS_SIZE" text COLLATE pg_catalog."default",
    "FILE" bigint,
    "LAUNCH_YEAR" bigint,
    "LAUNCH_NUM" bigint,
    "LAUNCH_PIECE" text COLLATE pg_catalog."default",
    "CURRENT" text COLLATE pg_catalog."default",
    "OBJECT_NAME" text COLLATE pg_catalog."default",
    "OBJECT_ID" text COLLATE pg_catalog."default",
    "OBJECT_NUMBER" bigint
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.satellite_data
    OWNER to postgres;