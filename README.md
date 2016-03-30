# spatio
Measure space!


## Usage

```javascript
// Measure 1em in pixels
spatio('10pt', 'px');  // i.e. 13.328125

// Calcucate at will!
spatio('calc(100vh - 5pt)'); // i.e. 957.328125, defaults to pixels

// Pass context element for relative space
var el = document.createElement('div');
el.style.fontSize = '24px';
document.body.appendChild(el);

spatio('1em', 'px', el); // 24
```


### Additional units

```javascript
// Line height
spatio('1lh');

// Element width and height
spatio('100ew', document.body); // 1920
spatio('100eh', document.body); // 940

// Light seconds
spatio('0.00001ls', 'px') // 335.53125
```
