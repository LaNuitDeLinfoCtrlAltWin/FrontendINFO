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
      <Globe style="position: absolute; top: 50px" :style="$route.name === 'home' ? 'z-index: -1' : ''"/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import Globe from "@/components/Globe.vue";
import router from '@/router'

export default {
  name: 'MainLayout',
  methods: {
    router() {
      return router
    }
  },
  components: {Globe},
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const drawerOpen = ref(false);
    const darkMode = ref(false);

    const tabs = [
      { name: 'home', label: 'Accueil' },
      { name: 'heart', label: 'Le Coeur' },
      { name: 'pulmon', label: 'Les Poumons' },
      { name: 'skin', label: 'La Peau' },
      { name: 'liver', label: 'Le Foie' },
      { name: 'neurons', label: 'Les Neurones' },
      { name: 'muscles', label: 'Les Muscles' },
      { name: 'blood', label: 'Le Sang' },
      { name: 'immunity', label: 'Le Système Immunitaire' },
    ];

    onMounted(() => {
      // const savedMode = localStorage.getItem('darkMode');
      // darkMode.value = savedMode === 'true';
      $q.dark.set(true);
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
.rounded-tab {
  border-radius: 12px;
  transition: background-color 0.3s ease, font-weight 0.3s ease;
}

.q-tab.q-tab--active {
  font-weight: bold;
}

.q-tab.q-tab--active .q-tab__indicator {
  display: none;
}

.text-left {
  text-align: left;
}
</style>
