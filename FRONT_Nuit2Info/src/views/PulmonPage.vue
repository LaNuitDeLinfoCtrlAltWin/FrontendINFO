
<template>
  <div class="container">
    <div class="card">
      <h3>LES POUMONS 🌊</h3>
      <ul>
        <li><span>Un rôle vital dans la régulation du CO₂: </span>
          Les océans agissent comme un immense puits de carbone,
          absorbant environ 25 % du dioxyde de carbone (CO₂)
          produit par les activités humaines. Ce processus aide
          à réduire la concentration de ce gaz à effet de serre
          dans l'atmosphère, jouant un rôle crucial dans la lutte
          contre le réchauffement climatique.</li>
        <li><span>La magie de la photosynthèse marine : </span>
          Une grande partie de cette absorption est réalisée
          grâce aux phytoplanctons, ces minuscules organismes
          marins invisibles à l'œil nu. Comme les plantes
          terrestres, ils utilisent la lumière du soleil
          pour convertir le CO₂ en oxygène à travers la
          photosynthèse.</li>
        <li><span>Un apport essentiel en oxygène : </span>
          Les phytoplanctons produisent environ 50 %
          de l'oxygène que nous respirons, faisant
          des océans un acteur aussi important que
          les forêts pour maintenir l'équilibre
          atmosphérique.</li>
        <li><span>Un cycle fragile :</span>
          Si les océans jouent ce rôle de "poumons invisibles",
          ils sont néanmoins vulnérables. Le réchauffement
          des eaux, l'acidification et la pollution
          menacent ces précieux écosystèmes, mettant
          en péril leur capacité à absorber le CO₂ et
          à produire de l'oxygène.</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.globe-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
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
  height: 600px;
  background: transparent;
  left: 50px;
}

li span {
  font-weight: bold;
  font-size: 20px;
}
</style>
