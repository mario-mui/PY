module.exports = {
  template:"py_user",
  mappings:{
    user:{
      properties:{
        username:{
          type: 'string',
          index: 'not_analyzed'
        },
        email:{
          type: 'string',
          index: 'not_analyzed'
        },
        password:{
          type: 'string',
          index: 'not_analyzed'
        }
      }
    }
  }
};