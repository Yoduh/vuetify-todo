<template>
  <div class="home">
    <h1 class="subtitle-1 grey--text mt-3">Dashboard</h1>

    <v-container class="my-5">

      <v-row class="mb-3">
        <v-tooltip top transition="slide-y-reverse-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sortBy('title')" v-bind="attrs" v-on="on">
              <v-icon class="float-left" small>mdi-folder</v-icon>
              <span class="caption text-lowercase ml-2">By project name</span>
            </v-btn>
          </template>
          <span>Sort projects by project name</span>
        </v-tooltip>
        <v-tooltip top transition="slide-y-reverse-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sortBy('person')" v-bind="attrs" v-on="on">
              <v-icon class="float-left" small>mdi-account</v-icon>
              <span class="caption text-lowercase ml-2">By person</span>
            </v-btn>
          </template>
          <span>Sort projects by person</span>
        </v-tooltip>
      </v-row>
      
      <v-card flat class="px-3" v-for="project in projects" :key="project.id">
        <v-row :class="`py-5 px-3 rounded project ${project.status}`">
          <v-col cols="12" :md="6">
            <div class="caption grey--text">Project Title</div>
            <div>{{ project.title }}</div>
          </v-col>
          <v-col cols="6" :sm="4" :md="2">
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-col>
          <v-col cols="6" :sm="4" :md="2">
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-col>
          <v-col cols="2" :sm="4" :md="2">
            <div class="float-right">
              <v-chip small :class="`${project.status} white--text caption my-2`">{{ project.status }}</v-chip>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>

    </v-container>
  </div>
</template>

<script>
import db from '@/fb';

export default {
  name: 'Dashboard',
  components: {
  },
  data() {
    return {
      projects: []
    }
  },
  methods: {
    sortBy(field) {
      this.projects.sort((a,b) => a[field] < b[field] ? -1 : 1);
    }
  },
  created() {
    db.collection('projects').onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === 'added') {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }
}
</script>

<style scoped>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
.v-chip.complete {
  background-color: #3cd1c2 !important;
}
.v-chip.ongoing {
  background-color: #ffaa2c !important;
}
.v-chip.overdue {
  background-color: #f83e70 !important;
}
</style>