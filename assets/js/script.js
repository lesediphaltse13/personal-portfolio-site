const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.desktop-nav');
menuButton?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const projects = {
  buildcore: { kicker:'Construction ERP', title:'BuildCore', summary:'A modular construction operations platform designed to bring projects, workforce, finance, documents, equipment and reporting into one clear workspace.', image:'./assets/images/buildcore-login.png', gallery:['./assets/images/buildcore-login.png'], challenge:'Construction teams often manage critical information across disconnected spreadsheets, messages and paper-based processes.', approach:'I structured the product around operational modules, management visibility, role-based access, dashboard reporting and a focused interface designed for frequent daily use.', tags:['ERP Design','React','TypeScript','Dashboards','Role-Based Access','Reporting'], role:'Product strategy · Systems analysis · UI/UX · Development' },
  orecore: { kicker:'Mining Technology', title:'OreCore', summary:'An enterprise mining management concept covering production, equipment, workforce, safety, stockpiles, logistics and analytics.', image:'./assets/images/orecore-dashboard.png', gallery:['./assets/images/orecore-dashboard.png','./assets/images/orecore-login.png'], challenge:'Mining operations require coordinated information across production, safety, maintenance, materials and people.', approach:'I translated those operational areas into a scalable module structure with management dashboards, KPI visibility and role-specific experiences.', tags:['Systems Architecture','Operational Analytics','Enterprise UX','Data Modelling','RBAC'], role:'Product architecture · Requirements · Interface design · Development' },
  logisticore: { kicker:'Logistics Platform', title:'LogistiCore', summary:'A fleet and logistics management system connecting shipments, dispatch, live tracking, drivers, fuel, maintenance, inventory and reporting.', image:'./assets/images/logisticore-dashboard.png', gallery:['./assets/images/logisticore-dashboard.png'], challenge:'Logistics teams need timely visibility across vehicles, routes, deliveries, warehouses and operating costs.', approach:'I designed a connected operational workspace with a consistent navigation system, management mode, reporting tools and focused dashboards.', tags:['ASP.NET Core','React','SQL Server','JWT','Fleet Workflows','REST APIs'], role:'Full-stack development · Systems design · UI/UX' },
  propertyflow: { kicker:'Property Technology', title:'PropertyFlow', summary:'A modern property operations suite for residential, commercial and mixed-use portfolios.', image:'./assets/images/project-4.png', gallery:['./assets/images/project-4.png'], challenge:'Property teams manage tenants, leases, maintenance, inspections, payments and documents across fragmented tools.', approach:'I organised the platform around the complete property lifecycle and introduced a management mode that separates editing privileges from view-only use.', tags:['Product Design','Workflow Design','Finance Modules','Document Management','Responsive UI'], role:'Product concept · Systems analysis · Design · Development' },
  educore: { kicker:'Education Technology', title:'Student Records System', summary:'A school administration platform for student records, attendance, academic results, classes, scanned documents, report cards and staff access.', image:'./assets/images/project-5.png', gallery:['./assets/images/project-5.png'], challenge:'School staff need a reliable way to find student information and manage academic records without duplicating work.', approach:'I designed grade-and-class-based navigation, scanned document viewing, academic result workflows and role-controlled access for different staff responsibilities.', tags:['Education Workflows','Records Management','Access Control','Document Uploads','Reporting'], role:'Discovery · Workflow design · UI/UX · Product development' },
  web: { kicker:'Web & Product Design', title:'Sedi.P Digital Experience', summary:'A refined industrial software website presenting websites, custom systems and operational technology services with a strong professional brand.', image:'./assets/images/sedip-website.png', gallery:['./assets/images/sedip-website.png'], challenge:'A strong digital presence must communicate trust quickly while remaining fast, clear and easy to navigate.', approach:'I combine restrained visual design, responsive layouts, strong hierarchy and practical calls to action to build polished experiences.', tags:['HTML','CSS','JavaScript','Responsive Design','Figma','Brand Systems'], role:'Creative direction · UI/UX · Frontend development' }
};

const modal = document.querySelector('.project-modal');
const fields = {
  kicker: document.querySelector('#modal-kicker'), title: document.querySelector('#modal-title'), summary: document.querySelector('#modal-summary'), image: document.querySelector('#modal-image'), challenge: document.querySelector('#modal-challenge'), approach: document.querySelector('#modal-approach'), tags: document.querySelector('#modal-tags'), role: document.querySelector('#modal-role')
};
function openModal(key) {
  const item = projects[key]; if (!item || !modal) return;
  fields.kicker.textContent = item.kicker; fields.title.textContent = item.title; fields.summary.textContent = item.summary;
  fields.image.src = item.image; fields.image.alt = `${item.title} project interface`;
  const gallery = document.querySelector('#modal-gallery');
  if (gallery) {
    const images = item.gallery || [item.image];
    gallery.innerHTML = images.map((src, index) => `<button class="modal-thumb${index===0?' active':''}" type="button" data-src="${src}" aria-label="View ${item.title} image ${index+1}"><img src="${src}" alt="${item.title} preview ${index+1}"></button>`).join('');
    gallery.querySelectorAll('.modal-thumb').forEach(btn => btn.addEventListener('click', () => { fields.image.src = btn.dataset.src; gallery.querySelectorAll('.modal-thumb').forEach(x => x.classList.remove('active')); btn.classList.add('active'); }));
  }
  fields.challenge.textContent = item.challenge; fields.approach.textContent = item.approach; fields.role.textContent = item.role;
  fields.tags.innerHTML = item.tags.map(tag => `<span>${tag}</span>`).join('');
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
  modal.querySelector('.modal-close')?.focus();
}
function closeModal(){ modal?.classList.remove('open'); modal?.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }
document.querySelectorAll('[data-project]').forEach(card => card.addEventListener('click', () => openModal(card.dataset.project)));
document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
