var mode = null;
var key = null;

$(function() {

  var config = {
    apiKey: "AIzaSyDwHrlh-2Ql8tvOnbFcdvYQKqIFGUcVZ_o",
    authDomain: "mymusic-1218c.firebaseapp.com",
    databaseURL: "https://mymusic-1218c.firebaseio.com",
    projectId: "mymusic-1218c",
    storageBucket: "",
    messagingSenderId: "958753188496"
  };

  firebase.initializeApp(config);

});


$(function() {
	var rootRef = firebase.database().ref("memo");
	var $memo_list_container = $('.memo_list_container');

	rootRef.on("child_added", function(snap) {

		var content = snap.child("content").val();
		var title = snap.child("title").val();
		var key = snap.key;

		$memo_list_container.append(`
		<div class="sizer" data-key=${key}>
			<div class="square" data-key=${key} id="btn">
				<div class="content">
					<div class="title">${title}</div>
					<div class="body">${content}</div>
				</div>
				<div class="remove" data-key=${key}>
					<i class="fa fa-trash-o" aria-hidden="true"></i>
				</div>
			</div>
		</div>`)
	});



	rootRef.on("child_changed", function(snap) {
		var content = snap.val()['content'];
		var title = snap.val()['title'];
		var key = snap.key;
		var select = $(`[data-key=${key}`);

		select.html(`
			<div class="square" data-key=${key} id="btn">
				<div class="content">
					<div class="title">${title}</div>
					<div class="body">${content}</div>
				</div>
			</div>
		`)

	})
})

$(function() {
	var $memo_textarea = $('.memo_textarea');
	var $input_writer = $('.input_writer');
	var $memo_send_button = $('.memo_send_button');

	var rootRef = firebase.database().ref("memo");

	$(document).on("click", "#btn", function() {
		key = $(this).attr('data-key');
		var content = $(this).children().children().eq(1).text();
		var title = $(this).children().children().eq(0).text();
		modalToggle();

		// 기존 값 가져오기

		$memo_textarea.val(content);
		$input_writer.val(title);
		$memo_send_button.text("수정하기");
		mode = 'update';

	})

	$(document).on('click', ".remove", function() {
		var removekey = $(this).attr('data-key');
		var $select = $(`[data-key=${key}`);

		rootRef.child(removekey).remove();
		$select.remove();
		modalToggle();


	})
})

$(function() {
	// 추가하기
	var $memo_send_button = $('.memo_send_button');
	var $memo_textarea = $('.memo_textarea');
	var $input_writer = $('.input_writer');

	var rootRef = firebase.database().ref("memo");

	$memo_send_button.click(function() {


		if(mode == 'add') {
			var $memo_textarea_value = $memo_textarea.val();
			var $input_writer_value = $input_writer.val();

			rootRef.push().set({
				'title': $input_writer_value,
				'content': $memo_textarea_value
			});

			modalToggle();
			$input_writer.val("");
			$memo_textarea.val("");

		} else { // update
			var $memo_textarea_value = $memo_textarea.val();
			var $input_writer_value = $input_writer.val();

			rootRef.child(key).set({
				'title': $input_writer_value,
				'content': $memo_textarea_value
			});

			modalToggle();

			key = null;
		}


	})
})

$(function() {
	var $dimmed = $('.dimmed');
	var $user_write = $('.user_write');
	var $memo_send_button = $('.memo_send_button');
	var $memo_textarea = $('.memo_textarea');


	$user_write.click(function() {
		modalToggle();

		$memo_send_button.text("작성하기");
		$memo_textarea.val("");
		mode = 'add';
	})

	$dimmed.click(function() {
		modalToggle();
	})
})


function modalToggle() {
	var $modal_container = $('.modal_container');
	var $dimmed = $('.dimmed');

	$modal_container.toggleClass('none');
	$dimmed.toggleClass('none');

}