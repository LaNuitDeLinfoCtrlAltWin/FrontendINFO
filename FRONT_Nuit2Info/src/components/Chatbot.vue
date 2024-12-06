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
      :class="{ 'chatbot-card-pirate': isPirateMode, 'chatbot-card': !isPirateMode }"
    >
      <q-card-section class="card-header">
        <div>Chatbot</div>
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
        <!-- Loader -->
        <div v-if="isLoading" class="loader"></div>

        <!-- Bouton de démarrage -->
        <q-btn
          v-if="!questions.length && !isLoading"
          label="Démarrer"
          @click="generateQuestions"
        ></q-btn>

        <!-- Affichage des questions -->
        <div v-if="questions.length && !selectedQuestion">
          <q-btn
            no-caps
            v-for="(question, index) in questions"
            :key="index"
            :label="question"
            class="question-button"
            @click="handleQuestionClick(question)"
          ></q-btn>
        </div>

        <!-- Affichage de la réponse -->
        <div v-if="response">
          <p class="response">{{ response }}</p>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";

// Props pour les modes et le contexte
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
  isPirateMode: {
    type: Boolean,
    required: true,
  },
  context: {
    type: Object,
    required: true,
  },
});

// Réactivité
const showCard = ref(false);
const isLoading = ref(false);
const questions = ref<string[]>([]);
const selectedQuestion = ref<string | null>(null);
const response = ref<string | null>(null);

// Fonction pour afficher ou cacher la carte
const toggleCard = () => {
  showCard.value = !showCard.value;
};

// Fonction pour fermer la carte
const closeCard = () => {
  showCard.value = false;
};

const generateQuestions = async () => {
  isLoading.value = true;
  try {

    const obj = {
      heart: "Système circulatoire : Courants Marins et Pompe thermohaline.",
      lungs: "Échanges gazeux : Photosynthèse et dissolution du CO2.",
      skin: "Régulation de température : Salinité et Thermorégulation.",
      stomac: "Filtration : Purification et Recyclage dans l'océan.",
      neurons: "Réseau de communication : Signalisation par les courants.",
      muscles: "Force motrice : Vagues et Marées.",
      blood: "Écosystèmes marins : Transport de nutriments.",
      immunity: "Barrières naturelles : Coraux et Zones protégées."
    };

    const result = await axios.post(
      `http://localhost:5023/api/chatbot/generate-questions`,
      obj[$route.name],
      {
        headers: {
          'Content-Type': 'application/json',  // Déclarez que vous envoyez du JSON
        }
      }
    );
    console.log("Réponse API : ", result.data); // Debug
    const rawQuestions = result.data;
    questions.value = rawQuestions.split("\n").map((q) => q.trim());
  } catch (error) {
    console.error("Erreur lors de la génération des questions :", error);
  } finally {
    isLoading.value = false;
  }
};


// Gestion de la sélection de question
const handleQuestionClick = async (question: string) => {
  selectedQuestion.value = question; // Marque la question sélectionnée
  try {
    const mode = props.isPirateMode ? "true" : "false";
    const result = await axios.post(
      `http://localhost:5023/api/chatbot/answer-questions?pirateMode=${mode}`,
      question,
      {
        headers: {
          'Content-Type': 'application/json',  // Déclarez que vous envoyez du JSON
        }
      }
    );

    response.value = result.data; // Contient la réponse formatée
  } catch (error) {
    console.error("Erreur lors de l'obtention de la réponse :", error);
  }
};
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
  width: 380px;
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
