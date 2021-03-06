should = require('chai').should()
Vector = require('../vector')
sqrt = Math.sqrt

describe 'Vector', ->
  v = null

  beforeEach () -> v = new Vector(1, 2, 3)

  it 'should be function', ->
    (typeof Vector).should.equal('function')

  it 'can be used as function', ->
    Vector(1, 2, 3).should.deep.equal(v)

  it 'default constructor should init. x, y and z by 0 ', ->
    new Vector().should.deep.equal(new Vector(0, 0, 0))

  it 'set(x, y, z) mutates the instance', ->
    v.set(3, 2, 1)
    v.should.deep.equal(new Vector(3, 2, 1))

  it 'clone()', ->
    clone = v.clone().set(10, 10, 10)
    v.should.not.deep.equal(clone)

  describe 'scalar functions', ->

    it 'length()', ->
      v.length().should.equal(sqrt(14))

    it 'distanceTo()', ->
      v.distanceTo(new Vector(0, 0, 0)).should.equal(sqrt(1+4+9))

    it 'normalize()', ->
      k = 1/sqrt(3)
      v.set(1, 1, 1)
      v.normalize().should.deep.equal(new Vector(k, k, k))

    it 'dot()', ->
      v = new Vector(1, 1, 1)
      v.dot(new Vector(1, 2, 3)).should.equal(6)

#    it 'add(x, y, z)', ->
#      v.add(10, 20, 30).should.deep.equal(new Vector(11, 22, 33))
#
#    it 'sub(x, y, z)', ->
#      v.sub(1, 2, 3).should.deep.equal(new Vector(0, 0, 0))
#
#    it 'mul(x, y, z)', ->
#      v.mul(10, 20, 30).should.deep.equal(new Vector(10, 40, 90))
#
#    it 'div(x, y, z)', ->
#      v.div(1, 2, 3).should.deep.equal(new Vector(1, 1, 1))

    it 'scale(d)', ->
      v = new Vector(1, 2, 3)
      v.scale(2).should.deep.equal(new Vector(2, 4, 6))

    it 'invert()', ->
      v = new Vector(1, 2, 3)
      v.invert().should.deep.equal(new Vector(-1, -2, -3))

  describe 'vector functions', ->

    it 'addVector(v)', ->
      v = new Vector(1, 2, 3)
      v.addVector(v).should.deep.equal(new Vector(2, 4, 6))

    it 'subVector(v)', ->
      v = new Vector(1, 2, 3)
      v.subVector(v).should.deep.equal(new Vector(0, 0, 0))

    it 'cross()', ->
      up = new Vector(0, 1, 0)
      right = new Vector(1, 0, 0)
      forward = new Vector(0, 0, -1)
      up.cross(right).should.deep.equal(forward)

    it 'mix(to, coefficient) - linear interpolation', ->
      v = new Vector(0, 0, 0)
      endpoint = new Vector(1, 1, 1)
      v.mix(endpoint, 0.1).should.deep.equal(new Vector(0.1, 0.1, 0.1))
      v.mix(endpoint, 0.9).should.deep.equal(new Vector(0.9, 0.9, 0.9))

  describe 'conversion', ->

    it 'toArray()', ->
      new Vector(1, 2, 3).toArray().should.deep.equal([1, 2, 3])

    it 'toString()', ->
      new Vector(1.23, 2, 3).toString().should.equal('[1.23, 2, 3]')

  describe 'as(order) -> GLSL-like stuff', ->
    set = ['x', 'y', 'z']

    it 'as(order) -> 1 argument', ->
      for i in [0...set.length]
        command = set[i]
        expected = new Vector(v[set[i]])
        v.as(command).should.deep.equal(expected)

    it 'as(order) -> 2 arguments', ->
      for i in [0...set.length]
        for j in [0...set.length]
            command = set[i] + set[j]
            expected = new Vector(v[set[i]], v[set[j]])
            v.as(command).should.deep.equal(expected)

    it 'as(order) -> 3 arguments', ->
      for i in [0...set.length]
        for j in [0...set.length]
          for k in [0...set.length]
            command = set[i] + set[j] + set[k]
            expected = new Vector(v[set[i]], v[set[j]], v[set[k]])
            v.as(command).should.deep.equal(expected)

    it 'throws otherwise', ->
      f = () => v.as('error')
      f.should.throw()
