var map = L.map('mapid').on('load', onMapLoad).setView([41.390, 2.180], 12);
//map.locate({setView: true, maxZoom: 17});
	
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers;

function onMapLoad() {

	console.log("Mapa cargado");
	//FASE 3.1
	$.ajax({
		url: 'http://localhost/mapa/api/apiRestaurantes.php',
		type: 'POST',
		dataType: 'JSON',
		success: function datos(data) {
			data_markers = data;
			console.log(data_markers);
			//2) Añado de forma dinámica en el select los posibles tipos de restaurantes
			var tiposComida = [];
			tiposComida.push('Todos');
			var newTiposComida;
		
			data_markers.forEach(data => {
				tipoComida = data.kind_food;
				var arrayTiposComida = tipoComida.split(',');
				data.kind_food = arrayTiposComida;		
				arrayTiposComida.forEach(tipo=>
					tiposComida.push(tipo)
				);
				newTiposComida = tiposComida.filter((x, index) => tiposComida.indexOf(x) === index);
				tiposComida = newTiposComida;
			});
		
			
			newTiposComida.forEach(tipo =>{
				var x = document.createElement("OPTION");
				x.setAttribute("value", tipo);
				var t = document.createTextNode(tipo);
				x.appendChild(t);
				document.getElementById("kind_food_selector").appendChild(x);
			})
			//3) Llamo a la función para --> render_to_map(data_markers, 'all'); <-- para mostrar restaurantes en el mapa
			render_to_map(data_markers, 'Todos');
		}
	})
}

$('#kind_food_selector').on('change', function() {
	render_to_map(data_markers, this.value);
});

var contador = 0;
function render_to_map(data_markers,opcion){
	//FASE 3.2
	//1) Limpio todos los marcadores
	markers.clearLayers();
	//2) Realizo un bucle para decidir que marcadores cumplen el filtro, y los agregamos al mapa	
	var marker;
	data_markers.forEach(data => {
	
		if(data.kind_food.includes(opcion)==true || opcion=='Todos'){
			marker = L.marker( [data.lat , data.lng] )      
			marker.bindPopup("Restaurante"+ data.name +"<br><br> Comida "+ data.kind_food +" <br> "+ data.address);	
			markers.addLayer(marker);
		};
	});
	map.addLayer(markers);
};