import subprocess

instance_name = ""
private_ip = ""

def getPrivateIp():
    global instance_name, private_ip
    last_line = []
    with open('usedIP.txt', 'r') as file:
        for line in file: 
            last_line = line.split(';')

    count = int(last_line[1].split('.')[3])+1

    instance_name = 'app-instance-'+str(count)
    private_ip = '10.0.1.'+str(count)  
getPrivateIp()


# Set the gcloud command

# Set the gcloud command
gcloud_command = [
    'gcloud',
    'compute',
    'instances',
    'create',
    f'{instance_name}',
    '--project=greatergoods',
    '--zone=europe-west9-a',
    '--machine-type=e2-medium',
    f'--network-interface=network-tier=PREMIUM,private-network-ip={private_ip},stack-type=IPV4_ONLY,subnet=app-server',
    '--maintenance-policy=MIGRATE',
    '--provisioning-model=STANDARD',
    '--service-account=owner-648@greatergoods.iam.gserviceaccount.com',
    '--scopes=https://www.googleapis.com/auth/cloud-platform',
    '--tags=load-outgoing,webserver-prod',
    #f'--create-disk=auto-delete=yes,boot=yes,device-name={instance_name},image=projects/ubuntu-os-cloud/global/images/ubuntu-2204-jammy-v20230429,mode=rw,size=10,type=projects/greatergoods/zones/us-central1-a/diskTypes/pd-balanced',
    '--no-shielded-secure-boot',
    '--shielded-vtpm',
    '--shielded-integrity-monitoring',
    '--labels=goog-ec-src=vm_add-gcloud',
    '--reservation-affinity=any',
    f'--image=projects/greatergoods/global/images/app-instance-image',
]

# Run the gcloud command
subprocess.run(gcloud_command) 

def save(): 
   with open('usedIP.txt', 'a') as file:
      file.write(instance_name+';'+private_ip+'\n') 
save()

print("done")
