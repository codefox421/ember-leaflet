var get = Ember.get;

/**
  `EmberLeaflet.RectangleLayerMixin` is a rectangle on the map that adjusts based
  on a content object that should be an array of LatLng objects.
 
  @class RectangleLayerMixin
  @namespace EmberLeaflet
  @uses EmberLeaflet.BoundsPathLayerMixin
*/
EmberLeaflet.RectangleLayerMixin = Ember.Mixin.create(
    EmberLeaflet.BoundsPathLayerMixin, {

  events: ['click', 'dblclick', 'mousedown', 'mouseover', 'mouseout',
    'contextmenu', 'add', 'remove', 'popupopen', 'popupclose'],

  _newLayer: function() {
    return L.rectangle(get(this, 'bounds'), get(this, 'options'));
  },

  _createLayer: function() {
    if(!get(this, 'bounds')) { return; }
    this._super();
  },

  boundsDidChange: Ember.observer(function() {
    var bounds = get(this, 'bounds');
    if(this._layer && !bounds) {
      this._destroyLayer();
    } else if(bounds && !this._layer) {
      this._createLayer();
    } else if(bounds && this._layer) {
      this._layer.setBounds(bounds);
    }
  }, 'locations')
});

/**
  `EmberLeaflet.RectangleLayer` is a convenience object for those who prefer
  creating layers with `EmberLeaflet.RectangleLayer.extend(...)` rather than
  `Ember.Object.extend(EmberLeaflet.RectangleLayerMixin, ...)`.

  @class RectangleLayer
  @namespace EmberLeaflet
  @uses EmberLeaflet.RectangleLayerMixin
*/
EmberLeaflet.RectangleLayer = Ember.Object.extend(EmberLeaflet.RectangleLayerMixin, {});
