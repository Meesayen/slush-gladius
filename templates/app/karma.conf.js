module.exports = function(config) {
  config.set({
    basePath: '<%= sourceBase %>',
    frameworks: ['mocha', 'chai', 'browserify'],
    files: [
      '<%= sourceScripts %>vendor/*.js',
      '../<%= outputBase %><%= outputScripts %>templates.js',
      '<%= sourceScripts %>mock/server<%= sourceEsnextExt %>',
      '<%= sourceScripts %>**/*.test<%= sourceEsnextExt %>',
      { pattern: '<%= sourceScripts %>**/*.js',
        included: false },
      { pattern: '<%= sourceScripts %>**/*<%= sourceEsnextExt %>',
        included: false }
    ],
    preprocessors: {
      '<%= sourceScripts %>mock/server<%= sourceEsnextExt %>': ['browserify'],
      '<%= sourceScripts %>**/*.test<%= sourceEsnextExt %>': ['browserify']
    },
    browserify: {
      transform: [
        // Hacking the way karma-bro injects transforms to pass options to
        // the esnextify transform.
        [{fileExt: '<%= sourceEsnextExt %>'}, 'esnextify']
      ],
      basedir: '<%= sourceBase %>'
    },
    colors: true,
    reporters: ['mocha'],
    port: 9876,
    logLevel: config.LOG_INFO,
    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],
    singleRun: true,
    autoWatch: true
  });
};
