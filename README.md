# Arafat Voyage

Plateforme Arafat Voyage pour les demandes Hajj, Oumra et voyages internationaux depuis Bamako.

## Fonctionnalités

- Site vitrine responsive
- Inscription Hajj / Oumra / voyage international
- Numéro de dossier automatique `ARF-AAAA-XXXXXX`
- Base de données Supabase avec RLS
- Connexion professionnelle
- Tableau de bord Admin / Personnel
- Gestion des dossiers et statuts
- Gestion des clients
- Suivi des documents
- Suivi des paiements
- Statistiques
- Gestion des comptes du personnel réservée aux administrateurs
- Contacts Arafat Voyage avec liens téléphone et WhatsApp

## Accès professionnel

URL : `login.html`

Les utilisateurs se connectent avec leur compte Supabase Auth. Le rôle est lu dans `public.profiles` :

- `admin` : accès complet, y compris création de comptes du personnel
- `agent` : accès opérationnel sans gestion des comptes du personnel
- `client` : aucun accès au tableau de bord professionnel

Aucun mot de passe administrateur n'est stocké dans GitHub.

## Sécurité

Les tables sensibles sont protégées par Row Level Security. Les fonctions `is_admin()` et `is_staff()` contrôlent les permissions côté base de données. La création des comptes du personnel passe par la fonction Edge Supabase `create-staff-user`, protégée par JWT.

La clé utilisée côté navigateur est une clé publishable. Ne jamais mettre une clé `service_role` dans le frontend.

## Publication

Le projet est constitué de fichiers statiques et peut être publié avec GitHub Pages :

**Settings → Pages → Deploy from a branch → main → / (root)**.

URL prévue : `https://mougaremodibo7-bit.github.io/MDHTravel/`
