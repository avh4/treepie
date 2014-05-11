var OutlineParser = require('./OutlineParser');

describe('OutlineParser', function() {
  it('handles a single item', function() {
    expect(OutlineParser('Homework')).toEqual([{name:'Homework', children:[]}]);
  });
  
  it('handles an empty input', function() {
    expect(OutlineParser('')).toEqual([]);
  });
  
  it('handles a simple list', function() {
    expect(OutlineParser('A\nB\nC')).toEqual([{name:'A', children:[]}, {name:'B', children:[]}, {name:'C', children:[]}]);
  });
  
  it('ignores blank lines', function() {
    expect(OutlineParser('A\n\nB\nC')).toEqual([{name:'A', children:[]}, {name:'B', children:[]}, {name:'C', children:[]}]);
  });
  
  it('trims blank lines', function() {
    expect(OutlineParser('\n\nA\nB\nC\n\n')).toEqual([{name:'A', children:[]}, {name:'B', children:[]}, {name:'C', children:[]}]);
  });
  
  it('handles one child element', function() {
    expect(OutlineParser('A\n a1')).toEqual([{name: 'A', children: [{name:'a1', children:[]}]}]);
  });
  
  it('handles multiple children', function() {
    expect(OutlineParser('A\n a1\n a2\n a3')).toEqual([
      {name: 'A', children: [{name:'a1', children:[]}, {name:'a2', children:[]}, {name:'a3', children:[]}]}]);
  });

  it('handles multiple parents', function() {
    expect(OutlineParser('A\n a1\n a2\nB\nC\n c1')).toEqual([
      {name: 'A', children: [{name:'a1', children:[]}, {name:'a2', children:[]}]}, 
      {name:'B', children:[]}, 
      {name: 'C', children: [{name:'c1', children:[]}]}]);
  });
  
  it('handles grandchildren', function() {
    expect(OutlineParser('A\n a1\n  a1i')).toEqual([{name: 'A', children: [{name: 'a1', children: [{name:'a1i', children:[]}]}]}]);
  });
});