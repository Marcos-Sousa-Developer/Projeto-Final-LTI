import subprocess

last_instance_name = ""
last_private_ip = ""
new_instance_name = ""
new_private_ip = ""

def getPrivateIp():
    global last_instance_name, last_private_ip, new_instance_name, new_private_ip
    last_line = []
    with open('usedIP.txt', 'r') as file:
        for line in file: 
            last_line = line.split(';')

    count = int(last_line[1].split('.')[3])+1

    last_instance_name = 'app-instance-'+str(count-2)
    last_private_ip = '10.0.1.'+str(count-1) 
    new_instance_name = 'app-instance-'+str(count-1)
    new_private_ip = '10.0.1.'+str(count)  
getPrivateIp()

# Set the gcloud command
gcloud_command = [
    'gcloud',
    'compute',
    'instances',
    'create',
    f'{new_instance_name}',
    '--project=greatergoods',
    '--zone=europe-west9-a',
    '--machine-type=e2-medium',
    f'--network-interface=network-tier=PREMIUM,private-network-ip={new_private_ip},stack-type=IPV4_ONLY,subnet=app-server',
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
      file.write(new_instance_name+';'+new_private_ip+'\n') 
save()

config_file = "/etc/nginx/conf.d/gg.conf"

# Use sed command to add the new server to the backend upstream
subprocess.run(['sudo', 'sed', '-i', f"s/server {last_private_ip}:5000;/server {last_private_ip}:5000;\\n    server {new_private_ip}:5000;/g", config_file])
subprocess.run(['sudo', 'service', 'nginx', 'reload'])


# SSH connection details
ssh_host = "10.255.128.64"

# Configuration file details

# SSH command to execute
command1 = f"ssh {ssh_host} \"sudo sed -i 's/server {last_private_ip}:5000;/server {last_private_ip}:5000;\\n    server {new_private_ip}:5000;/g' {config_file}\""
command2 = f"ssh {ssh_host} sudo service nginx reload"

# Execute command 1
subprocess.run(command1, shell=True, check=True)

# Execute command 2
subprocess.run(command2, shell=True, check=True)


print("done")
