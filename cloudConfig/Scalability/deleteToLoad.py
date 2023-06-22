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

config_file = "./nginx.conf"  # Path to your Nginx configuration file

print(f"/{private_ip}:5000/d") 

# Use sed command to add the new server to the backend upstream
subprocess.run(['sed', '-i', f"/server {private_ip}:5000;/d", config_file])


