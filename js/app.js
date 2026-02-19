const dayNames = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
const todayIndex = new Date().getDay();
const todayName = dayNames[todayIndex];

document.getElementById('today-display').textContent = todayName;

document.querySelectorAll('.restaurant-item').forEach(item => {
  const header = item.querySelector('.restaurant-header');
  const body = item.querySelector('.restaurant-body');
  const table = body.querySelector('table');
  
  if (table) {
    const rows = table.querySelectorAll('tr');
    let todayHours = '';
    
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length === 2) {
        const dayName = cells[0].textContent.trim();
        if (dayName === todayName) {
          todayHours = cells[1].textContent.trim();
        }
      }
    });
    
    if (todayHours) {
      const hoursSpan = document.createElement('span');
      hoursSpan.className = 'today-hours';
      hoursSpan.textContent = `: ${todayHours}`;
      header.appendChild(hoursSpan);
    }
    
    body.remove();
    header.style.cursor = 'default';
    header.classList.remove('restaurant-header');
    header.classList.add('restaurant-header-static');
  }
});
