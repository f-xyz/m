/**
     * Is a point lays in rectangle?
     * @param {Point} pt
     * @returns {Boolean}
     */
    Rectangle.prototype.hasPoint = function(pt) {
        return pt.x >= this.x && pt.x <= this.x + this.w &&
               pt.y >= this.y && pt.y <= this.y + this.h;
    };

    /**
     * Is the rectangle intersects another?
     * @param {Rectangle} box
     * @returns {Boolean}
     */
    Rectangle.prototype.isIntersects = function(box) {
        return this.x + this.w >= box.x &&
               this.x <= box.x + box.w &&
               this.y + this.h >= box.y &&
               this.y <= box.y + box.h;
    };
    
/**
     * Transition.
     * @param {Point} to
     * @param {Number} value 0..1
     * @returns {Point} New instance.
     */
    Point.prototype.transition = function(to, value) {
        this.x = this.x + (to.x - this.x) * value;
        this.y = this.y + (to.y - this.y) * value;

        return this;
    };    
    
    
    
    /**
     * World -> view.
     * @param {Point} pt
     * @returns {Point}
     */
    Canvas.prototype.worldToView = function(pt) {
        if (this.inverseTransform) {
            var m = this.inverseTransform;
            var x = pt.x + m[4];
            var y = pt.y + m[5];
            return new Point(
                x * m[0] + y * m[2],
                x * m[1] + y * m[3]
            );
        } else {
            return pt;
        }
    };

    /**
     * View -> world.
     * @param {Point} pt
     * @returns {Point}
     */
    Canvas.prototype.viewToWorld = function(pt) {
        if (this.transform) {
            var m = this.transform;
            var x = pt.x + m[4];
            var y = pt.y + m[5];
            return new Point(
                x * m[0] + y * m[2],
                x * m[1] + y * m[3]
            );
        } else {
            return pt;
        }
    };
    
    /**
     * Apply transformation.
     * @param {Array} m
     * @returns {Canvas} this
     */
    Canvas.prototype.setTransform = function(m) {

        // save
        this.transform = m;

        // apply it
        this._context.setTransform(
            m[0], m[1],
            m[2], m[3],
            m[4], m[5]
        );

        // 2x2 determinant
        var d = m[0] * m[3] - m[1] * m[2];

        // inversion
        // noinspection JSHint
        this.inverseTransform = [
             m[3] / d, -m[1] / d,
            -m[2] / d,  m[0] / d,
            -m[4],     -m[5]
        ];

        return this;
    };
