<template>
  <div>
    <h3 class="text-2xl font-bold text-left py-2">Work Done</h3>
    <div class="overflow-x-auto relative sm:rounded-lg">
      <table
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6 w-[5%]">No</th>
            <th scope="col" class="py-3 px-6 w-[50%]">Activity</th>
            <th scope="col" class="py-3 px-6 w-[25%]">
              <div class="flex justify-center">Action</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(task, index) in filteredTasks"
            :key="task.id"
            class="bg-white dark:bg-gray-800"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ index + 1 }}
            </th>
            <td
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ task.description }}
            </td>
            <td class="py-4 px-6 text-center">
              <div class="flex justify-center gap-2">
                <button
                  class="p-1 bg-red-600 hover:bg-red-700 rounded-md"
                  @click="deleteTask(task.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path
                      d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"
                    ></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onUnmounted, computed } from "vue";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Swal from "sweetalert2";

export default {
  name: "TaskTable",
  setup() {
    const tasks = ref([]);

    const tasksCollectionRef = collection(db, "tasks");
    const tasksQuery = query(tasksCollectionRef, orderBy("createTime", "asc"));

    const getData = onSnapshot(tasksQuery, (snapshot) => {
      tasks.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

    const deleteTask = async (taskId) => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Do you really want to delete this activity?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        });
        if (result.isConfirmed) {
          await deleteDoc(doc(db, "tasks", taskId));
          Swal.fire("Deleted!", "Activity has been deleted.", "success");
        }
      } catch (error) {
        console.error("Error deleting activity: ", error);
      }
    };

    onUnmounted(getData);

    const filteredTasks = computed(() => {
      return tasks.value.filter((task) => task.status);
    });

    return {
      tasks,
      deleteTask,
      filteredTasks,
    };
  },
};
</script>

<style scoped></style>
