<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Barre d'en-tête -->
    <div>
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

        <q-btn
          flat
          dense
          round
          :icon="darkMode ? 'brightness_7' : 'brightness_4'"
          class="q-mr-sm"
          @click="toggleDarkMode"
          :aria-label="darkMode ? 'Mode clair' : 'Mode sombre'"
        />
      </q-toolbar>
    </div>

    <!-- Menu latéral pour mobile -->
    <q-drawer v-if="isMobile" v-model="drawerOpen" side="right" bordered>
      <q-list>
        <q-item clickable v-for="(tab, index) in tabs" :key="index" @click="goTo(tab.name)">
          <q-item-section>{{ tab.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Contenu principal -->
    <q-page-container>
      <router-view />
      <Globe/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import Globe from "@/components/Globe.vue";

export default {
  name: 'MainLayout',
  components: {Globe},
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const drawerOpen = ref(false);
    const darkMode = ref(false);

    const tabs = [
      { name: 'home', label: 'Accueil' },
      { name: 'heart', label: 'Le Coeur' },
      { name: 'lungs', label: 'Les Poumons' },
      { name: 'skin', label: 'La Peau' },
      { name: 'liver', label: 'Le Foie' },
      { name: 'neurons', label: 'Les Neurones' },
      { name: 'muscles', label: 'Les Muscles' },
      { name: 'blood', label: 'Le Sang' },
      { name: 'immunity', label: 'Le Système Immunitaire' },
    ];

    // Récupérer la préférence utilisateur pour le mode sombre/clair
    onMounted(() => {
      const savedMode = localStorage.getItem('darkMode');
      darkMode.value = savedMode === 'true'; // Convertir en booléen
      $q.dark.set(darkMode.value); // Appliquer le mode sombre/clair
    });

    const isMobile = computed(() => $q.screen.lt.md);

    const toggleDrawer = () => {
      drawerOpen.value = !drawerOpen.value;
    };

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      $q.dark.set(darkMode.value); // Appliquer le mode
      localStorage.setItem('darkMode', darkMode.value.toString()); // Enregistrer la préférence
    };

    const goTo = (routeName: string) => {
      router.push({ name: routeName });
      drawerOpen.value = false; // Ferme le drawer en mobile
    };

    return {
      tabs,
      drawerOpen,
      darkMode,
      isMobile,
      toggleDrawer,
      toggleDarkMode,
      goTo,
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

/* Onglet actif : texte en gras */
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
