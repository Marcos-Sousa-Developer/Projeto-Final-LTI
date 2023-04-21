#!/bin/bash

# Stop replication
mysql -u root -p"rootGreaterGoods1234!" -e "STOP SLAVE;"

# Reset slave
mysql -u root -p"rootGreaterGoods1234!" -e "RESET SLAVE;"

# Start replication
mysql -u root -p"rootGreaterGoods1234!" -e "START SLAVE;"

echo "MySQL slave replication stopped, reset, and started successfully"
