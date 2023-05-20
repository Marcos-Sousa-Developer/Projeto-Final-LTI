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

    if(last_line[0] == 'app-instance-5'):
        flag = False
    instance_name = last_line[0]
    private_ip = last_line[1]

getPrivateIp()


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

    print("done")
else:
    print("you dont have more to delete")
