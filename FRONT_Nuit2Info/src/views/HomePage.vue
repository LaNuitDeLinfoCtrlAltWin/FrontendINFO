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
      >
        <q-card-section>
          <div class="text-h6">{{ comparison.title }}</div>
          <p class="q-mt-sm">{{ comparison.description }}</p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      comparisons: [
        { title: "Le Coeur", description: "Système circulatoire : courants marins et pompe thermohaline." },
        { title: "Les Poumons", description: "Échanges gazeux : photosynthèse et dissolution du CO2." },
        { title: "La Peau", description: "Régulation de température : salinité et thermorégulation." },
        { title: "Le Foie", description: "Filtration : purification et recyclage dans l'océan." },
        { title: "Les Neurones", description: "Réseau de communication : signalisation par les courants." },
        { title: "Les Muscles", description: "Force motrice : vagues et marées." },
        { title: "Le Sang", description: "Écosystèmes marins : transport de nutriments." },
        { title: "Le Système Immunitaire", description: "Barrières naturelles : coraux et zones protégées." },
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
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

/* Add more spacing between cards */
.q-gutter-xl > * {
  margin-bottom: 24px; /* Adds extra margin between rows */
}

/* Left-align the text inside the card */
.text-h6 {
  text-align: left;
}

p {
  text-align: left;
}
</style>
