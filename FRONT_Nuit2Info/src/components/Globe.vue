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
    
    else if(comparisontype === "heart" || comparisontype === "neurons" || comparisontype === "heart") {
      fetch('https://thingproxy.freeboard.io/fetch/https://www.submarinecablemap.com/api/v3/cable/cable-geo.json')
      .then(r => r.json())
      .then(cablesGeo => {
        let cablePaths = [];
        cablesGeo.features.forEach(({ geometry, properties }) => {
          geometry.coordinates.forEach(coords => cablePaths.push({ coords, properties }));
        });

        globe
          .pathsData(cablePaths)
          .pathPoints('coords')
          .pathPointLat(p => p[1])
          .pathPointLng(p => p[0])
          .pathColor(path => path.properties.color)
          .pathLabel(path => path.properties.name)
          .pathDashLength(0.1)
          .pathDashGap(0.008)
          .pathDashAnimateTime(12000);
});
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
