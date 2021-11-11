module.exports = (app) => {
  const {
    ticket
  } = app.models;

  const R = require('ramda');
  const ErrorHandler = (message, data = null, statusCode = null, code = null) => {
    const error = new Error(message);
    if (data) {
      error.data = data;
    }
    if (statusCode) {
      error.statusCode = statusCode;
    }
    if (code) {
      error.code = code;
    }
    return error;
  };

  const { Client: Client7 } = require('es7');
  const { Client: Client6 } = require('es6');
  const esClientObj = require('../../../server/esClient.json');

  let Client = null;
  const version = 7;
  Client = version && version < 7 ? Client6 : Client7;
  const esClient = new Client(esClientObj);


  ticket.getAllTicket = async (filter) => {
    try {
      const tickets = await ticket.find(filter);
      return tickets;
    } catch (error) {
      error.statusCode = error.statusCode || 400;
      throw error;
    }
  };


  ticket.createTicket = async (payload) => {
    try {
      payloadKeys = Object.keys(payload);
      if (payloadKeys && payloadKeys.length > 0) {
        if (payload.creation_date) {
          payload.creation_date = Date.now();
        }
        const generatedTicket = await ticket.create(payload);
        if (generatedTicket) {
          return generatedTicket;
        }
      }
    } catch (error) {
      error.statusCode = error.statusCode || 400;
      throw error;
    }
  };

  ticket.updateTicket = async (id, data) => {
    try {
      const tic = await ticket.findOne({
        where: {
          id
        }
      });
      if (!tic) {
        throw ErrorHandler('Ticket not found', null, 400, null);
      }
      const updatableKeys = [
        'performance_time',
        'customer_name',
        'performance_title',
        'ticket_price'
      ];
      R.forEach((key) => {
        tic[key] = data[key];
      }, updatableKeys);
      await tic.save();
      return Promise.resolve(tic);
    } catch (error) {
      error.statusCode = error.statusCode || 400;
      throw error;
    }
  };


  ticket.deleteTicket = async (id) => {
    try {
      const deleteTicket = await ticket.destroyById(id);
      return Promise.resolve(deleteTicket);
    } catch (error) {
      error.statusCode = error.statusCode || 400;
      throw error;
    }
  }

  ticket.getNoOfPersonVisited = async (method, data) => {
    try {
      const methods = ['aggregation', 'js'];
      if (!R.contains(method, methods)) {
        throw ErrorHandler('Two methods allowed, aggregation and js', null, 400, null);
      }
      let tickets;
      const dateMap = new Map([
        [1, 'January'],
        [2, 'February'],
        [3, 'March'],
        [4, 'April'],
        [5, 'May'],
        [6, 'June'],
        [7, 'July'],
        [8, 'August'],
        [9, 'September'],
        [10, 'October'],
        [11, 'November'],
        [12, 'December']
      ]);
      let finalVisit = [];
      const fromMonth = data.from.getMonth() + 1;
      const toMonth = data.to.getMonth() + 1;
      const totalNoOfMonths = (toMonth - fromMonth) + 1;
      if (method === 'js') {
        const filters = {
          "where": {
            "creation_date": {
              "lt": data.to,
              "gt": data.from
            }
          },
          "order": "creation_date DESC"
        }
        tickets = await ticket.find(filters);
      } else if (method === 'aggregation') {
        if (totalNoOfMonths === 1) {
          const getTickeSum = {
            "query": {
              "range": {
                "creation_date": {
                  "gte": data.from,
                  "lte": data.to
                }
              }
            },
            "aggs": {
              "types_count": {
                "value_count": {
                  "field": "id"
                }
              }
            }
          };
          tickets = await esClient.search({
            index: 'ticket',
            body: getTickeSum
          });
          const obj = {
            month: dateMap.get(fromMonth),
            summaryVisits: tickets.body.aggregations.types_count.value
          }
          return [obj];
        }
        return [];
      }
      if (totalNoOfMonths === 1) {
        let summaryVisits = 0;
        const month = dateMap.get(fromMonth);
        R.forEach((ticket) => {
          summaryVisits = summaryVisits + 1;
        }, tickets);
        const finalObject = {
          month,
          summaryVisits
        }
        finalVisit.push(finalObject);
      } else {
        for (let months = fromMonth; months <= toMonth; months++) {
          const obj = {
            month: dateMap.get(months),
            summaryVisits: 0
          }
          R.forEach((ticket) => {
            const currentMonth = ticket.creation_date.getMonth() + 1;
            if (currentMonth === months) {
              obj.summaryVisits = obj.summaryVisits + 1;
            }
          }, tickets);
          finalVisit.push(obj);
        }
      }
      return finalVisit;
    } catch (error) {
      error.statusCode = error.statusCode || 400;
      throw error;
    }
  }

  ticket.getMoneyEarned = async (method, data) => {
    try {
      const methods = ['aggregation', 'js'];
      if (!R.contains(method, methods)) {
        throw ErrorHandler('Two methods allowed, aggregation and js', null, 400, null);
      }
      let tickets;
      const dateMap = new Map([
        [1, 'January'],
        [2, 'February'],
        [3, 'March'],
        [4, 'April'],
        [5, 'May'],
        [6, 'June'],
        [7, 'July'],
        [8, 'August'],
        [9, 'September'],
        [10, 'October'],
        [11, 'November'],
        [12, 'December']
      ]);
      let finalIncome = [];
      const fromMonth = data.from.getMonth() + 1;
      const toMonth = data.to.getMonth() + 1;
      let totalNoOfMonths = 1 + (toMonth - fromMonth);
      if (method === 'js') {
        const filters = {
          "where": {
            "and": [
              {
                "creation_date": {
                  "lt": data.to,
                  "gt": data.from
                }
              }
            ]
          },
          "order": "creation_date DESC"
        }
        tickets = await ticket.find(filters);
      } else if (method === 'aggregation') {
        if (totalNoOfMonths === 1) {
          const getTickeSum = {
            "query": {
              "range": {
                "creation_date": {
                  "gte": data.from,
                  "lte": data.to
                }
              }
            },
            "aggs": {
              "addition": {
                "sum": {
                  "field": "ticket_price"
                }
              }
            }
          };
          tickets = await esClient.search({
            index: 'ticket',
            body: getTickeSum
          });
          const obj = {
            month: dateMap.get(fromMonth),
            summaryProfit: tickets.body.aggregations.addition.value
          }
          return [obj];
        }
        return [];
      }

      if (totalNoOfMonths === 1) {
        let totalIncome = 0;
        const month = dateMap.get(fromMonth);
        R.forEach((ticket) => {
          totalIncome = totalIncome + ticket.ticket_price;
        }, tickets);
        const finalObject = {
          month,
          summaryProfit: totalIncome
        }
        finalIncome.push(finalObject);
      } else {
        for (let months = fromMonth; months <= toMonth; months++) {
          const obj = {
            month: dateMap.get(months),
            summaryProfit: 0
          }
          R.forEach((ticket) => {
            const currentMonth = ticket.creation_date.getMonth() + 1;
            if (currentMonth === months) {
              obj.summaryProfit = obj.summaryProfit + ticket.ticket_price;
            }
          }, tickets);
          finalIncome.push(obj);
        }
      }
      return finalIncome;
    } catch (error) {
      error.statusCode = error.statusCode || 400;
      throw error;
    }
  }
}