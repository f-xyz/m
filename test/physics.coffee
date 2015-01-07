should = require('chai').should()
Vector = require('../vector')
Solid = require('../solid')
physics = require('../physics')

describe 'Physics', ->
  it 'is be object', -> (typeof physics).should.equal('object')

  describe 'step()', ->
    it 'should calc. position from velocity', ->
      dt = 1
      s = new Solid()
      s.velocity
    it 'should calc. position from velocity and acceleration', ->
    it 'should calc. velocity from acceleration', ->

  describe 'gravity()', ->
