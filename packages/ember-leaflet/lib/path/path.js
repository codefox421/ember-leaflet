var set = Ember.set, get = Ember.get;


function pathStyleProperty(styleKey) {
  return Ember.computed('options', function(key, value) {
    // override given key with explicitly defined one if necessary
    key = styleKey || key;
    if(arguments.length > 1) { // set
      // Update style on existing object
      if(this._layer) {
        var styleObject = {};
        styleObject[key] = value;
        this._layer.setStyle(styleObject);
      }
      // Update options object for later initialization.
      if(!get(this, 'options')) { set(this, 'options', {}); }
      this.get('options')[key] = value;
      return value;
    } else { // get
      return this._layer.options[key];
    }
  });
}

/**
  `EmberLeaflet.PathLayerMixin` is a generic layer to be used
  by other geometry layer mixin classes. Both PointPathLayerMixin
  and ArrayPathLayerMixin use it as a base.
 
  @class PathLayerMixin
  @namespace EmberLeaflet
  @uses EmberLeaflet.LayerMixin
*/
EmberLeaflet.PathLayerMixin = Ember.Mixin.create(
    EmberLeaflet.LayerMixin, {

	// Style options available to all L.Path layers
	stroke: pathStyleProperty(),
	color: pathStyleProperty(),
	weight: pathStyleProperty(),
	opacity: pathStyleProperty(),
	fill: pathStyleProperty(),
	fillColor: pathStyleProperty(),
	fillOpacity: pathStyleProperty(),
	dashArray: pathStyleProperty()
});

/**
  `EmberLeaflet.PathLayer` is a convenience object for those who prefer
  creating layers with `EmberLeaflet.PathLayer.extend(...)` rather than
  `Ember.Object.extend(EmberLeaflet.PathLayerMixin, ...)`.

  @class PathLayer
  @namespace EmberLeaflet
  @uses EmberLeaflet.PathLayerMixin
*/
EmberLeaflet.PathLayer = Ember.Object.extend(EmberLeaflet.PathLayerMixin, {});
