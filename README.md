# Delreka Humphries — Cloud Resume

> A Harry Potter–themed personal resume and portfolio site, built from scratch and deployed on Microsoft Azure as part of the Cloud Resume Challenge.

🔗 Live site: [kardigitaltechnologies.com](https://kardigitaltechnologies.com)

---

### What is the Cloud Resume Challenge?

The [Cloud Resume Challenge](https://cloudresumechallenge.dev) is a multi-step project created by Forrest Brazeal that challenges cloud practitioners to build and deploy a real-world application using cloud-native services — going well beyond what any certification exam tests.

---

### Architecture

```
Browser → Azure CDN → Azure Static Web Apps (HTML/CSS/JS)
                              ↓
                    JavaScript fetch()
                              ↓
                    Azure Function (Node.js)
                              ↓
                    Azure Table Storage
                    (VisitorCount table)

GitHub → GitHub Actions CI/CD → Azure (auto-deploy on push)
```

---

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Hosting | Azure Static Web Apps |
| CDN | Azure CDN |
| Backend | Azure Functions (Node.js v18) |
| Database | Azure Table Storage |
| CI/CD | GitHub Actions |
| DNS | Squarespace (Google Domains) |
| Domain | kardigitaltechnologies.com |
| Security | HSTS, X-Frame-Options, X-XSS-Protection, nosniff |

---

### Features

- **Live visitor counter** — serverless Azure Function reads and increments a counter in Azure Table Storage on every visit
- **Custom domain with SSL** — kardigitaltechnologies.com with HTTPS enforced
- **Security headers** — configured in `staticwebapp.config.json`
- **CI/CD pipeline** — GitHub Actions deploys frontend and function automatically on every push to `main`
- **Mobile-first responsive design** — custom CSS, no frameworks
- **Harry Potter theme** — because cloud architecture should be magical ✨

---

### Project Structure

```
Cloud-Resume/
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml   # CI/CD pipeline
├── api/
│   └── GetVisitorCount/
│       ├── index.js                    # Azure Function
│       ├── function.json               # HTTP trigger config
│       └── package.json                # @azure/data-tables
├── index.html                          # Resume site
├── main.js                             # Visitor counter fetch logic
├── styles.css                          # All styling
└── staticwebapp.config.json            # Routing + security headers
```

---

### Key Challenges Solved

- Debugged Azure Function 500 errors caused by missing npm dependencies in the cloud environment
- Resolved a JavaScript `getElementById` case-sensitivity bug preventing counter display
- Fixed an Oryx build engine failure caused by a misplaced `package.json` at the repo root
- Configured CORS on the Function App to allow cross-origin requests from the static site
- Set up custom domain DNS (CNAME + TXT verification) via Squarespace for Azure Static Web Apps

---

### Deployment

The site deploys automatically via GitHub Actions on every push to `main`.

To run locally, simply open `index.html` in a browser. No build step required.

---

### Author

**Delreka "Dee" Humphries**
Cybersecurity Practitioner · Cloud Architect · Founder, KAR Digital Technologies
[LinkedIn](https://linkedin.com/in/deed-humphries) · [kardigitaltechnologies.com](https://kardigitaltechnologies.com)
