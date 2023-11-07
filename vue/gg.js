studentsComponent = {
            template: ` <div v-if="loading">Loading...</div>
                            <div v-else>
                                <div class="table">
                                    <div class="caption">
                                        <h1>Список студентов</h1>
                                    </div>
                                <div class="header">
                                    <div class="header h-1">Номер студентов</div>
                                    <div class="header h-1">Фамилия Имя Отчество</div>
                                </div>
                                <div class="row" v-for="student in students">
                                    <div class="row-item r-1">
                                        {{ student.id}}
                                    </div>
                                    <div class="row-item r-2">
                                        {{ student.name}}
                                    </div>
                                </div>
                                <div>
                                    <button class="button" v-on:click="addStudent">Добавить</button>
                                </div>
                            </div>
                        </div> ` ,
	        data() {
	            return {
	                loading: true,
	                students: null
	            }
	        },
	        methods: {
	            addStudent: function (event) {
	                this.$router.push('/addStudent');
	            },
	        },
	        mounted() {
	            axios
	                .get('http://localhost:8080/students', {mode: 'no-cors'})
	                .then(response => (this.students = response.data))
	                .finally(() => this.loading = false);
	        },
	        computed: {
	            fullName: function() {
	                return [this.firstName, this.lastName] .join(' ');
	            }
	        }
        };
        addStudentComponent = {
            template: ` <div>
                       <div class="add-form">
                            <div class="title" class="caption"><h1>Форма добавления студента</h1></div>
                            <section>
                                <div>
                                    <div>
                                        <input type="text" v-model="student.id" placeholder="Номер студента">
                                    </div>
                                    <div>
                                        <input type="text" v-model="student.name" placeholder="Имя студента">
                                    </div>
                                </div>
                            </section>
                       </div>

                       <div class="button-container">
                            <div class="buttons">
                                <div>
                                    <button class="button" v-on:click="addStudent">Сохранить</button>
                                    <button class="button" v-on:click="cancel">Отмена</button>
                                </div>
                            </div>
                       </div>
                    </div> `,
	        data() {
	            return {
	                student: {
	                    id: null,
	                    name: null
	                }
	            }
	        },

	        methods: {
	            addStudent: function (event) {
	                axios.post('http://localhost:8080/students',
	                    JSON.stringify(this.student), {
	                        headers:{'Content-Type': 'application/json; charset=utf-8'}
	                })
                    .then(response => {
                        console.log("student added");
                        this.$router.push('/students');
                    })
                    .catch(error => {
                         alert(error);
                    });
	            },
                cancel: function (event) {
                    this.$router.push('/students');
                }
	        }
        }

        const routes = [
            {path: "/", component: studentsComponent},
            {path: '/students', component: studentsComponent},
            {path: '/addStudent', component: addStudentComponent}
        ]

        const router = new VueRouter.createRouter({
            history: VueRouter.createWebHashHistory(),
            routes
        })

        const app = Vue.createApp({
            components: {
                'students-component': studentsComponent,
                'add-student-component': addStudentComponent
            }
        })
        app.use(router)
        app.mount('#app')