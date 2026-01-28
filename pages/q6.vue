<template>
  <section>
    <ClientOnly>
      <VideoCard :source="vQ6" />
    </ClientOnly>

    <section>
      <!-- 賽事列表 -->
      <div class="matches">
        <Q6Panel
          v-for="match in matches"
          :key="match.id"
          :match="match"
          :selections="selections.get(match.id)!"
          @toggle="(result: ResultType) => toggleSelection(match.id, result)"
        />
      </div>
    </section>
    <section>
      <!-- 賠率 -->
      Selected Odds: {{ totalOdds }}
    </section>
  </section>
</template>

<script lang="ts" setup>
  import vQ6 from "@/assets/q6.mov";
  import Q6Panel from "@/components/Q6Panel.vue";

  defineOptions({
    name: "Q6",
  });

  /**
   * Team A vs Team B
   * Home Odds: 1.25
   * Away Odds: 3.75
   * Draw Odds: 10.00
   *
   * Team C vs Team D
   * Home Odds: 1.50
   * Away Odds: 2.50
   * Draw Odds: 12.00
   *
   * Team E vs Team F
   * Home Odds: 1.75
   * Away Odds: 2.25
   * Draw Odds: 8.00
   *
   * 請根據以上資料完成下列事項
   * 1. UI 切版
   * 2. 選取賽事後顯示總 Odds 計算結果 (選取的 Odds 相乘)
   * 3. 需要考慮 "互斥" 的狀況, 當狀況發生, 總 Odds 會變成一個範圍 (min~max)
   * 4. "互斥" 的 Odds 背景顏色為紅色
   *
   * ** 互斥表示同一隊伍選擇多個結果, 這些結果不會同時發生, 因此稱為互斥 **
   *
   * e.g.
   * 情境1,
   * User 選擇 Team A 贏, Team C 贏, Team E 贏
   * 總 Odds 為 1.25 * 1.50 * 1.75 = 3.28125
   *
   * 情境2,
   * User 選擇 Team A 贏, Team C 贏, Team F 贏
   * 總 Odds 為 1.25 * 12.00 * 2.25 = 33.75
   *
   * 情境3 (互斥)
   * User 選擇 Team A 贏, Team B 贏, Team E 贏
   * 總 Odds-1 為 TeamA (1.25) * TeamE (1.75) = 2.1875
   * 總 Odds-2 為 TeamB (3.75) * TeamE (1.75) = 6.5625
   */
  import { ResultType, type Match } from "@/types/q6";

  // 賽事數據
  const matches = ref<Match[]>([
    {
      id: 1,
      teamHome: "Team A",
      teamAway: "Team B",
      homeOdds: 1.25,
      drawOdds: 10.0,
      awayOdds: 3.75,
    },
    {
      id: 2,
      teamHome: "Team C",
      teamAway: "Team D",
      homeOdds: 1.5,
      drawOdds: 12.0,
      awayOdds: 2.5,
    },
    {
      id: 3,
      teamHome: "Team E",
      teamAway: "Team F",
      homeOdds: 1.75,
      drawOdds: 8.0,
      awayOdds: 2.25,
    },
  ]);

  // 選擇狀態
  type Selections = Map<number, Set<ResultType>>;
  const selections = ref<Selections>(
    new Map(matches.value.map((m) => [m.id, new Set()])),
  );

  // 切換選擇
  function toggleSelection(matchId: number, result: ResultType) {
    const matchSelections = selections.value.get(matchId);

    if (!matchSelections) return;

    if (matchSelections.has(result)) {
      matchSelections.delete(result);
    } else {
      matchSelections.add(result);
    }
  }

  // 獲取賠率
  function getOdds(matchId: number, result: ResultType): number {
    const match = matches.value.find(m => m.id === matchId);
    if (!match) return 1;
    
    switch (result) {
      case ResultType.HOME: return match.homeOdds;
      case ResultType.DRAW: return match.drawOdds;
      case ResultType.AWAY: return match.awayOdds;
    }
  };
  const totalOdds = computed(() => {
    // 收集所有賽事的賠率陣列
    const allOddsArrays = Array.from(selections.value.entries())
      .filter(([_, results]) => results.size > 0)
      .map(([matchId, results]) =>
        Array.from(results).map((result) => getOdds(matchId, result)),
      );

    if (allOddsArrays.length === 0) return "1";

    // 計算最小和最大總賠率
    const minTotal = allOddsArrays.reduce(
      (acc, odds) => acc * Math.min(...odds),
      1,
    );
    const maxTotal = allOddsArrays.reduce(
      (acc, odds) => acc * Math.max(...odds),
      1,
    );

    return minTotal === maxTotal
      ? minTotal
      : `${minTotal}~${maxTotal}`;
  });
</script>
