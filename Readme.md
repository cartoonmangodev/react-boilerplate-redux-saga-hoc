# React Boilerplate Redux Saga HOC

React Boilerplate Redux Saga HOC is a hoc for handling api calls as well as mataintaing redux state.

## # Installation

This package requires **React 16.8.4 or later.**

Use the package manager [npm](https://nodejs.org/en/) to install react-boilerplate-redux-saga-hoc.

```bash
npm i react-boilerplate-redux-saga-hoc
```

or

```bash
yarn add react-boilerplate-redux-saga-hoc
```

## # Setup

[Installing on create-react-app scafolding](https://cartoonmangodev.github.io/react-boilerplate-redux-saga-hoc-docs/docs/getting-started/installation-setup#-installing-on-create-react-app-scafolding)

#

[Installing on React-Boilerplate scafolding](https://cartoonmangodev.github.io/react-boilerplate-redux-saga-hoc-docs/docs/getting-started/installation-setup#-installing-on-react-boilerplate-scafolding)

#

[Installing on React-Native](https://cartoonmangodev.github.io/react-boilerplate-redux-saga-hoc-docs/docs/getting-started/installation-setup#-installing-on-react-native)

#

[Installing on Next-js](https://cartoonmangodev.github.io/react-boilerplate-redux-saga-hoc-docs/docs/getting-started/installation-setup#-installing-on-next-js)

> ### **Note:** Before proceeding further.[Please read the detail documentation from here](https://cartoonmangodev.github.io/react-boilerplate-redux-saga-hoc-docs/)

## Why we created this hoc?

we are repeatedly creating constants, reducer, actions, saga whenever we want to call the api.Actually we are doing the same thing again and again that will make us to feel disconnected from coding.To avoid that, we have created a hoc for you to handle those repeated things.

## Do i need basic knowledge of redux-saga to use this hoc?

No need to have basic knowledge about redux-saga.We are using saga to handle api calls,because saga is a great library for handling all the side effects.

## Who can use this hoc?

A person who want's to do development faster and also don't want to create constants, reducer, saga, actions again and again.

## # Overview

React Boilerplate Redux Saga HOC is a hoc for handling api calls as well as mataintaing redux state.With the help of this hoc no need to worry about handling multipe api calls.Because when you connect this hoc with the component it will create constants, reducer, saga, actions and also provides helper function to call those api as well as manupulating the state.

No need create constants, saga, reducer, actions everytime when you create a project or when you want to call the api.Just connect this hoc to the component and forget about creating reducer, saga, actions, constants.Hoc will do all things for you.

It also handles success, errors, loader, canceling api calls when you are unmounting the component.Most of the developer failed to cancel the calls while unmounting component.This will create unwanted network traffic as well as unwanted storage space.No worry hoc will provide a method for canceling api as well as clearing those unwanted data.

All you need to do is just connect this hoc to your component and add the api configuration thats it.You are ready to call the api.No matter how many api's hoc will handle for you.

This package also supports for both React and React native.So no need to worry about basic configuration and also no seperate coding need.Just use the configuration on both react and react-native.

<!-- ## # Contents

---

### **Quickstart**

[# Basic usage](#-basic-usage)

[# Store Configuration](#-store-configuration)

[# Beginner Tutorial](https://cartoonmangodev.github.io/react-boilerplate-redux-saga-hoc-docs/docs/getting-started/beginnerTutorial)

---

### **Before Proceeding Further**

[# Why should i use this package](#-why-should-i-use-this-package)

[# Benefits of using this package](#-benefits-of-using-this-package)

[# Whether this package will support for react-native](#-whether-this-package-will-support-for-react-native)

---

### **How does it works**

[# Step by step process](#-step-by-step-process)

---

### **Storing Data**

[# storing data automatically by calling api](#-storing-data-automatically-by-calling-api)

[# sending query parameters to the api](#-sending-query-parameters-to-the-api)

[# Callbacks for handling success or failure](#-callbacks-for-handling-success-or-failure)

[# Manually storing data by calling custom task](#-manually-storing-data-by-calling-custom-task)

[# Getting Data from store](#getting-data-from-store)

---

### **Updating Data**

[# Updating data automatically by calling api](#-updating-data-automatically-by-calling-api)

[# Updating Data in an Array](#-updating-data-in-an-array)

[# Callbacks for handling Updated Data](#-callbacks-for-handling-updated-data)

[# Manually updating data by calling custom task](#-manually-updating-data-by-calling-custom-task)

[# Getting Updated Data from store](#-getting-updated-data-from-store)

---

### **Handling Infinite Data or Infinite Scrolling**

[# storing infinite data automatically by calling api](#-storing-infinite-data-automatically-by-calling-api)

[# Prepend data instead of appending infinite data](#-prepend-data-instead-of-appending-data)

[# Callbacks for handling infinite success or failure ](#-callbacks-for-handling-success-or-failure-1)

[# Manually storing or updating infinite data by calling custom task](#-manually-storing-or-updating-infinite-data-by-calling-custom-task)

[# Getting Infinite Data from store](#-getting-data-from-store-1)

---

### **Deleting Data**

[# Deleting data by calling api](#-deleting-data-by-calling-api)

[# Deleting key in an object](#-deleting-key-in-an-object)

[# Manually Deleting by calling custom task ](#-manually-deleting-by-calling-custom-task)

[# Getting Data from store](#-getting-data-from-store-2)

---

### **Adding Data based on Filters**

[# Adding filters in api calls](#-adding-filters-in-api-calls)

[# Deleting key in an Filter object](#-deleting-key-in-an-filter-object)

[# Manually Deleting Filter Data by calling custom task ](#-manually-deleting-filter-data-by-calling-custom-task)

[# Getting Filter Data from store ](#-getting-filter-data-from-store)

---

### **Using Subkey for accessing deep object**

[# Adding filters in Deep Object](#-adding-filters-in-deep-object)

[# Deleting key in an deep object](#-deleting-key-in-an-deep-object)

[# Manually Deleting deep object by calling custom task ](#-manually-deleting-subkey-data-by-calling-custom-task)

[# Getting Data from store](#-getting-filter-data-from-store-1)

---

### **Advanced Topics**

[# Creating Custom Reducer](#-creating-custom-reducer)

[# Modifying api end points reducer constants](#-modifying-api-end-points-reducer-constants)

[# Don't reset on setting to initial state ](#-dont-reset-on-setting-to-initial-state)

[# Cancelling Api Calls ](#-cancelling-api-calls)

[# Adding Axios Interceptors ](#-axios-interceptors)

[# Inject saga and reducer to the store ](#-inject-saga-and-reducer-to-the-store)

[# Inject saga and reducer to the store by using hooks ](#-inject-saga-and-reducer-to-the-store-by-using-hooks)

---

### **Util Functions**

[# Safe Function ](#-safe-function)

[# Other Util functions ](#-other-util-functions)

---

### **Others**

[# Params ](#-params)

[# Handling Multiple tasks ](#-handling-multiple-tasks) -->

---

## # Basic usage

```js
/** App.js **/

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { compose } from 'redux';

import {
  HOC as HocConfigure,
  commonConstants,
  store as configureStore,
} from 'react-boilerplate-redux-saga-hoc';

const initialState = {};

const connected_react_router_enable = false; // By default it will be False.
/*
Note: Enable this true if you are using this package in your app https://www.npmjs.com/package (connected-react-router)
Note: Please dont't enable to true if you using react-native
Note: React Boilerplate by default using connected-react-router so you can enable to true if you are using react boilerplate https://github.com/react-boilerplate/react-boilerplate
*/
const store = configureStore(initialState, connected_react_router_enable);
const HOC = HocConfigure({ handlers: [] });
/* Note: You can pass custom handler in HocConfigure.You will learn more about handlers in later below  */
const AuthenticationHOC = HOC({
  initialState: {
    profile: {},
  },
  apiEndPoints: {
    TEST_API: {
      url: 'https://jsonplaceholder.typicode.com/posts/',
      method: 'GET',
      responseStatusCode: [900],
      responseStatusKey: 'code',
      responseDataKey: 'data',
      responseMessageKey: 'message',
    },
    REGISTER_API: {
      url: `users/user-signup/`,
      method: 'POST',
    },
  },
  name: 'Auth',
});

const CustomComponent = compose(AuthenticationHOC)(props => {
  const {
    ON_SUCCESS,
    ON_UNMOUNT,
    ON_ERROR,
    ON_LOADING,
    ON_TOAST,
  } = commonConstants;

  const {
    Auth_data: { TEST_API, REGISTER_API },
    Auth_hoc: {
      actions: { TEST_API_CUSTOM_TASK, TEST_API_CALL, TEST_API_CANCEL },
    },
    getData,
  } = props;

  useEffect(() => {
    TEST_API_CALL();
    return () => {
      TEST_API_CANCEL(ON_UNMOUNT);
    };
  }, []);

  const { loader, data } = useMemo(() => getData(TEST_API, [], true), [
    TEST_API,
  ]);

  return (
    <div>
      {data.map(({ title }) => (
        <li>{title}</li>
      ))}
    </div>
  );
});

export default function App(props) {
  return (
    <Provider store={store}>
      <CustomComponent />
    </Provider>
  );
}

export default App;
```

## # Store Configuration

    Note:
    - No need to configure store seperately.
    - Store can be imported from react-boilerplate-redux-saga-hoc.

```js
import React from 'react';
import { Provider } from 'react-redux';
import { store as configureStore } from 'react-boilerplate-redux-saga-hoc';

const initialState = {};
const connected_router_enable = false;
const store = configureStore(initialState, connected_router_enable); // by default second parameter will be false
export default function App(props) {
  return (
    <Provider store={store}>
      <CustomComponent />
    </Provider>
  );
}

export default App;
```

# Before Proceeding Further

We already knows [redux](https://redux.js.org/) is a valuable tool for organising your state and also [redux-saga](https://redux-saga.js.org/) is a powerful middleware for handling side Effects.With the help of those two tools we have created a package for handling api calls and storing data in an organised way.

## # Why should i use this package

    Important:
    -This package is not an alternative for redux and redux-saga
    -This package is mostly for developer who wants to make development faster and also to handle most of the api calls.

## # Benefits of using this package

[Go to Top](#-contents)

    - Handles api calls by itself
    - No need to create store, constants, actions, saga, reducer
    - It handles cancelling api call by itself
    - Handles error, success, cancel, loading, infinite data handling
    - No worry about api calls, loaders...etc
    - No separate coding needed for react and react native

## # Whether this package will support for react-native

#### **Yes** ,this package will support for both [react](https://reactjs.org/) and [react-native](https://reactnative.dev/)

###

> ### **Note:** Please read the detail documentation from [here](https://cartoonmangodev.github.io/react-boilerplate-redux-saga-hoc-docs/)

> ### **Important:** This package now also support nextJS.Please read nextjs setup documentation from [here](https://cartoonmangodev.github.io/react-boilerplate-redux-saga-hoc-docs/docs/getting-started/installation-setup#-installing-on-next-js)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

Copyright (c) 2020-present Chrissie Fernando
