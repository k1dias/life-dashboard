<template>
  <div class="aurora-container" />
</template>

<style scoped>
.aurora-container {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: #0f172a;
}

.aurora-container::before,
.aurora-container::after {
  content: "";
  position: absolute;
  width: 140%;
  height: 140%;
  top: -20%;
  left: -20%;
  background:
    radial-gradient(circle at 30% 40%, #7c3aed55, transparent 60%),
    radial-gradient(circle at 70% 60%, #06b6d455, transparent 60%),
    radial-gradient(circle at 50% 20%, #f472b655, transparent 60%);
  animation: auroraMove 20s ease-in-out infinite alternate;
  filter: blur(100px);
}

.aurora-container::after {
  animation-duration: 30s;
  animation-direction: alternate-reverse;
}

@keyframes auroraMove {
  0% {
    transform: translate(0%, 0%) scale(1);
  }
  50% {
    transform: translate(-10%, 10%) scale(1.1);
  }
  100% {
    transform: translate(10%, -10%) scale(1.05);
  }
}
</style>