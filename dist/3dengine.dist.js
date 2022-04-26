/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/ts/utils/angle.ts
var degToRad = function (deg) { return deg * Math.PI / 180; };
var radToDeg = function (rad) { return rad * 180 / Math.PI; };


;// CONCATENATED MODULE: ./src/ts/core/TranformMatrix.ts

var TransformMatrix = /** @class */ (function () {
    function TransformMatrix() {
    }
    TransformMatrix.translate = function (point, x, y, z) {
        return {
            x: point.x + x,
            y: point.y + y,
            z: point.z + z
        };
    };
    TransformMatrix.scale = function (point, sx, sy, sz) {
        return {
            x: point.x * sx,
            y: point.y * sy,
            z: point.z * sz
        };
    };
    TransformMatrix.perspectiveProjection = function (point, z0) {
        return {
            x: point.x * z0 / point.z,
            y: point.y * z0 / point.z,
            z: 0
        };
    };
    TransformMatrix.rotateX = function (point, a) {
        var rad = degToRad(a);
        return {
            x: point.x,
            y: point.y * Math.cos(rad) + point.z * Math.sin(rad),
            z: -point.y * Math.sin(rad) + point.z * Math.cos(rad)
        };
    };
    TransformMatrix.rotateY = function (point, a) {
        var rad = degToRad(a);
        return {
            x: point.x * Math.cos(rad) - point.z * Math.sin(rad),
            y: point.y,
            z: point.x * Math.sin(rad) + point.z * Math.cos(rad)
        };
    };
    TransformMatrix.rotateZ = function (point, a) {
        var rad = degToRad(a);
        return {
            x: point.x * Math.cos(rad) + point.y * Math.sin(rad),
            y: -point.x * Math.sin(rad) + point.y * Math.cos(rad),
            z: point.z
        };
    };
    return TransformMatrix;
}());
/* harmony default export */ const TranformMatrix = (TransformMatrix);

