function httpGet(theUrl){
	var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false ); // false to make synchronize
	xmlHttp.send( null );
	return xmlHttp.responseText;
}

function drawTable(theUrl){
	var data = httpGet(theUrl);
	var text = "<table border=1><tr><th>Timestamp</th><th>Tweet</th><th>Positive</th><th>Neutral</th><th>Negative</th><th>Ovearll</th></tr>";
	var json = JSON.parse(data);
	for ( var count in json ){
		text = text + "<tr>"
		+ "<td>" + json[count]['timestamp']
		+ "</td><td>" + json[count]['tweet']['text']
		+ "</td><td>" + json[count]['positive']
		+ "</td><td>" + json[count]['neutral']
		+ "</td><td>" + json[count]['negative']
		+ "</td><td>" + json[count]['overall']
		+ "</td></tr>";
	}
	document.getElementById("content").innerHTML = text + "</table>";
}

function setData(attr){
	var data = httpGet('http://localhost:3000/graph');
	var json = JSON.parse(data);
	var data = [];
	for ( var count in json ){
		data[count] = json[count][attr];
	}
	return data;
}

function drawGraph(attr){
	document.getElementById("content").innerHTML = "";
	var data = setData(attr);
	var chart = d3.select(".chart");
	var bar = chart.selectAll("div");
	var barUpdate = bar.data(data);
	var barEnter = barUpdate.enter().append("div");
	barEnter.style("width", function (d) {
		return d * 1000 + "px";
	});
	barEnter.text(function (d) {
		return d;
	});
}