module.exports = (ticket) => {


  ticket.remoteMethod('createTicket', {
    description: 'book a ticket for movie',
    accepts: [{
      arg: 'data',
      type: 'object',
      http: {
        source: 'body'
      },
      required: true
    }],
    returns: {
      arg: 'result',
      type: 'object',
      root: false,
    },
    http: {
      path: '/generate',
      verb: 'post',
      status: 200,
      errorStatus: 400
    }
  });

  ticket.remoteMethod('updateTicket', {
    description: 'update a ticket for movie',
    accepts: [{
      arg: 'id',
      type: 'string',
      http: {
        source: 'path'
      },
      required: true
    }, {
      arg: 'data',
      type: 'object',
      http: {
        source: 'body'
      },
      required: true
    }],
    returns: {
      arg: 'result',
      type: 'object',
      root: false,
    },
    http: {
      path: '/show/:id',
      verb: 'put',
      status: 200,
      errorStatus: 400
    }
  });

  ticket.remoteMethod('getAllTicket', {
    description: 'get ticket by id',
    accepts: [{
      arg: 'filter',
      type: 'object',
      http: {
        source: 'query'
      }
    }],
    returns: {
      type: 'ticket',
      root: true
    },
    http: {
      path: '/all',
      verb: 'get',
      status: 200,
      errorStatus: 404
    }
  });

  ticket.remoteMethod('deleteTicket', {
    description: 'delete a ticket for movie',
    accepts: [{
      arg: 'id',
      type: 'string',
      http: {
        source: 'path'
      },
      required: true
    }],
    returns: {
      arg: 'result',
      type: 'object',
      root: false,
    },
    http: {
      path: '/:id',
      verb: 'delete',
      status: 200,
      errorStatus: 400
    }
  });

  ticket.remoteMethod('getNoOfPersonVisited', {
    description: 'get number of person visited',
    accepts: [{
      arg: 'method',
      type: 'string',
      http: {
        source: 'query'
      },
      required: true
    }, {
      arg: 'data',
      type: 'analytics',
      http: {
        source: 'body'
      },
      required: true
    }],
    returns: {
      type: 'ticket',
      root: true
    },
    http: {
      path: '/analytics/visited',
      verb: 'post',
      status: 200,
      errorStatus: 404
    }
  });

  ticket.remoteMethod('getMoneyEarned', {
    description: 'get money earned',
    accepts: [{
      arg: 'method',
      type: 'string',
      http: {
        source: 'query'
      },
      required: true
    }, {
      arg: 'data',
      type: 'analytics',
      http: {
        source: 'body'
      },
      required: true
    }],
    returns: {
      type: 'ticket',
      root: true
    },
    http: {
      path: '/analytics/earned',
      verb: 'post',
      status: 200,
      errorStatus: 404
    }
  });
}
