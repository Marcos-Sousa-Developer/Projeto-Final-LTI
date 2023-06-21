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

config_file = "./nginx.conf"  # Path to your Nginx configuration file

# Use sed command to add the new server to the backend upstream
subprocess.run(['sed', '-i', f"s/server {last_private_ip}:5000;/server {last_private_ip}:5000;\\n    server {new_private_ip}:5000;/g", config_file])


