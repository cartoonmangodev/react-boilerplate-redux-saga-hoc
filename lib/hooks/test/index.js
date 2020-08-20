"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _commonConstants = require("../../utils/commonReduxSagaConverter/commonConstants");

/* eslint-disable camelcase */
// useReviewHooks
var _default = ({
  TEST_API_CUSTOM_TASK,
  TEST_SUB_API_CUSTOM_TASK,
  Chrissie: {
    TEST_API,
    TEST_SUB_API
  }
}) => {
  (0, _react.useEffect)(() => {
    TEST_SUB_API_CUSTOM_TASK(_commonConstants.ON_SUCCESS, {}, {
      data: {
        count: 20,
        items: [{
          name: 'chrisssie'
        }]
      }
    }); // TEST_API_CUSTOM_TASK(
    //   ON_SUCCESS,
    //   { subKey: ['items'] },
    //   {
    //     data: [
    //       {
    //         name: 'chrisssie',
    //       },
    //     ],
    //   },
    // );

    TEST_SUB_API_CUSTOM_TASK(_commonConstants.ON_SUCCESS, {}, {
      data: {
        count: 20,
        items: [{
          name: 'chrisssie'
        }]
      }
    });
    setTimeout(() => {
      TEST_SUB_API_CUSTOM_TASK(_commonConstants.ON_SUCCESS, {
        subKey: ['items'],
        isInfinite: true
      }, {
        data: {
          count: 50,
          items: [{
            name: 'pressy'
          }]
        }
      });
    }, 1);
    setTimeout(() => {
      TEST_SUB_API_CUSTOM_TASK(_commonConstants.ON_SUCCESS, {
        subKey: ['items'],
        isDelete: true,
        id: 'chrisssie',
        key: 'name'
      }, {});
    }, 2);
    setTimeout(() => {
      TEST_SUB_API_CUSTOM_TASK(_commonConstants.ON_SUCCESS, {
        subKey: ['items'],
        isDeleteKey: true,
        id: 'pressy',
        key: 'name',
        deleteKey: ['name']
      }, {});
    }, 3);
    setTimeout(() => {
      TEST_SUB_API_CUSTOM_TASK(_commonConstants.ON_SUCCESS, {//   subKey: ['items'],
        //   isInfinite: true,
      }, {
        data: {
          count: 100,
          items: [{
            name: '1'
          }, {
            name: '2'
          }, {
            name: '3'
          }, {
            name: '4'
          }]
        }
      });
    }, 4);
    setTimeout(() => {
      TEST_SUB_API_CUSTOM_TASK(_commonConstants.ON_SUCCESS, {
        tasks: [{
          task: 'add',
          params: {
            clearData: true,
            isInfinite: true,
            filter: ['check']
          },
          value: {
            count: 30,
            items: [{
              name: '10'
            }, {
              name: '15'
            }, {
              name: '25'
            }, {
              name: '35'
            }, {
              name: '45'
            }]
          }
        }, {
          task: 'isDelete',
          params: {
            subKey: ['items'],
            id: '1',
            key: 'name',
            filter: ['check']
          },
          value: {}
        }, {
          task: 'append',
          params: {
            subKey: ['items'],
            isInfinite: true,
            //   clearData: true,
            filter: ['check']
          },
          value: {
            count: 300,
            items: [{
              name: '54'
            }],
            data: [{
              name: '54'
            }]
          }
        }, {
          task: 'isDelete',
          params: {
            subKey: ['items'],
            id: ['3', '4', '5'],
            key: 'name',
            filter: ['check']
          },
          value: {}
        }, {
          task: 'isUpdate',
          params: {
            subKey: ['items'],
            id: ['10', '25', '15'],
            key: 'name',
            filter: ['check'],
            values: {
              '10': {
                status: 'married'
              },
              '25': {
                status: 'unmarried'
              },
              '15': {
                status: 'married'
              }
            }
          },
          value: {
            count: 30,
            limit: 20 //   items: { age: 30 },

          }
        }, {
          task: 'isDeleteKey',
          params: {
            subKey: ['items'],
            id: ['10'],
            key: 'name',
            filter: ['check'],
            deleteKey: ['name']
          },
          value: {}
        }, {
          task: 'isToggleKey',
          params: {
            subKey: ['items'],
            id: ['15'],
            key: 'name',
            filter: ['check'],
            toggleKey: ['name', 'status']
          },
          value: {}
        }]
      });
      TEST_API_CUSTOM_TASK(_commonConstants.ON_SUCCESS, {
        tasks: [{
          task: 'add',
          params: {
            clearData: true,
            isInfinite: true,
            filter: ['check']
          },
          value: [{
            name: '10'
          }, {
            name: '15'
          }, {
            name: '25'
          }, {
            name: '35'
          }, {
            name: '45'
          }]
        }, {
          task: 'isDelete',
          params: {
            //   subKey: ['items'],
            id: '1',
            key: 'name',
            filter: ['check']
          },
          value: {}
        }, {
          task: 'append',
          params: {
            //   subKey: ['items'],
            isInfinite: true,
            filter: ['check']
          },
          value: [{
            name: '5'
          }]
        }, {
          task: 'append',
          params: {
            //   subKey: ['items'],
            isInfinite: true,
            filter: ['check'] //   clearData: true,

          },
          value: [{
            name: '54'
          }]
        }, {
          task: 'isDelete',
          params: {
            //   subKey: ['items'],
            id: ['3', '4'],
            key: 'name',
            filter: ['check']
          },
          value: {}
        }, {
          task: 'isUpdate',
          params: {
            //   subKey: ['items'],
            id: ['10', '25', '15'],
            key: 'name',
            filter: ['check'],
            values: {
              '10': {
                status: 'married'
              },
              '25': {
                status: 'unmarried'
              },
              '15': {
                status: 'married'
              }
            }
          },
          value: {//   items: { age: 30 },
          }
        }, {
          task: 'isDeleteKey',
          params: {
            //   subKey: ['items'],
            id: ['10'],
            key: 'name',
            filter: ['check'],
            deleteKey: ['status']
          },
          value: {}
        }, {
          task: 'isToggleKey',
          params: {
            id: ['25'],
            key: 'name',
            filter: ['check'],
            toggleKey: ['name', 'status']
          },
          value: {}
        }]
      });
    }, 5);
  }, []);
  const test = (0, _react.useMemo)(() => getData(TEST_API, [], false), [TEST_API]);
  const test_sub = (0, _react.useMemo)(() => getData(TEST_SUB_API, {}, false), [TEST_SUB_API]);
  return {
    test,
    test_sub
  };
};

exports.default = _default;