# Database Structure

---
## Table "public.pokemons"

   Column    |          Type          | Collation | Nullable | Default
-------------+------------------------+-----------+----------+---------
 id          | integer                |           | not null |
 name        | character varying(50)  |           | not null |
 health      | integer                |           | not null |
 attack      | integer                |           | not null |
 ability1_id | integer                |           |          |
 ability2_id | integer                |           |          |
 ability3_id | integer                |           |          |
 artwork_url | character varying(200) |           | not null |
Indexes:
    "pokemons_pkey" PRIMARY KEY, btree (id)
    "pokemons_name_key" UNIQUE CONSTRAINT, btree (name)
Foreign-key constraints:
    "pokemons_attack1_id_fkey" FOREIGN KEY (ability1_id) REFERENCES abilities(id)
    "pokemons_attack2_id_fkey" FOREIGN KEY (ability2_id) REFERENCES abilities(id)
    "pokemons_attack3_id_fkey" FOREIGN KEY (ability3_id) REFERENCES abilities(id)
Referenced by:
    TABLE "dresseur_pokemons" CONSTRAINT "dresseur_pokemons_pokemon_id_fkey" FOREIGN KEY (pokemon_id) REFERENCES pokemons(id) ON UPDATE CASCADE ON DELETE CASCADE

---
## Table "public.dresseurs"

   Column   |         Type          | Collation | Nullable | Default
------------+-----------------------+-----------+----------+---------
 id         | integer               |           | not null |
 name       | character varying(60) |           | not null |
 level      | integer               |           | not null |
 experience | integer               |           | not null |
Indexes:
    "dresseurs_pkey" PRIMARY KEY, btree (id)
    "dresseurs_name_key" UNIQUE CONSTRAINT, btree (name)
Referenced by:
    TABLE "dresseur_pokemons" CONSTRAINT "dresseur_pokemons_dresseur_id_fkey" FOREIGN KEY (dresseur_id) REFERENCES dresseurs(id) ON UPDATE CASCADE ON DELETE CASCADE

---
## Table "public.abilities"

   Column    |         Type          | Collation | Nullable | Default
-------------+-----------------------+-----------+----------+---------
 id          | integer               |           | not null |
 name        | character varying(80) |           | not null |
 damage      | integer               |           | not null |
 usage_limit | integer               |           | not null |
Indexes:
    "attacks_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "pokemons" CONSTRAINT "pokemons_attack1_id_fkey" FOREIGN KEY (ability1_id) REFERENCES abilities(id)
    TABLE "pokemons" CONSTRAINT "pokemons_attack2_id_fkey" FOREIGN KEY (ability2_id) REFERENCES abilities(id)
    TABLE "pokemons" CONSTRAINT "pokemons_attack3_id_fkey" FOREIGN KEY (ability3_id) REFERENCES abilities(id)

---
## Table "public.dresseur_pokemons"

   Column    |  Type   | Collation | Nullable | Default
-------------+---------+-----------+----------+---------
 dresseur_id | integer |           | not null |
 pokemon_id  | integer |           | not null |
Foreign-key constraints:
    "dresseur_pokemons_dresseur_id_fkey" FOREIGN KEY (dresseur_id) REFERENCES dresseurs(id) ON UPDATE CASCADE ON DELETE CASCADE
    "dresseur_pokemons_pokemon_id_fkey" FOREIGN KEY (pokemon_id) REFERENCES pokemons(id) ON UPDATE CASCADE ON DELETE CASCADE