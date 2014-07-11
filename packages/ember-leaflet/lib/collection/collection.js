var get = Ember.get, forEach = Ember.EnumerableUtils.forEach;

/**
  `EmberLeaflet.CollectionLayerMixin` is the equivalent of `Ember.CollectionView`
  for DOM views -- it observes the `content` array for updates and maintains
  a list of child layers associated with the content array.
 
  @class CollectionLayerMixin
  @namespace EmberLeaflet
  @uses EmberLeaflet.ContainerLayerMixin
*/
EmberLeaflet.CollectionLayerMixin = Ember.Mixin.create(
    EmberLeaflet.ContainerLayerMixin, {
  content: [],
  isVirtual: true, 

  itemLayerClass: Ember.computed(function() {
    throw new Error("itemLayerClass must be defined.");
  }).property(),

  didCreateLayer: function() {
    this._super();
    this._contentDidChange();
  },

  willDestroyLayer: function() {
    this._contentWillChange();
    this._super();
  },

  _contentWillChange: Ember.beforeObserver(function() {
    var content = get(this, 'content');
    if(content) { content.removeArrayObserver(this); }
    var len = content ? get(content, 'length') : 0;
    this.arrayWillChange(content, 0, len);
  }, 'content'),

  _contentDidChange: Ember.observer(function() {
    var content = get(this, 'content');
    if(content) { content.addArrayObserver(this); }
    var len = content ? get(content, 'length') : 0;
    this.arrayDidChange(content, 0, null, len);    
  }, 'content'),

  arrayWillChange: function(array, idx, removedCount, addedCount) {
    for(var i = idx; i < idx + removedCount; i++) {
      this.objectWasRemoved(array.objectAt(i));
    }
  },

  arrayDidChange: function(array, idx, removedCount, addedCount) {
    for(var i = idx; i < idx + addedCount; i++) {
      this.objectWasAdded(array.objectAt(i), i);
    }
  },

  objectWasAdded: function(obj, index) {
    if(index === undefined) { index = this._childLayers.length; }
    var childLayer = this.createChildLayer(get(this, 'itemLayerClass'), {
      content: obj
    });
    this.replace(index, 0, [childLayer]);
  },

  objectWasRemoved: function(obj) {
    var layer;
    for(var i = 0, l = this._childLayers.length; i < l; i++) {
      layer = this._childLayers[i];
      if(layer.get('content') === obj) {
        this.replace(i, 1, []);
        layer.destroy();
        return;
      }
    }
  }  
});

/**
  A `CollectionLayer` is an empty collection layer that you can programmatically
  add new layers to.

  @class ConllectionLayer
  @namespace EmberLeaflet
  @uses EmberLeaflet.CollectionLayerMixin
*/
EmberLeaflet.CollectionLayer = Ember.Object.extend(EmberLeaflet.CollectionLayerMixin, {});
