define([
    "underscore",
    "ge/point"
], function(_, Point) {
    "use strict";

    /**
     * Loads and stores images with callback.
     * @class ImageList
     * @param {Array|Object} config - url list
     * @param {Function} [onLoad] onload callback
     * @param {Function} [onProgress] single image onload callback
     * @constructor
     */
    function ImageList(config, onLoad, onProgress) {
        config = config || [];

        /**
         * List of Image objects.
         * @type {Object}
         */
        this.images = {};

        /**
         * Count of images.
         * @type {Number}
         * @private
         */
        this.count = 0;

        /**
         * Count of loaded images.
         * @type {Number}
         * @private
         */
        this.loaded = 0;

        /**
         * Called when all images are loaded.
         * @type {Function}
         */
        this.onLoad = onLoad;

        /**
         * Called when single image loaded.
         * @type {Function}
         */
        this.onProgress = onProgress;

        // load all images
        var key, src;
        for (key in config) {
            if (config.hasOwnProperty(key)) {
                this.count++;
            }
        }
        for (key in config) {
            if (config.hasOwnProperty(key)) {
                src = config[key];
                this.images[key] = this._load(src);
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////

    /**
     * Augments an image with several methods.
     * @param {Image} [image] Default: new Image().
     * @returns {Object}
     * @private
     */
    ImageList.createImage = function(image) {
        image = image || new Image();

        return _.extend(image, {
            isLoaded: function() {
                return this.width + this.height > 0;
            },
            getSize: function() {
                return new Point(this.width, this.height);
            },
            draw: function(ctx, x, y) {
                ctx.drawImage(this, x || 0, y || 0);
            }
        });
    };

    ////////////////////////////////////////////////////////////////////////////

    /**
     * Loads an image and adds it.
     * @param {String} src Image URL.
     */
    ImageList.prototype._load = function(src) {
        var that = this;

        var image = ImageList.createImage();
        image.onload = function() {
            that.loaded++;
            if (typeof(that.onProgress) === "function") {
                that.onProgress.call(that, that.loaded, that.count);
            }
            if (that.loaded >= that.count &&
                typeof(that.onLoad) === "function") {
                that.onLoad.call(that, that.loaded, that.count);
            }
        };
        image.src = src;

        return image;
    };

    /**
     * Returns an image.
     * @param {String|Number} key.
     * @returns {Image}
     */
    ImageList.prototype.get = function(key) {
        var image = this.images[key];
        if (image) {
            return image;
        } else {
            throw new Error("Key " + key + " does not exists in image list!");
        }
    };

    /**
     * Is all images loaded.
     * @returns {Boolean}
     */
    ImageList.prototype.isLoaded = function() {
        return this.loaded >= this.count;
    };

    return ImageList;
});