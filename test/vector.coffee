should = require('chai').should()
Vector = require('../vector')
sqrt = Math.sqrt

describe 'Vector', ->
  v = null

  beforeEach () -> v = new Vector(1, 2, 3)

  it 'typeof is function', ->
    (typeof Vector).should.equal('function')

  it 'default constructor init. by 0', ->
    new Vector().should.deep.equal(new Vector(0, 0, 0))

  it 'set(x, y, z)', ->
    v.set(3, 2, 1)
    v.should.deep.equal(new Vector(3, 2, 1))

  it 'clone()', ->
    clone = v.clone().set(10, 10, 10)
    v.should.not.deep.equal(clone)

  describe 'scalar functions', ->
    it 'length()', ->
      v.length().should.equal(sqrt(14))
    it 'normalize()', ->
      v.set(1, 1, 1)
      k = 1/sqrt(3)
      v.normalize().should.deep.equal(new Vector(k, k, k))
    it 'dot()', ->
      v = new Vector(1, 1, 1)
      v.dot(new Vector(1, 2, 3)).should.equal(6)
    it 'add(x, y, z)', ->
      v.add(10, 20, 30)
      v.should.deep.equal(new Vector(11, 22, 33))
    it 'sub(x, y, z)', ->
      v.sub(1, 2, 3)
      v.should.deep.equal(new Vector(0, 0, 0))
    it 'mul(x, y, z)', ->
      v.mul(10, 20, 30)
      v.should.deep.equal(new Vector(10, 40, 90))
    it 'div(x, y, z)', ->
      v.sub(1, 2, 3)
      v.should.deep.equal(new Vector())
    it 'scale(d)', ->
      v = new Vector(1, 2, 3)
      v.scale(2).should.deep.equal(new Vector(2, 4, 6))
    it 'invert()', ->
      v = new Vector(1, 2, 3)
      v.invert().should.deep.equal(new Vector(-1, -2, -3))

  describe 'vector functions', ->
    it 'addVector(v)', ->
      v = new Vector(1, 2, 3)
      v.addVector(v)
      v.should.deep.equal(new Vector(2, 4, 6))
    it 'subVector(v)', ->
      v = new Vector(1, 2, 3)
      v.subVector(v)
      v.should.deep.equal(new Vector(0, 0, 0))

  describe 'conversion', ->
    it 'toArray()', ->
      new Vector(1, 2, 3).toArray().should.deep.equal([1, 2, 3])
    it 'toString()', ->
      new Vector(1, 2, 3).toString().should.equal('[1, 2, 3]')

  describe 'as() -> GLSL-like stuff', ->
    it 'as()', ->
      v.as('xyz').should.deep.equal(new Vector(v.x, v.y, v.z))
    it 'throws', ->
      f = () => v.as('error')
      f.should.throw()
