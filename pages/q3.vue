<template>
  <div>
    <h1 class="text-2xl font-bold">Q3</h1>
    <code-section code="Please review the code and provide any suggestions for improvement. Just like a code review you used to do." />

    <pre class="bg-gray-50/10 border border-[#00DC42]/50 dark:bg-white/5 flex flex-col gap-1 p-2 rounded-lg sm:col-span-2 my-4">
      <code>
        {{ getGiftTips }}
      </code>
    </pre>
  </div>
</template>

<script lang="ts" setup>
/**
 * q3:
 * @description 請 review 這段程式碼，並提供任何改進的建議。就像你過去做過的程式碼審查一樣。
 * @description Please review the code and provide any suggestions for improvement. Just like a code review you used to do.
 * 
 * @hint 請提供任何改進的建議，包括但不限於程式碼結構、可讀性、效能、安全性、可維護性等。
 * @hint Please provide any suggestions for improvement, including but not limited to code structure, readability, performance, security, etc.
 **/

defineOptions({
  name: 'Q3',
})

const getGiftTips = `
function getGiftTips(deviceScope) {
  // 可以增加參數型別和回傳型別

  let isSupportApp = 0,
    isSupportPc = 0,
    marker = 0,
    maskTips;

  // isSupport*開頭的變數可以賦予deviceScope.includes(), 給boolean較為直觀
  // 接著用if判斷, 取代marker相加, 並省略maskTips, 直接回傳文字訊息

  if (deviceScope.includes(1)) {
    isSupportApp = 1;
  }
  if (deviceScope.includes(3)) {
    isSupportPc = 2;
  }

  // 若是[1,2,3] 會把isSupportApp=1, isSupportPc = 2給覆蓋
  // 需要確定下deviceScope的可能值, 確定是否只要有2, 不論是否有1和3, 前面的值都會被推翻掉
  // 不過還是給第三個變數會比較直觀
  // 以及確定會不會是有其他情況, 如[], [1,3], [2,3], [1,2,3], [4]
  // 有的話, swtich case還需要再新增對應的文字訊息

  if (deviceScope.includes(2)) {
    isSupportApp = 0;
    isSupportPc = 0;
  }

  marker = isSupportApp + isSupportPc;
  // marker可能值為0, 1, 2, 3
  switch (marker) {
    // 按照marker可能值, 應該增加case 0, 並新增對應文字
    case 1: // [1] 得1 應該是只支援App
      maskTips = "Exclusive to the App / PC";
      break;
    case 2: // [3] 得2 應該是只支援PC
      maskTips = "Exclusive to the Mobile Web";
      break;
    case 3: // [1, 2] 得3 應該是支援App和Pc
      maskTips = "Exclusive to the App / Mobile Web";
      break;
    default: // 可提醒 不支援任何類型
      maskTips = "";
  }

  return maskTips;
}
`;


// enum DeviceType {
//   App = 1,
//   MobileWeb = 2,
//   PC = 3,
// }

// function rafctoredGetGiftTips(deviceScope: DeviceType[]): string {
//   const hasApp = deviceScope.includes(DeviceType.App);
//   const hasMobileWeb = deviceScope.includes(DeviceType.MobileWeb);
//   const hasPC = deviceScope.includes(DeviceType.PC);

//   // If mobile web is included, no exclusivity message
//   if (hasMobileWeb) {
//     return "";
//   }

//   // Determine exclusivity based on available platforms
//   if (hasApp && hasPC) {
//     return "Exclusive to the App / PC";
//   }
  
//   if (hasApp) {
//     return "Exclusive to the App";
//   }
  
//   if (hasPC) {
//     return "Exclusive to the PC";
//   }

//   return "";
// }
</script>

<style>

</style>