
// Get references to page elements
var $searchTerm = $('#item_title');
var $submitBtn = $('#submit');
var $exampleList = $('#example-list');

const API = {
  post: function(info) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',

      url: '/api/search',
      data: JSON.stringify(example)

    });
  },
  get: function() {
    return $.ajax({
      url: '', //FILL IT IN
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


  var example = {
    item_title: $searchTerm.val().trim(),
  };

  if (!(example.item_title)) {
    alert('You must enter an example text and description!');
    return;
  }

  API.post(example).then(function() {
    refreshExamples();
  });

  $searchTerm.val('');



};
