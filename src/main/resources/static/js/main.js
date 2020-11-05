
function getIndex(list, id) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            return i;
        }
    }
    return -1;
}

var notesApi = Vue.resource('/notes{/id}');

Vue.component('note-form', {
    props: ['notes', 'noteAttr'],
    data: function () {
        return {
            name: '',
            id:'',
            text:''
        }
    },
    watch: {
        noteAttr: function(newVal, oldVal) {
            this.name = newVal.name;
            this.id = newVal.id;
            this.text = newVal.text;
        }
    },
    template:
    '<div>' +
        '<span>' +
    '<input type="text" placeholder="Напишите название заметки" v-model="name" />' +
        '&nbsp;' +
        '<input type="text" placeholder="Введите текст заметки" v-model="text" />' +
        '&nbsp;' +
        '<input type="button" value="Добавить заметку" @click="save" />' +
        '</span>' +
    '</div>',
    methods: {
        save: function () {
            var note = {name: this.name, text: this.text};

            if (this.id) {
                notesApi.update({id:this.id}, note).then(result =>
                result.json().then(data => {
                    var index = getIndex(this.notes, data.id);
                    this.notes.splice(index, 1, data);
                    this.name = ''
                    this.id = ''
                    this.text = ''
                })
              )
            } else {
            notesApi.save({}, note).then(result =>
                result.json().then(data => {
                    this.notes.push(data);
                    this.name = '',
                        this.text = ''
                })
            )
         }
      }
    }
});

Vue.component('note-row', {
   props: ['note', 'editMethod', 'notes'],
   template: '<div>' +
       '<p>{{ note.name}} [{{ note.editDate}}] <b>{{ note.text}}</b>' +
       '<span style="position: absolute; right: 0;">' +
       '<br/>' +
            '<input type="button" value="Редактировать" @click="edit" />' +
            '&nbsp;' +
            '<input type="button" value="Удалить" @click="del" />' +
       '</span></p>' +
       '</div>',
    methods: {
       edit: function () {
           this.editMethod(this.note);
       },
       del: function () {
           notesApi.remove({id: this.note.id}).then(result => {
               if (result.ok) {
                   this.notes.splice(this.notes.indexOf(this.note), 1)  //найти индекс элемента note и удалить ОДНУ запись
               }
           })
       }
    }
});

Vue.component('notes-list', {
   props: ['notes'],
   data: function() {
       return {
          note: null
       }
   },
   template:
       '<div style="position: relative; width: 550px; padding: 15px;">' +
       '<note-form :notes="notes" :noteAttr="note"/>' +
       '<br/>' +
       '<note-row v-for="note in notes" :key="note.id" :note="note" ' +
        ':editMethod="editMethod" :notes="notes" />' +
       '</div>',
    created: function () {
        notesApi.get().then(result =>
            result.json().then(data =>
                data.forEach(note => this.notes.push(note))
        )
      )
    },
    methods: {
       editMethod: function (note) {
           this.note = note;
       }
    }
});
var app = new Vue({
    el: '#app',
    template: '<notes-list :notes="notes" />',
    data: {
        notes: []
    }
})