-- Rigeta demo: pokrenuti jednom u Supabase -> SQL Editor.
-- Sve tablice imaju uključen RLS bez pravila: pristup ima samo server (service_role ključ).

create table if not exists poruke (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ime text not null,
  email text not null,
  telefon text,
  poruka text not null
);

create table if not exists prijave (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ime text not null,
  email text not null,
  telefon text,
  radno_mjesto text,
  poruka text,
  cv_putanja text not null,
  cv_naziv text
);

create table if not exists cjenik_stavke (
  id uuid primary key default gen_random_uuid(),
  poslovnica text not null check (poslovnica in ('utrine', 'maksimir', 'zitnjak')),
  sifra text not null,
  naziv text not null,
  marka text,
  kategorija text,
  neto_kolicina numeric not null,
  jedinica_mjere text not null,
  mpc numeric(10, 2) not null,
  mpc_posebna numeric(10, 2),
  sidrena_cijena numeric(10, 2),
  barkod text,
  aktivno boolean not null default true,
  azurirano timestamptz not null default now(),
  unique (poslovnica, sifra)
);

create table if not exists cjenik_povijest (
  id bigint generated always as identity primary key,
  stavka_id uuid not null references cjenik_stavke (id) on delete cascade,
  mpc numeric(10, 2) not null,
  vrijedi_od timestamptz not null default now()
);

alter table poruke enable row level security;
alter table prijave enable row level security;
alter table cjenik_stavke enable row level security;
alter table cjenik_povijest enable row level security;

-- privatni bucket za životopise
insert into storage.buckets (id, name, public)
values ('zivotopisi', 'zivotopisi', false)
on conflict (id) do nothing;

-- DEMO artikli (izmišljene cijene), isti za sve tri poslovnice
insert into cjenik_stavke (poslovnica, sifra, naziv, marka, kategorija, neto_kolicina, jedinica_mjere, mpc, sidrena_cijena, barkod)
select p.slug, a.sifra, a.naziv, 'Rigeta', a.kategorija, a.neto_kolicina, 'kg', a.mpc, a.sidrena_cijena, a.barkod
from (values ('utrine'), ('maksimir'), ('zitnjak')) as p (slug)
cross join (values
  ('1001', 'Juneći but bez kosti', 'Svježe meso', 1, 13.99, 12.99, null),
  ('1002', 'Juneća plećka bez kosti', 'Svježe meso', 1, 11.49, 10.99, null),
  ('1003', 'Svinjski vrat bez kosti', 'Svježe meso', 1, 7.99, 7.49, null),
  ('1004', 'Svinjski kare bez kosti', 'Svježe meso', 1, 8.49, 7.99, null),
  ('2001', 'Mljeveno juneće meso 500 g', 'Mljeveno meso', 0.5, 5.49, 4.99, '3850000020016'),
  ('2002', 'Mljeveno miješano meso 500 g', 'Mljeveno meso', 0.5, 4.29, 3.99, '3850000020023'),
  ('3001', 'Ćevapčići „Banjalučki“ 480 g', 'Mesni pripravci', 0.48, 5.99, 5.49, '3850000030015'),
  ('3002', 'Ćevapčići „Junetina ovčetina“ 480 g', 'Mesni pripravci', 0.48, 6.49, 5.99, '3850000030022'),
  ('3003', 'Ćevapčići „Junetina svinjetina“ 480 g', 'Mesni pripravci', 0.48, 5.49, 4.99, '3850000030039')
) as a (sifra, naziv, kategorija, neto_kolicina, mpc, sidrena_cijena, barkod)
on conflict (poslovnica, sifra) do nothing;

insert into cjenik_povijest (stavka_id, mpc)
select s.id, s.mpc
from cjenik_stavke s
where not exists (select 1 from cjenik_povijest p where p.stavka_id = s.id);
