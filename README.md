Lines
=====

## Install
```shell
npm install -g now
npm install
```

## Tech stack

  This prototype application is currently front end only. Compiled static js/html is served via `now`.

  - [react](https://reactjs.org/)
  - [redux](https://redux.js.org/)
  - [svg](https://developer.mozilla.org/en-US/docs/Web/SVG)
  - [grommet](grommet.github.io)
  - [now](https://zeit.co/now)

## Custom commands
To run the development server:
```shell
npm run dev
```

To generate a production build for deployment:
```shell
npm run build
```

To deploy to now
```shell
npm run now
```

## Data structure
Drawing is plotted via `anchors`. Lines, their lengths, and anchor angles are calculated dynamically on render.

Sample data structure below:
```javascript
{
  randomId1: {
    id: 'randomId',
    x: 100,
    y: 100,
    connections: ['randomId2'],
  },
  randomId2: {
    id: 'randomId2',
    x: 300,
    y: 300,
    connections: ['randomId1', 'randomId3'],
  }
  randomId3: {
    id: 'randomId3',
    x: 100,
    y: 300,
    connections: ['randomId2'],
  }
}
```