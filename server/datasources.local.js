const config = require('config');
const ElasticMappings = require('./elasticMapping.json');
const constants = require('../config/constants.json');

const configuration = config.get('CommonInfra.ElasticDB.configuration');
const version = config.get('CommonInfra.ElasticDB.version');
const numberOfShards = config.get('CommonInfra.ElasticDB.number_of_shards');
const numberOfReplicas = config.get('CommonInfra.ElasticDB.number_of_replicas');

module.exports = {
  db: {
    name: 'db',
    connector: 'memory'
  },
  ticketIndex: {
    name: 'ticket',
    connector: 'esv6',
    index: constants.ElasticIndexesByDatasource.ticketIndex,
    indexSettings: {
      number_of_shards: numberOfShards,
      number_of_replicas: numberOfReplicas
    },
    mappingType: 'basedata',
    mappingProperties: ElasticMappings.ticketIndex,
    mappings: [],
    defaultSize: 1000,
    version,
    configuration
  }
};