;// CONCATENATED MODULE: ./src/ts/core/RenderPipe.ts
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var RenderPipe = /** @class */ (function () {
    function RenderPipe(width, height, z0, zFar, camera) {
        this.width = width;
        this.height = height;
        this.z0 = z0;
        this.zFar = zFar;
        this.camera = camera;
    }
    RenderPipe.prototype.convertPoints = function (points) {
        var e_1, _a;
        var resPoints = [];
        var sumDistance = 0;
        try {
            for (var points_1 = __values(points), points_1_1 = points_1.next(); !points_1_1.done; points_1_1 = points_1.next()) {
                var point = points_1_1.value;
                point = this.cameraTranslate(point);
                point = this.cameraRotate(point);
                //передняя и дальняя плоскость отсечения
                if (point.z < 0)
                    continue;
                if (point.z > this.zFar)
                    continue;
                sumDistance += Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2) + Math.pow(point.z, 2));
                point = TranformMatrix.perspectiveProjection(point, this.z0);
                point = TranformMatrix.scale(point, 1, -1, 1);
                point = TranformMatrix.translate(point, this.width / 2, this.height / 2, 0);
                resPoints.push(point);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (points_1_1 && !points_1_1.done && (_a = points_1.return)) _a.call(points_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var averageDistance = sumDistance / resPoints.length;
        return { points: resPoints, averageDistance: averageDistance };
    };
    RenderPipe.prototype.cameraTranslate = function (point) {
        return TranformMatrix.translate(point, -this.camera.position.x, -this.camera.position.y, -this.camera.position.z);
    };
    RenderPipe.prototype.cameraRotate = function (point) {
        point = TranformMatrix.rotateX(point, this.camera.rotation.ax);
        point = TranformMatrix.rotateY(point, this.camera.rotation.ay);
        return TranformMatrix.rotateX(point, this.camera.rotation.az);
    };
    return RenderPipe;
}());
/* harmony default export */ const core_RenderPipe = (RenderPipe);

;// CONCATENATED MODULE: ./src/ts/utils/svgElements.ts
var createPolygonElem = function () {
    var svgPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    svgPolygon.setAttribute('stroke', 'red');
    svgPolygon.setAttribute('stroke-width', '2');
    return svgPolygon;
};
var createCircleElem = function (cx, cy, r) {
    var svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    svgCircle.setAttribute('cx', cx.toString());
    svgCircle.setAttribute('cy', cy.toString());
    svgCircle.setAttribute('r', r.toString());
    return svgCircle;
};
var createSVGElem = function () {
    var elem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    if (!(elem instanceof SVGSVGElement))
        throw new Error('Expected svg root elem');
    return elem;
};
var createSVGGElem = function () {
    var elem = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    if (!(elem instanceof SVGGElement))
        throw new Error('Expected svg g elem');
    return elem;
};
var createTextureElement = function (urlTexture, id) {
    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    var pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    pattern.id = id;
    pattern.setAttribute('patternContentUnits', 'objectBoundingBox');
    pattern.setAttribute('height', '100%');
    pattern.setAttribute('width', '100%');
    pattern.setAttribute('x', '0');
    pattern.setAttribute('y', '0');
    pattern.setAttribute('preserveAspectRatio', 'none');
    var image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', urlTexture);
    image.setAttribute('width', '1');
    image.setAttribute('height', '1');
    image.setAttribute('preserveAspectRatio', 'none');
    pattern.append(image);
    defs.append(pattern);
    return defs;
};


;// CONCATENATED MODULE: ./src/ts/core/Camera.ts

var Camera = /** @class */ (function () {
    function Camera(root) {
        this.rotation = { ax: 0, ay: 0, az: 0 };
        this.position = { x: 0, y: 0, z: 0 };
        this.rotationSpeed = { ax: 0, ay: 0, az: 0 };
        this.speedComponents = { x: 0, y: 0, z: 0 };
        this.keys = {
            w: false,
            s: false,
            d: false,
            a: false,
            shift: false,
            space: false
        };
        this.angleSpeed = 3;
        this.speed = 2;
        this.azMax = 70;
        this.root = root;
        this.setControls();
    }
    Camera.prototype.update = function () {
        this.updateSpeed();
        this.position.x += this.speedComponents.x;
        this.position.y += this.speedComponents.y;
        this.position.z += this.speedComponents.z;
        this.rotation.ax += this.rotationSpeed.ax;
        this.rotation.ay += this.rotationSpeed.ay;
        this.changeZAngle(this.rotationSpeed.az);
        this.rotation.ax %= 360;
        this.rotation.ay %= 360;
        this.rotation.az %= 360;
    };
    Camera.prototype.changeZAngle = function (daz) {
        if (Math.abs(this.rotation.az) < this.azMax) {
            this.rotation.az += daz;
        }
        else if (this.rotation.az > 0 && daz < 0 || this.rotation.az < 0 && daz > 0) {
            this.rotation.az += daz;
        }
    };
    Camera.prototype.updateSpeed = function () {
        var vec = { x: 0, y: 0, z: 0 };
        //направляющие косинусы
        var b = Math.cos(degToRad(this.rotation.ay));
        var c = Math.sin(degToRad(this.rotation.az));
        //из двух нужно определить третий ??? что-то все равно не так
        var a = Math.sin(degToRad(this.rotation.ay));
        if (this.keys.w) {
            vec.x += this.speed * a;
            vec.z += this.speed * b;
            vec.y -= this.speed * c;
        }
        if (this.keys.s) {
            vec.x -= this.speed * a;
            vec.z -= this.speed * b;
            vec.y += this.speed * c;
        }
        if (this.keys.a) {
            vec.x -= this.speed * b;
            vec.z += this.speed * a;
        }
        if (this.keys.d) {
            vec.x += this.speed * b;
            vec.z -= this.speed * a;
        }
        if (this.keys.shift)
            vec.y -= this.speed;
        if (this.keys.space)
            vec.y += this.speed;
        this.speedComponents = vec;
    };
    Camera.prototype.setControls = function () {
        var _this = this;
        var mousemoveHandler = function (e) {
            _this.rotation.ay += e.movementX / 10;
            _this.changeZAngle(e.movementY / 10);
        };
        var keyUpListener = function (e) {
            if (_this.keys.w && e.code === 'KeyW')
                _this.keys.w = false;
            if (_this.keys.s && e.code === 'KeyS')
                _this.keys.s = false;
            if (_this.keys.a && e.code === 'KeyA')
                _this.keys.a = false;
            if (_this.keys.d && e.code === 'KeyD')
                _this.keys.d = false;
            if (_this.keys.shift && e.code === 'ShiftLeft')
                _this.keys.shift = false;
            if (_this.keys.space && e.code === 'Space')
                _this.keys.space = false;
            if (e.key === 'ArrowRight')
                _this.rotationSpeed.ay = 0;
            if (e.key === 'ArrowLeft')
                _this.rotationSpeed.ay = 0;
            if (e.code === 'ArrowUp')
                _this.rotationSpeed.az = 0;
            if (e.code === 'ArrowDown')
                _this.rotationSpeed.az = 0;
        };
        var keyDownListener = function (e) {
            if (!_this.keys.w)
                _this.keys.w = e.code === 'KeyW';
            if (!_this.keys.s)
                _this.keys.s = e.code === 'KeyS';
            if (!_this.keys.a)
                _this.keys.a = e.code === 'KeyA';
            if (!_this.keys.d)
                _this.keys.d = e.code === 'KeyD';
            if (!_this.keys.shift)
                _this.keys.shift = e.code === 'ShiftLeft';
            if (!_this.keys.space)
                _this.keys.space = e.code === 'Space';
            if (e.code === 'ArrowRight')
                _this.rotationSpeed.ay = _this.angleSpeed;
            if (e.code === 'ArrowLeft')
                _this.rotationSpeed.ay = -_this.angleSpeed;
            if (e.code === 'ArrowUp')
                _this.rotationSpeed.az = -_this.angleSpeed;
            if (e.code === 'ArrowDown')
                _this.rotationSpeed.az = _this.angleSpeed;
        };
        document.addEventListener('pointerlockchange', function () {
            if (document.pointerLockElement === _this.root) {
                document.addEventListener('mousemove', mousemoveHandler);
                document.addEventListener('keyup', keyUpListener);
                document.addEventListener('keydown', keyDownListener);
            }
            else {
                document.removeEventListener('mousemove', mousemoveHandler);
                document.removeEventListener('keyup', keyUpListener);
                document.removeEventListener('keydown', keyDownListener);
            }
        });
        //управление только когда курсор захвачен
        this.root.addEventListener('click', function () {
            _this.root.requestPointerLock();
        });
    };
    return Camera;
}());
/* harmony default export */ const core_Camera = (Camera);

;// CONCATENATED MODULE: ./src/ts/core/World.ts
var World_values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};




