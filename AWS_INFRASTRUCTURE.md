# AWS Infrastructure

This document covers the full AWS deployment standard for the entire project. The deployment must run on ECS Fargate with an ALB in front of the service. Local Docker Compose is not sufficient for production.

## 1. Backend Deployment Standard (ECS Fargate)

### Step 1 — Get the Latest Backend Code
- Clone the repository
- Open in VS Code
- Navigate to the backend folder: `cd backend`
- Ensure Docker Desktop is running for local build validation only

### Step 2 — Build the Docker Image
From the backend folder:
```bash
docker build -t <image-name> .
```

Best practices: use lowercase names and semantic versioning when possible:
```bash
docker build -t project-backend:v1.3.0 .
```

### Step 3 — Authenticate to ECR
```bash
aws ecr get-login-password --region <region> \
  | docker login --username AWS --password-stdin \
  <account>.dkr.ecr.<region>.amazonaws.com
```

### Step 4 — Tag the Image
```bash
docker tag <image-name>:latest <account>.dkr.ecr.<region>.amazonaws.com/<repo-name>:latest
```

Or with version:
```bash
docker tag project-backend:v1.3.0 <account>.dkr.ecr.<region>.amazonaws.com/project-backend:v1.3.0
```

### Step 5 — Push the Image to ECR
```bash
docker push <account>.dkr.ecr.<region>.amazonaws.com/<repo-name>:latest
```

### Step 6 — Create or Update ECS Task Definition
Required fields:

| Field | Value / Example |
|---|---|
| Image | ECR URI |
| CPU & Memory | `256/512` or `512/1024` |
| Port mappings | Container port (e.g. `3000`) |
| Environment variables | RASA/Analytics runtime settings |
| Secrets | `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` via Secrets Manager |

Task role: must include S3 permissions if the backend reads files.
Execution role: default ECS execution role is fine.

Important security rules:
- Do not bake production secrets into the image.
- Do not pass database credentials as Docker build args.
- Inject secrets at runtime using ECS Secrets from AWS Secrets Manager or SSM Parameter Store.
- Use build args only for non-sensitive metadata such as version and build date.

### Step 7 — Deploy to ECS Service
- Go to ECS → Cluster → Service
- Select Update Service
- Choose the latest task definition revision
- Enable force new deployment
- Save & deploy

### Step 8 — Validate Deployment
- Check ECS task: `Status = RUNNING`
- Check ALB target group: `State = healthy`
- Verify the service endpoint returns `200`
```bash
curl http://<alb-dns>/health
```

> This standard is AWS-only. The service must be running on ECS behind an ALB, with traffic routed through the load balancer and health checks passing.

## 2. Frontend Deployment Standard (Amplify)

This repository contains two frontend apps:
- Analytics website: `cpr-chatbot/analytics`
- Intent generator: `cpr-chatbot-intent-generator`

### Step 1 — Connect GitHub Repository
- Select the correct branch
- If monorepo → set app root to the frontend app path:
  - `cpr-chatbot/analytics`
  - `cpr-chatbot-intent-generator`

### Step 2 — Configure Build Settings
- Amplify auto-detects most frameworks
- If needed, add `amplify.yml` to the app root
- Verify build command and publish directory match the selected app

### Step 3 — Add Environment Variables
Common environment variable patterns:

| Framework | Variable Pattern |
|---|---|
| Vite | `VITE_API_URL` |
| Create React App | `REACT_APP_API_URL` |
| Next.js | `NEXT_PUBLIC_API_URL` |

### Step 4 — Deploy
- Amplify builds automatically on each push to the connected branch
- Use separate Amplify apps if the analytics and intent generator deploy independently

### Step 5 — Add Domain (Optional)
- Go to Amplify → Domain Management
- Add domain from Route53
- Amplify creates DNS records automatically

## 3. Database Standard (RDS)

### 3.1 When to Use RDS
Use RDS when:
- The backend requires persistent relational data
- Multiple ECS tasks need shared storage
- Data must survive deployments

### Step 3.2 — Creating an RDS Instance

| Setting | Value |
|---|---|
| Engine | MySQL or PostgreSQL |
| Instance class | `db.t3.micro` (dev) |
| Public access | No |
| Security group | Allow inbound from ECS SG only |

### Step 3.3 — Connecting ECS to RDS
Add the following environment variables or secrets to the ECS task definition:
- `DB_HOST=<rds-endpoint>`
- `DB_USER=<username>`
- `DB_PASSWORD=<password>`
- `DB_NAME=<database>`

