/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};

const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = (on) => {
    on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
    });

    on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
    });
};
