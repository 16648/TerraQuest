function Map(zoom, centreLat, centreLng) {
	return Map(zooom, centreLat, centreLng, true);
}

function Map(zoom, centreLat, centreLng, scrollwheel){
	this.mapOptions = {
		zoom: zoom,
		center: new google.maps.LatLng(centreLat, centreLng),
		scrollwheel: scrollwheel,
	 	styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill"},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#7dcdcd"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]}]
	}

	this.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);
}
function Pin(questID, Latitude, Longtitude, title, map){
	this.myLatLng = new google.maps.LatLng(Latitude, Longtitude);
	var that = this;
	$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + Latitude + ',' + Longtitude + '&key=AIzaSyCWpu8WzsEO4AlJs_PflE_-v_ruwny9_uY', function(data){
		that.address = '<b>Address: </b>' + data.results[0].formatted_address
		that.streetview = '<img src = "https://maps.googleapis.com/maps/api/streetview?size=300x150&location=' + Latitude + ',' + Longtitude + '" />'
		that.header = '<h2>' + title + '!</h2>'
		that.moreInfo = '<br/><br/><a href = "/quest/' + questID + '">More info...</a>'
		that.content = that.streetview + that.header + that.address + that.moreInfo
		that.marker = new google.maps.Marker({
			position: that.myLatLng,
			map: map.map,
			title: title
		});
    	that.infowindow = new google.maps.InfoWindow({
			content: that.content,
			maxWidth: 500,
			maxHeight: 500
		});

		google.maps.event.addListener(that.marker, 'click', function() {
			that.infowindow.open(map.map, that.marker);
		});
    })
	}