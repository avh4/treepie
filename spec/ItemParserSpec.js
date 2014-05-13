var ItemParser = require('../src/ItemParser');

describe('ItemParser', function() {
  it('handles items with name only', function() {
    expect(ItemParser('Homework')).toEqual({name: 'Homework'});
  });
  
  it('handles items with score', function() {
    expect(ItemParser('Homework 4/25')).toEqual({name: 'Homework', score:'4/25', percent:0.16});
  });
});