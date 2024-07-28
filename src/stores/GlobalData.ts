import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useGlobalDataStore = defineStore("GlobalData", () => {
  const windowWidth = ref(0);
  const windowHeight = ref(0);
  const StatusBar = ref(0); //状态栏高度
  const NavBar = ref(0); // 导航栏高度

  const MenuButton = ref(0); // 胶囊高度
  const MenuButtonTop = ref(0); // 胶囊上沿距离顶部距离
  const MenuButtonBottom = ref(0); // 胶囊下沿距离顶部距离

  const offTop = computed(() => {
    return StatusBar.value + NavBar.value;
  });

  uni.getSystemInfo({
    success: (e) => {
      e.statusBarHeight = e.statusBarHeight || 0;
      windowWidth.value = e.windowWidth;
      windowHeight.value = e.windowHeight;

      // #ifdef H5
      console.log("H5平台");
      StatusBar.value = 0;
      NavBar.value = 45;
      // #endif

      // #ifdef MP-WEIXIN
      console.log("微信平台", e.platform);

      if (e.platform == "windows") {
        StatusBar.value = 0;
        NavBar.value = 45;
        return;
      }

      StatusBar.value = e.statusBarHeight;
      const res = wx.getMenuButtonBoundingClientRect();
      MenuButton.value = res.height;
      MenuButtonTop.value = res.top;
      MenuButtonBottom.value = res.bottom;
      NavBar.value = res.height + (res.top - e.statusBarHeight) * 2;
      // #endif
    },
  });

  uni.onWindowResize((res) => {
    windowWidth.value = res.size.windowWidth;
    // console.log(res.size);
    windowHeight.value = res.size.windowHeight;
  });

  // console.log({
  //   状态栏: StatusBar.value,
  //   导航栏: NavBar.value,
  //   胶囊: MenuButton.value,
  //   胶囊top: MenuButtonTop.value,
  //   胶囊bottom: MenuButtonBottom.value,
  // });
  const day = ref(0);
  const month = ref(0);
  const year = ref(0);

  const now = new Date();
  day.value = now.getDate(); // 获取当前日期
  month.value = now.getMonth() + 1; // 获取当前月份，加1是因为月份是从0开始的
  year.value = now.getFullYear(); // 获取当前年份
  // console.log({
  //   now: now,
  //   day: day,
  //   month: month,
  //   year: year,
  // });
  return {
    windowWidth,
    windowHeight,
    StatusBar,
    NavBar,
    MenuButton,
    MenuButtonTop,
    MenuButtonBottom,
    offTop,
    day,
    month,
    year,
  };
});
