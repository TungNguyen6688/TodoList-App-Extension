const DELAY = 4000;

var todoList = new Vue({
    el: '#app',
    data: {
        message: 'TodoList Application',
        tasks: [],
        syncStatus: '',
        newTask: '',
        timeout: null
    },
    mounted() {
        this.get();
    },
    watch: {
        tasks: {
            handler: function (val, oldVal) {
                this.sync();
            },
            deep: true
        }
    },
    methods: {
        remove(task) {
            this.tasks.splice(this.tasks.indexOf(task), 1);
        },
        addTask: function () {
            this.tasks.unshift({ content: this.newTask, completed: false });
            this.newTask = '';
        },
        sync: function () {

            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.syncStatus = 'syncing';
            // console.log('change');

            this.timeout = setTimeout(() => {
                chrome.storage.sync.set({ tasks: JSON.stringify(this.tasks) }, function () {
                    // console.log('change complete');
                    this.syncStatus = 'syncCompleted';
                    clearTimeout(this.timeout);
                });
            }, DELAY)
        },
        get: function () {
            chrome.storage.sync.get('tasks', (res) => {
                if (res.tasks) {
                    this.tasks = JSON.parse(res.tasks);
                    this.update();
                }
            });
        },
        update: function () {
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
            chrome.browserAction.setBadgeText({ text: this.tasks.length.toString() });
        }
    }
})