> Inject `DB_PASSWORD` at runtime from AWS Secrets Manager.

### Step 3.4 — Initializing Data
If the backend requires initial data:
- Provide a script (`insertData.js`, `init.sql`, etc.)
- Run it locally using RDS credentials
- Or run it inside ECS if needed

## 4. Load Balancer & Networking Standards

### 4.1 Target Group Configuration

| Setting | Value |
|---|---|
| Target type | `IP` |
| Port | Backend port (e.g. `3000`) |
| Protocol | HTTP |
| Health check path | `/health` or `/` |
| Success codes | `200` |

### 4.2 ALB Configuration

| Listener | Action |
|---|---|
| Port 80 (HTTP) | Redirect to HTTPS, or forward to target group |
| Port 443 (HTTPS) | Forward to target group (requires ACM certificate) |

### 4.3 Security Groups

**ALB Security Group:**
- Inbound: `80`, `443` from anywhere
- Outbound: allow all

**ECS Security Group:**
- Inbound: backend port from ALB SG only
- Outbound: allow all

## 5. S3 Access Standards

### 5.1 When ECS Needs S3 Access
- Backend loads datasets
- Backend loads configuration files
- Backend stores user uploads

### Step 5.2 — Required IAM Policy (`taskRoleArn`)
Attach this to the task role, not the execution role:

```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": "arn:aws:s3:::<bucket>/<key>"
}
```

## 6. DNS & SSL Standards

### 6.1 Route53
- Create hosted zone
- Add A/AAAA records
- For ALB → use Alias
- For Amplify → Amplify creates records automatically

### 6.2 ACM Certificates
- Create certificates in `us-east-1` for CloudFront
- Create certificates in the same region as ALB for ECS

## 7. Templates & Reference

### 7.1 ECS Task Definition Template

| Field | Value / Example | Notes |
|---|---|---|
| Image | `<account>.dkr.ecr.<region>.amazonaws.com/<repo>:latest` | ECR URI |
| CPU | `256` or `512` | In CPU units |
| Memory | `512` or `1024` | In MiB |
| Port mappings | `3000` | Container port |
| Environment variables | RASA/Analytics runtime settings | Non-sensitive values only |
| Secrets | `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Inject at runtime from Secrets Manager |
| Task Role | AWS IAM role with S3 permissions if needed | Not execution role |
| Execution Role | `ecsTaskExecutionRole` | Pull images and write logs |

Important rules:
- Always create a new revision — never edit an existing revision
- Keep environment variables consistent across revisions

### 7.2 Amplify Build Configuration Template (`amplify.yml`)

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
```

### 7.3 Environment Variables Reference

#### 7.3.1 Backend (ECS Task Definition)

| Variable | Description | Example |
|---|---|---|
| DB_HOST | RDS endpoint | `<instance>.rds.amazonaws.com` |
| DB_USER | Database username | `admin` |
| DB_PASSWORD | Database password | (from Secrets Manager) |
| DB_NAME | Database name | `project_db` |

#### 7.3.2 Frontend (Amplify)

| Framework | Variable Pattern | Example |
|---|---|---|
| Vite | `VITE_API_URL` | `https://api.project.com` |
| Create React App | `REACT_APP_API_URL` | `https://api.project.com` |
| Next.js | `NEXT_PUBLIC_API_URL` | `https://api.project.com` |

### 7.4 S3 IAM Policy Template

Attach to `taskRoleArn` (not execution role):

```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": "arn:aws:s3:::<bucket>/<key>"
}
```

### 7.5 Security Group Templates

#### 7.5.1 ALB Security Group

| Direction | Port | Source/Destination |
|---|---|---|
| Inbound | `80` (HTTP) | `0.0.0.0/0` |
| Inbound | `443` (HTTPS) | `0.0.0.0/0` |
| Outbound | All | `0.0.0.0/0` |

#### 7.5.2 ECS Security Group

| Direction | Port | Source/Destination |
|---|---|---|
| Inbound | Backend port | ALB Security Group only |
| Outbound | All | `0.0.0.0/0` |

### 7.6 Target Group Configuration Template

| Setting | Value |
|---|---|
| Target type | IP |
| Port | Backend port (e.g. `3000`) |
| Protocol | HTTP |
| Health check path | `/health` or `/` |
| Success codes | `200` |

### 7.7 RDS Instance Configuration Template

| Setting | Value |
|---|---|
| Engine | MySQL or PostgreSQL |
| Instance class | `db.t3.micro` (dev) |
| Public access | No |
| Security group | Allow inbound from ECS SG only |
```
