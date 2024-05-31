function jump_score(n, score, k) {
  if (n === 1) return score[0];
  const dp = new Array(n).fill(null);
  dp[0] = score[0];
  for (let i = 1; i < n; i++) {
    let max = dp[i - 1];
    for (let j = 1; j <= k; j++) {
      const preI = i - j;
      if (preI < 0) {
        break;
      }

      max = dp[preI] === null ? max : Math.max(dp[preI], max);
    }
    dp[i] = max + score[i];
  }
  console.log(dp);
  return dp[n - 1];
}
