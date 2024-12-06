<template>
  <div ref="globeContainer" class="globe-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 
import Globe from 'globe.gl';
import axios from 'axios';

const globeContainer = ref(null);

// Chargement des données météo depuis l'API
const getWeatherForecast = async () => {
  try {
    const response = await axios.get(`http://localhost:5023/Weather`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'appel API :', error);
    throw error;
  }
};  

// Initialisation du globe après le montage du composant
onMounted(async () => {
  const route = useRoute();
  const comparisontype=route.name

console.log(comparisontype)
if(comparisontype ==="skin"){

  const globe = Globe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')(globeContainer.value);

  const controls = globe.controls();
  controls.enableZoom = false;

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
      .labelSize(() => 1)
      .labelDotRadius(() => 1.5)
      .labelColor((d) => {
        const value = parseFloat(d.properties.name);
        const normalizedValue = Math.min(Math.max((value - 0) / (30 - 0), 0), 1);
        const r = Math.floor(normalizedValue * 255);
        const g = 0;
        const b = Math.floor((1 - normalizedValue) * 255);
        return `rgba(${r}, ${g}, ${b}, 0.75)`;
      })
      .labelResolution(2);
  } else {
    console.error('Données météo attendues sous forme de tableau, mais obtenu:', weatherData);
  }
}
else{
  const globe = Globe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')(globeContainer.value);

  const controls = globe.controls();
  controls.enableZoom = false;
}
});
</script>

<style scoped>
.globe-container {
  width: 100%;
  overflow: hidden;
}
</style>
