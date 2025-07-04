#!/bin/bash

# Wait for Elasticsearch to be ready
until curl -s -u elastic:changeme http://localhost:9200/_cluster/health | grep -q '"status":"green"\|"status":"yellow"'; do
  echo "Waiting for Elasticsearch to be ready..."
  sleep 5
done

# Set kibana_system password
curl -X POST -u elastic:changeme "http://localhost:9200/_security/user/kibana_system/_password" \
  -H "Content-Type: application/json" \
  -d '{"password": "changeme"}'

# Set logstash_system password
curl -X POST -u elastic:changeme "http://localhost:9200/_security/user/logstash_system/_password" \
  -H "Content-Type: application/json" \
  -d '{"password": "changeme"}'

# Set beats_system password
curl -X POST -u elastic:changeme "http://localhost:9200/_security/user/beats_system/_password" \
  -H "Content-Type: application/json" \
  -d '{"password": "changeme"}'

echo "Elasticsearch security setup completed!" 