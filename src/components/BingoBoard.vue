<script setup>
import { ref } from "vue";

const props = defineProps({
  words: {
    type: Array,
    required: true,
  },
});

const size = 5;
const total = size * size;

const labels = Array.from({ length: total }, (_, i) =>
  i === Math.floor(total / 2) ? "FREE" : ""
);

// 「各マスが選択されているかどうか」を管理する配列
const selected = ref(
  Array.from({ length: total }, (_, i) => i === Math.floor(total / 2))
);

// マスをクリックしたときの処理(選択／解除)
const toggleCell = (index) => {
  // 中央マスは切り替え不可
  if (index === Math.floor(total / 2)) return;
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
