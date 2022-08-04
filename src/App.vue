<template>
  <div>
    <div class="topPage">
      <Top></Top>
    </div>
    
    <div class="primaryPage">
      <Primary></Primary>
    </div>
    <div class="footPage">
      <BottomDisplay></BottomDisplay>
    </div>
  </div>
</template>

<script>
import Top from './components/Top.vue'
import Primary from './components/Primary.vue'
import BottomDisplay from './components/BottomDisplay.vue'

export default {
  name: 'app',
  components: {
	  Top,
    Primary,
    BottomDisplay
  },
}
</script>

<style>
.primaryPage{
  position: relative;
  top: 70px;
  height: 800px;
}
a{
  text-decoration:none;
  color: #000;
}
.footPage{
  width: 100%;
  height: 80px;
  position: relative;
  background-color: rgb(140, 136, 136);
  top: 860px;
}
</style>
