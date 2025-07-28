<template>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm h-40 flex flex-col justify-between">
    <div class="space-y-2">
      <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
        ID: {{ props.item.id }}
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Name: {{ props.item.name }}
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Time: {{ time }}
      </div>
    </div>
    
    <div class="mt-auto">
      <button 
        :class="buttonClass"
        class="w-full py-2 px-4 rounded-lg font-semibold text-white transition-all duration-300 ease-in-out"
        @click="handleOddsClick"
      >
        {{ odds.toFixed(2) }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  item: {
    id: string;
    name: string;
  };
}>();

const time = ref(new Date().toLocaleString())
const odds = ref(1.50)
const previousOdds = ref(1.50)
const colorState = ref<'base' | 'up' | 'down'>('base')

const buttonClass = computed(() => {
  switch (colorState.value) {
    case 'up':
      return 'bg-green-500 hover:bg-green-600'
    case 'down':
      return 'bg-red-500 hover:bg-red-600'
    default:
      return 'bg-blue-500 hover:bg-blue-600'
  }
})

const updateTime = () => {
  requestAnimationFrame(() => {
    time.value = new Date().toLocaleString()
    setTimeout(updateTime, 1000)
  })
}

const updateOdds = () => {
  previousOdds.value = odds.value
  odds.value = Number((1.00 + Math.random() * 1.15).toFixed(2))
  
  if (odds.value > previousOdds.value) {
    colorState.value = 'up'
    setTimeout(() => {
      colorState.value = 'base'
    }, 1500)
  } else if (odds.value < previousOdds.value) {
    colorState.value = 'down'
    setTimeout(() => {
      colorState.value = 'base'
    }, 1500)
  }
  
  const nextUpdate = 5000 + Math.random() * 5000
  setTimeout(updateOdds, nextUpdate)
}

const handleOddsClick = () => {
  console.log(`Clicked odds for ${props.item.name}: ${odds.value}`)
}

onMounted(() => {
  updateTime()
  updateOdds()
})

</script>

<style>

</style>