var get = Ember.get;

/**
  `EmberLeaflet.PolygonLayerMixin` is a polygon on the map that adjusts based
  on a content object that should be an array of LatLng objects.
 
  @class PolygonLayerMixin
  @namespace EmberLeaflet
  @uses EmberLeaflet.PolylineLayerMixin
*/
EmberLeaflet.PolygonLayerMixin = Ember.Mixin.create(
    EmberLeaflet.PolylineLayerMixin, {
  _newLayer: function() {
    return L.polygon(get(this, 'locations'), get(this, 'options'));
  }
});

/**
  `EmberLeaflet.PolygonLayer` is a convenience object for those who prefer
  creating layers with `EmberLeaflet.PolygonLayer.extend(...)` rather than
  `Ember.Object.extend(EmberLeaflet.PolygonLayerMixin, ...)`.

  @class PolygonLayer
  @namespace EmberLeaflet
  @uses EmberLeaflet.PolygonLayerMixin
*/
EmberLeaflet.PolygonLayer = Ember.Object.extend(EmberLeaflet.PolygonLayerMixin, {});