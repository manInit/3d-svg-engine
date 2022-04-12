 ## Примерная структура Html для начала работы
 
  ```html
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Пример</title>
    <!--подключаем стили-->
    <link rel="stylesheet" href="../dist/3dengine.css">
</head>
<body>
    <!--подключаем сам модуль-->
    <script src="../dist/3dengine.dist.js"></script>
    
    <!--подключаем собтсвенный код-->
    <script src="index.js"></script>
</body>
</html>
  ```

## Пример кода
```js
setBackground('./1.png')
showMapWorld(200)

let cube1 = cube(100, 'red', 100, 100, 1000)
add(cube1)

let pyramid1 = pyramid(350, 'yellow', -100, 0, -100)
add(pyramid1)

let plane1 = plane('orange', {x:0, y: 0, z: 0}, {x: 100, y: 0, z: 0}, {x: 100, y: 100, z: 0})
add(plane1)

let floor1 = floor(300, 'blue', -500, -10, -500)
add(floor1)
```

В итоге получаем
![3d engine example](https://i.ibb.co/YTd3NK1/12341.png)



## Документация
```ts
    add(...objects): void //добавить объект на сцену
    showMapWorld(size: number): void //показать карту
    hideMapWorld(): void // скрыть карту

    setBackground(urlImage: string): void //установить задний фон

    plane(color: string, ...points: [Point]): Plane //плоскость
    cube(size: number, color: string, x: number, y: number, z: number) //куб
    floor(size: number, color: string, x: number, y: number, z: number) //пол
    pyramid(size: number, color: string, x: number, y: number, z: number) //пирамида
```