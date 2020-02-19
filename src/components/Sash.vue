<template>
  <div class="sash-wrapper">
    <div class="sash"></div>
  </div>
</template>

<style lang="scss">
.sash-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  z-index: -100;
}
.sash {
  $width: 200px;

  // 142% should be enough because at 45 degrees the diagonal will hit the bottom at sqrt(2)*page height.
  // however this is just for the centreline so we need a bit more because the sash has width.
  $length: calc(142% + 200px);

  // move the sash so the centerline is on the top left corner of the viewport
  top: -30px;
  left: -100px;
  // make the transform origin the top left corner
  transform-origin: 100px 30px;

  transform: rotate(-45deg); // rotates around top left corner of screen
  position: absolute;

  width: $width;
  height: $length;
  background-color: rgb(00, 48, 158);
  background-image: url(/images/noise-blue.png);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 5px 10px;
}
</style>
