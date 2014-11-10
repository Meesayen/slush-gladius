/* jshint -W079 */
var
  gulp = require('gulp'),
  gladius = require('gladius-forge'),
  server = require('./app');


/**
 * Here you can configure the gulp build system with custom folders, different
 * build modules, etc.
 * ------------------------------------------------------------------------- */
gladius.config(gulp, {
  modules: {
    // module to use to preprocess your stylesheets. default: less
    // possible values: less, sass, sassCompass, stylus, myth.
    styles: '<%= stylesPlugin %>',
    // module to use to preprocess your stylesheets. default: handlebars
    // possible values: handlebars, jade, dust, dot.
    templates: '<%= templatesPlugin %>'
  },
  paths: {
    src: {
      // folder home of your source files (less, js, etc). default: src/
      base: '<%= sourceBase %>',

      // styles sources folder. default: styles/
      styles: '<%= sourceStyles %>',

      // scripts folder. default: scripts/
      scripts: '<%= sourceScripts %>',

      // file extension for es6+ scripts. default: .es6
      esnextExtension: '<%= sourceEsnextExt %>',

      // templates and partials folder: default: ../views/, partials/
      templates: '../<%= sourceTemplates %>',
      partials: '<%= sourcePartials %>'
    },

    out: {
      // folder destination for built bundles. default: public/
      base: '<%= outputBase %>',

      // production ready styles folder. default: css/
      styles: '<%= outputStyles %>',

      // production ready scripts folder. default: js/
      scripts: '<%= outputScripts %>'
    }
  },
  // express web server to use while developing.
  // port default: 3000
  // liveReloadPort default: 35729
  server: server,
  port: <%= serverPort %>,
  liveReloadPort: null
});




/**
 * Here you can hook extra tasks as dependency for predefined tasks (insert
 * a leading '!' to remove dependencies) or add additional sources (insert a
 * leading '!' to the path to delcare sources which should be ignored).
 * ------------------------------------------------------------------------- */
gladius.setupTasks({
  'bundle-js': {
    deps: [],
    src: []
  },
  'bundle-js:dev': {
    deps: ['bundle-mock-server', '!lint', '!esnext'],
    src: []
  },
  'lint': {
    deps: [],
    src: [
      '!<%= sourceBase %><%= sourceScripts %>vendor/**/*',
      '!<%= sourceBase %><%= sourceScripts %>mock/lib/**/*',
    ]
  }
});


/**
 * Add extra gulp tasks below
 * ------------------------------------------------------------------------- */
var $ = gladius.getPlugins();
<% if (templatesPlugin == 'handlebars') { %>
/* Handlebars helpers bundling */
gulp.task('publish-helpers', function() {
  return gulp.src(['handlebars.helpers.js'])
  .pipe($.uglify())
  .pipe(gulp.dest('<%= outputBase %><%= outputScripts %>'));
});<% } %>

/* Mock server bundling */
gulp.task('bundle-mock-server', ['lint', 'esnext'], function() {
  return gulp.src(['<%= sourceBase %>temp/mock/server<%= sourceEsnextExt %>'])
  .pipe($.browserify({
    insertGlobals: false,
    debug: true
  }))
  .pipe($.rename(function (path) {
    path.basename = 'mock-server';
    path.extname = '.js';
  }))
  .pipe(gulp.dest('<%= outputBase %><%= outputScripts %>'));
});


/**
 * Add extra gulp watchers below
 * ------------------------------------------------------------------------- */
gladius.setupWatchers(function(gulp) {<% if (templatesPlugin == 'handlebars') { %>
  gulp.watch('handlebars.helpers.js', ['publish-helpers']);
<% } %>});



/**
 * Here you can inject extra tasks into the main tasks. Those will be appendend
 * and concurrently run with other tasks.
 * ------------------------------------------------------------------------- */
gladius.setupMain({
  'development': [
    <% if (templatesPlugin == 'handlebars') { %>'publish-helpers'<% } %>
  ],
  'test': [],
  'production': [
    <% if (templatesPlugin == 'handlebars') { %>'publish-helpers'<% } %>
  ]
});
