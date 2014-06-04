"use strict";

var ThumbnailView = Backbone.View.extend({

  className: 'thumbnail',

  template: _.template($('.thumbnail-template').text()),

  events: {
    'click': 'showDetailView'
  },

  initialize: function(){
    $('.container').append(this.el);
    this.render();
  },

  render: function(){
    var renderedTemplate = this.template(this.model.attributes)
    this.$el.html(renderedTemplate)
  },


  showDetailView: function(){
    new DetailView({model: this.model})
  },
})

var getPhotos = new PhotoCollection();

getPhotos.fetch().done(function(){
  getPhotos.each(function(photo){
    new ThumbnailView({model: photo});
  })
})