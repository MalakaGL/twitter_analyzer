
		function httpGet(theUrl) {
			console.log(theUrl);
			var xmlHttp = null;
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open("GET", theUrl, false); // false to make synchronize
			xmlHttp.send();
			return xmlHttp.responseText;
		}

		function getRange() {
			var df = document.getElementById('date_from').value;
			var dt = document.getElementById('date_to').value;
			var data = httpGet('https://tweetanalyze.herokuapp.com/getData/?date_from='+df+'&date_to='+dt);
			var json = JSON.parse(data);
			drawGraph(setData(json));
		}

		function setData(json) {
			var data_filtered = [];
			for (var count in json) {
				data_filtered.push({'date_tweet': json[count]['tweet']['created_at'], 'sentiment': json[count]['overall']});
			}
			data_filtered.sort(function(a,b){
				return new Date(a.date_tweet) - new Date(b.date_tweet);
			});
			return data_filtered;
		}

		function aggregate(data_filtered){
			var data_aggregated = [];
			var start = data_filtered[0].date_tweet;
			var start_time = new Date(start);
			var sentiment_sum = 0;
			var count = 0;

			for ( var t in data_filtered ) {
				if ((new Date(data_filtered[t].date_tweet)) <= start_time){
					sentiment_sum = sentiment_sum + data_filtered[t].sentiment;
					count = count + 1;
				} else{
					if (count === 0)
						count = 1;
					data_aggregated.push({'date_tweet': start, 'sentiment': sentiment_sum/count});
					sentiment_sum = 0;
					if(t + 1<data_filtered.length){
						start = data_filtered[t+1].date_tweet;
						start_time.setMinutes( new Date(start).getMinutes()+15);
						count = 1;
					}
				}
			};

			return data_aggregated;
		}

		function drawOverall() {
			var data = httpGet('https://tweetanalyze.herokuapp.com/graph');
			var json = JSON.parse(data);
			drawGraph(setData(json));
		}

		function drawGraph(data) {
			var margin = {top: 20, right: 20, bottom: 30, left: 50},
				width = 960 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

			//Tue Jan 13 07:47:30 +0000 2015
			var parseDate = d3.time.format("%a %b %e %H:%M:%S %Z %Y").parse;

			var x = d3.time.scale()
				.range([0, width]);

			var y = d3.scale.linear()
				.range([height, 0]);

			var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");

			var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left");

			var line = d3.svg.line()
				.interpolate("basis")
				.x(function (d) {
					return x(d.date_tweet);
				})
				.y(function (d) {
					return y(d.sentiment);
				});

			d3.select("svg").remove();

			var svg = d3.select("#content").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			data.forEach(function (d) {
				d.date_tweet = parseDate(d.date_tweet);
				d.sentiment = +d.sentiment;
			});

			x.domain(d3.extent(data, function (d) {
				return d.date_tweet;
			}));
			y.domain(d3.extent(data, function (d) {
				return d.sentiment;
			}));

			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

			svg.append("g")
				.attr("class", "y axis")
				.call(yAxis)
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Sentiment");

			svg.append("path")
				.datum(data)
				.attr("class", "line")
				.attr("d", line);
		}