# Guide de déploiement Olegones

## 1. VPS OVH — Premier jet (Docker Compose)

### Prérequis sur le VPS

```bash
# Installer Docker + Docker Compose
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Se déconnecter et se reconnecter pour appliquer les droits
```

### Cloner le dépôt

```bash
git clone https://github.com/cestderrick/olegones.git
cd olegones
```

### Configurer les secrets

```bash
cp .env.example .env
nano .env
# → Changer ADMIN_PASSWORD et JWT_SECRET
```

### Lancer

```bash
docker compose up -d --build
```

Le site est accessible sur `http://IP_DU_VPS`.
L'admin est sur `http://IP_DU_VPS/admin`.

### Mettre à jour après un push Git

```bash
git pull
docker compose up -d --build
```

---

## 2. Nom de domaine OVH + Cloudflare DNS

1. Acheter le domaine sur OVH (ex: `olegones.fr`)
2. Dans OVH → modifier les serveurs DNS pour pointer vers Cloudflare
3. Dans Cloudflare → ajouter un enregistrement **A** pointant vers l'IP du VPS
4. Dans Cloudflare → activer le proxy (nuage orange) pour bénéficier du CDN et du SSL gratuit

### SSL avec Cloudflare (recommandé)

Cloudflare fournit le SSL entre le visiteur et Cloudflare. Pour sécuriser aussi la connexion Cloudflare → VPS, activer le mode **"Full (strict)"** dans Cloudflare, et installer un certificat Let's Encrypt sur le VPS :

```bash
sudo apt install certbot
sudo certbot certonly --standalone -d olegones.fr -d www.olegones.fr
```

Puis modifier `nginx.conf` pour écouter sur le port 443 avec les certificats.

---

## 3. Render (déploiement cloud gratuit)

### Prérequis
- Compte Render.com
- Dépôt GitHub partagé avec les membres du collectif

### Déployer

1. Aller sur [render.com](https://render.com) → New → Blueprint
2. Connecter le dépôt GitHub `cestderrick/olegones`
3. Render détecte automatiquement `render.yaml` et crée deux services :
   - **olegones-backend** (Express, port 4000, disk persistant sur `/data`)
   - **olegones** (Next.js, port 3000)
4. Dans les variables d'environnement de chaque service, définir :
   - `ADMIN_PASSWORD` → votre mot de passe admin
   - `JWT_SECRET` → chaîne aléatoire longue (générer avec `openssl rand -hex 32`)
   - `NEXT_PUBLIC_API_URL` → URL du backend Render (ex: `https://olegones-backend.onrender.com`)

### Domaine personnalisé sur Render

1. Dans Render → Settings → Custom Domain → ajouter `olegones.fr`
2. Dans Cloudflare → ajouter un enregistrement CNAME pointant vers l'URL Render

---

## 4. Analytics Umami (RGPD, sans cookies)

Umami est une alternative à Google Analytics respectueuse de la vie privée. Pas de cookies, pas de données personnelles transmises à des tiers.

### Option A — Umami Cloud (gratuit jusqu'à 10k pages vues/mois)

1. Créer un compte sur [cloud.umami.is](https://cloud.umami.is)
2. Ajouter un site → récupérer le `Website ID` et l'URL du script
3. Dans `.env` (VPS) ou variables Render :
   ```
   NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

### Option B — Auto-hébergé sur le VPS

```bash
# Ajouter dans docker-compose.yml un service Umami
# (voir https://umami.is/docs/install)
```

---

## 5. Google Business Profile

Google Business Profile permet d'apparaître dans les résultats locaux et sur Google Maps.

**Bonne nouvelle** : il n'est pas obligatoire d'avoir une adresse précise. Vous pouvez choisir **"Zone de service"** pour indiquer que vous intervenez dans une zone géographique (ex: Lyon et alentours) sans afficher d'adresse physique.

1. Aller sur [business.google.com](https://business.google.com)
2. Créer un profil → choisir "Je fournis des services sur place chez le client"
3. Définir la zone de service : Lyon + rayon souhaité
4. Catégorie : "Association" ou "Service d'éducation à la santé"
5. Vérifier le profil par carte postale ou vidéo

---

## 6. Backups automatiques

Le backend sauvegarde automatiquement `db.json` toutes les 24h dans `/data/backups/`.
Les 7 derniers backups sont conservés (rotation automatique).

Pour récupérer un backup depuis le VPS :
```bash
docker compose exec backend ls /data/backups/
docker compose cp backend:/data/backups/db-2024-01-15.json ./db-backup.json
```

---

## Résumé des URLs

| Environnement | Site | Admin |
|---|---|---|
| VPS (IP directe) | `http://IP_DU_VPS` | `http://IP_DU_VPS/admin` |
| VPS (domaine) | `https://olegones.fr` | `https://olegones.fr/admin` |
| Render | `https://olegones.onrender.com` | `https://olegones-backend.onrender.com/admin` |
