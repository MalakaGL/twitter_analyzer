function httpGet(theUrl){
	var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false ); // false to make synchronize
	xmlHttp.send( null );
	document.getElementById("content").innerHTML = createTable(xmlHttp.responseText);
}

function createTable(data){
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
	return text + "</table>";
}