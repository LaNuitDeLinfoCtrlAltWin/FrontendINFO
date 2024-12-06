<template>
  <q-page class="q-pa-md">
    <div class="text-center q-ma-lg">
      <div class="text-h4">Et si l’Océan était un corps humain ?</div>
      <div class="text-subtitle1 q-mt-md q-mx-lg">
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
      ],
    };
  },
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
