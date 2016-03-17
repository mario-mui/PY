module.exports = {
  template:"py_user",
  mappings:{
    user:{
      properties:{
        user_id:{
          type: 'string',
          index: 'not_analyzed'
        },
        user_name:{
          type: 'string',
          index: 'not_analyzed'
        },
        user_email:{
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