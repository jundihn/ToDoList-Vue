<template>
  <div>
    <div class="flex items-center justify-between">
      <h3 class="text-2xl sm:text-xl md:text-2xl font-bold text-left py-2">
        Todo List
      </h3>
      <div class="cursor-pointer">
        <button
          @click="openAddModal"
          class="w-full max-w-[180px] sm:text-sm md:text-md font-bold text-white rounded-md bg-green-500 hover:bg-green-600 p-1"
        >
          + Add Activity
        </button>
      </div>
    </div>

    <!--Modal Form-->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="modal-content bg-white rounded-lg p-6 w-full max-w-[500px]">
        <h3 class="text-xl font-bold mb-4">
          {{ editMode ? "Edit Activity" : "Add New Activity" }}
        </h3>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 text-start"
              for="activity"
            >
              Activity
            </label>
            <input
              type="text"
              id="activity"
              v-model="form.activity"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div v-if="editMode" class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 text-start"
              for="status"
            >
              Status
            </label>
            <label class="flex items-center cursor-pointer w-[50px]">
              <input
                type="checkbox"
                id="status"
                v-model="form.status"
                class="mr-2 leading-tight"
              />
              Done
            </label>
          </div>
          <div class="flex justify-end">
            <button
              @click="closeModal"
              type="button"
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    <!--End Modal Form-->

    <div
      class="overflow-x-auto relative sm:rounded-lg"
      :class="{ 'hidden-table': showModal }"
    >
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
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white sm:w-[5%] sm:py-4"
            >
              {{ index + 1 }}
            </th>
            <td
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white sm:w-[50%] sm:py-4"
            >
              {{ task.description }}
            </td>
            <td class="py-4 px-6 text-center sm:w-[25%] sm:py-4">
              <div
                class="flex flex-col sm:flex-row gap-2 justify-center items-center"
              >
                <button
                  class="p-1 bg-edit hover:bg-edit-hover rounded-md mb-2 sm:mb-0"
                  @click="editTask(task)"
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
                      d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"
                    ></path>
                  </svg>
                </button>
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
  addDoc,
  updateDoc,
  Timestamp,
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

    // Computed property to filter out tasks with status true
    const filteredTasks = computed(() => {
      return tasks.value.filter((task) => !task.status);
    });

    return {
      tasks,
      deleteTask,
      filteredTasks,
    };
  },
  data() {
    return {
      showModal: false,
      editMode: false,
      selectedTask: null,
      form: {
        activity: "",
        status: false,
      },
    };
  },
  methods: {
    openAddModal() {
      this.editMode = false;
      this.showModal = true;
      this.form.activity = "";
      this.form.status = false;
    },
    closeModal() {
      this.showModal = false;
    },
    async handleSubmit() {
      try {
        if (this.editMode) {
          // Update task
          await updateDoc(doc(db, "tasks", this.selectedTask.id), {
            description: this.form.activity,
            status: this.form.status,
          });
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Task updated successfully!",
          });
        } else {
          // Add new task
          await addDoc(collection(db, "tasks"), {
            description: this.form.activity,
            status: this.form.status,
            createTime: Timestamp.now(),
          });
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Task added successfully!",
          });
        }
        this.closeModal();
      } catch (error) {
        console.error("Error adding/editing activity: ", error);
      }
    },
    editTask(task) {
      this.selectedTask = task;
      this.editMode = true;
      this.showModal = true;
      this.form.activity = task.description;
      this.form.status = task.status;
    },
  },
};
</script>

<style>
.table-fixed {
  table-layout: fixed;
}

.bg-edit {
  background-color: #508c9b;
}

.hover\:bg-edit-hover:hover {
  background-color: #3a6b75;
}

@media (max-width: 640px) {
  .modal-content {
    padding: 14px;
    width: 90%;
  }

  .modal-content h3 {
    font-size: 1.25rem;
  }

  .modal-content input {
    font-size: 0.875rem;
  }

  .modal-content button {
    font-size: 0.875rem;
  }
  .hidden-table {
    display: none;
  }

  thead th {
    padding: 8px 4px;
  }

  thead th:nth-child(1) {
    width: 20%;
  }

  thead th:nth-child(2) {
    width: 60%;
  }

  thead th:nth-child(3) {
    width: 20%;
  }

  thead th {
    text-align: center;
  }
}
</style>
