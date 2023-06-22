import subprocess

instance_name = ""
private_ip = ""
flag = True

def getPrivateIp():
    global instance_name, private_ip, flag
    last_line = []
    with open('usedIP.txt', 'r') as file:
        for line in file: 
            last_line = line.split(';')

    if(last_line[0] == 'app-instance-3'):
        flag = False
    instance_name = last_line[0]
    private_ip = last_line[1].replace("\n","")

getPrivateIp()

config_file = "/etc/nginx/conf.d/gg.conf"

# Set the gcloud command

# Set the gcloud command
if(flag):
    gcloud_command = [
        'gcloud',
        'compute',
        'instances',
        'delete',
        f'{instance_name}',
        '--project=greatergoods',
        '--zone=europe-west9-a'
    ]

    # Run the gcloud command
    subprocess.run(gcloud_command)

    def save(): 

        with open('usedIP.txt', 'r') as file:
            lines = file.readlines()
        lines = lines[:-1]
        with open('usedIP.txt', 'w') as file:
                file.writelines(lines)
    save()

    # Use sed command to add the new server to the backend upstream
    subprocess.run(['sudo', 'sed', '-i', f"/server {private_ip}:5000;/d", config_file])
    subprocess.run(['sudo', 'service', 'nginx', 'reload'])

    # SSH connection details
    ssh_host = "10.255.128.64"

    # Configuration file details

    command1 = f"ssh {ssh_host} \"sudo sed -i '/server {private_ip}:5000;/d' {config_file}\""
    command2 = f"ssh {ssh_host} sudo service nginx reload"

    # Execute command 1
    subprocess.run(command1, shell=True, check=True)

    # Execute command 2
    subprocess.run(command2, shell=True, check=True)

    print("done")
else:
    print("you dont have more to delete")
