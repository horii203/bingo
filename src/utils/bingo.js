// words から重複なしでランダムに選ぶ関数
export const getRandomSample = (array, sampleSize) => {
  const result = [];
  const usedIndices = new Set();
  while (result.length < sampleSize) {
    const index = Math.floor(Math.random() * array.length);
    if (!usedIndices.has(index)) {
      usedIndices.add(index);
      result.push(array[index]);
    }
  }
  return result;
};

// 「ビンゴ」と「リーチ」の状態をチェック
export const checkLines = (selected, size, centerIndex) => {
  // 全てのライン（横・縦・斜め）を配列で定義
  const lines = [];
  // 横ライン
  for (let r = 0; r < size; r++) {
    const row = [];
    for (let c = 0; c < size; c++) {
      row.push(r * size + c);
    }
    lines.push(row);
  }
  // 縦ライン
  for (let c = 0; c < size; c++) {
    const col = [];
    for (let r = 0; r < size; r++) {
      col.push(r * size + c);
    }
    lines.push(col);
  }
  // 斜め2本
  const diag1 = [],
    diag2 = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
    diag2.push(i * size + (size - 1 - i));
  }
  lines.push(diag1, diag2);

  // ビンゴとリーチのカウント
  let bingoLines = 0;
  let reachLines = 0;

  // 各ラインをチェック
  for (const line of lines) {
    // 未選択マスの数
    let unselected = 0;
    for (const idx of line) {
      // FREEマスは選択済み扱いなので無視してOK
      if (idx === centerIndex) continue;
      if (!selected.value[idx]) unselected++;
    }
    // 1つも未選択マスがなければ、そのラインはビンゴ成立
    if (unselected === 0) bingoLines++;
    // 未選択マスが1つだけなら、そのラインはリーチ状態
    else if (unselected === 1) reachLines++;
  }

  return { bingoLines, reachLines };
};
