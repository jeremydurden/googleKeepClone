class App {
    constructor(){
        this.notes = [];


        this.$form = document.querySelector('#form')
        this.$notes = document.querySelector('#notes');
        this.$noteTitle = document.querySelector('#note-title')
        this.$noteText = document.querySelector('#note-text')
        this.$formButtons = document.querySelector('#form-buttons')
        this.$formCloseButton = document.querySelector('#form-close-button')
        this.$placeHolder = document.querySelector('#placeholder')
        this.addEventListeners();
    }

    addEventListeners(){
        document.body.addEventListener('click', event =>{
        this.handleFormClick(event) 
        });

        this.$form.addEventListener('submit', event => {
            event.preventDefault()
            const title = this.$noteTitle.value;
            const text = this.$noteText.value;
            const hasNote = title || text;

            hasNote ? this.addNote({ title, text }) : null

        })

        this.$formCloseButton.addEventListener('click', event =>{
            event.stopPropagation(); // stops the event handler for 'bubbling up' since it's 
            // on the entire form, not just the text input.
            this.closeForm()
        })
    }

    handleFormClick(event){
        const isFormClicked = this.$form.contains(event.target)
        const isFormOpen = this.$form.classList.contains('form-open')
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;
        const hasNote = title || text;

        if(isFormClicked && isFormOpen){
            null   
        } else if(isFormClicked){
            this.openForm()
        } else if(hasNote){
            this.addNote({ title, text })
        } else {
            this.closeForm()
        }
    }
    openForm(){
        this.$form.classList.add('form-open')
        this.$noteTitle.style.display = 'block';
        this.$formButtons.style.display = 'block';
        this.$noteTitle.focus()
        
    }

    closeForm(){
        this.$form.classList.remove('form-open')
        this.$noteTitle.style.display = 'none';
        this.$formButtons.style.display = 'none';

        this.$noteTitle.value = '';
        this.$noteText.value = '';
    }

    addNote({ title, text }){
        const newNote = {
            title,
            text,
            color: 'white',
            id: this.notes.length > 0 ? this.notes[this.notes.length -1].id +1 : 1
        };

        this.notes = [...this.notes, newNote];
        this.displayNotes();
        this.closeForm();

    }

    displayNotes(){
        const hasNotes = this.notes.length > 0;
        this.$placeHolder.style.display = hasNotes ?  'none' : 'flex'

        this.$notes.innerHTML = this.notes.map(note => `
        <div style="background: ${note.color};" class="note">
          <div class="${note.title && 'note-title'}">${note.title}</div>
          <div class="note-text">${note.text}</div>
          <div class="toolbar-container">
            <div class="toolbar">
              <img class="toolbar-color" src="https://icon.now.sh/palette">
              <img class="toolbar-delete" src="https://icon.now.sh/delete">
            </div>
          </div>
        </div>
     `).join("");
    }

}

new App()