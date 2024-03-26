export const entryApiDoc = {
  '/': {
    get: {
      tags: ['PING'],
      description: 'Entry api',
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  messaage: {
                    type: 'string',
                    example: 'Welcome to  supper app api'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
