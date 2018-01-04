document.addEventListener("DOMContentLoaded", function() {
  var ulElection = document.querySelector('#election'),
      refreshBtn = document.querySelector('#refresh');

  refreshBtn.addEventListener('click', function() {
    location.reload();
  })

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'json'
  }).done(function(responseData){
    responseData.candidates.forEach(function(candidate) {
      var li = document.createElement('li')
      li.innerHTML = '<b>' + candidate.name + ':</b> ' + candidate.votes + ' votes';
      ulElection.append(li)

      var form = document.createElement('form')
      form.setAttribute('method', 'post')
      form.setAttribute('action', 'https://bb-election-api.herokuapp.com/vote')
      li.insertAdjacentElement('afterend', form);
      var submitBtn = document.createElement('button')
      var hiddenFld = document.createElement('input')
      hiddenFld.setAttribute('type', 'hidden')
      hiddenFld.setAttribute('name', 'name')
      hiddenFld.setAttribute('value', candidate.name)
      submitBtn.setAttribute('type', 'submit')
      submitBtn.innerText = 'vote ' + candidate.name
      form.insertAdjacentElement('beforeend', hiddenFld)
      form.insertAdjacentElement('beforeend', submitBtn)

      form.addEventListener('submit', function(e){
        e.preventDefault();
        $.ajax({
          url: 'https://bb-election-api.herokuapp.com/vote',
          method: 'POST',
          data: {'name': this.querySelector('input[type=hidden]').value},
          dataType: 'json'
        }).done(function(responseData) {
          alert('Successfully voted for ' + candidate.name)
          location.reload();
        }).fail(function() {
          console.log('Voting Fail')
        })


      })
    })
  })

});
