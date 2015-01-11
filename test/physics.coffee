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
      s.velocity.set(1, 2, 3)
      physics.step(s, dt)
      s.position.should.deep.equal(new Vector(1, 2, 3))
    it 'should calc. velocity from acceleration', ->
      dt = 1
      s = new Solid()
      s.acceleration.set(1, 2, 3)
      physics.step(s, dt)
      s.velocity.should.deep.equal(new Vector(1, 2, 3))
    it 'should calc. position from velocity and acceleration', ->
      dt = 1
      s = new Solid()
      s.acceleration.set(0, 10, 0)
      physics.step(s, dt)
      s.position.should.deep.equal(new Vector(0, 5, 0))
      s.velocity.should.deep.equal(new Vector(0, 10, 0))

  describe 'gravity()', ->
