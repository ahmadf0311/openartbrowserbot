#!/bin/bash

# remove old container
docker rm -f elastic-dev

# build container
docker build -t elastic-dev .

# run container
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" --name "elastic-dev" elastic-dev &
#docker run -p 9200:9200 -p 9300:9300 -e 'discovery.type=single-node' -e 'ES_JAVA_OPTS=-Xlog:gc*,gc+age=trace,safepoint:stdout:utctime,pid,tags:' --name "elastic-dev" elastic-dev &

# wait until elasticsearch started
echo "waiting until elasticsearch is up"
elastic_up=""
while [ -z "$elastic_up" ]
do
	elastic_up=$(curl -sI localhost:9200 | grep "200 OK")
  sleep 2
done

# run elastic.py script inside the container
docker exec elastic-dev python3 /app/upload_to_elasticsearch/elasticsearch_helper.py /app/crawler_output/art_ontology.json
#og line: docker exec elastic-dev python3 /app/upload_to_elasticsearch/elasticsearch_helper.py /art_ontology.json
