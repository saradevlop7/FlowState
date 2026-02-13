import { storage } from './storage.js';

export const todoModule = {
    tasks: storage.get('tasks'),
    
    validate: (text) => /^[a-zA-Z0-9 ]+$/.test(text), 

    addTask(text) {
        if (this.validate(text)) {
            this.tasks.push({ id: Date.now(), text, done: false });
            storage.save('tasks', this.tasks);
            return true;
        }
        return false;
    },

    removeTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        storage.save('tasks', this.tasks);
    }
};