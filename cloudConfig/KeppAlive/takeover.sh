#!/bin/bash
set -e

ip=$(curl -s ifconfig.me)

if  [ "$ip" == "34.175.17.77" ]; 
then
    exit 0
else
    
    if timeout 10s telnet 10.255.128.64 80 > /dev/null; then

        exit 0
    else
        # Unassign peer's IP aliases. Try it until it's possible.
        gcloud compute instances delete-access-config load-balancer-1 --zone=europe-southwest1-a --access-config-name='external-nat' --quiet >> /etc/keepalived/takeover.log 2>&1 &
        sleep 5

        # Assign IP aliases to me because now I am the MASTER!
        gcloud compute instances add-access-config load-balancer-2 --zone=europe-southwest1-a --access-config-name=external-nat --address=34.175.17.77 --quiet >> /etc/keepalived/takeover.log 2>&1 &
        sleep 5
        echo "Im a new master: load-balancer-1" >> /etc/keepalived/takeover.log
        
        exit 1
    fi
fi