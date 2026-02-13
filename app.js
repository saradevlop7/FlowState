import { todoModule } from './todo.js';
import { timerModule } from './timer.js';
import { ui } from './ui.js';

const nodes = {
    pages: {
        home: document.getElementById('page-home'),
        add: document.getElementById('page-add')
    },
    timer: document.getElementById('timer-digits'),
    list: document.getElementById('tasks-list'),
    input: document.getElementById('task-input'),
    btnStart: document.getElementById('start-btn'),
    btnAdd: document.getElementById('add-task-btn'),
    navToAdd: document.getElementById('go-to-add'), 
    navBack: document.getElementById('back-to-home')
};

const navigate = (target) => {
    Object.values(nodes.pages).forEach(p => p.classList.remove('active'));
    nodes.pages[target].classList.add('active');
    if(target === 'add') refreshUI();
};

nodes.navToAdd.addEventListener('click', () => navigate('add'));
nodes.navBack.addEventListener('click', () => navigate('home'));

const refreshUI = () => {
    if (todoModule.tasks.length === 0) {
        ui.showMessage(nodes.list, "Nothing here! Click 'Add' to start.");
    } else {
        const html = todoModule.tasks.map(t => `
            <div class="flex items-center justify-between bg-white p-4 rounded-[25px] shadow-sm border-l-4 border-pink-200">
                <div class="flex items-center gap-4">
                    <div class="w-5 h-5 rounded-full border-2 border-pink-100 flex-shrink-0"></div>
                    <span class="text-[11px] font-bold text-gray-700 uppercase tracking-tight">${t.text}</span>
                </div>
                <button class="remove-btn text-gray-300 hover:text-red-500 font-bold px-2 transition-colors" data-id="${t.id}">
                    ✕
                </button>
            </div>
        `).join('');
        ui.render(nodes.list, html);
    }
};

nodes.list.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const id = Number(e.target.dataset.id);
        todoModule.removeTask(id); 
        refreshUI(); 
    }
});

nodes.btnStart.onclick = () => {
    nodes.btnStart.disabled = true;
    nodes.btnStart.innerText = "running...";
    
    timerModule.start(25, (s) => {
        const min = Math.floor(s / 60);
        const sec = s % 60;
        nodes.timer.innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }, () => {
        alert("Session finished!");
        nodes.btnStart.disabled = false;
        nodes.btnStart.innerText = "start";
    });
};

nodes.btnAdd.onclick = () => {
    const val = nodes.input.value;
    if (todoModule.addTask(val)) {
        ui.clearInput(nodes.input);
        refreshUI();
    } else {
        alert("Only letters and numbers allowed!");
    }
};

refreshUI();