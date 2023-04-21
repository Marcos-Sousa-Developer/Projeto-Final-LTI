#!/bin/bash

ip=$(timeout 3s curl -s ifconfig.me)

if  [ "$ip" == "34.175.17.77" ]; 
then
    echo "i have the ip"
    exit 0
else
    
    if timeout 3s bash -c "</dev/tcp/10.255.128.64/80" &>/dev/null; then
        echo "other is running well"
        exit 0
    else

        # Unassign peer's IP aliases. Try it until it's possible.
        if gcloud compute instances delete-access-config load-balancer-1 --zone=europe-southwest1-a --quiet > /dev/null 2>&1 & then
            echo "delete process done"  
            echo "delete ip public load-balancer-1" >> /etc/keepalived/takeover.log  
        fi

        sleep 5

        # Assign IP aliases to me because now I am the MASTER!
        if gcloud compute instances add-access-config load-balancer-2 --zone=europe-southwest1-a --address=34.175.17.77 --quiet > /dev/null 2>&1 & then
            echo "add process done"  
            echo "add ip public load-balancer-2" >> /etc/keepalived/takeover.log  
        fi

        sleep 5

        echo "Im a new master: load-balancer-2" >> /etc/keepalived/takeover.log
        
        exit 1
    fi
fi