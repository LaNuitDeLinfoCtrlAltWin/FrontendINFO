<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Barre d'en-tête -->
    <div style="z-index: 100">
      <q-toolbar class="q-my-md">
        <q-toolbar-title class="q-ml-md text-bold">Ctrl + Alt + Win</q-toolbar-title>

        <!-- Menu burger pour mobile -->
        <q-btn
          v-if="isMobile"
          flat
          dense
          round
          icon="menu"
          class="q-mr-sm"
          @click="toggleDrawer"
          aria-label="Menu"
        />

        <!-- Onglets pour desktop -->
        <q-tabs v-else align="left" no-caps class="text-left q-ml-md" shrink>
          <q-tab
            v-for="(tab, index) in tabs"
            :key="index"
            :name="tab.name"
            :label="tab.label"
            @click="goTo(tab.name)"
            class="rounded-tab"
          />
        </q-tabs>

        <!-- Toggle pour le mode pirate -->
        <q-toggle
          v-if="!isMobile"
          v-model="isPirateMode"
          label="Mode pirate"
          @update:model-value="togglePirateMode"
        />
      </q-toolbar>
    </div>

    <!-- Menu latéral pour mobile -->
    <q-drawer v-if="isMobile" v-model="drawerOpen" side="right" bordered>
      <q-list>
        <q-item clickable v-for="(tab, index) in tabs" :key="index" @click="goTo(tab.name)">
          <q-item-section>{{ tab.label }}</q-item-section>
        </q-item>
        <q-toggle
          v-model="isPirateMode"
          label="Mode pirate"
          @update:model-value="togglePirateMode"
        />
      </q-list>
    </q-drawer>

    <!-- Contenu principal avec transition -->
    <q-page-container>
      <transition name="fade" mode="out-in">
        <router-view @globe-click="startChatbot"/>
      </transition>
      <Globe v-if="!isMobile" style="position: absolute; top: 50px" :style="$route.name === 'home' ? 'z-index: -1' : ''" @click="startChatbot"/>
    </q-page-container>
    <QrCode/>
    <Chatbot v-if="chatbotActive" :is-active="chatbotActive" :is-pirate-mode="isPirateMode" />
  </q-layout>
</template>

<script lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter, onBeforeRouteUpdate } from 'vue-router';
import Globe from "@/components/Globe.vue";
import QrCode from '@/components/QrCode.vue';
import Chatbot from '@/components/Chatbot.vue';
import router from '@/router';

export default {
  name: 'MainLayout',
  components: { Chatbot, Globe, QrCode },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const drawerOpen = ref(false);
    const darkMode = ref(false);

    // État pour le mode pirate
    const isPirateMode = ref(false);
    const chatbotActive = ref(false); // Contrôle si le chatbot est actif

    const tabs = [
      { name: 'home', label: 'Accueil' },
      { name: 'resources', label: 'Ressources' },
      { name: 'infos', label: 'Infos' },
    ];

    onMounted(() => {
      $q.dark.set(true);

      // Récupère l'état du mode pirate depuis localStorage
      const savedPirateMode = localStorage.getItem('pirateMode');
      isPirateMode.value = savedPirateMode === 'true';
    });

    const isMobile = computed(() => $q.screen.lt.md);

    const toggleDrawer = () => {
      drawerOpen.value = !drawerOpen.value;
    };

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      $q.dark.set(darkMode.value);
      localStorage.setItem('darkMode', darkMode.value.toString());
    };

    const togglePirateMode = (value: boolean) => {
      isPirateMode.value = value;
      localStorage.setItem('pirateMode', value.toString());
    };

    const goTo = (routeName: string) => {
      router.push({ name: routeName });
      drawerOpen.value = false; // Ferme le drawer en mobile
    };

    const startChatbot = () => {
      chatbotActive.value = true;
      console.log('Chatbot started');
    };

    // Définir chatbotActive à false lors d'un changement de route
    onBeforeRouteUpdate(() => {
      chatbotActive.value = false;
    });

    return {
      tabs,
      drawerOpen,
      darkMode,
      isMobile,
      isPirateMode,
      chatbotActive,
      toggleDrawer,
      toggleDarkMode,
      togglePirateMode,
      goTo,
      startChatbot,
    };
  },
};
</script>


<style lang="scss">
/* Style pour les onglets arrondis */
.rounded-tab {
  border-radius: 12px;
  transition: background-color 0.3s ease, font-weight 0.3s ease;
}

/* Transition de fondu pour les pages */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
//.fade-enter-from, .fade-leave-to {
//  opacity: 0;
//}

/* Onglet actif */
.q-tab.q-tab--active {
  font-weight: bold;
}

/* Supprimer l'indicateur visuel de l'onglet actif */
.q-tab.q-tab--active .q-tab__indicator {
  display: none;
}

/* Textes alignés à gauche */
.text-left {
  text-align: left;
}
</style>
