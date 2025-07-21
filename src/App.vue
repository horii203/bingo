<script setup>
import BingoBoard from "./components/BingoBoard.vue";
</script>

<template>
  <main>
    <h1 class="text-3xl mb-6 font-bold">自己紹介ビンゴ</h1>
    <BingoBoard :words="words" />
  </main>
</template>
