<template>
  <div class="w-screen h-screen flex flex-col sm:flex-row">
    <!--SideBar-->
    <div
      class="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-full bg-gray-200 text-white"
      v-show="showSidebar"
    >
      <div
        class="h-[50px] bg-gray-900 flex justify-start items-center border-b-[0.5px] border-t-[0.5px] border-gray-500"
      >
        <div class="px-[20px] cursor-pointer">
          <router-link to="/">
            <h3 class="font-bold text-xl">Trillo Workspace</h3>
          </router-link>
        </div>

        <div
          class="cursor-pointer w-[30px] rounded-sm p-2 bg-gray-800 hover:bg-slate-700 ml-auto mr-3"
          @click="toggleSideBar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10.605"
            height="15.555"
          >
            <path
              d="M10.605 12.727 5.656 7.776l4.949-4.948L7.777 0 0 7.776l7.777 7.779 2.828-2.828z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-800 py-[20px]">
        <div class="px-[20px] flex flex-col space-y-[10px]">
          <div class="h-[calc(100%-50px)]">
            <router-link
              to="/todo"
              class="inline-flex relative items-center py-[10px] px-[13px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out gap-2"
            >
              <svg
                width="20"
                height="20"
                role="presentation"
                focusable="false"
                viewBox="0 0 14 10"
                xmlns="http://www.w3.org/2000/svg"
                class="text-current"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.66683 9.66665C0.93045 9.66665 0.333496 9.06969 0.333496 8.33331V1.66665C0.333496 0.930267 0.93045 0.333313 1.66683 0.333313H12.3335C13.0699 0.333313 13.6668 0.930267 13.6668 1.66665V8.33331C13.6668 9.06969 13.0699 9.66665 12.3335 9.66665H1.66683ZM12.3335 5.66665V4.33331H5.66683V5.66665H12.3335ZM12.3335 2.99998V1.66665H5.66683V2.99998H12.3335ZM12.3335 6.99998V8.33331H5.66683V6.99998H12.3335ZM1.66683 4.33331V5.66665H4.3335V4.33331H1.66683ZM1.66683 6.99998V8.33331H4.3335V6.99998H1.66683ZM1.66683 2.99998V1.66665H4.3335V2.99998H1.66683Z"
                  fill="currentColor"
                ></path>
              </svg>
              Todo
            </router-link>
            <router-link
              to="/done"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 128 128"
              >
                <path
                  fill="#fff"
                  d="M64 16A48 48 0 1 0 64 112A48 48 0 1 0 64 16Z"
                ></path>
                <path
                  fill="#222"
                  d="M64 25A39 39 0 1 0 64 103A39 39 0 1 0 64 25Z"
                ></path>
                <path
                  fill="none"
                  stroke="#444b54"
                  stroke-miterlimit="10"
                  stroke-width="6"
                  d="M64 16A48 48 0 1 0 64 112A48 48 0 1 0 64 16Z"
                ></path>
                <path
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="6"
                  d="M42 69L55.55 81 86 46"
                ></path>
              </svg>
              Done
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!--Ebd SideBar-->
    <!--Main-->
    <div class="w-full h-full bg-gray-400">
      <div
        class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b"
      >
        <div
          class="hover-fill cursor-pointer absolute rounded-sm left-1 p-1 hover:bg-slate-600 hover:text-white"
          v-show="!showSidebar"
          @click="toggleSideBar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10.605"
            height="15.555"
            style="transform: rotate(180deg)"
            class="hover-fill"
          >
            <path
              d="M10.605 12.727 5.656 7.776l4.949-4.948L7.777 0 0 7.776l7.777 7.779 2.828-2.828z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div class="flex-1 flex items-center" :class="{ 'ml-2': !showSidebar }">
          <div class="flex items-center">
            <h3 class="font-bold text-xl">My Todo</h3>
          </div>
          <div class="ml-1 px-[5px] cursor-pointer">
            <svg
              class="feather feather-star"
              fill="none"
              height="18"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
        <div class="border border-gray-300-md p-[20px] h-full">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!--End Main-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSidebar: true,
    };
  },

  methods: {
    toggleSideBar() {
      this.showSidebar = !this.showSidebar;
    },
  },
};
</script>

<style scoped>
.hover-fill:hover svg path {
  fill: white;
}
</style>
