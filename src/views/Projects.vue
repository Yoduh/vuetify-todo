<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text mt-3">Projects</h1>

    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(project,i) in myProjects"
          :key="i"
        >
          <v-expansion-panel-header>{{ project.title }}</v-expansion-panel-header>
          <v-expansion-panel-content class="px-4 grey--text">
            <div class="font-weight-bold">
              due by {{ project.due }}
            </div>
            <div>
              {{ project.content }}
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import db from '@/fb';

export default {
    name: 'Project',
    data() {
      return {
        projects: []
      }
    },
    computed: {
      myProjects() {
        return this.projects.filter(project => {
          return project.person === "Yoduh"
        })
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

</style>