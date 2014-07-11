var get = Ember.get;

/**
  `EmberLeaflet.BoundsPathLayerMixin` is a base mixin that takes a list
  of locations and computes the bounding box.
 
  @class BoundsPathLayerMixin
  @namespace EmberLeaflet
  @uses EmberLeaflet.ArrayPathLayerMixin
  @uses EmberLeaflet.BoundsMixin
*/
EmberLeaflet.BoundsPathLayerMixin = Ember.Mixin.create(
  EmberLeaflet.ArrayPathLayerMixin, EmberLeaflet.BoundsMixin, {});

/**
  `EmberLeaflet.BoundsPathLayer` is a convenience object for those who prefer
  creating layers with `EmberLeaflet.BoundsPathLayer.extend(...)` rather than
  `Ember.Object.extend(EmberLeaflet.BoundsPathLayerMixin, ...)`.

  @class BoundsPathLayer
  @namespace EmberLeaflet
  @uses EmberLeaflet.BoundsPathLayerMixin
*/
EmberLeaflet.BoundsPathLayer = Ember.Object.extend(EmberLeaflet.BoundsPathLayerMixin, {});
