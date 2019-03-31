/* eslint-env node */
const path = require('path');

module.exports = {
  description: 'The default blueprint for training-buddy-default-template',

  normalizeEntityName() {
    // no-op
  },

  fileMapTokens: function() {
    let isAddon = this.project.isEmberCLIAddon();
    return {
      __base__() {
        if(isAddon) {
          return path.join('tests', 'dummy');
        }
        return '';
      }
    }
  },

  afterInstall() {
    let devInstall = {
      packages: [
        'ember-cli-sass',
      ]
    }

    return this.addAddonsToProject(devInstall)
  },

  filesToRemove: ['app/styles/app.css'],
};
