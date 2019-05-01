// Get references to page elements
var $searchTerm = $('#item_title');
var $submitBtn = $('#submit');
var $exampleList = $('#example-list');

const API = {
  post: function(info) {
    console.log(info);
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: '/api/search',
      data: info
    });
  },

  getWebhose: function() {
    return $.ajax({
      url: '/app/search/' + $searchTerm.val(), //FILL IT IN
      type: 'GET'
    });
  },
  delete: function(id) {
    return $.ajax({
      url: '' + id, //FILL IT IN
      type: 'DELETE'
    });
  }
};

// const contentRefresh = function(){
//     API.get().then(data=>{
//         var
//     })
// }

const handleFormSubmit = event => {
  event.preventDefault();

  var item = {
    item_title: $searchTerm.val().trim()
  };

  if (!item.item_title) {
    alert('You must enter an example text and description!');
    return;
  }

  API.getWebhose(item).then(function() {
    // refreshExamples();
    console.log(`true`);
  });

  $searchTerm.val('');
};
