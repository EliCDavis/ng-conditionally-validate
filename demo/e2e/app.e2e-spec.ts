import { NgConditionallyValidatePage } from './app.po';

describe('ng-conditionally-validate App', () => {
  let page: NgConditionallyValidatePage;

  beforeEach(() => {
    page = new NgConditionallyValidatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
