# Keep ES version in sync with .lando.yml
ARG ES_VERSION=7.17.0
FROM docker.elastic.co/elasticsearch/elasticsearch:${ES_VERSION}
ARG ES_VERSION

USER root

RUN elasticsearch-plugin install analysis-icu

USER elasticsearch