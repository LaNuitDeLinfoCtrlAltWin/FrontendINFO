<template>
  <q-page class="q-pa-md">
    <div class="text-center q-ma-lg">
      <div class="text-h4">Et si l’Océan était un corps humain ?</div>
      <div class="text-subtitle1 q-mt-md q-mx-lg">
        eazezae
        Découvrez comment les systèmes océaniques trouvent des parallèles fascinants avec les systèmes humains.
        Explorez ces comparaisons pour mieux comprendre pourquoi il est crucial de préserver les océans.
      </div>
    </div>

    <div class="row q-my-lg justify-center q-gutter-lg">
      <q-card
        v-for="(comparison, index) in comparisons"
        :key="index"
        class="comparison-card"
        outlined
        clickable
        @click="goTo(comparison.name)"
      >
        <q-card-section>
          <div class="text-h6">{{ comparison.title }}</div>
          <p class="q-mt-sm">{{ comparison.description }}</p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
// @ts-ignore
import Globe from 'globe.gl';
import * as d3 from 'd3-dsv'; 
import axios from 'axios';
import { useRouter } from "vue-router";

export default {
  name: "HomePage",
  setup() {
    const router = useRouter();

    const goTo = (routeName: string) => {
      router.push({ name: routeName });
    };

    return {
      goTo,
    };
  },
  data() {
    return {
      comparisons: [
        { name: "heart", title: "Le Coeur", description: "Système circulatoire : Courants Marins et Pompe thermohaline." },
        { name: "pulmon", title: "Les Poumons", description: "Échanges gazeux : Photosynthèse et dissolution du CO2." },
        { name: "skin", title: "La Peau", description: "Régulation de température : Salinité et Thermorégulation." },
        { name: "stomac", title: "Le Système Digestif", description: "Filtration : Purification et Recyclage dans l'océan." },
        { name: "neurons", title: "Les Neurones", description: "Réseau de communication : Signalisation par les courants." },
        { name: "muscles", title: "Les Muscles", description: "Force motrice : Vagues et Marées." },
        { name: "blood", title: "Le Sang", description: "Écosystèmes marins : Transport de nutriments." },
        { name: "immunity", title: "Le Système Immunitaire", description: "Barrières naturelles : Coraux et Zones protégées." },
      ]
    };
  },
  mounted() {
  console.log("Mounted called");
  this.createGlobe();
  this.loadCablePaths();
},
  methods: {
    // Méthode pour charger les données des câbles sous-marins
    async loadCablePaths() {
      console.log("é")
      try {
        const response = await fetch('./world_population.csv');
        const csv = await response.text();

        // Parse the CSV and update the state
      } catch (error) {
        console.error('Erreur lors de la récupération des câbles sous-marins :', error);
      }
    },

    // Méthode pour initialiser le globe et ajouter les câbles sous-marins
    async createGlobe() {
      console.log("Creating Globe...");
      debugger;

      const reponse = await this.getWeatherForecast();

    if (Array.isArray(reponse)) {
      const featureCollection = {
        "type": "FeatureCollection",
        "features": reponse.map((w, index) => ({
          "type": "Feature",
          "properties": {
            "id": `marine-data-point-${index + 1}`,  // Unique ID for each point
            "name": `${w.current_weather.temperature}°C`,  // Add temperature to name
          },
          "geometry": {
            "type": "Point",
            "coordinates": [w.longitude, w.latitude]  // Longitude and Latitude in coordinates
          }
        }))
      };

      // Assuming you want to store this featureCollection
      // @ts-ignore
      this.cablePaths = featureCollection;
    } else {
      console.error('Expected an array, but got:', reponse);
    }

    console.log('places')
    // @ts-ignore
    const globeInstance = Globe()(this.$refs.globeContainer)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png');
    // @ts-ignore
    globeInstance
    // @ts-ignore
    .labelsData(this.cablePaths.features)
    .labelLat((d: { geometry: { coordinates: [number, number] } }) => d.geometry.coordinates[1])
    .labelLng((d: { geometry: { coordinates: [number, number] } }) => d.geometry.coordinates[0])
    .labelText((d: { properties: { name: string } }) => d.properties.name)
    .labelSize(() => 1) // Taille fixe pour éviter les dépendances sur des données manquantes
    .labelDotRadius(() =>1.5) // Rayon fixe pour les dots
    .labelColor((d: { properties: { name: string } }) => {
    // Récupérer la valeur et la convertir en float
    const value = parseFloat(d.properties.name);
    
    // Calculer un ratio de la valeur entre -30 et 40
    const normalizedValue = Math.min(Math.max((value - (0)) / (30 - (0)), 0), 1);
    if(normalizedValue<0){
      return `rgba(${0}, ${0}, ${255}, 0.75)`;
    }
    // Calculer la couleur entre bleu et rouge
    const r = Math.floor(normalizedValue * 255);  // De 0 à 255 pour le rouge
    const g = 0; // Pas de vert dans le dégradé
    const b = Math.floor((1 - normalizedValue) * 255); // De 255 à 0 pour le bleu

    // Retourner la couleur calculée
    return `rgba(${r}, ${g}, ${b}, 0.75)`;
  })
  .labelResolution(2);

    //   const globe = Globe()(this.$refs.globeContainer)
    //     .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    //     .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    //     .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png');
        
    //   globe
    //   .heatmapsData([this.cablePaths])
    //   .heatmapPointLat('lat')
    //   .heatmapPointLng('lng')
    //   .heatmapPointWeight('weight')
    //   .heatmapTopAltitude(0.7)
    //   .heatmapsTransitionDuration(3000)
    //   .enablePointerInteraction(false);
      
    // },
 }, async getWeatherForecast() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKENDAPI}/weather/weather`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'appel API :', error);
    throw error;
  }
},
  }
};
</script>

<style scoped>
/* Uniform size for all cards */
.comparison-card {
  width: 300px;
  height: 200px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align text to the top */
  padding: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.comparison-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Add more spacing between cards */
.q-gutter-xl > * {
  margin-bottom: 24px; /* Adds extra margin between rows */
}

/* Left-align the text inside the card */
.text-h6 {
  font-weight: 700;
  font-size: 24px;
}

p {
  padding-top: 16px;
}
</style>
