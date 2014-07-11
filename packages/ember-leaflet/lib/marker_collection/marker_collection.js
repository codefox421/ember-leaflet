/**
  `EmberLeaflet.MarkerCollectionLayerMixin` is a specific collection layer
  containing marker objects.
 
  @class MarkerCollectionLayerMixin
  @namespace EmberLeaflet
  @uses EmberLeaflet.CollectionLayer
  @uses EmberLeaflet.MarkerLayer
*/
EmberLeaflet.MarkerCollectionLayerMixin = Ember.Mixin.create(
    EmberLeaflet.CollectionLayerMixin, {
  itemLayerClass: EmberLeaflet.MarkerLayer
});

EmberLeaflet.MarkerCollectionLayer = Ember.Object.extend(EmberLeaflet.MarkerCollectionLayerMixin, {});
