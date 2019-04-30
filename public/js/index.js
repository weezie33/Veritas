//FILL THESE IN
const $searchTerm = $(''),
  $submitBtn = $('');

const API = {
  post: function(info) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: '', //FILL IT IN
      data: JSON.stringify(info)
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

  const vals = {};
};
