class Solution {
  solve([n, trust]) {
    if (n == 1) return 1;
    let trustsGraph = {};
    let istrustedGraph = {};
    for (let i = 0; i < trust.length; i++) {
      const [trusts, istrusted] = trust[i];
      if (!trustsGraph[trusts]) trustsGraph[trusts] = [];
      if (!istrustedGraph[istrusted]) istrustedGraph[istrusted] = [];
      trustsGraph[trusts].push(istrusted);
      istrustedGraph[istrusted].push(trusts);
    }
    for (let i = 1; i <= n; i++) {
      if (!trustsGraph[i] && istrustedGraph[i]?.length === n - 1) {
        return i;
      }
    }

    return -1;
  }
  solveAlternative([n, trust]) {
    if (n == 1) return 1;
    const netTrust = Array.from({ length: n + 1 }, () => 0);
    for (let i = 0; i < trust.length; i++) {
      const [trusts, istrusted] = trust[i];
      netTrust[trusts]--;
      netTrust[istrusted]++;
    }
    return netTrust.findIndex((net) => net === n - 1);
  }
}

module.exports = Solution;
