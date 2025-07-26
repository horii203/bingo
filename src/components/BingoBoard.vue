<script setup>
import { ref, watch, computed } from "vue";
import { words } from "../data/words.js";
import { getRandomSample, checkLines } from "../utils/bingo.js";

const size = 5;
const total = size * size;
const centerIndex = Math.floor(total / 2);

// words 配列からランダムに 24 個の単語を選ぶ（重複なし）
const selectedWords = getRandomSample(words, 24);
// ビンゴボードのラベルを作成
const labels = Array(total).fill("");

// 選ばれた単語をラベルに設定
selectedWords.forEach((word, i) => {
  const pos = i < centerIndex ? i : i + 1;
  labels[pos] = word;
});
labels[centerIndex] = "FREE";

// 選択状態を管理するための配列（中央は最初から選択済み）
const selected = ref(
  Array.from({ length: total }, (_, i) => i === centerIndex)
);

// セルをクリックしたときの処理
const toggleCell = (index) => {
  if (index !== centerIndex) {
    selected.value[index] = !selected.value[index];
  }
};

// 現在のビンゴライン数とリーチ数
const bingoLines = ref(0);
const reachLines = ref(0);

// ビンゴの状態を監視
watch(
  selected,
  () => {
    const result = checkLines(selected, size, centerIndex);
    bingoLines.value = result.bingoLines;
    reachLines.value = result.reachLines;
  },
  { deep: true } // 配列の中身まで監視するオプション
);
// ネコの画像とメッセージを動的に変更するための計算プロパティ
const catImage = computed(() => {
  if (bingoLines.value > 0) return "/img/img03.png";
  if (reachLines.value > 0) return "/img/img02.png";
  return "/img/img01.png";
});

const catMessage = computed(() => {
  if (bingoLines.value > 0) {
    return "🎉 ビンゴ！";
  } else if (reachLines.value > 0) {
    return reachLines.value === 1
      ? "リーチ！"
      : reachLines.value === 2
      ? "ダブルリーチ！"
      : reachLines.value === 3
      ? "トリプルリーチ！"
      : `${reachLines.value}ラインリーチ！`;
  } else {
    return "がんばってニャ〜";
  }
});
</script>

<template>
  <div class="grid grid-cols-5 gap-2">
    <div
      v-for="(label, index) in labels"
      :key="index"
      :class="[
        'aspect-square flex items-center justify-center rounded-lg cursor-pointer text-sm md:text-base transition',
        selected[index]
          ? 'bg-green-400 text-white'
          : 'bg-white hover:bg-gray-100 shadow-md',
      ]"
      @click="toggleCell(index)"
    >
      {{ label || index + 1 }}
    </div>
  </div>

  <div class="mt-4">
    <div class="flex items-center">
      <!-- ネコ画像 -->
      <img :src="catImage" alt="ネコ" class="w-32 h-32 object-contain" />

      <!-- 吹き出し -->
      <div
        class="relative bg-gray-100 text-gray-800 p-4 rounded-lg max-w-xs shadow-md"
      >
        <span class="font-bold text-xl">{{ catMessage }}</span>
        <!-- 吹き出しの三角形 -->
        <div
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-100"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* クリックしたとき、テキストが選択されてしまうのを防ぐ */
.grid {
  user-select: none;
}
</style>
