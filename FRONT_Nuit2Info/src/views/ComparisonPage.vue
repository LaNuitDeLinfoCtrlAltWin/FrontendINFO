<template>
  <div class="container">
    <QrCode/>
    <div class="card" style="padding-bottom:400px">
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
import QrCode from '@/components/QrCode.vue';

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
    title: "Les Poumons",
    points: [
      {
        title: "Un rôle vital dans la régulation du CO₂ ",
        description:
          "Les océans agissent comme un immense puits de carbone, absorbant environ 25 % du dioxyde de carbone (CO₂) produit par les activités humaines. Ce processus aide à réduire la concentration de ce gaz à effet de serre dans l'atmosphère, jouant un rôle crucial dans la lutte contre le réchauffement climatique.",
      },
      {
        title: "La magie de la photosynthèse marine ",
        description:
          "Une grande partie de cette absorption est réalisée grâce aux phytoplanctons, ces minuscules organismes marins invisibles à l'œil nu. Comme les plantes terrestres, ils utilisent la lumière du soleil pour convertir le CO₂ en oxygène à travers la photosynthèse.",
      },
      {
        title: "Un apport essentiel en oxygène ",
        description:
          "Les phytoplanctons produisent environ 50 % de l'oxygène que nous respirons, faisant des océans un acteur aussi important que les forêts pour maintenir l'équilibre atmosphérique.",
      },
      {
        title: "Un cycle fragile ",
        description:
          "Si les océans jouent ce rôle de \"poumons invisibles\", ils sont néanmoins vulnérables. Le réchauffement des eaux, l'acidification et la pollution menacent ces précieux écosystèmes, mettant en péril leur capacité à absorber le CO₂ et à produire de l'oxygène.",
      },
    ],
  },
  heart: {
    title: "Le Coeur",
    points: [
      {
        title: "Un système circulatoire global ",
        description:
          "Les courants marins, combinés à la pompe thermohaline, forment un vaste réseau de transport à l'échelle planétaire. Ils déplacent des masses d'eau chaudes et froides, créant un équilibre thermique vital pour le climat terrestre.",
      },
      {
        title: "La pompe thermohaline ",
        description:
          "Ce mécanisme, souvent appelé le \"tapis roulant océanique\", est guidé par des différences de température et de salinité dans les eaux océaniques. L'eau froide et dense plonge dans les profondeurs, tandis que l'eau chaude remonte en surface, assurant un cycle continu.",
      },
      {
        title: "Transport de chaleur ",
        description:
          "Ces courants redistribuent la chaleur solaire captée par les océans, tempérant les climats dans le monde entier. Par exemple, le Gulf Stream maintient des températures douces en Europe, tandis que d'autres courants refroidissent les régions tropicales.",
      },
      {
        title: "Diffusion des nutriments ",
        description:
          "En plus de la chaleur, les courants transportent des nutriments essentiels qui soutiennent la vie marine. Ils alimentent les écosystèmes, des coraux tropicaux aux zones de pêche en haute mer, assurant la biodiversité océanique."
      },
      {
        title: "Un équilibre énergétique ",
        description:
          "Ces échanges thermiques et énergétiques stabilisent non seulement le climat, mais influencent aussi les phénomènes météorologiques comme les ouragans et les moussons.",
      }
    ],
  },
  skin: {
    title: "La Peau",
    points: [
      {
        title: "Une barrière dynamique ",
        description: "La surface de l’océan agit comme une membrane vivante, régulant les interactions entre l’eau et l’atmosphère. Elle joue un rôle central dans les échanges de chaleur, de gaz et d’humidité."
      },
      {
        title: "Équilibre thermique ",
        description: "Cette \"peau\" absorbe l’énergie solaire pendant la journée et la restitue sous forme de chaleur, influençant les températures locales et globales. Elle aide ainsi à maintenir un climat stable sur Terre.",
      },
      {
        title: "Échanges gazeux essentiels ",
        description: "La surface océanique est le point d’échange principal pour des gaz vitaux comme l’oxygène et le dioxyde de carbone (CO₂). En absorbant le CO₂ et en libérant de l’oxygène, elle agit comme un modérateur des gaz à effet de serre.",
      },
      {
        title: "Gestion de l'humidité ",
        description: "L’évaporation à la surface de l’océan injecte d’énormes quantités d’eau dans l’atmosphère, alimentant les nuages et les précipitations. Ce processus est crucial pour le cycle de l’eau et la régulation des climats régionaux.",
      },
      {
        title: "Un rôle fragile ",
        description: "Bien que cette surface soit robuste, elle est sensible aux perturbations telles que la pollution, le réchauffement climatique et l’acidification. Ces menaces peuvent altérer sa capacité à réguler ces échanges vitaux.",
      },
    ],
  },
  stomac: {
    title: "Le Système Digestif",
    points: [
      {
        title: "Des voies de transport naturelles ",
        description: "Les courants océaniques agissent comme des autoroutes sous-marines, transportant et redistribuant les nutriments essentiels à la vie marine à travers le globe.",
      },
      {
        title: "Origine des nutriments ",
        description: "Ces nutriments proviennent de la décomposition de matière organique (restes d’organismes morts) et des upwellings, des remontées d’eaux profondes riches en éléments nutritifs, comme les nitrates et phosphates.",
      },
      {
        title: "Soutien aux écosystèmes ",
        description: "En distribuant ces nutriments, les courants favorisent la croissance du phytoplancton, base de la chaîne alimentaire marine. Cela alimente indirectement poissons, mammifères marins et oiseaux marins.",
      },
      {
        title: "Zones de haute productivité ",
        description: "Les régions où les upwellings sont fréquents, comme le long des côtes du Pérou ou de la Namibie, deviennent des zones de pêche prolifiques, soutenant des millions de personnes dans le monde.",
      },
      {
        title: "Un équilibre fragile ",
        description: "Tout déséquilibre dans les courants océaniques, causé par le réchauffement climatique ou la pollution, peut réduire ces apports en nutriments, mettant en péril la biodiversité marine et les ressources alimentaires humaines.",
      }
    ],
  },
  neurons:{
    title: "Les Neurones",
    points : [
      {
        title: "Des signaux gravitationnels ",
        description: "Comme les impulsions électriques dans un système de neurones, les vagues et les marées sont générées par des forces externes, notamment la gravité de la Lune et du Soleil, envoyant des \"signaux\" constants à travers les océans.",
      },
      {
        title: "Une coordination parfaite ",
        description: "Ces oscillations marines fonctionnent comme des messages neuronaux, coordonnant les cycles océaniques tels que les courants et les échanges entre les eaux profondes et la surface. Cela garantit un équilibre dynamique dans l’ensemble du réseau océanique.",
      },
      {
        title: "Une influence sur les comportements ",
        description: "À l’instar des signaux nerveux qui régulent nos mouvements et nos réactions, les cycles des marées influencent les migrations animales et les comportements reproductifs de nombreuses espèces marines. Par exemple, les tortues marines synchronisent leur ponte avec des marées spécifiques, comme des neurones répondant à un stimulus.",
      },
      {
        title: "Une régulation des écosystèmes ",
        description: "Comme les neurones transmettent des signaux pour maintenir l’homéostasie du corps, les marées et les vagues régulent les écosystèmes marins en transportant des nutriments et en façonnant les habitats côtiers, assurant ainsi la vitalité des zones de nourriceries et des récifs coralliens.",
      },
      {
        title: "Un réseau fragile ",
        description: "À l’image d’un système nerveux perturbé par des blessures ou des maladies, un déséquilibre dans les cycles des marées (causé par le changement climatique ou l’activité humaine) peut perturber les \"connexions\" marines, menaçant la survie des espèces et la santé des écosystèmes.",
      },
    ],
  },
  muscles: {
    title: "Les Muscles",
    points: [
      {
        title: "Des forces motrices ",
        description: "À l’image des muscles humains qui convertissent l’énergie chimique en mouvement, les vagues et les courants marins mobilisent l’énergie du vent et des forces gravitationnelles pour faire bouger d’immenses masses d’eau.",
      },
      {
        title: "La mécanique océanique ",
        description: "Les courants marins, comme des contractions musculaires, se propagent à travers les océans, transportant chaleur, nutriments, et vie. Les vagues, quant à elles, agissent comme des impulsions dynamiques, régulant les transferts d’énergie entre l’atmosphère et l’eau.",
      },
      {
        title: "Un rôle de soutien ",
        description: "Comme les muscles soutiennent les organes humains en mouvement, les courants marins soutiennent la dynamique océanique. Ils facilitent la régulation thermique, maintiennent les écosystèmes marins et assurent la connexion entre les différentes zones océaniques.",
      },
      {
        title: "Un mouvement vital ",
        description: "Tout comme les muscles sont essentiels à la circulation et à l’agilité du corps humain, les vagues et les courants permettent une circulation constante des éléments vitaux dans l’océan, des eaux profondes aux eaux superficielles.",
      },
      {
        title: "Fragilité et adaptation ",
        description: "Lorsque les muscles humains sont soumis à des stress ou des blessures, ils perdent leur efficacité. De la même manière, les courants et les vagues sont sensibles aux perturbations climatiques et aux modifications anthropiques, ce qui peut ralentir ou dévier leur rôle fondamental.",
      }
    ],
  },
  blood: {
    title: "Le Sang",
    points: [
      {
        title: "Des artères aquatiques",
        description: "À l’image des vaisseaux sanguins qui transportent le sang à travers le corps humain, les courants marins acheminent des nutriments, de l’oxygène dissous, et des gaz essentiels à travers les masses d’eau, soutenant ainsi la vie marine.",
      },
      {
        title: "Une circulation vitale",
        description: "Les courants fonctionnent comme un réseau sanguin, reliant les zones profondes et superficielles des océans, tout comme les veines et artères relient les organes vitaux du corps humain. Cette circulation garantit l’équilibre des écosystèmes océaniques.",
      },
      {
        title: "Alimentation des cellules océaniques",
        description: "Tout comme le sang fournit de l’oxygène et des nutriments aux cellules du corps, les courants marins nourrissent les organismes marins, des coraux aux plus grands mammifères, en transportant des nutriments essentiels depuis les zones riches en matière organique.",
      },
      {
        title: "Distribution des gaz ",
        description: "À l’instar du système circulatoire humain, qui distribue l’oxygène et élimine le dioxyde de carbone, les courants marins régulent les échanges de gaz dissous, maintenant l’équilibre chimique nécessaire à la vie sous-marine.",
      },
      {
        title: "Un équilibre fragile",
        description: "Tout comme des blocages ou des maladies dans le système sanguin peuvent mettre la vie en danger, les perturbations des courants marins, dues au réchauffement climatique ou à la pollution, peuvent déséquilibrer les écosystèmes marins et réduire leur capacité à soutenir la vie.\n",
      },
    ],
  },
  immunity: {
    title: "Le Système Immunitaire",
    points: [
      {
        title: "Une défense naturelle",
        description: "Tout comme le système immunitaire humain protège le corps contre les infections et les agressions extérieures, les écosystèmes marins possèdent des mécanismes d’autorégulation et de régénération qui leur permettent de résister aux perturbations.",
      },
      {
        title: "Les coraux, les gardiens de la santé marine",
        description: "À l’image des globules blancs combattant les infections dans le corps humain, les récifs coralliens développent des réponses biologiques pour se défendre contre les infections bactériennes ou les agressions environnementales. Ces processus leur permettent de préserver leur intégrité et celle des écosystèmes qu’ils soutiennent.",
      },
      {
        title: "Un équilibre autorégulé",
        description: "Comme le système immunitaire s’ajuste pour répondre aux variations du corps, les océans s’adaptent aux changements environnementaux, réparant les dommages causés par les tempêtes, la pollution ou d’autres perturbations.",
      },
      {
        title: "Régénération et résilience",
        description: "Les mangroves, herbiers marins et récifs coralliens agissent comme des \"organes vitaux\" des océans, contribuant à leur régénération après des crises, tout comme les tissus humains se régénèrent après une blessure.",
      },
      {
        title: "Fragilité face à la surcharge",
        description: "Tout comme un système immunitaire affaibli ne peut pas répondre efficacement à des agressions répétées, les écosystèmes marins, soumis à des pressions excessives comme la surpêche, la pollution ou le réchauffement climatique, risquent de perdre leur capacité à se défendre.",
      },
    ],
  }
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
  width: 550px;
  height: auto;
  left: 50px;
}

li span {
  font-weight: bold;
  font-size: 20px;
}
</style>
