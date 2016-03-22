module.exports = {
  template:"py_tpl",
  mappings:{
    user:{
      properties:{
        username:{
          type: 'string',
          index: 'not_analyzed'
        },
        state:{
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
    },
    attr_store:{
      properties:{
        attr_key:{
          type: 'string',
          index: 'not_analyzed'
        },
        attr_name:{
          type: 'string',
          index: 'not_analyzed'
        }
      }
    },
    py_info:{
      properties:{
        create_user_id:{
          type: 'string',
          index: 'not_analyzed'
        },
        title:{
          type: 'string',
          index: 'not_analyzed'
        },
        deadline:{
          type: 'long'
        },
        count:{
          type: "short"
        },
        price:{
          type: "short"
        },
        arrive_date:{
          type: "short"
        },
        good_brand:{
          type:"string",
          index: 'not_analyzed'
        },
        good_from:{
          type:"string",
          index: 'not_analyzed'
        },
        good_link:{
          type:"string",
          index: 'not_analyzed'
        },
        good_attr:{
          type: "nested" //[{attr_key:'11',attr_value:[sss,ddd,fff]}]
        },
        good_desc:{
          type:"string",
          index: 'not_analyzed'
        },
        good_imgs:{
          type:"string"
        },
        py_state:{
          type:"boolean"
        }
      }
    },
    py_apply:{
      properties:{
        py_info_id:{
          type: 'string',
          index: 'not_analyzed'
        },
        apply_user_id:{
          type: 'string',
          index: 'not_analyzed'
        },
        apply_attr:{
          type:'nested' //[{attr_key:'11',attr_value:'22'}]
        },
        apply_count:{
          type:'short'
        }
      }
    }
  }
};