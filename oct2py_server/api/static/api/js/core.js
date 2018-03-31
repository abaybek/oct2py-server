var csrftoken = Cookies.get('csrftoken');

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  }
});

var $chatlog = $('.js-chat-log');
var $input = $('.js-text');
var $sayButton = $('.js-say');

function createRow(text) {
  var $row = $('<li class="list-group-item"></li>');

  $row.text(text);
  $chatlog.append($row);
}

function submitInput() {
	console.log('---');
	var g = $('.form-control');
	console.log(g);

	var inputData = {};

	inputData['x'] = g[0].value;
	inputData['y'] = g[1].value;

	var sendUrl = $('.active');
	var _url = sendUrl[0].innerText;

  var $submit = $.ajax({
    type: 'POST',
    url: 'api/'+ _url + '/',
    data: JSON.stringify(inputData),
    contentType: 'application/json'
  });

  $submit.done(function(statement) {
      console.log('Submit is done! ');
      console.log(statement);
      alert('Result : ' + statement['result']);
      // document.getElementById('image').setAttribute( 'src', statement['file0']);
      var image = new Image();
      image.src = statement;
      console.log(statement);
      document.body.appendChild(image);

  });

  $submit.fail(function() {
    console.log('Submit is failed! ');
    // console.log(chatterbotUrl);
    console.log(inputData);
    // TODO: Handle errors
  });
}

$sayButton.click(function() {
  submitInput();
});

$input.keydown(function(event) {
  // Submit the input when the enter button is pressed
  if (event.keyCode == 13) {
    submitInput();
  }
});

function create_f_list(data){
	var $sayList = $('#list-container');
	for(var i in data){
		var $row = $('<a href="#" class="list-group-item"></a>');
  	$row.text(data[i].name);
		$sayList.append($row);
	}
}

function get_functions(){
	var $submit = $.ajax({
    type: 'GET',
    url: '/api/',
    contentType: 'application/json'
  });
  $submit.done(function(statement) {
      console.log('Submit is done! ');
      console.log(statement);
      create_f_list(statement);
      init_callbacks();
      // createRow(statement.text);
  });

  $submit.fail(function() {
    console.log('Submit is failed! ');
    // TODO: Handle errors
  });
}
function list_btn_callback(){
	console.log('Callback!');
	$this = $(this);
	$('.active').removeClass('active');
	$this.toggleClass('active');
}

function init_callbacks(){
	$(document).ready(function(){
		$("#list-container > a").click(list_btn_callback);
	});
	console.log('Callbacks initialized');
}

function init(){
	get_functions();
	// init_callbacks();
}
init();