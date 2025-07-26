<script setup>
import BingoBoard from "./components/BingoBoard.vue";
</script>

<template>
  <main
    class="p-4 flex items-center justify-center min-w-[320px] min-h-screen text-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400"
  >
    <div class="max-w-sm w-full">
      <h1 class="text-3xl sm:text-4xl mb-4 sm:mb-6 text-white">
        自己紹介BINGO
      </h1>
      <BingoBoard :words="words" />
    </div>
  </main>
</template>
