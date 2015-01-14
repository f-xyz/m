define([
    "underscore",
    "ge/math"
], function(_, GEMath) {
    "use strict";

    /**
     * Color with opacity.
     * @class RGBA
     * @param {Number} r Red.
     * @param {Number} g Green.
     * @param {Number} b Blue.
     * @param {Number} a Alpha.
     * @constructor
     */
    function RGBA(r, g, b, a) {
        /**
         * Red.
         * @type {Number}
         */
        this.r = r;

        /**
         * Green.
         * @type {Number}
         */
        this.g = g;

        /**
         * Blue.
         * @type {Number}
         */
        this.b = b;

        /**
         * Alpha.
         * @type {Number}
         */
        this.a = a;
    }

    ////////////////////////////////////////////////////////////////////////////

    /**
     * Clones the color.
     * @param {Object} [overrides]
     * @param {Number} [overrides.r]
     * @param {Number} [overrides.g]
     * @param {Number} [overrides.b]
     * @param {Number} [overrides.a]
     * @returns {RGBA}
     */
    RGBA.prototype.clone = function(overrides) {
        overrides = _.extend({
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a
        }, overrides || {});

        return new RGBA(
            overrides.r,
            overrides.g,
            overrides.b,
            overrides.a
        );
    };

    ////////////////////////////////////////////////////////////////////////////

    /**
     * Color comparison.
     * @param {RGBA|String} rgba
     * @returns {Boolean}
     */
    RGBA.prototype.equals = function(rgba) {
        if (!(rgba instanceof RGBA)) {
            rgba = RGBA.parse(rgba);
        }
        return this.r === rgba.r &&
               this.g === rgba.g &&
               this.b === rgba.b &&
               this.a === rgba.a;
    };

    /**
     * Color inversion.
     * @returns {RGBA} this
     */
    RGBA.prototype.invert = function() {
        this.r = 255 - this.r;
        this.g = 255 - this.g;
        this.b = 255 - this.b;

        return this;
    };

    /**
     * Normalizes RGBA values to 0..255.
     * @returns {RGBA}
     */
    RGBA.prototype.normalize = function() {
        this.r = GEMath.limit(this.r, 0, 255);
        this.g = GEMath.limit(this.g, 0, 255);
        this.b = GEMath.limit(this.b, 0, 255);
        this.a = GEMath.limit(this.a, 0, 1);

        return this;
    };

    /**
     * Color morphing.
     * @param {RGBA} to
     * @param {Number} value In range 0..1
     * @returns {RGBA}
     */
    RGBA.prototype.transition = function(to, value) {
        this.r = Math.floor(this.r + (to.r - this.r) * value);
        this.g = Math.floor(this.g + (to.g - this.g) * value);
        this.b = Math.floor(this.b + (to.b - this.b) * value);
        this.a = this.a + (to.a - this.a) * value;

        return this;
    };

    /**
     * Returns string representation (rgba(...)).
     * @returns {String}
     */
    RGBA.prototype.toString = function() {
        return 'rgba(' + [this.r, this.g, this.b, this.a].join(',') + ')';
    };

    ////////////////////////////////////////////////////////////////////////////

    /**
     * Parses CSS color values.
     * W3C compatible.
     * Supports: #rgb, #rrggbb, rgb(r, g, b), rgba(r, g, b, a)
     * @param {String} value
     * @returns {RGBA|undefined}
     */
    RGBA.parse = function(value) {
        if (value instanceof RGBA) {
            return value.clone();
        }

        var rx, parts, i, nan = false;
        var origValue = value;

        value = value || "";
        value = String(value).replace(/\s/g, '');

        // w3c color names
        var map = {
            maroon:     "#800000",
            red:        "#ff0000",
            orange:     "#ffA500",
            yellow:     "#ffff00",
            olive:      "#808000",
            purple:     "#800080",
            fuchsia:    "#ff00ff",
            white:      "#ffffff",
            lime:       "#00ff00",
            green:      "#008000",
            navy:       "#000080",
            blue:       "#0000ff",
            aqua:       "#00ffff",
            teal:       "#008080",
            black:      "#000000",
            silver:     "#c0c0c0",
            gray:       "#808080"
        };

        if (value in map) {
            value = map[value];
        }

        // #rrggbb or #rgb
        if (value.substr(0, 1) === '#') {

            parts = [];

            if (value.length === 4) {
                parts.push(value.substr(1, 1) + value.substr(1, 1));
                parts.push(value.substr(2, 1) + value.substr(2, 1));
                parts.push(value.substr(3, 1) + value.substr(3, 1));
            } else {
                parts.push(value.substr(1, 2));
                parts.push(value.substr(3, 2));
                parts.push(value.substr(5, 2));
            }

            for (i in parts) {
                if (parts.hasOwnProperty(i)) {
                    parts[i] = parseInt("0x" + parts[i], 16);
                    if (isNaN(parts[i])) {
                        nan = true;
                    }
                }
            }

            if (!nan) {
                return new RGBA(parts[0], parts[1], parts[2], 1);
            }

            // rgb(a)
        } else if (value.substr(0, 3) === "rgb") {

            // convert percent values
            value = value.replace(/\d{1,}%/g, function(part) {
                part = part.substr(0, part.length - 1);
                part = parseFloat(part);
                part = Math.round(255 * part / 100);
                return part;
            });

            // parse
            rx = /(\d{1,3}),(\d{1,3}),(\d{1,3}),?([\d\.]{1,})?/;
            parts = rx.exec(value);

            // check
            if (parts) {
                parts = parts.slice(1);
                if (!parts[3]) {
                    parts[3] = 1;
                }

                for (i in parts) {
                    if (parts.hasOwnProperty(i)) {
                        parts[i] = parseFloat(parts[i]);
                        if (isNaN(parts[i]) || parts[i] > 255) {
                            nan = true;
                        }
                    }
                }

                if (!nan) {
                    return new RGBA(parts[0], parts[1], parts[2], parts[3]);
                }
            }
        }

        throw new Error("RGBA.parse is unable to parse: " + origValue);
    };

    ////////////////////////////////////////////////////////////////////////////

    return RGBA;
});