// Primary DOM conrol
// main.js

$(document).ready(function(){
	$('.button').click(function() {
		$(this).animate(
			{"box-shadow": "3px 4px 10px #666666",'color':'#80cbc4'},100
		).delay(200).animate(
			{"box-shadow": "1px 2px 8px #666666",'color':'#e0f2f1'},100
		);
	});

	$('#btn_janken1').click(function(){
		janken1();
	});

	$('#btn_janken2').click(function(){
		janken2();
	});

	$('#btn_janken3').click(function(){
		janken3($('.sandbox'),0);
	});

	$('#btn_calc').click(function(){
		initCalc($('.sandbox'));
	});

	$('#btn_svg').click(function(){
		var $canvas = $('.sandbox');
		$canvas.addClass("svg_sandbox").html('<svg id="mySVG"></svg>').show();
		// $canvas.addClass("svg_sandbox").show();
		// $canvas.load("Visio_Test.svg").done(function(){
		// 	var svg =  Snap("svg");
		//   	var gs = svg.selectAll("g");
		//     console.log(gs.length);
		// });
		
		// $.get("Visio_Test.svg", null, function(data){
		// 	var svgNode = $("svg", data);
		// 	var docNode = document.adoptNode(svgNode[0]);
		// 	var pageNode = $(".sandbox");
		// 	pageNode.html(docNode);

		// 	console.log(docNode);
		// },'xml');

		var s = Snap("#mySVG");
        Snap.load("cluster_test.svg", function (f) {
            var g = f.select("g");
            s.append(g);
            // var gs = s.selectAll("g");
            // for(var i in gs){
            // 	console.log(gs[i].select("title").toString());
            // 	// console.log(gs[i].select("custProps").toString());
            // 	console.log(gs[i].select("desc").toString());
            // 	console.log(gs[i].select("path").toString());
            // }
        });         

        console.log($('#mySVG')[0].x());

	});
	
});

