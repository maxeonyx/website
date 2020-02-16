<template>
  <div class="sash-wrapper">
    <div class="sash"></div>
  </div>
</template>

<style lang="scss" scoped>
.sash-wrapper {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  z-index: -100;
}
.sash {
  $width: 200px;

  // provably longer than the viewport diagonal
  $length: 300%;

  transform: translateX(-50%) translateY(-50%) // center origin on top left
    translateX(50vw) translateY(50vw) // translate to center of viewport
    rotate(-45deg); // rotate around center
  position: absolute;

  width: $width;
  height: $length;
  background-color: hsl(25, 90, 40);
  background-image: url(/images/orange.png);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 5px 10px;
}
</style>
