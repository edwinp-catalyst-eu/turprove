// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * JavaScript required by the turprove question type.
 *
 * @package    qtype
 * @subpackage turprove
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


M.qtype_turprove = M.qtype_turprove || {};

M.qtype_turprove.init = function (Y, questiondiv, quiet, autoplay, popupHead, popupText, imageUrl) {

    if (!$(document.body).hasClass('turprove')) {
        $(document.body).addClass('turprove');
    }
	var elem = $("#page-navbar");
	$('body,html').animate({scrollTop: elem.offset().top }, 500);	
	
	var done = $("#isDone");
	if (done.length > 0) {
		swal({  
		title: popupHead,
		text: popupText, 
		imageUrl: imageUrl
		});
		
	}

    var initialplaythroughcomplete = false;
    var current = 0;
	var selection = $("#selection").data("layout");
    var audio = $('#audiodiv');
    var playlist = $(questiondiv);
    var tracks = playlist.find('.content .formulation .audioplay');
    if (!quiet && autoplay == 1) {
        var playing = $(playlist.find('.audioplay')[current]);
        playing.addClass('playing');
        audio[0].play();
    }
	
    audio[0].addEventListener('ended',function(e){
        $('.audioplay').removeClass('playing');
        if (current != tracks.length - 1 && !initialplaythroughcomplete) {
            setTimeout(function() {
                current++;
                playing = $(playlist.find('.audioplay')[current]);
                playing.addClass('playing');
                audio[0].src = $(playlist.find('.audioplay')[current]).attr('data-src');
                audio[0].load();
                audio[0].play();
            }, 1000);
        } else {
            initialplaythroughcomplete = true;
			if (selection !== undefined) {
				if (selection == 2 || selection == 3) {
					function nextQuestion(){
						$("#btnNext").click();
					}
					setTimeout(nextQuestion, 5000);
				}
			}
			
        }
    });

    $('.audioplay').click(function(e) {
        initialplaythroughcomplete = true;
        if ($(this).hasClass('playing')) {
            audio.trigger('pause');
            $(this).removeClass('playing');
        } else {
            audio.trigger('pause');
            $('.audioplay').removeClass('playing');
            audio[0].src = $(this).data('src');
            audio[0].load();
            audio[0].play();
            $(this).addClass('playing');
        }
    });
};