var converters = {
  ew: function(value, context) {
    var width = context.getBoundingClientRect().width;
    return (Number(value) / 100) * width;
  },

  eh: function(value, context) {
    var height = context.getBoundingClientRect().height;
    return (Number(value) / 100) * height;
  }
};

function convert(expression, context) {
  return Object.keys(converters).reduce(
    function(expression, key) {
      return expression.replace(
        new RegExp('([0-9]*(?:\\.[0-9]*)?)' + key, 'g'),
        function(match, value) { return converters[key](Number(value), context) + 'px'; }
      )
    }, expression);
}

function measure(expression, unit, context) {
  if (!unit) unit = 'px';
  if (!context) context = document.body;

  var element = document.createElement('div')

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
  module.exports = measure;
} else {
  self.spatio = measure;
}
