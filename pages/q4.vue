<template>
  <div>
    <h1 class="text-2xl font-bold">Q4</h1>
    <code-section code="Each time getData function is executed, it will return a random number. Please design a cache function, which can cache the result of the function in 5 seconds" />
    <VideoCard :source="vQ4" />
    
    <Separator />
    
    <h2 class="text-lg">Show Data here: {{ data }}</h2>
    <button @click="run">Run</button>
  </div>
</template>

<script lang="ts" setup>
import vQ4 from '@/assets/q4.mov'

defineOptions({
  name: 'Q4',
})

/**
 * 單純回傳一個隨機數
 * Simply return a random number
 */
function getData() {
  const randomNumber = Math.random();
  return randomNumber;
}

/**
 * 請設計一個 cache 函數，在 5 秒內重複觸發 getData 函數時，只會回傳上一次的結果
 * Please design a cache function, which can cache the result of the function in 5 seconds
 */
function cache<T>(fn: () => T, time: number = 5000): () => T {
  let cachedResult: T | null = null;
  let cacheTimestamp: number | null = null;

  return function(): T {
    const now = Date.now();
    
    // 檢查快取是否存在且未過期
    // 由於精度會有誤差, 所以減去容錯值50ms
    if (cachedResult !== null && cacheTimestamp !== null && (now - cacheTimestamp) < time - 50) {
      return cachedResult;
    }
    
    // 快取過期或不存在，重新執行函數
    cachedResult = fn();
    cacheTimestamp = now;
    
    return cachedResult;
  };
}


/**
 * number: 隨機數 Random number
 * count: 執行次數 Execution count
 */
const data = ref({ number: 0, count: 0 });

/**
 * 設計一個 run 函數, 每秒執行一次 cache 函數, 並且將結果寫入 data
 * Please design a run function, which can execute the cache function once per second, and write the result to data
 */

function run() {
  const cachedGetData = cache(getData, 5000);

  // 按下當下就要+1, 有值
  data.value.count++;
  data.value.number = cachedGetData();

  setInterval(() => {
    data.value.count++;
    data.value.number = cachedGetData();
  }, 1000);
}

</script>

<style>

</style>