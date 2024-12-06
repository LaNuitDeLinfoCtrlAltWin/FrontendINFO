<template>
  <q-page class="q-pa-md">
    <div class="q-mx-xl">
      <q-card-section>
        <div class="text-h5">Ressources Utiles</div>
      </q-card-section>
      <q-card-section>
        <div class="text-body1">
          <p>
            Retrouvez ci-dessous une sélection de ressources intéressantes pour en apprendre davantage sur les
            thématiques liées à la protection des océans, à l'écologie, et bien plus encore.
          </p>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <ul>
          <li>
            <q-btn
              flat
              dense
              color="primary"
              @click="redirectToRickRoll"
            >
              Comment réduire votre empreinte plastique ?
            </q-btn>
          </li>
          <li>
            <q-btn
              flat
              dense
              color="primary"
              @click="redirectToRickRoll"
            >
              Découvrir les énergies renouvelables maritimes
            </q-btn>
          </li>
          <li>
            <q-btn
              flat
              dense
              color="primary"
              @click="redirectToRickRoll"
            >
              L'impact des changements climatiques sur les océans
            </q-btn>
          </li>
          <li>
            <q-btn
              flat
              dense
              color="primary"
              @click="redirectToRickRoll"
            >
              Guide pour protéger la biodiversité marine
            </q-btn>
          </li>
          <li>
            <q-btn
              flat
              dense
              color="primary"
              @click="redirectToRickRoll"
            >
              Sensibilisation aux enjeux écologiques
            </q-btn>
          </li>
        </ul>
      </q-card-section>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "ResourcesPage",
  methods: {
    redirectToRickRoll() {
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
    },
  },
};
</script>

<style scoped>
.text-h5 {
  font-weight: bold;
  margin-bottom: 10px;
}
.text-body1 {
  margin-bottom: 15px;
}
</style>
