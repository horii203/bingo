<script setup>
import { ref } from "vue";
import { words } from "../data/words.js";

const props = defineProps({
  words: {
    type: Array,
    required: true,
  },
});

const size = 5;
const total = size * size;
const centerIndex = Math.floor(total / 2);

// 配列をシャッフルする関数（Fisher-Yates）
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// シャッフルしたワード配列
const shuffledWords = shuffle(words);

// ラベル配列を作る
const labels = Array(total).fill("");
shuffledWords.forEach((word, i) => {
  if (i >= centerIndex) {
    // centerIndex以降は一つ後ろのインデックスにセット
    labels[i + 1] = word;
  } else {
    // centerIndexより前はそのままセット
    labels[i] = word;
  }
});

// 中央マスにFREEをセット
labels[centerIndex] = "FREE";

// 「各マスが選択されているかどうか」を管理する配列
const selected = ref(
  Array.from({ length: total }, (_, i) => i === centerIndex)
);

// マスをクリックしたときの処理(選択／解除)
const toggleCell = (index) => {
  // 中央マスは切り替え不可
  if (index === centerIndex) return;
  selected.value[index] = !selected.value[index];
};
</script>

<template>
  <div class="grid grid-cols-5 gap-2">
    <div
      v-for="(label, index) in labels"
      :key="index"
      :class="[
        'w-16 h-16 p-2 flex items-center justify-center rounded cursor-pointer transition',
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
