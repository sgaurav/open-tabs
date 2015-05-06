var tabManager = {

  requestList: function(){
    var self = this;
    chrome.tabs.query({}, function(e){

      $('header span').html(e.length);
      
      for(var i = 0; i<e.length; i++){
        self.getIndividualTabInfo(e[i].id);
      }
    });
  },

  getIndividualTabInfo: function( tabId ){
    var self = this;
    chrome.tabs.get(tabId, function(e){
      self.addToPage(e);
    })
  },

  addToPage: function(e){
    var tab = $('<div>', {
      'id':e.id,
      'class': 'tab-list'
    }).on('click', function(){
      chrome.tabs.update(e.id, {'active': true});
    });

    $('<img>', {
      'class': 'favIconUrl',
      'src': e.favIconUrl
    }).appendTo(tab);

    $('<span>', {
      'class': 'title',
      'html': e.title
    }).appendTo(tab);

    $('<span>', {
      'class': 'url',
      'html': e.url
    }).appendTo(tab);

    $('<span>', {
      'class': 'close',
      'html': 'x'
    }).on('click', function(){
      var me = $(this).parent();
      chrome.tabs.remove(e.id, function(){
        me.fadeOut(300);
      })
    })
    .appendTo(tab);

    $('.table-container').append(tab);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  tabManager.requestList();
});