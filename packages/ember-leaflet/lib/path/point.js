var get = Ember.get,
  latLngFromArray = EmberLeaflet.convert.latLngFromLatLngArray;

/**
  `EmberLeaflet.PointPathLayerMixin` is a base geometry on the map that
  adjusts based on a content object that should be a LatLng object.
 
  @class PointPathLayerMixin
  @namespace EmberLeaflet
  @uses EmberLeaflet.PathLayerMixin
*/
EmberLeaflet.PointPathLayerMixin = Ember.Mixin.create(
    EmberLeaflet.PathLayerMixin, {

  location: Ember.computed.alias('content.location'),
  
  _createLayer: function() {
    // don't create layer if we don't have a location.
    if(this._layer || !get(this, 'location')) { return; }
    this._super();    
  },

  _updateLayerOnLocationChange: Ember.observer(function() {
    var newLatLng = latLngFromArray(get(this, 'location'));
    if(newLatLng && !this._layer) {
      this._createLayer();
    } else if(this._layer && !newLatLng) {
      this._destroyLayer();
    } else if(this._layer) {
      var oldLatLng = this._layer.getLatLng();
      if(oldLatLng && newLatLng && !oldLatLng.equals(newLatLng)) {
        this._layer.setLatLng(newLatLng);
      }
    }
  }, 'location')
});

/**
  `EmberLeaflet.PointPathLayer` is a convenience object for those who prefer
  creating layers with `EmberLeaflet.PointPathLayer.extend(...)` rather than
  `Ember.Object.extend(EmberLeaflet.PointPathLayerMixin, ...)`.

  @class PointPathLayer
  @namespace EmberLeaflet
  @uses EmberLeaflet.PointPathLayerMixin
*/
EmberLeaflet.PointPathLayer = Ember.Object.extend(EmberLeaflet.PointPathLayerMixin, {});
