var get = Ember.get;

/**
  `EmberLeaflet.PolylineLayerMixin` is a polyline on the map that adjusts based
  on a content object that should be an array of LatLng objects.
 
  @class PolylineLayerMixin
  @namespace EmberLeaflet
  @uses EmberLeaflet.ArrayPathLayerMixin
*/
EmberLeaflet.PolylineLayerMixin = Ember.Mixin.create(
    EmberLeaflet.ArrayPathLayerMixin, {
  options: {},

  events: ['click', 'dblclick', 'mousedown', 'mouseover', 'mouseout',
    'contextmenu', 'add', 'remove', 'popupopen', 'popupclose'],

  _newLayer: function() {
    return L.polyline(get(this, 'locations'), get(this, 'options'));
  },

  locationsDidChange: Ember.observer(function() {
    if(!this._layer) { return; }
    this._layer.setLatLngs(get(this, 'locations'));    
  }, 'locations')
});

/**
  `EmberLeaflet.PolylineLayer` is a convenience object for those who prefer
  creating layers with `EmberLeaflet.PolylineLayer.extend(...)` rather than
  `Ember.Object.extend(EmberLeaflet.PolylineLayerMixin, ...)`.

  @class PolylineLayer
  @namespace EmberLeaflet
  @uses EmberLeaflet.PolylineLayerMixin
*/
EmberLeaflet.PolylineLayer = Ember.Object.extend(EmberLeaflet.PolylineLayerMixin, {});
