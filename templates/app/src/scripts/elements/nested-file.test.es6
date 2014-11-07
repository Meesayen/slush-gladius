import nested from './nested-file<%= sourceEsnextModuleExt %>';

describe('nested', () => {
  it('should print a fancy string', () => {
    expect(nested()).to.equal("function in the nested file");
  });
});
