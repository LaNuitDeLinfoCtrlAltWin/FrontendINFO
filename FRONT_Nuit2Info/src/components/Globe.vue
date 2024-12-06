<template>
  <div ref="globeContainer" class="globe-container"></div>
</template>

<script setup >
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Globe from 'globe.gl';
import axios from 'axios';

const globeContainer = ref(null);
const route = useRoute();  // Utilisation de useRoute pour accéder à la route actuelle

// Fonction pour récupérer les prévisions météo
const getWeatherForecast = async () => {
  try {
    const response = await axios.get(`http://localhost:5023/weather/weather`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'appel API :', error);
    throw error;
  }
};


// Fonction pour créer et configurer le globe
const createGlobe = async (comparisontype) => {
  const globe = Globe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')(globeContainer.value);

  const controls = globe.controls();
  controls.enableZoom = false;
  console.log(comparisontype)
  if (comparisontype === "skin") {
    // Récupération des données météorologiques et affichage sur le globe
    const weatherData = await getWeatherForecast();

    if (Array.isArray(weatherData)) {
      const featureCollection = {
        "type": "FeatureCollection",
        "features": weatherData.map((w, index) => ({
          "type": "Feature",
          "properties": {
            "id": `marine-data-point-${index + 1}`,
            "name": `${w.current_weather.temperature}°C`,
          },
          "geometry": {
            "type": "Point",
            "coordinates": [w.longitude, w.latitude],
          },
        })),
      };

      globe.labelsData(featureCollection.features)
        .labelLat(d => d.geometry.coordinates[1])
        .labelLng(d => d.geometry.coordinates[0])
        .labelText(d => d.properties.name)
        .labelSize(() => 3)
        .labelDotRadius(() => 2.5)
        .labelColor((d) => {
          const value = parseFloat(d.properties.name);
          const normalizedValue = Math.min(Math.max((value - 0) / (30 - 0), 0), 1);
          const r = Math.floor(normalizedValue * 255);
          const g = 0;
          const b = Math.floor((1 - normalizedValue) * 255);
          return `rgba(${r}, ${g}, ${b}, 0.75)`;
        })
        .labelResolution(2);
    } 
  }
    
    else if(comparisontype === "pulmon") {

  const MAP_CENTER = { lat: 37.6, lng: -16.6, altitude: 0.4 };
  const OPACITY = 0.3;

  // Créer le globe avec three-globe
  const myGlobe = new Globe(document.getElementById('globeViz'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .arcDashLength(0.4)
    .arcDashGap(0.2)
    .arcDashAnimateTime(1500)
    .pointColor(() => 'orange')
    .pointAltitude(0)
    .pointRadius(0.04)
    .pointsMerge(true);

  // Fonction pour récupérer les données des câbles sous-marins
  const getCableData = () => {
    return fetch('https://thingproxy.freeboard.io/fetch/https://www.submarinecablemap.com/api/v3/cable/cable-geo.json')
      .then(response => response.json())
      .then(data => data.data);
  };

  // Transformer les données des câbles pour les adapter au format du globe
  const parseCableData = (cables) => {
    const cablePaths = [];
    cables.forEach(cable => {
      if (cable.geometry && cable.geometry.coordinates) {
        cable.geometry.coordinates.forEach(coords => {
          cablePaths.push({
            coords,
            properties: { name: cable.name, color: '#00FF00' } // Associe une couleur et un nom à chaque câble
          });
        });
      }
    });
    return cablePaths;
  };

  // Récupérer les données des câbles et ajouter des arcs et des points
  getCableData().then(cables => {
    const cablePaths = parseCableData(cables);

    // Ajouter les arcs et les points au globe
    myGlobe
      .pathsData(cablePaths)
      .pathPoints('coords')
      .pathPointLat(p => p[1])  // Latitude
      .pathPointLng(p => p[0])  // Longitude
      .pathColor(path => path.properties.color) // Couleur du câble
      .pathLabel(path => path.properties.name)  // Nom du câble
      .pathDashLength(0.1)  // Longueur des segments de dash
      .pathDashGap(0.008)   // Espace entre les segments
      .pathDashAnimateTime(12000); // Temps d'animation des câbles

    // Optionnellement, ajouter des points représentant les extrémités des câbles
    myGlobe
      .pointsData(cablePaths.map(path => ({ lat: path.coords[0][1], lng: path.coords[0][0] })))
      .pointColor(() => 'red')  // Couleur des points
      .pointRadius(0.1)  // Taille des points
      .pointAltitude(0.2); // Altitude des points
  });

  // Mise en place de la vue initiale du globe
  myGlobe.pointOfView(MAP_CENTER, 4000);


    }
  }
;

// Initialisation du globe au montage
onMounted(() => {
  const comparisontype = route.name;
  createGlobe(comparisontype);
});

// Observer les changements de la route et réagir en conséquence
watch(() => route.name, (newRouteName) => {
  createGlobe(newRouteName);
});
</script>

<style scoped>
.globe-container {
  width: 100%;
  overflow: hidden;
}
</style>
