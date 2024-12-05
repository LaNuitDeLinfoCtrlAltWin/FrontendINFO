<template>
  <div ref="globeContainer" class="globe-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Globe from 'globe.gl';

const globeContainer = ref(null);

onMounted(() => {
  // Initialisation du globe
  const globe = Globe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    (globeContainer.value);

});
</script>

<style scoped>
.globe-container {
  width: 100%;
  overflow: hidden;
}
</style>
