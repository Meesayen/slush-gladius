import { randomList } from './utils<%= sourceEsnextModuleExt %>';
import { company as fakeCompany } from '../lib/faker';

export var testing = {
  success: () => ({
    message: 'Hey Dude, fucking A, it is working!',
    deeply: {
      nested: {
        key: 'wonderful'
      }
    }
  }),
  failure: () => ({
    message: 'Oh no, man, I am sorry. It looks broken.'
  })
};

export var one = () => ({
  greetings: 'ciao'
});

export var last = {
  success: () => ({
    message: 'Yes, it is really wonderful stuff.'
  }),
  failure: () => ({
    message: 'Broken!'
  })
};

export var awesomeList = {
  success: () => ({
    title: fakeCompany.companyName(),
    items: randomList(10, function() {
      return {
        label: fakeCompany.catchPhrase()
      };
    })
  }),
  failure: () => ({
    message: 'Broken!'
  })
};

// Little trick until es6-module-transpiler would support the new syntax:
// import { * as moduleName } from './moduleName';
export default {
  testing: testing,
  one: one,
  last: last,
  awesomeList: awesomeList
};
