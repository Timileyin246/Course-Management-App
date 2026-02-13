const state = {
    courses: [],
    currentView: 'dashboard' ,
    editingId: null
};

function init() {
    loadCourses();
    renderAll();
    attachEventListeners();
}

function loadCourses() {
    const stored = localStorage.getItem('courses');
    if (stored) {
        state.courses = JSON.parse(stored);
    }
}

function saveCourses() {
    localStorage.setItem('courses', JSON.stringify(state.courses));
}

function attachEventListeners() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.target.dataset.view;
            switchView(view);
        });
    });

    document.getElementById('courseForm').addEventListener('submit', handleAddCourse);
    document.getElementById('editForm').addEventListener('submit', handleEditCourse);
    document.getElementById('cancelBtn').addEventListener('click', () => switchView('dashboard'));
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelEdit').addEventListener('click', closeModal);
}

function switchView(view) {
    state.currentView = view;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    if (view === 'dashboard') {
        document.getElementById('dashboardView').classList.add('active');
        document.querySelector('[data-view="dashboard"]').classList.add('active');
        renderDashboard();
    } else if (view === 'courses') {
        document.getElementById('coursesView').classList.add('active');
        document.querySelector('[data-view="courses"]').classList.add('active');
        renderCourses();
    } else if (view === 'add') {
        document.getElementById('addView').classList.add('active');
        document.querySelector('[data-view="add"]').classList.add('active');
    }
}

function handleAddCourse(e) {
    e.preventDefault();
    const course = {
        id: Date.now(),
        code: document.getElementById('courseCode').value,
        title: document.getElementById('courseTitle').value,
        credits: parseInt(document.getElementById('creditUnits').value),
    };
    
    state.courses.push(course);
    saveCourses();
    renderAll();
    e.target.reset();
    switchView('dashboard');
}

function handleEditCourse(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('editId').value);
    const idx = state.courses.findIndex(c => c.id === id);
    
    if (idx !== -1) {
        state.courses[idx] = {
            id: id,
            code: document.getElementById('editCourseCode').value,
            title: document.getElementById('editCourseTitle').value,
            credits: parseInt(document.getElementById('editCreditUnits').value),
        };
        
        saveCourses();
        renderAll();
        closeModal();
    }
}

function editCourse(id) {
    const course = state.courses.find(c => c.id === id);
    if (course) {
        document.getElementById('editId').value = course.id;
        document.getElementById('editCourseCode').value = course.code;
        document.getElementById('editCourseTitle').value = course.title;
        document.getElementById('editCreditUnits').value = course.credits;
        document.getElementById('editModal').classList.add('active');
    }
}

function deleteCourse(id) {
    if (confirm('Are you sure you want to delete this course?')) {
        state.courses = state.courses.filter(c => c.id !== id);
        saveCourses();
        renderAll();
    }
}

function closeModal() {
    document.getElementById('editModal').classList.remove('active');
}

function renderAll() {
    renderDashboard();
    renderCourses();
}

function renderDashboard() {
    const total = state.courses.length;
    const totalCredits = state.courses.reduce((sum, c) => sum + c.credits, 0);

    document.getElementById('totalCourses').textContent = total;
    document.getElementById('totalCredits').textContent = totalCredits;

    renderRecentCourses();
}

function renderRecentCourses() {
    const recentDiv = document.getElementById('recentCoursesList');
    
    if (state.courses.length === 0) {
        recentDiv.innerHTML = '<p class="recent-content"> No courses added yet</p>';
        return;
    }

    const recentCourses = state.courses.slice(-5).reverse();
    
    recentDiv.innerHTML = recentCourses.map(c => `
        <div class="recent-item">
            <div class="recent-item-code">${c.code}</div>
            <div class="recent-item-header">
                <div class="recent-item-title">${c.title}</div>
                <div class="credit-badge">${c.credits} Credits</div>
            </div>
        </div>
    `).join('');
}

function renderCourses() {
    const grid = document.getElementById('coursesGrid');
    
    if (state.courses.length === 0) {
        grid.innerHTML = `
                            <div class="empty-state">
                                <h2 class="empty-title">No courses yet</h2>
                                <p class="empty-content">Click "Add Course" to add courses</p>
                            </div>
                        `;
        return;
    }
    
    grid.innerHTML = state.courses.map(course => `
        <div class="course-card">
            <div class="course-header">
                <div>
                    <div class="course-code">${course.code}</div>
                    <div class="course-title">${course.title}</div>
                </div>
                <div class="credit-badge">${course.credits} Credits</div>
            </div>
            <div class="course-actions">
                <button class="btn-small btn-edit" onclick="editCourse(${course.id})">Edit</button>
                <button class="btn-small btn-delete" onclick="deleteCourse(${course.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

init();