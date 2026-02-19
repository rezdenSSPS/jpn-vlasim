const dayNames = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
const todayIndex = new Date().getDay();
const todayName = dayNames[todayIndex];

document.getElementById('today-display').textContent = todayName;

const restaurantItems = [];

document.querySelectorAll('.restaurant-item').forEach(item => {
  const header = item.querySelector('.restaurant-header');
  const body = item.querySelector('.restaurant-body');
  const table = body.querySelector('table');
  const arrow = header.querySelector('.arrow');
  
  restaurantItems.push({
    item,
    header,
    body,
    table,
    arrow,
    originalHeaderHTML: header.innerHTML,
    originalClass: header.className
  });
  
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
    
    body.style.display = 'none';
    header.style.cursor = 'default';
    header.onclick = null;
  }
});

document.getElementById('view-toggle').addEventListener('change', function() {
  const showToday = this.checked;
  
  restaurantItems.forEach(({ item, header, body, table, arrow, originalHeaderHTML, originalClass }) => {
    if (table) {
      const hoursSpan = header.querySelector('.today-hours');
      
      if (showToday) {
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
        
        if (todayHours && !hoursSpan) {
          const span = document.createElement('span');
          span.className = 'today-hours';
          span.textContent = `: ${todayHours}`;
          header.appendChild(span);
        }
        
        body.style.display = 'none';
        header.style.cursor = 'default';
        header.classList.add('restaurant-header-static');
        header.classList.remove('restaurant-header');
        header.onclick = null;
      } else {
        if (hoursSpan) {
          hoursSpan.remove();
        }
        
        body.style.display = 'none';
        header.style.cursor = 'pointer';
        header.classList.add('restaurant-header');
        header.classList.remove('restaurant-header-static');
        header.onclick = function() {
          const isOpen = this.classList.contains('open');
          this.classList.toggle('open', !isOpen);
          body.style.display = isOpen ? 'none' : 'block';
        };
      }
    }
  });
  
  const todayDisplay = document.getElementById('today-display-text');
  if (todayDisplay) {
    todayDisplay.style.display = showToday ? 'block' : 'none';
  }
});
