;(function() {

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
    expression = Object.keys(units).reduce(
      function(expression, key) {
        return expression.replace(
          new RegExp('([0-9]*(?:\\.[0-9]*)?)' + key, 'g'),
          function(match, value) { return units[key](context) * Number(value) + 'px'; }
        )
      }
    , expression);

    var element = document.createElement('div');

    Object.assign(element.style, {
      width: expression,
      height: '1px',
      visibility: 'hidden',
      position: 'fixed'
    });

    context.appendChild(element);
    var elementRect = element.getBoundingClientRect()
    element.remove();
    return elementRect.width / elementRect.height;
  }


  function spatio(expression, unit, context) {
    unit = unit || 'px';
    context = context || document.body;

    var from = convert(expression, context);
    var to = convert('1' + unit, context);

    return from / to;
  }

  spatio.addUnits = function(newUnits) {
    units = Object.assign({}, units, newUnits);
  };

  if (typeof module !== 'undefined') {
    module.exports = spatio;
  } else {
    self.spatio = spatio;
  }
})();
