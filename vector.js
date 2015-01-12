/// <reference path="typings/node/node.d.ts" />

var Class = require('better-inherits').Class,
    format = require('string-format-js'),
    sqrt = Math.sqrt,
    sqr = function(x) { return x * x }
;

var Vector = new Class({
    constructor: function(x, y, z) {
        if (!(this instanceof Vector)) {
            return new Vector(x, y, z);
        }
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    },
    set: function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    },
    clone: function() {
        return new Vector(this.x, this.y, this.z);
    },
    length: function() {
        return sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    },
    distanceTo: function(v) {
        return sqrt(
            sqr(v.x - this.x) +
            sqr(v.y - this.y) +
            sqr(v.z - this.z)
        );
    },
    normalize: function() {
        var length = this.length();
        return new Vector(
            this.x / length,
            this.y / length,
            this.z / length
        );
    },
    add: function(x, y, z) {
        return new Vector(
            this.x + x,
            this.y + y,
            this.z + z
        );
    },
    sub: function(x, y, z) {
        return new Vector(
            this.x - x,
            this.y - y,
            this.z - z
        );
    },
    mul: function(x, y, z) {
        return new Vector(
            this.x * x,
            this.y * y,
            this.z * z
        );
    },
    div: function(x, y, z) {
        return new Vector(
            this.x / x,
            this.y / y,
            this.z / z
        );
    },

    scale: function(d) {
        return new Vector(
            this.x * d,
            this.y * d,
            this.z * d
        );
    },
    invert: function(limit) {
        limit = limit || 0;
        return new Vector(
            limit-this.x,
            limit-this.y,
            limit-this.z
        );
    },

    addVector: function(v) {
        return new Vector(
            this.x + v.x,
            this.y + v.y,
            this.z + v.z
        );
    },
    subVector: function(v) {
        return new Vector(
            this.x - v.x,
            this.y - v.y,
            this.z - v.z
        );
    },
    dot: function(v) {
        return this.x*v.x + this.y*v.y + this.z*v.z
    },
    toArray: function() {
        return [this.x, this.y, this.z];
    },
    toString: function() {
        return '[%d, %d, %d]'.format(this.x, this.y, this.z);
    },
    /**
     * GLSL-line stuff.
     * Use .as('xxx'), .as('xyz'), .as(zyx), etc.
     * @param {string} order
     * @returns {Vector}
     */
    as: function(order) {
        switch (order.length) {
            case 1:
                return new Vector(this[order[0]]);
            case 2:
                return new Vector(
                    this[order[0]],
                    this[order[1]]
                );
            case 3:
                return new Vector(
                    this[order[0]],
                    this[order[1]],
                    this[order[2]]
                );
            default:
                throw 'Invalid order \'' + order + '\'. ' +
                      'Use .as(\'xxx\'), .as(\'xyz\'), .as(\'zyx\'), etc.';
        }
    }
});

module.exports = Vector;