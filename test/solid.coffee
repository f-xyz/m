should = require('chai').should()
Vector = require('../vector')
Solid = require('../solid')

describe 'Solid', ->
  it 'is be function', ->
    (typeof Solid).should.equal('function')
  it 'default constructor init. by 0 but mass 1', ->
    (new Solid()).should.deep.equal({
      mass: 1
      position: new Vector(),
      velocity: new Vector(),
      acceleration: new Vector()
    })
