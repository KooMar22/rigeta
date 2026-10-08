# Rigeta – demo nove web stranice

Next.js (App Router, čisti JavaScript) + Supabase (baza i pohrana životopisa), za objavu na Vercelu.

Bez spojene baze stranica radi u **demo načinu**: cjenik se čita iz `lib/cjenik-seed.js`, a forme
prolaze validaciju, ali ništa ne spremaju. Za preview je to dovoljno; baza je potrebna za stvarno
spremanje poruka/prijava i za uređivanje cijena kroz `/admin`.

## Što je unutra

| Putanja | Sadržaj |
| --- | --- |
| `/`, `/o-nama`, `/kvaliteta`, `/proizvodi` | sadržaj postojeće stranice |
| `/o-nama#eu-projekti` | novi blok „EU projekti” (podaci u `lib/site.js` → `EU_PROJEKTI`) |
| `/kontakt`, `/posao` | responzivne forme (`/api/kontakt`, `/api/prijava`) |
| `/kolacici` + banner | politika kolačića i upravljanje pristankom (karta se učitava tek uz pristanak) |
| `/cjenici` | maloprodajni cjenici triju poslovnica |
| `/cjenici/{utrine\|maksimir\|zitnjak}/cjenik.xml` (ili `.csv`) | strojno čitljiv cjenik, generira se pri svakom zahtjevu s današnjim datumom |
| `/admin` | izmjena cijena, pregled poruka i prijava (lozinka `ADMIN_PASSWORD`) |

Slike se u demou učitavaju izravno s `rigeta.hr` (`ASSET_BASE` u `lib/site.js`). Za produkciju ih
treba prebaciti u `public/`.

## Lokalno pokretanje

```bash
npm install
npm run dev
```

Za rad s bazom kopirati `.env.example` u `.env.local` i upisati vrijednosti.

## 1. Supabase (baza)

1. Na https://supabase.com → **New project** (regija npr. *Central EU (Frankfurt)*).
2. **SQL Editor** → zalijepiti cijeli `supabase/schema.sql` → **Run**.
   Time nastaju tablice `poruke`, `prijave`, `cjenik_stavke`, `cjenik_povijest`, privatni bucket
   `zivotopisi` i demo artikli.
3. **Project Settings → API**: kopirati `Project URL` i `service_role` ključ.
   `service_role` ključ je tajan – ide samo u Vercel env varijable, nikad u kod ili git.

Napomena: besplatni Supabase projekt se pauzira nakon tjedan dana bez aktivnosti.

## 2. GitHub

```bash
git init
git add .
git commit -m "Rigeta demo"
```

Zatim na GitHubu napraviti **privatni** repozitorij i gurnuti kod (`git remote add origin …`, `git push -u origin master`).

## 3. Vercel (stranica)

1. https://vercel.com → **Add New → Project** → odabrati repozitorij (framework se sam prepozna kao Next.js).
2. **Environment Variables** (Production i Preview):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
3. **Deploy**. Link oblika `https://rigeta-xxxx.vercel.app` je preview koji se može poslati.

Ako se env varijable dodaju naknadno, potreban je **Redeploy**.

## Prije produkcije

- Polja XML/CSV cjenika (`POLJA` u `lib/cjenik.js`) uskladiti s važećim tekstom propisa o objavi cjenika.
- Tekst politike kolačića i pravila privatnosti dati na pravnu provjeru.
- Dodati slanje e-mail obavijesti kod nove poruke/prijave (npr. Resend) i ograničenje broja zahtjeva na formama.
- `/admin` je zaštićen jednom zajedničkom lozinkom – za produkciju zamijeniti pravom prijavom (Supabase Auth).
- Maknuti `robots: noindex` iz `app/layout.js` i natpis „Demo verzija” iz `components/Footer.js`.
