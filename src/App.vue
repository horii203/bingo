<script setup>
import BingoBoard from "./components/BingoBoard.vue";

const words = [
  "word1",
  "word2",
  "word3",
  "word4",
  "word5",
  "word6",
  "word7",
  "word8",
  "word9",
  "word10",
  "word11",
  "word12",
  "word13",
  "word14",
  "word15",
  "word16",
  "word17",
  "word18",
  "word19",
  "word20",
  "word21",
  "word22",
  "word23",
  "word24",
  "word25",
];
</script>

<template>
  <main>
    <h1 class="text-3xl mb-6 font-bold">自己紹介ビンゴ</h1>
    <BingoBoard :words="words" />
  </main>
</template>
