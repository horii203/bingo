<script setup>
import { ref, watch } from "vue";
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
</script>

<template>
  <div class="mb-4">
    <div v-if="bingoLines > 0" class="text-green-600 font-bold text-xl">
      🎉 ビンゴ！
    </div>
    <div v-else-if="reachLines > 0" class="text-orange-600 font-semibold">
      ✨
      {{
        reachLines === 1
          ? "リーチ！"
          : reachLines === 2
          ? "ダブルリーチ！"
          : reachLines === 3
          ? "トリプルリーチ！"
          : `${reachLines}ラインリーチ！`
      }}
    </div>
  </div>
  <div class="grid grid-cols-5 gap-2">
    <div
      v-for="(label, index) in labels"
      :key="index"
      :class="[
        'w-20 h-20 p-2 flex items-center justify-center rounded cursor-pointer transition',
        selected[index]
          ? 'bg-green-400 text-white'
          : 'bg-white hover:bg-gray-100 border',
      ]"
      @click="toggleCell(index)"
    >
      {{ label || index + 1 }}
    </div>
  </div>
</template>

<style scoped>
/* クリックしたとき、テキストが選択されてしまうのを防ぐ */
.grid {
  user-select: none;
}
</style>
