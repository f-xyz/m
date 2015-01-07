should = require('chai').should()
Vector = require('../vector')
Solid = require('../solid')
sqrt = Math.sqrt

describe 'Solid', ->
  s = null

  beforeEach () ->
    s = new Solid({
      mass: 10,
      position: new Vector(),
      velocity: new Vector(),
      acceleration: new Vector()
    })

  it 'typeof is function', ->
    (typeof Solid).should.equal('function')

  it 'can be used as function', ->
    Solid().should.deep.equal(new Solid())

  it 'default constructor init. by 0 but mass 1', ->
    (new Solid()).should.deep.equal(new Solid({
      mass: 1
      position: new Vector(),
      velocity: new Vector(),
      acceleration: new Vector()
    }))

  it 'clone()', ->
    clone = s.clone()
    clone.mass = 111
    clone.position.set(1, 1, 1)
    clone.velocity.set(2, 2, 2)
    clone.acceleration.set(3, 3, 3)
    s.should.not.deep.equal(clone)
