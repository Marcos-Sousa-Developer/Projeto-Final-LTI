#create image
gcloud compute images create app-instance-image \
  --source-disk=app-instance-1 \
  --source-disk-zone=europe-west9-a \
  --family=my-app-image-family \
  --project=greatergoods


chmod +x createInstance.py