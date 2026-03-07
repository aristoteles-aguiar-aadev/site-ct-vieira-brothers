
  // ─── HAMBURGER
  function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
  }

  // ─── NAVBAR SCROLL
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.style.background = window.scrollY > 50
      ? 'rgba(10,10,10,0.98)'
      : 'rgba(10,10,10,0.92)';
  });

  // ─── SCHEDULE DATA
  const schedule = {
    seg: [
      { time: '08:00', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' },
      { time: '18:00', mod: 'Kids Jiu-Jitsu', level: '03–14 anos', prof: 'Prof. Carlos Henrique e Prof. Denilson Souza' },
      { time: '19:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' },
      { time: '21:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' }
    ],
    ter: [
      { time: '19:30', mod: 'No-Gi Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' }
    ],
    qua: [
      { time: '08:00', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' },
      { time: '18:00', mod: 'Kids Jiu-Jitsu', level: '03–14 anos', prof: 'Prof. Carlos Henrique e Prof. Denilson Souza' },
      { time: '19:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' },
      { time: '21:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' }
    ],
    qui: [
      { time: '19:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' },
    ],
    sex: [
      { time: '08:00', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' },
      { time: '18:00', mod: 'Kids Jiu-Jitsu', level: '03–14 anos', prof: 'Prof. Carlos Henrique e Prof. Denilson Souza' },
      { time: '19:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' },
      { time: '21:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' }
    ],
  };

  function showDay(btn, day) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const rows = schedule[day].map(r => `
      <tr>
        <td><span class="time-tag">${r.time}</span></td>
        <td><span class="mod-tag">${r.mod}</span></td>
        <td><span class="level-tag">${r.level}</span></td>
        <td style="color:var(--text-muted); font-size:0.9rem;">${r.prof}</td>
      </tr>
    `).join('');
    document.getElementById('schedule-content').innerHTML = `
      <table class="schedule-table">
        <thead><tr>
          <th>Horário</th><th>Modalidade</th><th>Nível</th><th>Professor</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  showDay(document.querySelector('.tab-btn'), 'seg');

  // ─── FORM SUBMIT
  function submitForm(e) {
    e.preventDefault();
    const btn = document.querySelector('.form-submit');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      document.getElementById('contactForm').reset();
      document.getElementById('formSuccess').style.display = 'block';
      btn.textContent = 'Enviar Mensagem →';
      btn.disabled = false;
      setTimeout(() => {
        document.getElementById('formSuccess').style.display = 'none';
      }, 5000);
    }, 1200);
  }

  // ─── SCROLL ANIMATIONS
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .plano-card, .contato-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

