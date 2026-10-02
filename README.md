# 3D SVG engine

Lightweight 3D engine that uses SVG as a rendering environment.

Used technologies:

- [TypeScript](https://www.typescriptlang.org/) as the main language
- [Vite](https://vite.dev/) for the dev server and library build
- [Vitest](https://vitest.dev/) for unit tests
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) for linting and formatting
- [pnpm](https://pnpm.io/) as the package manager

# Getting started

You can link to the 3D SVG engine files hosted online:

```html
<script src="https://cdn.jsdelivr.net/npm/3d-svg-engine@0.1.0/dist/3dengine.dist.js"></script>
```

A sample HTML page might look like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Starter template</title>
  </head>
  <body>
    <div id="world" style="width: 800px; height: 600px"></div>
    <script src="https://cdn.jsdelivr.net/npm/3d-svg-engine@0.1.0/dist/3dengine.dist.js"></script>
    <script>
      // create global object
      const engine = SVGEngine('world')
      // move the camera back a little
      engine.player.position = { x: 0, y: 0, z: -50 }
      // add cube on scene
      engine.add(engine.cube(10))
    </script>
  </body>
</html>
```

## How to control camera

Click on the root element to capture the pointer. While the pointer is captured you can rotate the camera with the mouse and use these keys:

|        Key | Effect        |
| ---------: | :------------ |
|     _WASD_ | Move camera   |
|    _shift_ | Flying down   |
| _spacebar_ | Flying up     |
|   _arrows_ | Rotate camera |

# Examples

**[Live demo](https://maninit.github.io/3d-svg-engine/)**: flat shading, fog, neon glow, a Utah teapot loaded from `.obj`, animated parametric surfaces. Every frame can be saved as an editable vector `.svg`.

|       [Lighting](https://maninit.github.io/3d-svg-engine/#lit)       |  [Synthwave](https://maninit.github.io/3d-svg-engine/#synthwave)  |
| :------------------------------------------------------------------: | :---------------------------------------------------------------: |
|                    ![Lighting](./images/lit.jpg)                     |               ![Synthwave](./images/synthwave.jpg)                |
| [**Teapot (.obj)**](https://maninit.github.io/3d-svg-engine/#teapot) | [**Surfaces**](https://maninit.github.io/3d-svg-engine/#surfaces) |
|                    ![Teapot](./images/teapot.jpg)                    |                ![Surfaces](./images/surfaces.jpg)                 |

Older examples:

- Simple model of the solar system: [Example](http://man_init.istu.webappz.ru/3d/dist/) ![Example](./images/solar.png)
- Voxel draw: [Example](http://man_init.istu.webappz.ru/3d/example2/) ![Example](./images/voxels.png)

# Documentation

Coordinates: `x` points right, `y` points up, `z` points away from the camera. Angles are in degrees.

## Basic figures

Every figure accepts an optional `texture` — URL of an image stretched over each face.

### cube(size, x, y, z, color, texture)

|     Param | Description                     |  Default  |    Example    |
| --------: | :------------------------------ | :-------: | :-----------: |
|    _size_ | Cube side length                |     -     |    `10.23`    |
|       _x_ | x coordinate of the cube center |    `0`    |     `12`      |
|       _y_ | y coordinate of the cube center |    `0`    |     `23`      |
|       _z_ | z coordinate of the cube center |    `0`    |     `34`      |
|   _color_ | Cube color                      | `'black'` | `'#ff4433ee'` |
| _texture_ | Texture image URL               |     -     | `'brick.png'` |

### pyramid(size, x, y, z, color, texture)

|     Param | Description                        |  Default  |    Example    |
| --------: | :--------------------------------- | :-------: | :-----------: |
|    _size_ | Pyramid side length and height     |     -     |    `23.4`     |
|       _x_ | x coordinate of the pyramid center |    `0`    |    `23.3`     |
|       _y_ | y coordinate of the pyramid center |    `0`    |    `534.2`    |
|       _z_ | z coordinate of the pyramid center |    `0`    |    `-23.3`    |
|   _color_ | Pyramid color                      | `'black'` | `'#ffee99ee'` |
| _texture_ | Texture image URL                  |     -     | `'brick.png'` |

### parallelepiped(sizea, sizeb, sizec, x, y, z, color, texture)

|     Param | Description                               |  Default  |    Example    |
| --------: | :---------------------------------------- | :-------: | :-----------: |
|   _sizea_ | Depth (along z)                           |     -     |    `23.4`     |
|   _sizeb_ | Height (along y)                          |     -     |    `12.3`     |
|   _sizec_ | Width (along x)                           |     -     |    `10.3`     |
|       _x_ | x coordinate of the parallelepiped center |    `0`    |     `23`      |
|       _y_ | y coordinate of the parallelepiped center |    `0`    |     `2.2`     |
|       _z_ | z coordinate of the parallelepiped center |    `0`    |    `-3.2`     |
|   _color_ | Parallelepiped color                      | `'black'` | `'#ff443366'` |
| _texture_ | Texture image URL                         |     -     | `'brick.png'` |

### sphere(r, x, y, z, color, texture, segments)

|      Param | Description                       |  Default  |    Example    |
| ---------: | :-------------------------------- | :-------: | :-----------: |
|        _r_ | Sphere radius                     |     -     |    `34.4`     |
|        _x_ | x coordinate of the sphere center |    `0`    |     `23`      |
|        _y_ | y coordinate of the sphere center |    `0`    |    `23.4`     |
|        _z_ | z coordinate of the sphere center |    `0`    |    `34.5`     |
|    _color_ | Sphere color                      | `'black'` |  `'#993399'`  |
|  _texture_ | Texture image URL                 |     -     | `'earth.png'` |
| _segments_ | Number of meridians and parallels |   `10`    |     `18`      |

### floor(size, x, y, z, color, texture)

Horizontal square grid made of cells about 10 units wide.

|     Param | Description                      |  Default  |   Example    |
| --------: | :------------------------------- | :-------: | :----------: |
|    _size_ | Floor side length                |     -     |    `200`     |
|       _x_ | x coordinate of the floor center |    `0`    |     `0`      |
|       _y_ | y coordinate of the floor center |    `0`    |    `-10`     |
|       _z_ | z coordinate of the floor center |    `0`    |     `0`      |
|   _color_ | Floor color                      | `'black'` |   `'#888'`   |
| _texture_ | Texture image URL                |     -     | `'tile.png'` |

### square(size, x, y, z, color, texture)

Flat square in the XY plane.

### triangle(point1, point2, point3, color, texture)

Triangle by three points, e.g. `engine.triangle({ x: 0, y: 0, z: 0 }, { x: 10, y: 0, z: 0 }, { x: 0, y: 10, z: 0 }, 'red')`.

## Surfaces

Grids of quads built from a function `f(u, v, t)`. They can be animated with `setTime(t)` and keep any `rotate` / `translate` applied before.

| Function                                             | Description                                                      |
| :--------------------------------------------------- | :--------------------------------------------------------------- |
| `torus(R, r, x, y, z, color, segments = 32)`         | Torus: `R` — distance to the tube center, `r` — tube radius      |
| `mobius(R, width, x, y, z, color, segments = 48)`    | Möbius strip                                                     |
| `waves(size, height, x, y, z, color, segments = 24)` | Water surface, call `setTime(seconds)` every frame to animate it |
| `surface(fn, x, y, z, options)`                      | Any surface, see below                                           |

```js
// a "breathing" sphere
const blob = engine.surface(
  (u, v, t) => {
    const r = 10 + Math.sin(u * 20 + t * 3) * Math.sin(v * 10)
    const a = u * Math.PI * 2
    const b = v * Math.PI
    return { x: r * Math.sin(b) * Math.cos(a), y: r * Math.cos(b), z: r * Math.sin(b) * Math.sin(a) }
  },
  0,
  10,
  40,
  { segmentsU: 32, segmentsV: 16, color: '#30a46c' },
)
engine.add(blob)
engine.update(() => blob.setTime(performance.now() / 1000))
```

Options: `segmentsU`, `segmentsV`, `rangeU` and `rangeV` (`[0, 1]` by default), `color`, `closed` (`true` if the surface is closed and its normals point outward, so back faces can be skipped).

## Models (.obj)

```js
const teapot = await engine.loadObj('teapot.obj', 0, 0, 50, { size: 40, color: '#d1495b' })
engine.add(teapot)
```

| Function                           | Description                                                   |
| :--------------------------------- | :------------------------------------------------------------ |
| `loadObj(url, x, y, z, options)`   | Fetch a Wavefront `.obj` file and build a model (a `Promise`) |
| `parseObj(text, x, y, z, options)` | Build a model from `.obj` text                                |

Options: `size` — scale the model so its largest side has this length, `color`, `doubleSided` — for models with holes or inconsistent faces. Vertices (`v`) and faces (`f`, including n-gons and negative indices) are read; the rest is ignored. Keep models under a few thousand faces: each face is a DOM element.

## Figure methods and properties

| Member                        | Description                                         |
| :---------------------------- | :-------------------------------------------------- |
| `translate(x, y, z)`          | Move the figure by the given offsets                |
| `setPosition(x, y, z)`        | Move the figure center to the given point           |
| `rotate(ax, ay, az)`          | Rotate around the figure center by X, Y, Z angles   |
| `setTexture(url)`             | Put a texture on every face                         |
| `setColor(color)`             | Change the color of every face                      |
| `setStroke(color, width = 1)` | Outline every face, `null` removes the outline      |
| `setShading(enabled)`         | `false` — ignore lighting (flat neon look)          |
| `setDoubleSided(enabled)`     | `true` — draw faces turned away from the camera too |
| `position`                    | Current center of the figure (read only)            |

Methods that change the figure return it, so they can be chained: `engine.cube(10).setStroke('#0ff').setShading(false)`.

## Lighting, fog and glow

Faces are shaded by a directional light (enabled by default), and faces turned away from the camera are skipped. Lighting does not change textured faces.

```js
engine.setLight({ direction: { x: -1, y: 1, z: -0.5 }, ambient: 0.3, specular: 0.5 })
engine.setFog({ color: '#cddff0', near: 100, far: 300 })
engine.setGlow({ blur: 3, strength: 2 })
```

| Function            | Options                                                                                                                                                                     |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setLight(options)` | `direction` — direction **to** the light, `color`, `intensity` (0.75), `ambient` (0.3), `specular` — highlight strength (0.15), `shininess` (24). `null` turns lighting off |
| `setFog(options)`   | `color`, `near`, `far` — the color fades linearly into `color` between these distances. Give the page background the same color. `null` turns fog off                       |
| `setGlow(options)`  | Neon glow of the whole scene via an SVG filter: `blur` (4), `strength` (2). `null` turns it off. Looks best with `setStroke`                                                |

## Player object

`engine.player` contains the camera position and view direction. You can set these properties too:

```js
engine.player.position = { x: 100, y: 150, z: 100 }
engine.player.rotation.ay = 90
```

|   Property | Description                                                                    |           Example            |
| ---------: | :----------------------------------------------------------------------------- | :--------------------------: |
| _position_ | Camera position                                                                | `{ x: 23, y: 46, z: -100 }`  |
| _rotation_ | Camera angles: `ay` — turn left/right, `az` — look up/down (±70°), `ax` — roll | `{ ax: 0, ay: 10, az: -10 }` |

`engine.player.lookAt({ x, y, z })` turns the camera towards a point, and `engine.player.isControlled` is `true` while the user controls the camera.

## Engine functions

| Function                               | Description                                                                           |
| :------------------------------------- | :------------------------------------------------------------------------------------ |
| `add(...objects)`                      | Add figures to the scene                                                              |
| `remove(...objects)`                   | Remove figures from the scene                                                         |
| `update(callback)`                     | Call `callback` every frame (pass `null` to clear)                                    |
| `setBackground(urlImage)`              | Panorama background that scrolls when the camera turns                                |
| `addBackgroundElement(urlImage, x, y)` | Extra background layer (clouds, mountains) with faster parallax                       |
| `start(fps = 120)` / `stop()`          | Resume / pause the render loop                                                        |
| `destroy()`                            | Stop rendering, remove listeners and the SVG element                                  |
| `saveScreen(filename, background)`     | Download the current frame as a vector `.svg` (opens in Figma, Illustrator, Inkscape) |
| `toSVG(background)`                    | The current frame as an SVG string; `background` defaults to the fog color            |
| `objects`                              | Figures currently on the scene                                                        |

Example of an animation:

```js
const cube = engine.cube(10, 0, 0, 50, 'red')
engine.add(cube)
engine.update(() => cube.rotate(1, 1, 0))
```

# Development

Requires Node.js 22.12+ and pnpm (`corepack enable` picks up the version from `package.json`).

```sh
pnpm install
pnpm dev          # demo page (index.html) with hot reload
pnpm build        # build dist/3dengine.dist.js
pnpm build:demo   # build the demo page into demo-dist/ (deployed to GitHub Pages from master)
pnpm test         # unit tests
pnpm lint         # oxlint
pnpm format       # oxfmt
pnpm check        # typecheck + lint + format check + tests
```
