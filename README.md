# Eddy AutoML UI
> Eddy AutoML is an automated machine learning platform for streaming data. Part of the Eddy Analytics Platform.

User interface for the Eddy AutoML service. Used for scheduling, managing and monitoring AutoML jobs.


![Eddy AutoML Job](https://i.imgur.com/YwWoH8s.png)

The AutoML UI is an SPA written in Vue.js. It solely uses the Apollo GraphQL client to communicate with other services which are the Kafka GraphQL bridge and the backend service. It uses WebSockets and GraphQL subscriptions to communicate the Kafka GraphQL bridge in order to get available Kafka topics for data streaming and real-time machine learning statistics to use in a AutoML Job interface. Authentication and meta-information about the job are also done through GraphQL by communicating with the backend service.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
