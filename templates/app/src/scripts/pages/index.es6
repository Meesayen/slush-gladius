import { deserialize } from '../core/utils<%= sourceEsnextModuleExt %>';
import registry from '../config/storeRegistry<%= sourceEsnextModuleExt %>';
import Store from '../core/store<%= sourceEsnextModuleExt %>';
import tpl from '../core/tpl<%= sourceEsnextModuleExt %>';

var store = new Store(registry);

// Single call
store.get('one').then(data => {
  console.log(data.greetings);
});
// This one fails and receives default error message.
store.get('one', {fails:true}).then(data => {
  console.log(data.greetings);
}, err => {
  console.log(deserialize(err.responseText)['message'] || err.statusText);
});
// This one fails and receives custom error message.
store.get('two', {fails:true}).then(data => {
  console.log(data.greetings);
}, err => {
  console.log(deserialize(err.responseText)['message'] || err.statusText);
});

// Combo call
store.get('combo')
  .then(data => {
    console.log(data);
  }, err => {
    console.log(err);
  });

// The second time it fetches the cached value
setTimeout(() => {
  store.get('combo')
    .then(data => {
      console.log(data);
    }, (/*err*/) => {
      // console.log(err);
    });
}, 3000);

// Let's try with a template
setTimeout(() => {
  store.get('awesome-list-data')
    .then(data => {
      document.body.appendChild(tpl.renderSync('awesomeList', data));
    }).catch(err => {
      console.log(err);
    });
}, 1000);

// Let's try with a template, async mode
setTimeout(() => {
  store.get('awesome-list-data', {page:2})
    .then(data => {
      tpl.render('awesomeList', data).then(frag => {
        document.body.appendChild(frag);
      });
    }).catch(err => {
      console.log(err);
    });
}, 1500);

// Stupid thing for a stupid test.
module.exports.index = true;
window.store = store;
