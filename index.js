var units = {
  ew: function(context) {
    var width = context.getBoundingClientRect().width;
    return width / 100;
  },

  eh: function(context) {
    var height = context.getBoundingClientRect().height;
    return height / 100;
  },

  lh: function(context) {
    var element = document.createElement('div');
    element.innerHTML = 'spatio';

    Object.assign(element.style, {
      visibility: 'hidden',
      position: 'fixed'
    });

    context.appendChild(element);
    return spatio('100eh', 'px', element);
  },

  ls: function(context) {
    return spatio(2.998e10 + 'cm', 'px');
  }
};

function convert(expression, context) {
  return Object.keys(units).reduce(
    function(expression, key) {
      return expression.replace(
        new RegExp('([0-9]*(?:\\.[0-9]*)?)' + key, 'g'),
        function(match, value) { return units[key](context) * Number(value) + 'px'; }
      )
    }, expression);
}

function spatio(expression, unit, context) {
  if (!unit) unit = 'px';
  if (!context) context = document.body;

  var element = document.createElement('div');

  Object.assign(element.style, {
    width: convert(expression, context),
    height: 1 + unit,
    visibility: 'hidden',
    position: 'fixed'
  });

  context.appendChild(element);
  var elementRect = element.getBoundingClientRect()
  element.remove();
  return elementRect.width / elementRect.height;
}

if (typeof module !== 'undefined') {
  module.exports = spatio;
} else {
  self.spatio = spatio;
}
