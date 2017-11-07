$(document).ready(function() {
			var clock;

			var date = new Date(2017,10,17);
			var now = new Date();
    var diff = (date.getTime()/1000) - (now.getTime()/1000);

			var clock = $('.clock').FlipClock(diff,{
				clockFace: 'DailyCounter',
				countdown: true,
				showSeconds: false,
				language: "es-es"
			});

		});
