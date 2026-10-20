export const SECTIONS = {
  schemes: { icon: '🏛️', title: 'Government Schemes', cols: ['Scheme', 'Category', 'Status'], live: ['Active'], closed: ['Closed'], ok: 'Active', no: 'Closed',
    rows: [['PM-KISAN 19th Installment', 'Agriculture', 'Active'], ['National Scholarship Portal', 'Education', 'Active'], ['MGNREGA Job Cards', 'Employment', 'Active'], ['PM Awas Gramin', 'Housing', 'Review'], ['Jal Jeevan Mission', 'Water', 'Pending']] },
  students: { icon: '🎓', title: 'Student Corner', cols: ['Student', 'Course / Scholarship', 'Status'], live: ['Approved'], closed: ['Rejected'], ok: 'Approved', no: 'Rejected',
    rows: [['Ananya Das', 'B.Sc Agriculture', 'Approved'], ['Rohit Sahoo', 'NSP Scholarship 2025-26', 'Pending'], ['Sneha Behera', 'ITI Electrician', 'Approved'], ['Manoj Nayak', 'Merit Scholarship', 'Pending'], ['Priya Mohanty', 'Diploma Civil', 'Rejected']] },
  jobs: { icon: '💼', title: 'Jobs & Skills', cols: ['Position', 'Company / Dept', 'Status'], live: ['Open'], closed: ['Closed'], ok: 'Open', no: 'Closed',
    rows: [['Field Officer', 'Rural Dev Dept', 'Open'], ['Solar Technician', 'GreenGrid Pvt Ltd', 'Open'], ['Data Entry Operator', 'District Office', 'Open'], ['Anganwadi Worker', 'WCD Dept', 'Closed'], ['Skill Trainer', 'Skill India Centre', 'Review']] },
  farmers: { icon: '🌾', title: 'Farmer Corner', cols: ['Farmer', 'Crop / Village', 'Status'], live: ['Verified'], closed: ['Rejected'], ok: 'Verified', no: 'Rejected',
    rows: [['Biswanath Jena', 'Paddy · Khaira', 'Verified'], ['Sita Mahanta', 'Vegetables · Soro', 'Pending'], ['Ramesh Patra', 'Sugarcane · Basta', 'Verified'], ['Gopal Sethi', 'Pulses · Jaleswar', 'Pending'], ['Laxmi Das', 'Maize · Nilgiri', 'Rejected']] },
};

export const STATS = [
  { value: '1.2M+', label: 'People Benefited', icon: '👥', tone: 'green', to: 'students' },
  { value: '500+', label: 'Government Schemes', icon: '📄', tone: 'amber', to: 'schemes' },
  { value: '50K+', label: 'Job Opportunities', icon: '💼', tone: 'blue', to: 'jobs' },
  { value: '2M+', label: 'Farmers Connected', icon: '🌱', tone: 'green', to: 'farmers' },
];

export const NOTIFICATIONS = [
  { text: 'New scholarship applications waiting', to: 'students' },
  { text: '3 farmer registrations need verification', to: 'farmers' },
  { text: 'Employment Fair 2025 closes soon', to: 'jobs' },
];