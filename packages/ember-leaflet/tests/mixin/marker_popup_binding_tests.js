require('ember-leaflet/~tests/test_helper');

var content, marker, MarkerClass, view, 
  locationsEqual = window.locationsEqual,
  locations = window.locations;

var get = Ember.get;

module("EmberLeaflet.PopupMixin (Marker)", {
  setup: function() {
    content = Ember.Object.create({
      location: locations.nyc,
      message: 'hello there!'
    });
    MarkerClass = EmberLeaflet.MarkerLayer.extend(
      EmberLeaflet.PopupMixin, {});
    
    marker = MarkerClass.create({
      content: content,
      popupContentBinding: 'content.message'
    });

    view = EmberLeaflet.MapView.create({childLayers: [marker]});
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

test("Popup is created", function() {
  ok(marker._popup, "popup is created");
  equal(marker._popup._map, null, "popup not added until opened");  
});

test("Clicking shows popup", function() {
  marker._layer.fire('click', {latlng: marker.get('location')});
  ok(!!marker._popup._map, "marker added to map");
  equal(marker._popup._content, 'hello there!');
  locationsEqual(marker._popup._latlng, marker.get('location'));
});

test("Changing content before opening updates popupContent", function() {
  Ember.run(function() { content.set('message', 'goodbye!'); });
  marker._layer.fire('click', {latlng: marker.get('location')});
  equal(marker._popup._content, 'goodbye!');
});

test("Changing content after opening updates popupContent", function() {
  marker._layer.fire('click', {latlng: marker.get('location')});
  Ember.run(function() { content.set('message', 'goodbye!'); });
  equal(marker._popup._content, 'goodbye!');
});

test("Destroying map destroys popup", function() {
  Ember.run(function() { view.destroy(); });
  equal(marker._popup, null);
});
