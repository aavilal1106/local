var breakMobile = 470;
var buenFinHeight = $(window).width() <= breakMobile ? 70 : 100;
console.log('Hello git');
$(window).scroll(function() {
  console.log('Hello git scroll2');
  var topHeader = buenFinHeight - window.scrollY;
  topHeader = topHeader < 0 ? 0 : topHeader;
  $('#j-header').css('top', topHeader + 'px');
});

$(window).resize(function() {
  adjust();
});

function adjust() {
  var breakTxtMobile = 620;
  buenFinHeight = $(window).width() <= breakMobile ? 70 : 100;
  var topHeader = buenFinHeight - window.scrollY;
  topHeader = topHeader < 0 ? 0 : topHeader;
  $('#j-header').css('top', topHeader + 'px');
  if ($(window).width() <= breakTxtMobile) {
    $('.minutes :first-child').text('Mins');
    $('.seconds :first-child').text('Segs');
  } else {
    $('.minutes :first-child').text('Minutos');
    $('.seconds :first-child').text('Segundos');
  }
}
$(document).ready(function() {
			var clock;
			var date = new Date(2017,10,17);
			var now = new Date();
    	var diff = (date.getTime()/1000) - (now.getTime()/1000);

			var clock = $('.clock-header').FlipClock(diff,{
				clockFace: 'DailyCounter',
				countdown: true,
				showSeconds: true,
				language: "es-es"
			});
      adjust();

});

var modal = document.getElementsByClassName('buenfin-modal')[0];
var btn = document.getElementById("modalReg");
var span = document.getElementsByClassName("buenfin-close")[0];

btn.onclick = function() {
    $("#pb_email").val("");
    $("#co_type").val("");
    $('#switch_right-modal').prop('checked', false);
    $('#switch_left-modal').prop('checked', false);
    $("#register-form").show();
    $("#loading-form").hide();
    $("#thanks-form").hide();
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
