var get = Ember.get, set = Ember.set, fmt = Ember.String.fmt,
  forEach = Ember.EnumerableUtils.forEach,
  map = Ember.EnumerableUtils.map;

/**
  A `ContainerLayerMixin` is an `EmberLeaflet.Layer` mixin that implements `Ember.MutableArray`
  allowing programatic management of its child layers.

  @class ContainerLayerMixin
  @namespace EmberLeaflet
  @uses EmberLeaflet.LayerMixin
  @uses Ember.MutableArray
*/
EmberLeaflet.ContainerLayerMixin = Ember.Mixin.create(
    EmberLeaflet.LayerMixin, Ember.MutableArray, {
  /**
  Default _newLayer calls L.layerGroup to allow adding of new layers.
  */
  _newLayer: function() { return L.layerGroup(); },

  /**
  Initialize child layers from the class variable. This should only be
  called once.
  */

  _childLayers: null,

  didCreateLayer: function() {
    this._super();
    this.createAndAddChildLayers();
  },

  willDestroyLayer: function() {
    this.removeAndDestroyChildLayers();
    this._super();
  },

  createAndAddChildLayers: function() {
    var _childLayers = this._childLayers = Ember.A(), self = this, layer;
    if(this._childLayerClasses === undefined) {
      this._childLayerClasses = get(this, 'childLayers') || [];
    }
    Ember.defineProperty(this, 'childLayers', Ember.computed(function() {
      return this._childLayers;
    }));

    forEach(this._childLayerClasses, function(layerClass, idx) {
      layer = self.createChildLayer(layerClass);
      self.addChildLayer(layer);
      _childLayers[idx] = layer;
    }, this);
  },

  replace: function(idx, removedCount, addedLayers) {
    var addedCount = addedLayers ? get(addedLayers, 'length') : 0,
      self = this;
    this.arrayContentWillChange(idx, removedCount, addedCount);
    this.childLayersWillChange(this._childLayers, idx, removedCount);

    if (addedCount === 0) {
      this._childLayers.splice(idx, removedCount);
    } else {
      // instantiate class objects, make sure controller and 
      // _parentLayer is set for each layer object added.
      addedLayers = map(addedLayers, function(layer) {
        return self.createChildLayer(layer);
      });
      var args = [idx, removedCount].concat(addedLayers);
      if (addedLayers.length && !this._childLayers.length) {
        this._childLayers = this._childLayers.slice();
      }
      this._childLayers.splice.apply(this._childLayers, args);
    }
    this.arrayContentDidChange(idx, removedCount, addedCount);
    this.childLayersDidChange(this._childLayers, idx, removedCount,
      addedCount);
    return this;
  },

  objectAt: function(idx) {
    return this._childLayers[idx];
  },

  length: Ember.computed(function () {
    return this._childLayers.length;
  }),

  childLayersWillChange: function(layers, start, removed) {
    var self = this;
    this.propertyWillChange('childLayers');
    if(removed > 0) {
      var removedLayers = layers.slice(start, start + removed);
      forEach(removedLayers, function(layer) {
        self.removeChildLayer(layer);
      });
    }
  },

  childLayersDidChange: function(layers, start, removed, added) {
    var self = this;
    if(added > 0) {
      var addedLayers = layers.slice(start, start + added);
      forEach(addedLayers, function(layer) {
        self.addChildLayer(layer);
      });
    }
    this.propertyDidChange('childLayers');
  },

  addChildLayer: function(layer) {
    layer._createLayer();
  },

  removeChildLayer: function(layer) {
    layer._destroyLayer();
  },

  createChildLayer: function(layerClass, attrs) {
    attrs = attrs || {};
    attrs.container = this.get('container');
    attrs.controller = this.get('controller');
    attrs._parentLayer = this.isVirtual ? this._parentLayer : this;
    var layerInstance;
    var layerType = Ember.typeOf(layerClass);
    Ember.assert(
      fmt("layerClass %@ must be an Ember instance or class.",
        layerClass ? layerClass.toString() : '<undefined>'),
        layerType === 'instance' || layerType === 'class');
    if(layerType === 'instance') {
      layerInstance = layerClass;
      layerInstance.setProperties(attrs);
    } else if (layerType === 'class'){
      layerInstance = layerClass.create(attrs);
    }
    return layerInstance;
  },

  removeAndDestroyChildLayers: function() {
    var self = this;
    if(this._childLayers) {
      forEach(this._childLayers, function(layer) {
        self.removeChildLayer(layer);
        layer.destroy();
      });
    }
    this._childLayers = [];
  }
});

/**
  A `ContainerLayer` is an empty collection layer that you can programmatically
  add new layers to.

  @class ContainerLayer
  @namespace EmberLeaflet
  @uses EmberLeaflet.ContainerLayerMixin
*/
EmberLeaflet.ContainerLayer = Ember.Object.extend(EmberLeaflet.ContainerLayerMixin, {});
