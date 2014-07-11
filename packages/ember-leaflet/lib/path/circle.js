var get = Ember.get,
  latLngFromArray = EmberLeaflet.convert.latLngFromLatLngArray;


/**
  `EmberLeaflet.CircleLayerMixin` is a circle on the map that adjusts based
  on a content object that should be an array of LatLng objects.
 
  @class CircleLayerMixin
  @namespace EmberLeaflet
  @uses EmberLeaflet.PointPathLayerMixin
*/
EmberLeaflet.CircleLayerMixin = Ember.Mixin.create(
    EmberLeaflet.PointPathLayerMixin, {
  
  /**
  If this property is null, watch the content object for radius updates.
  If this property is set, look inside this property of the content object
  for the radius.
  */
  radius: Ember.computed.alias('content.radius'),
  
  _updateLayerOnRadiusChange: Ember.observer(function() {
    var newRadius = get(this, 'radius');
      
    if(newRadius && !this._layer) {
      this._createLayer();
    } else if(this._layer && !newRadius) {
      this._destroyLayer();
    } else {
      var oldRadius = this._layer && this._layer.getRadius();
      if(oldRadius && newRadius && (oldRadius !== newRadius)) {
        this._layer.setRadius(newRadius);
      }
    }
  }, 'radius'),
  
  _newLayer: function() {
    // Convert from array if an array somehow got through.
    return L.circle(latLngFromArray(get(this, 'location')),
      get(this, 'radius'), get(this, 'options'));
  }, 
  
  _destroyLayer: function() {
    if(!this._layer) { return; }
    this._super();
  }
});

/**
  `EmberLeaflet.CircleLayer` is a convenience object for those who prefer
  creating layers with `EmberLeaflet.CircleLayer.extend(...)` rather than
  `Ember.Object.extend(EmberLeaflet.CircleLayerMixin, ...)`.

  @class CircleLayer
  @namespace EmberLeaflet
  @uses EmberLeaflet.CircleLayerMixin
*/
EmberLeaflet.CircleLayer = Ember.Object.extend(EmberLeaflet.CircleLayerMixin, {});
