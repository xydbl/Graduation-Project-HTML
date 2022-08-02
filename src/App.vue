<template>
  <div>
    <div class="topPage">
      <Top></Top>
    </div>
    
    <div class="primaryPage">
      <Primary></Primary>
    </div>
    
  </div>
</template>

<script>
import Top from './components/Top.vue'
import Primary from './components/Primary.vue'

export default {
  name: 'app',
  components: {
	  Top,
    Primary
  },
}
</script>

<style>
.primaryPage{
  position: relative;
  top: 70px;
  height: 800px;
}
</style>
