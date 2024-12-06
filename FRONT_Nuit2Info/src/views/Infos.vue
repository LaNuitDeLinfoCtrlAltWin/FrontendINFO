<template>
  <q-page class="q-pa-md">
    <div class="q-ml-xl">
      <q-card-section>
        <div class="text-h5">À Propos</div>
      </q-card-section>
      <q-card-section>
        <div class="text-body1">
          <p>
            La Fondation Race for Water, fondée en 2010 par Marco Simeoni, est une organisation engagée dans la
            préservation des océans. Avec plus d'une décennie de recherches et d'actions, la fondation s'efforce
            de réduire l'impact de la pollution plastique et d'apporter des solutions concrètes aux communautés
            locales.
          </p>
          <p>
            En 2024, la fondation met en service le catamaran <strong>MODX 70</strong>, un navire « zéro émission de
            CO₂ », pour illustrer l'importance de la décarbonation des transports maritimes et la nécessité de
            protéger les océans face aux changements climatiques.
          </p>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-h5">Pourquoi protéger les océans ?</div>
      </q-card-section>
      <q-card-section>
        <div class="text-body1">
          <ul>
            <li>
              <strong>Production d’oxygène :</strong> Les océans produisent la majeure partie de l’oxygène sur Terre.
            </li>
            <li>
              <strong>Régulation climatique :</strong> Ils contribuent à stabiliser le climat et atténuer les effets
              des changements climatiques.
            </li>
            <li>
              <strong>Biodiversité :</strong> Ils abritent une faune et une flore encore largement inconnues.
            </li>
          </ul>
          <p>
            Les océans sont pourtant menacés par la pollution, la surpêche et le réchauffement climatique. Leur
            préservation est essentielle à l’équilibre de notre planète.
          </p>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-h5">Un parallèle fascinant : l’océan et le corps humain</div>
      </q-card-section>
      <q-card-section>
        <div class="text-body1">
          <p>
            L’océan peut être comparé à un immense corps vivant, où chaque composant joue un rôle essentiel.
            Explorer ces similitudes permet de mieux comprendre l’importance de protéger cet écosystème vital.
          </p>
          <p>
            <strong>Exemples :</strong>
          </p>
          <ul>
            <li>Les courants marins sont comparables au système circulatoire humain.</li>
            <li>La photosynthèse marine équivaut à l’échange gazeux des poumons.</li>
            <li>Le plancton et les coraux agissent comme des cellules et tissus vitaux.</li>
          </ul>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-h5">Ressources</div>
      </q-card-section>
      <q-card-section>
        <div class="text-body1">
          <p>
            Pour en savoir plus sur l'importance des océans et les actions menées pour leur préservation :
          </p>
          <ul>
            <li>
              <a href="https://ocean-climate.org/" target="_blank">Ocean & Climat</a>
            </li>
            <li>
              <a href="https://raceforwater.org" target="_blank">Race for Water</a>
            </li>
          </ul>
        </div>
      </q-card-section>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "AboutPage",
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
