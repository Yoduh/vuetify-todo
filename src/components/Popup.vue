<template>
    <v-dialog max-width="600" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text class="success" v-bind="attrs" v-on="on">Add new project</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h2>Add a New Project</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
                    <v-textarea label="Information" v-model="content" prepend-icon="mdi-pencil" :rules="inputRules"></v-textarea>
                    <v-menu v-model="menu" :close-on-content-click="false" max-width="290">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field :value="computedDateFormattedMomentjs" clearable label="Due date" readonly
                            v-bind="attrs" v-on="on" @click:clear="date = null" prepend-icon="mdi-calendar-range" :rules="inputRules"></v-text-field>
                        </template>
                        <v-date-picker v-model="due" @change="menu = false"></v-date-picker>
                    </v-menu>
                    <v-btn text class="success mx-0 mt-3" @click="submit">Add project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
        
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-dialog>
</template>

<script>
import moment from 'moment';
import db from '@/fb';

export default {
    name: 'Popup',
    data() {
        return {
            overlay: false,
            dialog: false,
            title: '',
            content: '',
            due: null,
            menu: false,
            inputRules: [
                v => v.length >= 3 || 'Minimum length is 3 characters'
            ]
        }
    },
    computed: {
      computedDateFormattedMomentjs () {
        return this.due ? moment(this.due).format('Do MMM YYYY') : ''
      }
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.overlay = true;
                const project = {
                    title: this.title,
                    content: this.content,
                    due: moment(this.due).format('Do MMM YYYY'),
                    person: 'Yoduh',    //hard-coded without authentication
                    status: 'ongoing'
                }
                db.collection('projects').add(project)
                .then(() => { 
                    console.log('added to db'); 
                    this.dialog = false; 
                    this.overlay = false;
                    this.$emit('projectAdded')
                });
            }
        }
    }
}
</script>