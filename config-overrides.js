const rewireMobX = require('react-app-rewire-mobx');

/* config-overrides.js */
module.exports = function override(config, env) {
    // use MobX rewire to allow decorators
    config = rewireMobX(config,env);
    return config;
};
