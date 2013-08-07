require('ember-leaflet/~tests/test_helper');

var content, rectangle, view, 
  locationsEqual = window.locationsEqual,
  locations = window.locations;

module("EmberLeaflet.RectangleLayer with bounds property", {
  setup: function() {
    content = Ember.A([locations.chicago, locations.sf, locations.nyc]);
    content = {bounds: L.latLngBounds(content)};
    rectangle = EmberLeaflet.RectangleLayer.create({
      content: content,
      boundsProperty: 'bounds'
    });
    view = EmberLeaflet.MapView.create({childLayers: [rectangle]});
    Ember.run(function() {
      view.appendTo('#qunit-fixture');
    });
  },
  teardown: function() {
    Ember.run(function() {
      view.destroy();      
    });
  }
});

test("rectangle is created", function() {
  ok(!!rectangle._layer);
  equal(rectangle._layer._map, view._layer);
});

test("bounds match", function() {
  var _layerBounds = rectangle._layer.getBounds();
  locationsEqual(_layerBounds.getSouthWest(), locations.sf);
  equal(_layerBounds.getNorth(), locations.chicago.lat);
  equal(_layerBounds.getEast(), locations.nyc.lng);
  var bounds = rectangle.get('bounds');
  locationsEqual(bounds.getSouthWest(), locations.sf);
  equal(bounds.getNorth(), locations.chicago.lat);
  equal(bounds.getEast(), locations.nyc.lng);
});

test("replace content updates rectangle", function() {
  rectangle.set('content', {bounds:L.latLngBounds(Ember.A([locations.paris, locations.nyc]))});
  locationsEqual(rectangle.get('bounds').getNorthEast(), locations.paris);
  locationsEqual(rectangle.get('bounds').getSouthWest(), locations.nyc);
  var _layerBounds = rectangle._layer.getBounds();
  locationsEqual(_layerBounds.getSouthWest(), locations.nyc);
  locationsEqual(_layerBounds.getNorthEast(), locations.paris);
});
