var todoList = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        tasks: [
            {
                content: 'task1',
                completed: false
            },
            {
                content: 'task2',
                completed: false
            },
            {
                content: 'task3',
                completed: true
            },
            {
                content: 'task4',
                completed: false
            }
        ]
    },
    methods: {
        remove(task) {
            this.tasks.splice(this.tasks.indexOf(task), 1)
        },
        addTask: function () {
            this.tasks.unshift({content:this.newTask, completed: false});
            this.newTask = '';
        }
    }
})