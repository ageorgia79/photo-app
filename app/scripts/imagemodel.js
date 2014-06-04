"use strict";

var Photo = Backbone.Model.extend({
  idAttribute: "_id"
});

var PhotoCollection = Backbone.Collection.extend({
  model: Photo,
  url: "http://tiny-pizza-server.herokuapp.com/collections/photos",


});