<script setup>
import { ref } from "vue";

const props = defineProps({
  words: {
    type: Array,
    required: true,
  },
});

const size = 5;
// 「各マスが選択されているかどうか」を管理する配列
const selected = ref(Array(size * size).fill(false));

// マスをクリックしたときの処理(選択／解除)
const toggleCell = (index) => {
  selected.value[index] = !selected.value[index];
};
</script>

<template>
  <div class="grid grid-cols-5 gap-2">
    <div
      v-for="(word, index) in words"
      :key="index"
      @click="toggleCell(index)"
      :class="[
        'p-2 text-center rounded cursor-pointer transition',
        selected[index]
          ? 'bg-green-400 text-white'
          : 'bg-white hover:bg-gray-100 border',
      ]"
    >
      {{ word }}
    </div>
  </div>
</template>

<style scoped>
/* クリックしたとき、テキストが選択されてしまうのを防ぐ */
.grid {
  user-select: none;
}
</style>
