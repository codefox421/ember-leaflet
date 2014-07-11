var get = Ember.get;

/**
  `EmberLeaflet.TileLayerMixin` is a tile set.
 
  @class TileLayerMixin
  @namespace EmberLeaflet
  @uses EmberLeaflet.LayerMixin
*/
EmberLeaflet.TileLayerMixin = Ember.Mixin.create(
    EmberLeaflet.LayerMixin, {
  tileUrl: null,
  options: {},
  _newLayer: function() {
    return L.tileLayer(get(this, 'tileUrl'), get(this, 'options'));
  },

  tileUrlDidChange: Ember.observer(function() {
    if(!this._layer) { return; }
    this._layer.setUrl(this.get('tileUrl'));
  }, 'tileUrl'),

  zIndex: EmberLeaflet.computed.optionProperty(),
  opacity: EmberLeaflet.computed.optionProperty()
});

/**
  `EmberLeaflet.TileLayer` is a convenience object for those who prefer
  creating layers with `EmberLeaflet.TileLayer.extend(...)` rather than
  `Ember.Object.extend(EmberLeaflet.TileLayerMixin, ...)`.

  @class TileLayer
  @namespace EmberLeaflet
  @uses EmberLeaflet.TileLayerMixin
*/
EmberLeaflet.TileLayer = Ember.Object.extend(EmberLeaflet.TileLayerMixin, {});

EmberLeaflet.DefaultTileLayer = EmberLeaflet.TileLayer.extend({
  tileUrl: 'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png'
});
