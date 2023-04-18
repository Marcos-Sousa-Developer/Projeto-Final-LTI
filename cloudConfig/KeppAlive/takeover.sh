
# Unassign peer's IP aliases. Try it until it's possible.
gcloud compute instances delete-access-config load-balancer-1 --zone=europe-southwest1-a > /etc/keepalived/takeover.log 2>&1 

sleep 1

# Assign IP aliases to me because now I am the MASTER!
until gcloud compute instances add-access-config load-balancer-2 --zone=europe-southwest1-a --address=34.175.17.77 >> /etc/keepalived/takeover.log 2>&1; do
echo "Instance not accessible during takeover. Retrying in 5 seconds..."

sleep 1 done

echo "I became the MASTER at: $(date)" >> /etc/keepalived/takeover.log

