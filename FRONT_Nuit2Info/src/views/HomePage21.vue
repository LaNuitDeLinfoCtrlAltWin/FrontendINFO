<template>
  <div ref="globeContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script lang="ts">
import axios from 'axios';
import Globe from 'globe.gl';

export default {
  name: "HomePage",
  data() {
    return {
      cablePaths: []  // Array to hold the cable paths data
    };
  },
  mounted() {
    this.createGlobe();
    this.loadCablePaths();
  },
  methods: {
    // Méthode pour charger les données des câbles sous-marins
    async loadCablePaths() {
      try {
        const response = {
  "type": "FeatureCollection",
  "name": "submarine_cables",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "celia",
        "name": "alexis",
        "color": "#939597",
        "feature_id": "celia-0",
        "coordinates": [-70.82893294116717, 22.70710253193181]
      },
      "geometry": {
        "type": "MultiLineString",
        "coordinates": [
          [
            [-61.846850000000316, 17.159569000000147],
            [-62.09988177251728, 17.39502263470061],
            [-62.54988145373326, 18.251816319028308],
            [-64.06334834013603, 19.18267163489992],
            [-65.69987922164925, 19.316876111628602],
            [-67.49987794710927, 20.585819096040467]
          ]
        ]
      }
    }
  ]
}


        const cablesGeo = response;
        console.log("res",response)
        const cablePaths = [];
        cablesGeo.features.forEach(({ geometry, properties }) => {
          geometry.coordinates.forEach(coords => cablePaths.push({ coords, properties }));
        });

        this.cablePaths = cablePaths;
        this.updateGlobePaths();
      } catch (error) {
        console.error('Erreur lors de la récupération des câbles sous-marins :', error);
      }
    },
    async getWeather() {},
    // Méthode pour initialiser le globe et ajouter les câbles sous-marins
    async createGlobe() {
      console.log("eza", await this.getWeatherForecast(0,5))
      const globe = Globe()(this.$refs.globeContainer)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png');
        
      // Attendre que les données des câbles soient chargées avant de les afficher
      globe
        .pathsData(this.cablePaths)
        .pathPoints('coords')
        .pathPointLat(p => p[1]) // Latitude : p[1] dans les coordonnées (long, lat)
        .pathPointLng(p => p[0]) // Longitude : p[0]
        .pathColor(path => path.properties.color)  // Couleur du câble selon les propriétés
        .pathLabel(path => path.properties.name)   // Nom du câble à afficher
        .pathDashLength(0.1)  // Longueur des segments de dash
        .pathDashGap(0.008)   // Espace entre les segments
        .pathDashAnimateTime(12000);  // Temps d'animation des câbles
    },
    async getWeatherForecast(lat, lng) {
  try {
    const response = await axios.get(`https://marine-api.open-meteo.com/v1/marine?latitude=54.544587&longitude=10.227487&current=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,wind_wave_peak_period,swell_wave_height,swell_wave_direction,swell_wave_period,swell_wave_peak_period,ocean_current_velocity,ocean_current_direction`);
    console.log('respon',response)
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'appel API :', error);
    throw error;
  }
},
    // Mise à jour des chemins de câbles sur le globe
    updateGlobePaths() {
      // Re-crée les chemins lorsque les données sont chargées
      if (this.cablePaths.length) {
        this.createGlobe();
      }
    }
  }
};
</script>

<style scoped>
/* Style de base pour le container du globe */
#globeContainer {
  width: 100%;
  height: 100vh;
}
</style>
