var get = Ember.get;

/**
  `EmberLeaflet.RectangleLayer` is a rectangle on the map that adjusts based
  on a content object that should be an array of LatLng objects.
 
  @class RectangleLayer
  @namespace EmberLeaflet
  @extends EmberLeaflet.PolylineLayer
*/
EmberLeaflet.RectangleLayer = EmberLeaflet.PolylineLayer.extend({
  init: function() {
    this._super();
    this._addBoundsPropertyObserver();
  },

  bounds: Ember.computed(function() {
    var boundsProperty = get(this, 'boundsProperty'),
        boundsPath = 'content' + (boundsProperty ? '.' +
          boundsProperty : ''),
        bounds = get(this, boundsPath) || null;
    if (!bounds || !(bounds instanceof L.LatLngBounds)) { 
      var locations = get(this, 'locations');
      Ember.assert("Supplied content must be an instance of L.LatLngBounds" +
          " or an array of L.LatLng objects.", !!locations);
      bounds = L.latLngBounds(locations);
    }
    return bounds;
  }).property('content', 'boundsProperty').volatile(),

  _newLayer: function() {
    return L.rectangle(get(this, 'bounds'),
                       get(this, 'options'));
  },

  locationsDidChange: Ember.observer(function() {
    if(!this._layer) { return; }
    this._layer.setBounds(get(this, 'bounds'));
  }, 'locations', 'bounds'),

  _addBoundsPropertyObserver: function() {
    var boundsProperty = get(this, 'boundsProperty');
    if (!boundsProperty) { return; }
    this.addObserver('content.' + boundsProperty, this, function() {
      this.notifyPropertyChange('bounds');
    });
  }
});
