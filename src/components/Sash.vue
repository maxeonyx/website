<template>
  <div class="sash-wrapper">
    <div class="sash"></div>
  </div>
</template>

<style lang="scss">
.sash-wrapper {
  top: 0;
  left: 0;
  z-index: -100;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.sash {
  $origin-x: 150px;
  $origin-y: 100px;

  $width: 300px;
  $length: 6000px;

  top: -$origin-y;
  left: -$origin-x;

  transform-origin: $origin-x $origin-y;

  transform: rotate(-65deg);
  position: absolute;

  width: $width;
  height: $length;
  background-image: url(/images/orange.png);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 5px 10px;
}
</style>
