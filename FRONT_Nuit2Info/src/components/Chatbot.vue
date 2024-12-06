<template>
  <div class="chatbot-container" :class="{ 'chatbot-pirate-font': isPirateMode }">
    <!-- Si mode pirate, affiche l'image du pirate -->
    <img
      v-if="isPirateMode"
      src="../assets/img/pirate.png"
      alt="Pirate Mode"
      class="chatbot-pirate"
      @click="toggleCard"
    />
    <!-- Sinon, affiche la boule bleue avec une icône de robot -->
    <div v-else class="chatbot-bubble" @click="toggleCard">
      <i class="material-icons">smart_toy</i>
    </div>

    <!-- La carte du chatbot -->
    <q-card
      v-if="showCard"
      :class="{'chatbot-card-pirate': isPirateMode, 'chatbot-card': !isPirateMode}"
    >
      <q-card-section class="card-header">
        <div>Le Chatbot</div>
        <q-btn
          dense
          flat
          round
          icon="close"
          @click="closeCard"
          class="close-button"
        />
      </q-card-section>
      <q-card-section>
        <p v-if="isPirateMode">Arrr ! Le Chatbot Pirate est prêt à naviguer.</p>
        <p v-else>Le Chatbot est prêt à fonctionner.</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';

// Props pour les modes
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
  isPirateMode: {
    type: Boolean,
    required: true,
  },
});

// Réactivité pour afficher ou cacher la carte
const showCard = ref(false);

// Fonction pour afficher ou cacher la carte en cliquant sur la bulle ou l'image
const toggleCard = () => {
  showCard.value = !showCard.value;
};

// Fonction pour fermer la carte en cliquant sur la croix
const closeCard = () => {
  showCard.value = false;
};

// Surveiller les changements de `isActive`
watch(
  () => props.isActive,
  (newValue) => {
    if (newValue) {
      setTimeout(() => {
        showCard.value = true;
      }, 2000);
    }
  }
);

onMounted(() => {
  if (props.isActive) {
    setTimeout(() => {
      showCard.value = true;
    }, 1000);
  }
});
</script>

<style scoped>
@font-face {
  font-family: 'PirateFont';
  src: url('@/assets/fonts/lucasarts-scumm-menu-solid.otf') format('opentype');
}

/* Appliquez la police seulement en mode pirate */
.chatbot-pirate-font {
  font-family: 'PirateFont', sans-serif;
}

.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

/* Boule bleue avec l'animation naturelle */
.chatbot-bubble {
  width: 60px;
  height: 60px;
  background-color: blue;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slide-in-natural 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.chatbot-bubble .material-icons {
  font-size: 24px;
  color: white;
}

/* Image du mode pirate avec l'animation naturelle */
.chatbot-pirate {
  width: 140px;
  height: 140px;
  cursor: pointer;
  animation: slide-in-natural 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards,
  float 3s infinite ease-in-out;
  }

@media (max-width: 600px) {
  .chatbot-pirate {
    width: 100px;
    height: 100px;
  }
}

/* Animation avec effet naturel */
@keyframes slide-in-natural {
  0% {
    bottom: -100px; /* Position initiale en bas */
    right: -100px; /* Position initiale à droite */
    transform: scale(0.5); /* Réduit légèrement la taille */
    opacity: 0; /* Transparence au début */
  }
  60% {
    bottom: 30px; /* Légèrement au-dessus de la position finale */
    right: 10px; /* Légèrement à gauche de la position finale */
    transform: scale(1.2); /* Léger agrandissement pour l'effet de rebond */
    opacity: 1; /* Devient complètement visible */
  }
  100% {
    bottom: 20px; /* Position finale */
    right: 20px; /* Position finale */
    transform: scale(1); /* Taille normale */
  }
}

/* Carte pour le mode normal */
.chatbot-card {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 250px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

/* Carte pour le mode pirate */
.chatbot-card-pirate {
  position: absolute;
  bottom: 200px; /* Affichage plus haut pour l'image pirate */
  right: 0;
  width: 250px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 600px) {
  /* Position de la carte pour le pirate en mode mobile */
  .chatbot-card-pirate {
    bottom: 130px;
  }
}

/* Header de la carte */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Bouton de fermeture */
.close-button {
  color: black;
}
</style>
