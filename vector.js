/// <reference path="typings/node/node.d.ts" />

var format = require('format-string'),
    sqrt = Math.sqrt;

/**
 * @param x
 * @param y
 * @param z
 * @constructor
 */
function Vector(x, y, z) {
    /**
     * @type {number}
     */
    this.x = x || 0;
    /**
     * @type {number}
     */
    this.y = y || 0;
    /**
     * @type {number}
     */
    this.z = z || 0;
}

Vector.prototype = {
    /**
     *
     * @param x
     * @param y
     * @param z
     * @returns {Vector}
     */
    set: function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    },
    /**
     * @returns {Vector}
     */
    clone: function() {
        return new Vector(this.x, this.y, this.z);
    },
    /**
     * @returns {number}
     */
    length: function() {
        return sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    },
    /**
     * @returns {Vector}
     */
    normalize: function() {
        var length = this.length();
        this.div(length, length, length);
        return this;
    },
    /**
     * @param x
     * @param y
     * @param z
     * @returns {Vector}
     */
    add: function(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
        return this;
    },

    /**
     * @param x
     * @param y
     * @param z
     * @returns {Vector}
     */
    sub: function(x, y, z) {
        this.x -= x;
        this.y -= y;
        this.z -= z;
        return this;
    },

    /**
     * @param x
     * @param y
     * @param z
     * @returns {Vector}
     */
    mul: function(x, y, z) {
        this.x *= x;
        this.y *= y;
        this.z *= z;
        return this;
    },

    /**
     * @param x
     * @param y
     * @param z
     * @returns {Vector}
     */
    div: function(x, y, z) {
        this.x /= x;
        this.y /= y;
        this.z /= z;
        return this;
    },
    /**
     * @param d
     * @returns {Vector}
     */
    scale: function(d) {
        this.x *= d;
        this.y *= d;
        this.z *= d;
        return this;
    },
    /**
     * @returns {Vector}
     */
    invert: function() {
        this.scale(-1);
        return this;
    },
    /**
     * @param {Vector} v
     * @returns {Vector}
     */
    addVector: function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    },
    /**
     * @param {Vector} v
     * @returns {Vector}
     */
    subVector: function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    },
    /**
     * @param {Vector} v
     * @returns {number}
     */
    dot: function(v) {
        return this.x*v.x + this.y*v.y + this.z*v.z
    },
    /**
     * @returns {number[]}
     */
    toArray: function() {
        return [this.x, this.y, this.z];
    },
    /**
     * @returns {string}
     */
    toString: function() {
        return format('[:x, :y, :z]', this);
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
                return this[order[0]];
                break;
            case 2:
                return new Vector(
                    this[order[0]],
                    this[order[1]]
                )
                break;
            case 3:
                return new Vector(
                    this[order[0]],
                    this[order[1]],
                    this[order[2]]
                );
                break;
            default:
                throw format(
                    'Invalid order \':order\'. ' +
                    'Use .as(\'xxx\'), .as(\'xyz\'), .as(\'zyx\'), etc.',
                    { order: order }
                );
        }
        return new Vector(this.x, this.x, this.x)
    }
};

module.exports = Vector;