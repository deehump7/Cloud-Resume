# Delreka Humphries — Resume Site
### KAR Digital Technologies

A Harry Potter themed personal resume & portfolio site built with vanilla HTML, CSS & JavaScript. Hosted on **Azure Static Web Apps**.

---

## Project Structure

```
resume-site/
├── index.html                        ← Main resume site
├── staticwebapp.config.json          ← Azure routing & security config
├── .github/
│   └── workflows/
│       └── azure-deploy.yml          ← Auto-deploy on every GitHub push
└── README.md
```

---

## Deploy to Azure Static Web Apps — Step by Step

### Step 1 — Push to GitHub

1. Create a new GitHub repository (e.g. `kar-resume-site`)
2. Upload all files from this folder into the repo
3. Make sure your default branch is named `main`

```bash
git init
git add .
git commit -m "Initial resume site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kar-resume-site.git
git push -u origin main
```

---

### Step 2 — Create Azure Static Web App

1. Log in to [portal.azure.com](https://portal.azure.com)
2. Click **Create a resource** → search **Static Web Apps** → click **Create**
3. Fill in:
   - **Subscription**: Your subscription
   - **Resource Group**: Create new → name it `kar-digital-rg`
   - **Name**: `kar-resume-site`
   - **Plan type**: Free (perfect for this project)
   - **Region**: East US 2 (closest to Atlanta)
   - **Source**: GitHub
4. Click **Sign in with GitHub** → authorize Azure
5. Select:
   - **Organization**: your GitHub username
   - **Repository**: `kar-resume-site`
   - **Branch**: `main`
6. Under **Build Details**:
   - **Build Presets**: Custom
   - **App location**: `/`
   - **Output location**: leave blank
7. Click **Review + Create** → **Create**

---

### Step 3 — Add the Deploy Token to GitHub

Azure will automatically create a deployment token. You need to add it to GitHub:

1. After the Azure resource is created, go to it in the portal
2. Click **Manage deployment token** in the left menu
3. Copy the token value
4. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
5. Click **New repository secret**
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: paste the token
6. Click **Add secret**

---

### Step 4 — Verify Deployment

1. Go back to your GitHub repo → click the **Actions** tab
2. You should see a workflow running called **Deploy to Azure Static Web Apps**
3. Once it turns green (✓), your site is live!
4. Back in the Azure portal, click your Static Web App → copy the **URL** shown on the overview page

---

### Step 5 — Connect Your Custom Domain (kardigitaltechnologies.com)

1. In the Azure portal, go to your Static Web App
2. Click **Custom domains** in the left menu → **Add**
3. Enter `kardigitaltechnologies.com`
4. Azure will give you a **CNAME record** to add to your domain registrar (e.g. GoDaddy, Namecheap)
5. Add the CNAME in your registrar's DNS settings
6. Wait 10–30 minutes for DNS to propagate
7. Azure automatically provisions a free SSL certificate

---

## Making Updates

Every time you push to the `main` branch, GitHub Actions will automatically redeploy your site to Azure. No manual steps needed.

```bash
# Make your changes to index.html
git add .
git commit -m "Updated resume"
git push
# Site updates automatically within ~2 minutes
```

---

## Security Headers (Already Configured)

The `staticwebapp.config.json` includes production-grade security headers:
- `X-Content-Type-Options` — prevents MIME sniffing
- `X-Frame-Options` — prevents clickjacking
- `X-XSS-Protection` — cross-site scripting protection
- `Strict-Transport-Security` — forces HTTPS
- `Content-Security-Policy` — controls resource loading

---

## Built With

- HTML5 / CSS3 / Vanilla JavaScript
- Google Fonts (Cinzel, Crimson Text, IM Fell English)
- Azure Static Web Apps
- GitHub Actions (CI/CD)

---

*KAR Digital Technologies — kardigitaltechnologies.com*
