// module.exports = {
//   baseUrl: 'http://localhost:8000/',
//   gridUrl: 'http://0.0.0.0:4444/wb/hub'
// };

module.exports = {
  sets: {
    desktop: {
      files: 'tests/all'
    }
  },

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox'
      }
    }
  }
};