var World = /** @class */ (function () {
    function World(root) {
        this.objects = [];
        this.polygons = [];
        this.bgElems = [];
        this.bg = { width: 0, url: '' };
        this.styleString = '';
        this.zFar = 1000000;
        this.fov = 45;
        this.svgRoot = createSVGElem();
        this.groupObject = createSVGGElem();
        this.svgRoot.append(this.groupObject);
        root.append(this.svgRoot);
        this.root = root;
        this.root.classList.add('wallpaper');
        var z0 = this.calcZ0(this.fov, this.zFar);
        this.camera = new core_Camera(root);
        this.renderPipe = new core_RenderPipe(root.clientWidth, root.clientHeight, z0, this.zFar, this.camera);
    }
    Object.defineProperty(World.prototype, "svgRootElement", {
        get: function () {
            return this.svgRoot;
        },
        enumerable: false,
        configurable: true
    });
    World.prototype.addBgElem = function () {
        var e_1, _a, _b;
        var elems = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elems[_i] = arguments[_i];
        }
        try {
            for (var elems_1 = World_values(elems), elems_1_1 = elems_1.next(); !elems_1_1.done; elems_1_1 = elems_1.next()) {
                var elem = elems_1_1.value;
                this.styleString += elem.styleBg + ',';
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (elems_1_1 && !elems_1_1.done && (_a = elems_1.return)) _a.call(elems_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.root.style.background = this.styleString.slice(0, -1);
        (_b = this.bgElems).push.apply(_b, __spreadArray([], __read(elems), false));
    };
    World.prototype.updateBg = function () {
        this.styleString = '';
        var bgSizes = '';
        for (var i = 0; i < this.bgElems.length; i++) {
            this.bgElems[i].update(this.root.clientWidth, this.camera.rotation.ay);
            this.styleString += this.bgElems[i].styleBg;
            bgSizes += '100px';
            if (i < this.bgElems.length - 1) {
                this.styleString += ', ';
                bgSizes += ', ';
            }
        }
        if (this.bgElems.length !== 0) {
            bgSizes += ', ';
            this.styleString += ', ';
        }
        var maxBgPos = this.bg.width + this.root.clientWidth;
        var a = this.camera.rotation.ay;
        var xPos = a * maxBgPos / 360;
        this.styleString += "url(\"".concat(this.bg.url, "\") ").concat(-xPos, "px 0 repeat-x");
        bgSizes += 'cover';
        this.root.style.background = this.styleString;
        this.root.style.backgroundSize = bgSizes;
    };
    World.prototype.setBackground = function (url) {
        var _this = this;
        var image = new Image();
        image.src = url;
        this.bg.url = url;
        image.onload = function () {
            _this.bg.width = image.width;
        };
    };
    World.prototype.addObjects = function () {
        var e_2, _a, e_3, _b, _c;
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        try {
            for (var objects_1 = World_values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
                var obj = objects_1_1.value;
                try {
                    for (var _d = (e_3 = void 0, World_values(obj.polygons)), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var p = _e.value;
                        if (p.texture)
                            this.svgRoot.prepend(p.texture);
                        this.groupObject.append(p.tagElem);
                        this.polygons.push(p);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (objects_1_1 && !objects_1_1.done && (_a = objects_1.return)) _a.call(objects_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        (_c = this.objects).push.apply(_c, __spreadArray([], __read(objects), false));
    };
    //animate
    World.prototype.run = function (fps) {
        var _this = this;
        var fpsInterval;
        var now;
        var past;
        var animate = function () {
            requestAnimationFrame(animate);
            now = Date.now();
            var elapsed = now - past;
            if (elapsed > fpsInterval) {
                past = now - (elapsed % fpsInterval);
                _this.render();
            }
        };
        var startAnimating = function () {
            fpsInterval = 1000 / fps;
            past = Date.now();
            animate();
        };
        startAnimating();
    };
    World.prototype.calcZ0 = function (fov, zFar) {
        fov = degToRad(fov);
        var farWidth = 2 * zFar * Math.tan(fov / 2);
        return zFar * this.root.clientWidth / farWidth;
    };
    World.prototype.render = function () {
        var e_4, _a;
        this.camera.update();
        this.updateBg();
        try {
            for (var _b = World_values(this.polygons), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                p.render(this.renderPipe);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        //отсоритровать по averageDistance
        this.polygons.sort(function (p1, p2) { return p2.averageDistance - p1.averageDistance; });
        //изменяем  dom
        var jStart = 0;
        var i = 0;
        while (this.polygons[i].tagElem.isEqualNode(this.groupObject.children[i])) {
            i++;
            jStart = i;
            if (jStart >= this.polygons.length - 1)
                return;
        }
        for (var j = jStart; j < this.polygons.length; j++) {
            this.groupObject.insertBefore(this.polygons[j].tagElem, this.groupObject.children[j]);
        }
    };
    return World;
}());
/* harmony default export */ const core_World = (World);

;// CONCATENATED MODULE: ./src/ts/ObjectsWorld/BackgroundElem.ts
var BackgroundElem = /** @class */ (function () {
    function BackgroundElem(urlImage, xStart, y) {
        var _this = this;
        this.width = 0;
        var image = new Image();
        image.src = urlImage;
        this.src = urlImage;
        this.x = xStart;
        this.xStart = xStart;
        this.y = y;
        image.onload = function () {
            _this.width = image.width;
        };
    }
    BackgroundElem.prototype.update = function (rootWidth, ay) {
        var maxBgPos = this.width + rootWidth;
        this.x = this.xStart + ay * maxBgPos / 360 * 3;
    };
    Object.defineProperty(BackgroundElem.prototype, "styleBg", {
        get: function () {
            return "url(\"".concat(this.src, "\") ").concat(-this.x, "px ").concat(this.y, "px no-repeat");
        },
        enumerable: false,
        configurable: true
    });
    return BackgroundElem;
}());
/* harmony default export */ const ObjectsWorld_BackgroundElem = (BackgroundElem);

;// CONCATENATED MODULE: ./src/ts/core/ObjectWorld.ts
var ObjectWorld_values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var ObjectWorld = /** @class */ (function () {
    function ObjectWorld() {
    }
    ObjectWorld.prototype.translate = function (x, y, z) {
        var e_1, _a;
        try {
            for (var _b = ObjectWorld_values(this.polygons), _c = _b.next(); !_c.done; _c = _b.next()) {
                var polygon = _c.value;
                polygon.points = polygon.points.map(function (point) { return TranformMatrix.translate(point, x, y, z); });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ObjectWorld.prototype.rotate = function (ax, ay, az) {
        var e_2, _a;
        try {
            for (var _b = ObjectWorld_values(this.polygons), _c = _b.next(); !_c.done; _c = _b.next()) {
                var polygon = _c.value;
                polygon.points = polygon.points.map(function (point) {
                    point = TranformMatrix.rotateX(point, ax);
                    point = TranformMatrix.rotateX(point, ay);
                    point = TranformMatrix.rotateX(point, az);
                    return point;
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    return ObjectWorld;
}());
/* harmony default export */ const core_ObjectWorld = (ObjectWorld);

;// CONCATENATED MODULE: ./src/ts/core/Polygon.ts
var Polygon_values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var Polygon = /** @class */ (function () {
    function Polygon(points, color) {
        if (points === void 0) { points = []; }
        if (color === void 0) { color = 'black'; }
        this.root = createSVGElem();
        this.elem = createPolygonElem();
        this.elem.setAttribute('fill', color);
        this.points = points;
        Polygon.count++;
        this.number = Polygon.count;
    }
    Object.defineProperty(Polygon.prototype, "fillColor", {
        set: function (color) {
            this.elem.setAttribute('fill', color);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Polygon.prototype, "tagElem", {
        get: function () {
            return this.elem;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Polygon.prototype, "texture", {
        get: function () {
            return this.textrueElem;
        },
        enumerable: false,
        configurable: true
    });
    Polygon.prototype.setTexture = function (url) {
        this.elem.id = 'defs-' + this.number;
        this.textrueElem = createTextureElement(url, this.elem.id);
        this.elem.setAttribute('fill', "url(#".concat(this.elem.id, ")"));
    };
    Polygon.prototype.render = function (renderPipe) {
        var e_1, _a;
        this.elem.points.clear();
        var _b = renderPipe.convertPoints(this.points), projectPoints = _b.points, averageDistance = _b.averageDistance;
        this.averageDistance = averageDistance;
        try {
            for (var projectPoints_1 = Polygon_values(projectPoints), projectPoints_1_1 = projectPoints_1.next(); !projectPoints_1_1.done; projectPoints_1_1 = projectPoints_1.next()) {
                var point = projectPoints_1_1.value;
                var svgPoint = this.root.createSVGPoint();
                svgPoint.x = point.x;
                svgPoint.y = point.y;
                this.elem.points.appendItem(svgPoint);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (projectPoints_1_1 && !projectPoints_1_1.done && (_a = projectPoints_1.return)) _a.call(projectPoints_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Polygon.count = 0;
    return Polygon;
}());
/* harmony default export */ const core_Polygon = (Polygon);

;// CONCATENATED MODULE: ./src/ts/ObjectsWorld/Cube.ts
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Cube_values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};


var Cube = /** @class */ (function (_super) {
    __extends(Cube, _super);
    function Cube(size, center, color, texture) {
        var e_1, _a;
        if (color === void 0) { color = 'black'; }
        var _this = _super.call(this) || this;
        _this.polygons = [
            //задняя плоскость
            new core_Polygon([
                { x: -size / 2, y: -size / 2, z: -size / 2 },
                { x: size / 2, y: -size / 2, z: -size / 2 },
                { x: size / 2, y: size / 2, z: -size / 2 },
                { x: -size / 2, y: size / 2, z: -size / 2 }
            ], color),
            //передняя плоскость
            new core_Polygon([
                { x: -size / 2, y: -size / 2, z: size / 2 },
                { x: size / 2, y: -size / 2, z: size / 2 },
                { x: size / 2, y: size / 2, z: size / 2 },
                { x: -size / 2, y: size / 2, z: size / 2 }
            ], color),
            //верхняя
            new core_Polygon([
                { x: -size / 2, y: size / 2, z: -size / 2 },
                { x: size / 2, y: size / 2, z: -size / 2 },
                { x: size / 2, y: size / 2, z: size / 2 },
                { x: -size / 2, y: size / 2, z: size / 2 }
            ], color),
            //нижняя
            new core_Polygon([
                { x: -size / 2, y: -size / 2, z: -size / 2 },
                { x: size / 2, y: -size / 2, z: -size / 2 },
                { x: size / 2, y: -size / 2, z: size / 2 },
                { x: -size / 2, y: -size / 2, z: size / 2 }
            ], color),
            // правая
            new core_Polygon([
                { x: size / 2, y: -size / 2, z: -size / 2 },
                { x: size / 2, y: -size / 2, z: size / 2 },
                { x: size / 2, y: size / 2, z: size / 2 },
                { x: size / 2, y: size / 2, z: -size / 2 }
            ], color),
            //левая
            new core_Polygon([
                { x: -size / 2, y: -size / 2, z: -size / 2 },
                { x: -size / 2, y: -size / 2, z: size / 2 },
                { x: -size / 2, y: size / 2, z: size / 2 },
                { x: -size / 2, y: size / 2, z: -size / 2 }
            ], color)
        ];
        try {
            for (var _b = Cube_values(_this.polygons), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                p.setTexture(texture);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        _this.translate(-center.x, -center.y, -center.z);
        return _this;
    }
    return Cube;
}(core_ObjectWorld));
/* harmony default export */ const ObjectsWorld_Cube = (Cube);

;// CONCATENATED MODULE: ./src/ts/ObjectsWorld/Pyramid.ts
var Pyramid_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Pyramid = /** @class */ (function (_super) {
    Pyramid_extends(Pyramid, _super);
    function Pyramid(size, center, color) {
        if (color === void 0) { color = 'black'; }
        var _this = _super.call(this) || this;
        _this.polygons = [
            //нижняя
            new core_Polygon([
                { x: -size / 2, y: -size / 2, z: -size / 2 },
                { x: size / 2, y: -size / 2, z: -size / 2 },
                { x: size / 2, y: -size / 2, z: size / 2 },
                { x: -size / 2, y: -size / 2, z: size / 2 }
            ], color),
            // правая
            new core_Polygon([
                { x: size / 2, y: -size / 2, z: -size / 2 },
                { x: size / 2, y: -size / 2, z: size / 2 },
                { x: 0, y: size / 2, z: 0 },
            ], color),
            //левая
            new core_Polygon([
                { x: -size / 2, y: -size / 2, z: -size / 2 },
                { x: -size / 2, y: -size / 2, z: size / 2 },
                { x: 0, y: size / 2, z: 0 },
            ], color),
            //передняя
            new core_Polygon([
                { x: -size / 2, y: -size / 2, z: size / 2 },
                { x: size / 2, y: -size / 2, z: size / 2 },
                { x: 0, y: size / 2, z: 0 },
            ], color),
            //задняя
            new core_Polygon([
                { x: -size / 2, y: -size / 2, z: -size / 2 },
                { x: size / 2, y: -size / 2, z: -size / 2 },
                { x: 0, y: size / 2, z: 0 },
            ], color),
        ];
        _this.translate(center.x, center.y, center.z);
        return _this;
    }
    return Pyramid;
}(core_ObjectWorld));
/* harmony default export */ const ObjectsWorld_Pyramid = (Pyramid);

;// CONCATENATED MODULE: ./src/ts/index.ts





var world = new core_World(document.getElementById('world'));
world.addObjects(new ObjectsWorld_Cube(10, { x: 1, y: 0, z: 0 }, 'black', '../textures/brick.png'));
world.addObjects(new ObjectsWorld_Pyramid(300, { x: 1, y: -100, z: 500 }));
world.addObjects(new ObjectsWorld_Pyramid(100, { x: 500, y: 100, z: 100 }, 'red'));
world.addObjects(new ObjectsWorld_Pyramid(100, { x: 100, y: 100, z: 600 }, 'red'));
world.addObjects(new ObjectsWorld_Pyramid(50, { x: 900, y: 1000, z: 300 }, 'yellow'));
world.addObjects(new ObjectsWorld_Pyramid(200, { x: 100, y: 100, z: 100 }, 'yellow'));
world.addBgElem(new ObjectsWorld_BackgroundElem('../textures/seraphim.png', 200, 100));
world.addBgElem(new ObjectsWorld_BackgroundElem('../textures/seraphim.png', 400, 100));
world.addBgElem(new ObjectsWorld_BackgroundElem('../textures/seraphim.png', 600, 300));
world.setBackground('../textures/sky.png');
world.run(60);
document.querySelector('#save').addEventListener('click', function () {
    var svgRoot = world.svgRootElement;
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svgRoot);
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    var url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    var a = document.createElement('a');
    var e = new MouseEvent('click');
    a.download = 'download.svg';
    a.href = url;
    a.dispatchEvent(e);
});

/******/ })()
;
//# sourceMappingURL=3dengine.dist.js.map