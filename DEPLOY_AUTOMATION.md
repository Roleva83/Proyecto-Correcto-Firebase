Deploy automation

This repository includes a GitHub Actions workflow to deploy Firebase Functions automatically.

Steps to enable automated deploy (recommended):

1. Create a service account in Google Cloud Console:
   - Console: IAM & Admin → Service accounts → Create service account
   - Suggested name: `firebase-deployer`

2. Grant the service account the minimal roles:
   - Cloud Functions Admin (roles/cloudfunctions.admin)
   - Cloud Run Admin (roles/run.admin)
   - Artifact Registry Writer (roles/artifactregistry.writer)
   - Cloud Build Editor (roles/cloudbuild.builds.builder or builds.editor)
   - Storage Admin / Storage Object Admin (roles/storage.admin or roles/storage.objectAdmin)
   - Service Account User (roles/iam.serviceAccountUser)

3. Create and download a JSON key for the service account.

4. In the GitHub repository settings:
   - Go to Settings → Secrets and variables → Actions → New repository secret
   - Name: `GCP_SA_KEY`
   - Value: paste the full JSON key content

5. Merge the workflow in `.github/workflows/deploy-functions.yml` to the `main` branch.

After that, the workflow will run on pushes to `main` and you can also trigger it manually from Actions → Deploy Firebase Functions.

If you prefer I run a one-off deploy now using your account, grant me temporary access or run the following locally after confirming IAM changes:

```powershell
firebase deploy --only "functions" --force --debug
```
