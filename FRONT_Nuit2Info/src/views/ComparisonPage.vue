<template>
  <div class="container">
    <div class="card">
      <h3>{{ content.title }}</h3>
      <ul>
        <li v-for="(point, index) in content.points" :key="index">
          <span>{{ point.title }}: </span>{{ point.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

interface Point {
  title: string;
  description: string;
}

interface Section {
  title: string;
  points: Point[];
}

// Liste des contenus par section
const data : Record<string, Section>  = {
  pulmon: {
    title: "LES POUMONS 🌊",
    points: [
      {
        title: "Un rôle vital dans la régulation du CO₂",
        description:
          "Les océans agissent comme un immense puits de carbone, absorbant environ 25 % du dioxyde de carbone (CO₂) produit par les activités humaines. Ce processus aide à réduire la concentration de ce gaz à effet de serre dans l'atmosphère, jouant un rôle crucial dans la lutte contre le réchauffement climatique.",
      },
      {
        title: "La magie de la photosynthèse marine",
        description:
          "Une grande partie de cette absorption est réalisée grâce aux phytoplanctons, ces minuscules organismes marins invisibles à l'œil nu. Comme les plantes terrestres, ils utilisent la lumière du soleil pour convertir le CO₂ en oxygène à travers la photosynthèse.",
      },
      {
        title: "Un apport essentiel en oxygène",
        description:
          "Les phytoplanctons produisent environ 50 % de l'oxygène que nous respirons, faisant des océans un acteur aussi important que les forêts pour maintenir l'équilibre atmosphérique.",
      },
      {
        title: "Un cycle fragile",
        description:
          "Si les océans jouent ce rôle de \"poumons invisibles\", ils sont néanmoins vulnérables. Le réchauffement des eaux, l'acidification et la pollution menacent ces précieux écosystèmes, mettant en péril leur capacité à absorber le CO₂ et à produire de l'oxygène.",
      },
    ],
  },
  heart: {
    title: "LE COEUR ❤️",
    points: [
      {
        title: "Le moteur des courants marins",
        description:
          "Les courants marins fonctionnent comme un système circulatoire global, distribuant la chaleur et les nutriments à travers la planète.",
      },
      {
        title: "La pompe thermohaline",
        description:
          "Ce mécanisme vital, entraîné par la densité de l'eau et la température, alimente les grands courants océaniques.",
      },
    ],
  },
};

const content = ref<Section>({
  title: "",
  points: [],
});

const route = useRoute();

// Fonction pour mettre à jour le contenu en fonction de la route
const updateContent = () => {
  const section = route.name as string;
  content.value = data[section] || { title: "Section Inconnue", points: [] };
};

// Initialisation lors du montage
onMounted(() => {
  updateContent();
});

// Surveiller les changements de route
watch(
  () => route.name,
  () => {
    updateContent();
  }
);
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.card {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 10;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 450px;
  height: auto;
  left: 50px;
}

li span {
  font-weight: bold;
  font-size: 20px;
}
</style>
