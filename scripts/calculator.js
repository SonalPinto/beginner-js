// calculator.js

var output;
var input;
var mem;
var op;
var state;
var lcd_length=10;

// init the calc sandbox
var initCalc = function($canvas)  {
	var dynamic_HTML;
	$canvas.empty().addClass('calc_sandbox').fadeIn('slow');
	  
	dynamic_HTML = '<div id="calc_menu"><div id="calc_quit">&#10006</div></div> \
	<div id="calc_lcd">\
		<div id="calc_mem"></div> \
	    <div id="calc_output">0</div> \
	</div> \
	<div id="calc_leftpanel">\
	  	<div class="calc_number">7</div> \
	  	<div class="calc_number">8</div> \
	  	<div class="calc_number">9</div> \
	  	<div class="calc_number">4</div> \
	  	<div class="calc_number">5</div> \
	  	<div class="calc_number">6</div> \
	  	<div class="calc_number">1</div> \
	  	<div class="calc_number">2</div> \
	  	<div class="calc_number">3</div> \
	  	<div class="calc_number">.</div> \
	  	<div class="calc_number">0</div> \
	  	<div class="calc_operator">=</div>\
		</div>\
		<div id="calc_rightpanel"">\
	  	<div class="calc_operator">DEL</div>\
	  	<div class="calc_operator">+</div>\
	  	<div class="calc_operator">-</div>\
	  	<div class="calc_operator">/</div>\
	  	<div class="calc_operator">*</div>\
	</div>';
      	      
	$canvas.append(dynamic_HTML);
	$('#calc_quit').click(function(){calc_quit($canvas)});
	calc_render(0);
	state = 'general_input';
	output=0;
	input=0;
	mem='';

	// input event handler
	// State machine
	$('.calc_number,.calc_operator').click(function(){
		var n = $(this).text();
		calc_fsm(n);
	})
	$('.calc_number,.calc_operator').click(function() {
		$(this).animate(
			{'color':'#26a69a','font-size':'1.2em'},120
		).delay(100).animate(
			{'color':'#fafafa','font-size':'1.0em'},120
		);
	});

}

// destroyer
var calc_quit = function ($canvas) {
	state = 'general_input';
	output=0;
	input=0;
	mem='';
	$canvas.fadeOut('slow', function(){
        $canvas.empty().removeClass('calc_sandbox');
      });
}

// Evaulate the stream
var calc_eval = function(a,b,operation){
	switch(operation){
		case '+': a+=b;break;
		case '-': a-=b;break;
		case '*': a*=b;break;
		case '/': a/=b;break;
	}
	if(a.toString().match(/\./)){
		return a.toFixed(2);
	} else {
		return a;
	}
	
}

// lcd render 
var calc_render = function(mode) {
	if(mode==0){
		$('#calc_output').html(output);
		$('#calc_mem').html(mem);
	} else if(mode==1){
		$('#calc_output').html(input);
	} else {
		$('#calc_output').html('ERROR');
	}
}

// Finite State Machine for the Calc
var calc_fsm = function(n) {
	if(n == 'DEL'){
      		state = 'general_input';
			output=0;
			input=0;
			mem='';
			calc_render(0);
    } else {
		switch(state){
			case 'general_input':
				if(n.match(/[0-9]/)){
					if(input.toString().length <= lcd_length){
						input = input*10 + parseInt(n);
						calc_render(1);
					} else {
						calc_render(2);
						state='error';
					}
				} else if(n.match(/[\+\-\*\/]/)){
					output=input;
					mem = input+' '+n;
					op=n;
					input=0;
					calc_render(0);
					state='eval';
				} else if(n=='='){
					output=input;
					mem = input;
					calc_render(0);
					input=0;
				}
				break;

			case 'eval':
				if(n.match(/[0-9]/)){
					if(input.toString().length <= lcd_length){
						input = input*10 + parseInt(n);
						calc_render(1);
					} else {
						calc_render(2);
						state='error';
					}
				} else if(n.match(/[\+\-\*\/]/)) {
					output = calc_eval(output,input,op);
					if(output.toString().length > lcd_length){
						calc_render(2);
						state='error';
					} else {
						mem = output+' '+n;
						op=n;
						input=0;
						calc_render(0);
					}
				} else if(n=='='){
					output=calc_eval(output,input,op);
					if(output.toString().length > lcd_length){
						calc_render(2);
						state='error';
					} else {
						mem = '';
						input=output;
						calc_render(0);
						input=0;
						state='general_input';
					}
				}
				break;
		};
	}
	// console.log(state+":"+input+":"+output);
}
