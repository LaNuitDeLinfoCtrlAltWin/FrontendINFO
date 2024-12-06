<template>
  <div class="container">
    <div class="card">
      <h3>LE COEUR </h3>
      <ul>
        <li><span>Un système circulatoire global : </span>Les courants marins,
          combinés à la pompe thermohaline, forment un vaste réseau de transport
          à l'échelle planétaire. Ils déplacent des masses d'eau chaudes et froides,
          créant un équilibre thermique vital pour le climat terrestre.</li>
        <li><span>La pompe thermohaline : </span>Ce mécanisme, souvent appelé
          le "tapis roulant océanique", est guidé par des différences de température
          et de salinité dans les eaux océaniques. L'eau froide et dense plonge dans
          les profondeurs, tandis que l'eau chaude remonte en surface, assurant un
          cycle continu.</li>
        <li><span>Transport de chaleur : </span>Ces courants redistribuent la chaleur
          solaire captée par les océans, tempérant les climats dans le monde entier.
          Par exemple, le Gulf Stream maintient des températures douces en Europe,
          tandis que d'autres courants refroidissent les régions tropicales.</li>
        <li><span>Diffusion des nutriments : </span>En plus de la chaleur, les courants
          transportent des nutriments essentiels qui soutiennent la vie marine.
          Ils alimentent les écosystèmes, des coraux tropicaux aux zones de pêche
          en haute mer, assurant la biodiversité océanique.</li>
        <li><span>Un équilibre énergétique : </span>Ces échanges thermiques
          et énergétiques stabilisent non seulement le climat, mais influencent
          aussi les phénomènes météorologiques comme les ouragans et les moussons.</li>
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
  top: -20px;
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

li{
  padding-top: 10px;
}

li span {
  font-weight: bold;
  font-size: 20px;
}
</style>
