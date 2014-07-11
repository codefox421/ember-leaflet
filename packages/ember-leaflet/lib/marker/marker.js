var get = Ember.get;

/**
  `EmberLeaflet.MarkerLayer` is a leaflet marker.
 
  @class MarkerLayerMixin
  @namespace EmberLeaflet
  @uses EmberLeaflet.LayerMixin
*/
EmberLeaflet.MarkerLayerMixin = Ember.Mixin.create(
    EmberLeaflet.LayerMixin, {
  content: null,
  options: null,

  /**
  Should override this binding with a reference to the location property
  of the content object.
  */
  location: Ember.computed.alias('content.location'),

  /** Forwards to respective options property */
  zIndexOffset: EmberLeaflet.computed.optionProperty(),
  opacity: EmberLeaflet.computed.optionProperty(),

  /** events receivable */
  events: ['click', 'dblclick', 'mousedown', 'mouseover', 'mouseout',
    'contextmenu', 'dragstart', 'drag', 'dragend', 'move', 'remove',
    'popupopen', 'popupclose'],

  /**
  Detect clustering above this marker. And return if this marker is inside
  a cluster object.
  */
  _detectClustering: function() {
    var cursor = this;
    while(cursor._parentLayer) {
      cursor = cursor._parentLayer;
      if(cursor._isCluster) { return true; }
    }
    return false;
  },

  _updateLayerOnLocationChange: Ember.observer(function() {
    var newLatLng = get(this, 'location');
    if(newLatLng && !this._layer) {
      this._createLayer();
    } else if(this._layer && !newLatLng) {
      this._destroyLayer();
    } else {
      var oldLatLng = this._layer && this._layer.getLatLng();
      if(oldLatLng && newLatLng && !oldLatLng.equals(newLatLng)) {
        if(this._detectClustering()) {
          this._destroyLayer();
          this._createLayer();
        } else {
          this._layer.setLatLng(newLatLng);
        }
      }
    }
  }, 'location'),

  _newLayer: function() {
    return L.marker(get(this, 'location'), get(this, 'options'));
  },

  _createLayer: function() {
    if(this._layer || !get(this, 'location')) { return; }
    this._super();
    this._layer.content = get(this, 'content');

    // Add a notification for layer changing on the onAdd function.
    var oldAdd = this._layer.onAdd, self = this;
    this._layer.onAdd = function() {
      self.propertyWillChange('layer');
      oldAdd.apply(this, arguments);
      self.propertyDidChange('layer');
    };
    this.notifyPropertyChange('layer');
  },

  _destroyLayer: function() {
    if(!this._layer) { return; }
    this._super();
  }
});

/**
  `EmberLeaflet.MarkerLayer` is a convenience object for those who prefer
  creating marker layers with `EmberLeaflet.MarkerLayer.extend(...)` rather
  than `Ember.Object.extend(EmberLeaflet.MarkerLayerMixin, ...)`.

  @class MarkerLayer
  @namespace EmberLeaflet
*/
EmberLeaflet.MarkerLayer = Ember.Object.extend(EmberLeaflet.MarkerLayerMixin, {});
