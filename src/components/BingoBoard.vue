<script setup>
import { ref, watch } from "vue";
import { words } from "../data/words.js";

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

// 「ビンゴ」と「リーチ」の状態をチェック
function checkLines(selected) {
  // 全てのライン（横・縦・斜め）を配列で定義
  const lines = [];
  // 横ライン
  for (let r = 0; r < size; r++) {
    const line = [];
    for (let c = 0; c < size; c++) {
      line.push(r * size + c);
    }
    lines.push(line);
  }
  // 縦ライン
  for (let c = 0; c < size; c++) {
    const line = [];
    for (let r = 0; r < size; r++) {
      line.push(r * size + c);
    }
    lines.push(line);
  }
  // 斜め2本
  const diag1 = [];
  const diag2 = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
    diag2.push(i * size + (size - 1 - i));
  }
  lines.push(diag1);
  lines.push(diag2);

  // ビンゴとリーチのカウント
  let bingoLines = 0;
  let reachLines = 0;

  // 各ラインをチェック
  for (const line of lines) {
    // 未選択マスの数
    let unselectedCount = 0;

    for (const idx of line) {
      if (idx === centerIndex) {
        // FREEマスは選択済み扱いなので無視してOK
        continue;
      }
      if (!selected.value[idx]) {
        unselectedCount++;
      }
    }

    if (unselectedCount === 0) {
      // 1つも未選択マスがなければ、そのラインはビンゴ成立
      bingoLines++;
    } else if (unselectedCount === 1) {
      // 未選択マスが1つだけなら、そのラインはリーチ状態
      reachLines++;
    }
  }

  return { bingoLines, reachLines };
}

const bingoLines = ref(0);
const reachLines = ref(0);

// 選択状態が変わったときにビンゴとリーチの状態をチェック
watch(
  selected,
  () => {
    const result = checkLines(selected);
    bingoLines.value = result.bingoLines;
    reachLines.value = result.reachLines;
  },
  { deep: true } // 配列の中身の変化まで監視するオプション
);
</script>

<template>
  <div class="mb-4">
    <div v-if="bingoLines > 0" class="text-green-600 font-bold text-xl">
      🎉 ビンゴ！
    </div>
    <div v-else-if="reachLines > 0" class="text-orange-600 font-semibold">
      ⚠️
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
