--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: michaelduckworth
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    session_id integer,
    product_id integer,
    active integer
);


-- ALTER TABLE public.cart OWNER TO michaelduckworth;

--
-- Name: sess; Type: TABLE; Schema: public; Owner: michaelduckworth
--

CREATE TABLE public.sess (
    session_id integer NOT NULL,
    session_name character varying(255)
);


-- ALTER TABLE public.sess OWNER TO michaelduckworth;

--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: michaelduckworth
--

COPY public.cart (id, session_id, product_id, active) FROM stdin;
1	1234	1	1
2	1234	4	1
3	1234	6	1
4	4321	2	1
5	4321	5	1
6	4321	8	1
7	4321	1	1
8	1111	2	1
9	1111	2	1
\.


--
-- Data for Name: sess; Type: TABLE DATA; Schema: public; Owner: michaelduckworth
--

COPY public.sess (session_id, session_name) FROM stdin;
1234	session 1
4321	session 2
1111	session 3
\.


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: michaelduckworth
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- Name: sess sess_pkey; Type: CONSTRAINT; Schema: public; Owner: michaelduckworth
--

ALTER TABLE ONLY public.sess
    ADD CONSTRAINT sess_pkey PRIMARY KEY (session_id);


--
-- Name: cart fk_sess; Type: FK CONSTRAINT; Schema: public; Owner: michaelduckworth
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT fk_sess FOREIGN KEY (session_id) REFERENCES public.sess(session_id);


--
-- PostgreSQL database dump complete
--

