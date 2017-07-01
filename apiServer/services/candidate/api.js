const { notFound, badRequest } = require('boom');
const Joi = require('joi');
const Candidate = require('./model');

module.exports = (server, options = {}) => {
  server.route({
    method: 'GET',
    path: '/{id}',
    config: {
      auth: false, //{ strategy: 'jwt' }
      validate: {
        params: { id: Joi.string().hex().required() }
      }
    },
    handler: (request, reply) => {
      const id = request.params.id;

      Candidate.findById(id)
        .exec((err, candidate) => {
          if(err) {
            return reply(badRequest(err));
          }

          if (!candidate) {
            return reply(notFound('No candidate found!'));
          }

          reply(candidate);
        });
    }
  });
};
