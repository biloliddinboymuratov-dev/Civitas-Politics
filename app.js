/* =============================================
   CIVITAS POLITICS — Interactive Features
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // THEME TOGGLE (Light / Dark Mode)
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const themeIcon = themeToggle.querySelector('i');

  const savedTheme = localStorage.getItem('civitas-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('civitas-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }

  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navLinks = nav.querySelectorAll('.nav__link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // ==========================================
  // ACTIVE NAV LINK HIGHLIGHT (Scroll Spy)
  // ==========================================
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('load', updateActiveNav);

  // ==========================================
  // COUNTER ANIMATION (Intersection Observer)
  // ==========================================
  const counters = document.querySelectorAll('.counter-value');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2000;
        const startTime = performance.now();

        function animateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(eased * target);

          if (target >= 1000) {
            el.textContent = currentValue.toLocaleString();
          } else {
            el.textContent = currentValue;
          }

          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            el.textContent = target.toLocaleString();
          }
        }
        requestAnimationFrame(animateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // GLOBAL DATA: 87 Countries
  // ==========================================
  const countries = [
    {name:'Afghanistan',flag:'🇦🇫',lat:33.94,lng:67.71},
    {name:'Albania',flag:'🇦🇱',lat:41.15,lng:20.17},
    {name:'Algeria',flag:'🇩🇿',lat:28.03,lng:1.66},
    {name:'Angola',flag:'🇦🇴',lat:-11.20,lng:17.87},
    {name:'Argentina',flag:'🇦🇷',lat:-38.42,lng:-63.62},
    {name:'Armenia',flag:'🇦🇲',lat:40.07,lng:45.04},
    {name:'Australia',flag:'🇦🇺',lat:-25.27,lng:133.78},
    {name:'Austria',flag:'🇦🇹',lat:47.52,lng:14.55},
    {name:'Azerbaijan',flag:'🇦🇿',lat:40.14,lng:47.58},
    {name:'Bangladesh',flag:'🇧🇩',lat:23.68,lng:90.36},
    {name:'Belarus',flag:'🇧🇾',lat:53.71,lng:27.95},
    {name:'Belgium',flag:'🇧🇪',lat:50.85,lng:4.35},
    {name:'Bolivia',flag:'🇧🇴',lat:-16.29,lng:-63.59},
    {name:'Bosnia',flag:'🇧🇦',lat:43.92,lng:17.68},
    {name:'Brazil',flag:'🇧🇷',lat:-14.24,lng:-51.93},
    {name:'Bulgaria',flag:'🇧🇬',lat:42.73,lng:25.49},
    {name:'Cambodia',flag:'🇰🇭',lat:12.57,lng:104.99},
    {name:'Cameroon',flag:'🇨🇲',lat:3.85,lng:11.50},
    {name:'Canada',flag:'🇨🇦',lat:56.13,lng:-106.35},
    {name:'Chad',flag:'🇹🇩',lat:15.45,lng:18.73},
    {name:'Chile',flag:'🇨🇱',lat:-35.68,lng:-71.54},
    {name:'China',flag:'🇨🇳',lat:35.86,lng:104.20},
    {name:'Colombia',flag:'🇨🇴',lat:4.57,lng:-74.30},
    {name:'Costa Rica',flag:'🇨🇷',lat:9.75,lng:-83.75},
    {name:'Croatia',flag:'🇭🇷',lat:45.10,lng:15.20},
    {name:'Cuba',flag:'🇨🇺',lat:21.52,lng:-77.78},
    {name:'Cyprus',flag:'🇨🇾',lat:35.13,lng:33.43},
    {name:'Czech Republic',flag:'🇨🇿',lat:49.82,lng:15.47},
    {name:'Denmark',flag:'🇩🇰',lat:56.26,lng:9.50},
    {name:'Dominican Rep.',flag:'🇩🇴',lat:18.74,lng:-70.16},
    {name:'Ecuador',flag:'🇪🇨',lat:-1.83,lng:-78.18},
    {name:'Egypt',flag:'🇪🇬',lat:26.82,lng:30.80},
    {name:'Estonia',flag:'🇪🇪',lat:58.60,lng:25.01},
    {name:'Ethiopia',flag:'🇪🇹',lat:9.15,lng:40.49},
    {name:'Finland',flag:'🇫🇮',lat:61.92,lng:25.75},
    {name:'France',flag:'🇫🇷',lat:46.60,lng:2.21},
    {name:'Georgia',flag:'🇬🇪',lat:42.32,lng:43.36},
    {name:'Germany',flag:'🇩🇪',lat:51.17,lng:10.45},
    {name:'Ghana',flag:'🇬🇭',lat:7.95,lng:-1.02},
    {name:'Greece',flag:'🇬🇷',lat:39.07,lng:21.82},
    {name:'Guatemala',flag:'🇬🇹',lat:15.78,lng:-90.23},
    {name:'Honduras',flag:'🇭🇳',lat:15.20,lng:-86.24},
    {name:'Hong Kong',flag:'🇭🇰',lat:22.32,lng:114.17},
    {name:'Hungary',flag:'🇭🇺',lat:47.16,lng:19.50},
    {name:'Iceland',flag:'🇮🇸',lat:64.96,lng:-18.69},
    {name:'India',flag:'🇮🇳',lat:20.59,lng:78.96},
    {name:'Indonesia',flag:'🇮🇩',lat:-0.79,lng:113.92},
    {name:'Iran',flag:'🇮🇷',lat:32.43,lng:53.69},
    {name:'Iraq',flag:'🇮🇶',lat:33.22,lng:43.68},
    {name:'Ireland',flag:'🇮🇪',lat:53.41,lng:-8.24},
    {name:'Israel',flag:'🇮🇱',lat:31.05,lng:34.85},
    {name:'Italy',flag:'🇮🇹',lat:41.87,lng:12.57},
    {name:'Japan',flag:'🇯🇵',lat:36.20,lng:138.25},
    {name:'Jordan',flag:'🇯🇴',lat:30.59,lng:36.24},
    {name:'Kazakhstan',flag:'🇰🇿',lat:48.02,lng:66.92},
    {name:'Kenya',flag:'🇰🇪',lat:-0.02,lng:37.91},
    {name:'Kuwait',flag:'🇰🇼',lat:29.31,lng:47.48},
    {name:'Kyrgyzstan',flag:'🇰🇬',lat:41.20,lng:74.77},
    {name:'Latvia',flag:'🇱🇻',lat:56.88,lng:24.60},
    {name:'Lebanon',flag:'🇱🇧',lat:33.85,lng:35.86},
    {name:'Libya',flag:'🇱🇾',lat:26.34,lng:17.23},
    {name:'Lithuania',flag:'🇱🇹',lat:55.17,lng:23.88},
    {name:'Luxembourg',flag:'🇱🇺',lat:49.82,lng:6.13},
    {name:'Malaysia',flag:'🇲🇾',lat:4.21,lng:101.98},
    {name:'Maldives',flag:'🇲🇻',lat:3.20,lng:73.22},
    {name:'Mexico',flag:'🇲🇽',lat:23.63,lng:-102.55},
    {name:'Moldova',flag:'🇲🇩',lat:47.41,lng:28.37},
    {name:'Mongolia',flag:'🇲🇳',lat:46.86,lng:103.85},
    {name:'Morocco',flag:'🇲🇦',lat:31.17,lng:-7.15},
    {name:'Myanmar',flag:'🇲🇲',lat:21.92,lng:95.96},
    {name:'Nepal',flag:'🇳🇵',lat:28.39,lng:84.12},
    {name:'Netherlands',flag:'🇳🇱',lat:52.13,lng:5.29},
    {name:'New Zealand',flag:'🇳🇿',lat:-40.90,lng:174.89},
    {name:'Nigeria',flag:'🇳🇬',lat:9.08,lng:8.68},
    {name:'North Macedonia',flag:'🇲🇰',lat:41.61,lng:21.75},
    {name:'Norway',flag:'🇳🇴',lat:60.47,lng:8.47},
    {name:'Pakistan',flag:'🇵🇰',lat:30.38,lng:69.35},
    {name:'Palestine',flag:'🇵🇸',lat:31.95,lng:35.23},
    {name:'Peru',flag:'🇵🇪',lat:-9.19,lng:-75.02},
    {name:'Philippines',flag:'🇵🇭',lat:12.88,lng:121.77},
    {name:'Poland',flag:'🇵🇱',lat:51.92,lng:19.15},
    {name:'Portugal',flag:'🇵🇹',lat:39.40,lng:-8.22},
    {name:'Qatar',flag:'🇶🇦',lat:25.35,lng:51.18},
    {name:'Romania',flag:'🇷🇴',lat:45.94,lng:24.97},
    {name:'Russia',flag:'🇷🇺',lat:61.52,lng:105.32},
    {name:'Saudi Arabia',flag:'🇸🇦',lat:23.89,lng:45.08},
    {name:'Senegal',flag:'🇸🇳',lat:14.50,lng:-14.45},
    {name:'Serbia',flag:'🇷🇸',lat:44.02,lng:21.01},
    {name:'Singapore',flag:'🇸🇬',lat:1.35,lng:103.82},
    {name:'Slovakia',flag:'🇸🇰',lat:48.67,lng:19.70},
    {name:'Slovenia',flag:'🇸🇮',lat:46.15,lng:14.99},
    {name:'South Africa',flag:'🇿🇦',lat:-30.56,lng:22.94},
    {name:'South Korea',flag:'🇰🇷',lat:35.91,lng:127.77},
    {name:'Spain',flag:'🇪🇸',lat:40.46,lng:-3.75},
    {name:'Sri Lanka',flag:'🇱🇰',lat:7.87,lng:80.77},
    {name:'Sudan',flag:'🇸🇩',lat:12.86,lng:30.22},
    {name:'Sweden',flag:'🇸🇪',lat:60.13,lng:18.64},
    {name:'Switzerland',flag:'🇨🇭',lat:46.82,lng:8.23},
    {name:'Syria',flag:'🇸🇾',lat:34.80,lng:39.00},
    {name:'Taiwan',flag:'🇹🇼',lat:23.70,lng:120.96},
    {name:'Tajikistan',flag:'🇹🇯',lat:38.86,lng:71.28},
    {name:'Tanzania',flag:'🇹🇿',lat:-6.37,lng:34.89},
    {name:'Thailand',flag:'🇹🇭',lat:15.87,lng:100.99},
    {name:'Tunisia',flag:'🇹🇳',lat:33.89,lng:9.54},
    {name:'Turkey',flag:'🇹🇷',lat:38.96,lng:35.24},
    {name:'Turkmenistan',flag:'🇹🇲',lat:39.00,lng:59.73},
    {name:'Uganda',flag:'🇺🇬',lat:1.37,lng:32.29},
    {name:'Ukraine',flag:'🇺🇦',lat:48.38,lng:31.17},
    {name:'UAE',flag:'🇦🇪',lat:23.42,lng:53.85},
    {name:'UK',flag:'🇬🇧',lat:55.38,lng:-3.44},
    {name:'USA',flag:'🇺🇸',lat:37.09,lng:-95.71},
    {name:'Uruguay',flag:'🇺🇾',lat:-32.52,lng:-55.77},
    {name:'Uzbekistan',flag:'🇺🇿',lat:41.38,lng:64.58},
    {name:'Venezuela',flag:'🇻🇪',lat:6.42,lng:-66.59},
    {name:'Vietnam',flag:'🇻🇳',lat:14.06,lng:108.28},
    {name:'Yemen',flag:'🇾🇪',lat:15.55,lng:48.52},
    {name:'Zambia',flag:'🇿🇲',lat:-13.13,lng:27.85},
    {name:'Zimbabwe',flag:'🇿🇼',lat:-19.01,lng:29.15}
  ];

  // ==========================================
  // NAME & CONTENT POOLS
  // ==========================================
  const firstNames = [
    'Aisha','Bilal','Chiara','Dmitri','Elena','Farid','Grace','Hiroshi','Ingrid','Jamal',
    'Kiran','Liam','Maya','Nadia','Omar','Priya','Qadir','Rosa','Santiago','Tatiana',
    'Umar','Valentina','Wei','Ximena','Yuki','Zara','Ahmed','Bianca','Chul','Daria',
    'Emeka','Fatima','Giang','Hana','Ibrahim','Jasmine','Khalid','Linh','Mei','Nabil',
    'Olga','Pavel','Rashid','Sofia','Tariq','Umaiza','Vlad','Wen','Xiao','Yusuf',
    'Zayn','Amara','Bekzod','Camila','Deepak','Elif','Fernando','Gulnara','Hassan',
    'Iryna','Jin','Katerina','Laila','Milan','Najma','Oksana','Phuong','Rafael',
    'Sakura','Tamara','Ulrich','Viktoria','Walid','Yara','Zahra','Adil','Botagoz',
    'Cheng','Dilnaz','Erik','Farzona','Gunnar','Hyejin','Ilkin','Javokhir','Kamil',
    'Leyla','Murod','Nargiza','Otabek','Parviz','Rano','Shahzod','Takhmina','Ulugbek',
    'Venera','Yulduz','Zafar','Alisher','Barno','Diyor','Feruza','Gulasal','Hilola',
    'Izzat','Jahongir','Kamola','Lobar','Maftuna','Nigora','Ozod','Rustam','Sevara'
  ];

  const lastNames = [
    'Ahmedov','Bennani','Chen','Dupont','Espinoza','Fernandez','Garcia','Hassan',
    'Ivanova','Johansson','Kim','Li','Moreno','Nakamura','Okafor','Patel','Quinn',
    'Rahman','Santos','Tanaka','Umarov','Vasquez','Wang','Yilmaz','Zhang',
    'Abramyan','Bakhtiyarov','Castillo','Durand','El-Masri','Fischer','Gomes',
    'Hussein','Ismailov','Jensen','Khalili','Lopez','Mammadov','Nazarov','Ozturk',
    'Petrov','Rojas','Sato','Thapa','Ubaydullayev','Vidal','Watanabe','Yildirim',
    'Zakirov','Almeida','Borges','Choi','Dominguez','Escobar','Fujita','Gupta',
    'Herrera','Igwe','Jimenez','Kowalski','Liang','Mendoza','Nguyen','Oh',
    'Park','Qureshi','Rodriguez','Suleymanov','Takahashi','Uchida','Valdez',
    'Wu','Yamamoto','Zambrano','Akbarov','Bayramova','Collins','Dos Santos',
    'Ekinci','Filippov','Gonzalez','Hashimoto','Isaeva','Jang','Kambarov'
  ];

  const categories = [
    'Foreign Policy','Political Theory','International Relations','Civic Engagement',
    'Research Paper','Comparative Politics','Public Policy','Political Economy',
    'Security Studies','Human Rights','Diplomacy','Governance',
    'Academic Essay','Policy Brief','Thesis Excerpt','Field Research',
    'Environmental Policy','Political Philosophy','Democracy Studies','Conflict Resolution'
  ];

  const articleTopics = [
    'The Impact of Digital Diplomacy on International Relations',
    'Political Polarization in the Age of Social Media',
    'Democratization Processes in Post-Soviet States',
    'Climate Policy and International Cooperation',
    'The Role of Youth in Peacebuilding Initiatives',
    'Electoral Systems and Political Representation',
    'Human Rights Frameworks in Developing Nations',
    'Economic Sanctions as a Foreign Policy Tool',
    'Gender Equality in Political Leadership',
    'The Geopolitics of Central Asia',
    'Political Communication and Public Opinion',
    'Migration Policy and Regional Security',
    'The Future of Multilateral Institutions',
    'Cybersecurity and International Norms',
    'Political Islam and Democratic Governance',
    'Water Diplomacy in Transboundary Basins',
    'Media Literacy and Democratic Resilience',
    'Populism and Its Impact on Global Governance',
    'Nuclear Non-Proliferation in the 21st Century',
    'Regional Integration in Southeast Asia',
    'The Political Economy of Natural Resources',
    'Transitional Justice in Post-Conflict Societies',
    'Digital Authoritarianism and Surveillance',
    'Soft Power and Cultural Diplomacy',
    'Global Health Governance After COVID-19',
    'Terrorism and Counter-Terrorism Strategies',
    'Indigenous Rights and International Law',
    'The Politics of International Trade Agreements',
    'Education Policy and Civic Engagement',
    'Urban Governance and Sustainable Development'
  ];

  const schoolsByRegion = {
    'Central Asia': ['Tashkent State University','University of World Economy','Kazakh National University','American University of Central Asia','Samarkand State University','Tashkent University of Information Technologies'],
    'South Asia': ['University of Dhaka','Delhi University','Lahore University of Management Sciences','Tribhuvan University','University of Colombo'],
    'East Asia': ['Seoul National University','University of Tokyo','Tsinghua University','National Taiwan University','University of Hong Kong'],
    'Southeast Asia': ['University of Malaya','Chulalongkorn University','National University of Singapore','University of the Philippines','Vietnam National University'],
    'Middle East': ['American University of Beirut','University of Tehran','Hebrew University','Sabancı University','Qatar University'],
    'Africa': ['University of Cape Town','University of Nairobi','University of Ghana','American University in Cairo','Addis Ababa University'],
    'Europe': ['University of Oxford','Humboldt University','Sciences Po','University of Bologna','Stockholm University','University of Vienna'],
    'North America': ['Harvard University','University of Toronto','Stanford University','McGill University','UC Berkeley'],
    'South America': ['University of São Paulo','University of Buenos Aires','Pontifical Catholic University of Chile','National University of Colombia'],
    'Oceania': ['University of Sydney','University of Auckland','Australian National University','University of Melbourne'],
    'Russia & Caucasus': ['Moscow State University','Tbilisi State University','Baku State University','Yerevan State University'],
    'Balkans': ['University of Belgrade','University of Zagreb','University of Sarajevo','University of Tirana']
  };

  function getRegionForCountry(countryName) {
    const ca = ['Kazakhstan','Kyrgyzstan','Tajikistan','Turkmenistan','Uzbekistan'];
    const sa = ['Bangladesh','India','Nepal','Pakistan','Sri Lanka','Maldives'];
    const ea = ['China','Japan','South Korea','Taiwan','Mongolia','Hong Kong'];
    const sea = ['Cambodia','Indonesia','Malaysia','Myanmar','Philippines','Singapore','Thailand','Vietnam'];
    const me = ['Iran','Iraq','Israel','Jordan','Kuwait','Lebanon','Palestine','Qatar','Saudi Arabia','Syria','Turkey','UAE','Yemen','Cyprus'];
    const af = ['Algeria','Angola','Cameroon','Chad','Egypt','Ethiopia','Ghana','Kenya','Libya','Morocco','Nigeria','Senegal','South Africa','Sudan','Tanzania','Tunisia','Uganda','Zambia','Zimbabwe'];
    const eu = ['Albania','Armenia','Austria','Azerbaijan','Belarus','Belgium','Bosnia','Bulgaria','Croatia','Czech Republic','Denmark','Estonia','Finland','France','Georgia','Germany','Greece','Hungary','Iceland','Ireland','Italy','Latvia','Lithuania','Luxembourg','Moldova','Netherlands','North Macedonia','Norway','Poland','Portugal','Romania','Serbia','Slovakia','Slovenia','Spain','Sweden','Switzerland','Ukraine','UK'];
    const na = ['Canada','Costa Rica','Cuba','Dominican Rep.','Guatemala','Honduras','Mexico','USA'];
    const sam = ['Argentina','Bolivia','Brazil','Chile','Colombia','Ecuador','Peru','Uruguay','Venezuela'];
    const oc = ['Australia','New Zealand'];
    const rc = ['Russia','Armenia','Azerbaijan','Georgia'];

    if (ca.includes(countryName)) return 'Central Asia';
    if (sa.includes(countryName)) return 'South Asia';
    if (ea.includes(countryName)) return 'East Asia';
    if (sea.includes(countryName)) return 'Southeast Asia';
    if (me.includes(countryName)) return 'Middle East';
    if (af.includes(countryName)) return 'Africa';
    if (eu.includes(countryName)) return 'Europe';
    if (na.includes(countryName)) return 'North America';
    if (sam.includes(countryName)) return 'South America';
    if (oc.includes(countryName)) return 'Oceania';
    if (rc.includes(countryName)) return 'Russia & Caucasus';
    return 'Europe';
  }

  // ==========================================
  // GENERATE 487 STUDENT VOICES (random distribution)
  // ==========================================
  function generateVoices() {
    const voices = [];
    const targetTotal = 487;

    // Assign random weight per country (1-12) so counts are unequal
    let weights = countries.map(c => {
      let base = 1 + Math.floor(Math.random() * 6);
      if (c.name === 'Uzbekistan') base = 10 + Math.floor(Math.random() * 5);
      else if (['USA','UK','Germany','France','China','India','Turkey','Russia','South Korea','Japan','Brazil','South Africa'].includes(c.name)) base = 5 + Math.floor(Math.random() * 6);
      else if (['Kazakhstan','Kyrgyzstan','Tajikistan','Turkmenistan','Azerbaijan','Georgia'].includes(c.name)) base = 4 + Math.floor(Math.random() * 4);
      else if (Math.random() < 0.2) base = 2 + Math.floor(Math.random() * 3);
      return { country: c, weight: base };
    });

    const totalWeight = weights.reduce((s, w) => s + w.weight, 0);

    weights.forEach((w, idx) => {
      const raw = (w.weight / totalWeight) * targetTotal;
      const count = Math.max(1, Math.round(raw));
      const region = getRegionForCountry(w.country.name);
      const schools = schoolsByRegion[region] || ['University of the World'];

      for (let i = 0; i < count; i++) {
        const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
        const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
        const initials = fn[0] + ln[0];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const topic = articleTopics[Math.floor(Math.random() * articleTopics.length)];
        const school = schools[Math.floor(Math.random() * schools.length)];
        const readTime = (4 + Math.floor(Math.random() * 14)) + ' min read';
        const excerpt = `An in-depth ${category.toLowerCase()} piece exploring critical dimensions of ${topic.toLowerCase()}. Contributed as part of Civitas Politics&rsquo; global student voices initiative.`;

        voices.push({
          id: voices.length + 1,
          name: `${fn} ${ln}`,
          initials,
          country: w.country.name,
          flag: w.country.flag,
          school,
          category,
          topic,
          excerpt,
          readTime
        });
      }
    });

    return voices.sort(() => Math.random() - 0.5);
  }

  const studentVoices = generateVoices();

  // ==========================================
  // RENDER WORLD MAP (color intensity by count)
  // ==========================================
  function getStudentCount(countryName) {
    return studentVoices.filter(v => v.country === countryName).length;
  }

  function getColorIntensity(count) {
    if (count <= 2) return '#FDA4AF';     // lightest
    if (count <= 4) return '#F87171';
    if (count <= 6) return '#EF4444';     // medium
    if (count <= 9) return '#DC2626';     // medium-dark
    if (count <= 12) return '#B91C1C';    // dark
    return '#7F1D1D';                      // darkest (13+)
  }

  function getDotRadius(count) {
    const minR = 3, maxR = 9;
    const maxCount = 15;
    const clamped = Math.min(count, maxCount);
    return minR + (clamped / maxCount) * (maxR - minR);
  }

  function renderMap() {
    const svg = document.querySelector('.reach-map__svg');
    if (!svg) return;

    const viewBox = 1000;
    const aspect = 500;

    // Get count distribution for legend
    const allCounts = countries.map(c => getStudentCount(c.name));
    const maxCount = Math.max(...allCounts);

    countries.forEach(c => {
      const x = ((c.lng + 180) / 360) * viewBox;
      const y = ((90 - c.lat) / 180) * aspect;
      const count = getStudentCount(c.name);
      const color = getColorIntensity(count);
      const radius = getDotRadius(count);

      const dotGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', x);
      dot.setAttribute('cy', y);
      dot.setAttribute('r', radius);
      dot.setAttribute('fill', color);
      dot.setAttribute('class', 'reach-map__dot');
      dot.dataset.country = c.name;
      dot.dataset.flag = c.flag;
      dot.dataset.count = count;

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', x);
      label.setAttribute('y', y - radius - 4);
      label.setAttribute('class', 'reach-map__dot-label');
      label.textContent = `${count}`;
      label.style.fontSize = Math.max(4, Math.min(7, 3 + count * 0.3)) + 'px';

      dot.addEventListener('mouseenter', (e) => showTooltip(e, c));
      dot.addEventListener('mouseleave', hideTooltip);

      dotGroup.appendChild(dot);
      dotGroup.appendChild(label);
      svg.appendChild(dotGroup);
    });

    // Legend
    const legend = document.getElementById('mapLegend');
    if (legend) {
      const levels = [
        { label: '1–2', color: '#FDA4AF' },
        { label: '3–4', color: '#F87171' },
        { label: '5–6', color: '#EF4444' },
        { label: '7–9', color: '#DC2626' },
        { label: '10–12', color: '#B91C1C' },
        { label: `13+`, color: '#7F1D1D' }
      ];
      legend.innerHTML = `
        <div class="reach-map__legend-title">Contributors</div>
        ${levels.map(l => `
          <div class="reach-map__legend-row">
            <span class="reach-map__legend-dot" style="background:${l.color}"></span>
            ${l.label}
          </div>
        `).join('')}
        <div class="reach-map__legend-row" style="margin-top:0.2rem;border-top:1px solid var(--border-color);padding-top:0.3rem;">
          <span style="color:var(--color-electric);font-weight:700;">✦</span> HQ: Uzbekistan
        </div>
      `;
    }

    // Highlight Uzbekistan
    const uz = countries.find(c => c.name === 'Uzbekistan');
    if (uz) {
      const x = ((uz.lng + 180) / 360) * viewBox;
      const y = ((90 - uz.lat) / 180) * aspect;
      const star = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      star.setAttribute('x', x);
      star.setAttribute('y', y - 14);
      star.setAttribute('font-size', '18');
      star.setAttribute('fill', 'var(--color-electric-light)');
      star.setAttribute('text-anchor', 'middle');
      star.setAttribute('font-family', 'Inter, sans-serif');
      star.setAttribute('font-weight', '700');
      star.setAttribute('stroke', 'white');
      star.setAttribute('stroke-width', '0.5');
      star.textContent = '★';
      svg.appendChild(star);
    }
  }

  // Map tooltip
  let tooltipEl = null;

  function showTooltip(e, country) {
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.className = 'reach-map__tooltip';
      document.getElementById('worldMap').appendChild(tooltipEl);
    }
    const rect = document.getElementById('worldMap').getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const count = studentVoices.filter(v => v.country === country.name).length;
    tooltipEl.textContent = `${country.flag} ${country.name} — ${count} contributors`;
    tooltipEl.style.left = Math.min(cx, rect.width - tooltipEl.offsetWidth - 10) + 'px';
    tooltipEl.style.top = (cy - 40) + 'px';
    tooltipEl.classList.add('show');
  }

  function hideTooltip() {
    if (tooltipEl) tooltipEl.classList.remove('show');
  }

  // Countries list toggle
  const countriesToggle = document.getElementById('countriesToggle');
  const countriesList = document.getElementById('countriesList');

  if (countriesToggle && countriesList) {
    function renderCountriesList() {
      countriesList.innerHTML = countries.map(c => {
        const count = studentVoices.filter(v => v.country === c.name).length;
        return `<span class="country-tag">${c.flag} ${c.name} (${count})</span>`;
      }).join('');
    }

    countriesToggle.addEventListener('click', () => {
      const isOpen = countriesList.classList.toggle('open');
      countriesToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i> Hide countries list'
        : '<i class="fas fa-list"></i> Show all 87 countries';
      if (isOpen) renderCountriesList();
    });
  }

  // ==========================================
  // RENDER VOICE CARDS WITH PAGINATION
  // ==========================================
  const voicesGrid = document.getElementById('voicesGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const voicesShowing = document.getElementById('voicesShowing');
  const voicesTotal = document.getElementById('voicesTotal');
  const perPage = 12;
  let currentPage = 0;

  function renderVoices() {
    voicesTotal.textContent = studentVoices.length;

    const start = 0;
    const end = Math.min(perPage, studentVoices.length);
    currentPage = 1;

    for (let i = start; i < end; i++) {
      voicesGrid.appendChild(createVoiceCard(studentVoices[i], i));
    }

    updateShowing();
    if (end >= studentVoices.length) {
      loadMoreBtn.style.display = 'none';
    }
  }

  function createVoiceCard(voice, index) {
    const article = document.createElement('article');
    article.className = `voice-card reveal${index > 0 ? '' : ''}`;
    if (index >= 12) article.style.display = 'none';
    article.dataset.index = index;

    article.innerHTML = `
      <div class="voice-card__category">${voice.flag} ${voice.category}</div>
      <h3 class="voice-card__title">${voice.topic}</h3>
      <p class="voice-card__excerpt">${voice.excerpt}</p>
      <div class="voice-card__footer">
        <div class="voice-card__author">
          <div class="voice-card__avatar">${voice.initials}</div>
          <div class="voice-card__author-info">
            <div class="voice-card__author-name">${voice.name}</div>
            <div class="voice-card__author-school">${voice.flag} ${voice.country} &middot; ${voice.school}</div>
          </div>
        </div>
        <span class="voice-card__read-time"><i class="far fa-clock"></i> ${voice.readTime}</span>
      </div>
    `;
    return article;
  }

  function loadMore() {
    const start = currentPage * perPage;
    const end = Math.min(start + perPage, studentVoices.length);
    const hiddenCards = voicesGrid.querySelectorAll('.voice-card[style*="display: none"]');

    hiddenCards.forEach(card => {
      const idx = parseInt(card.dataset.index);
      if (idx < end) {
        card.style.display = '';
        // Re-trigger reveal
        revealObserver.observe(card);
      }
    });

    currentPage++;
    updateShowing();

    if (end >= studentVoices.length) {
      loadMoreBtn.style.display = 'none';
    }
  }

  function updateShowing() {
    const shown = Math.min(currentPage * perPage, studentVoices.length);
    voicesShowing.textContent = `Showing ${shown} of ${studentVoices.length} contributions`;
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMore);
  }

  // ==========================================
  // FILE UPLOAD (Drag & Drop + Validation)
  // ==========================================
  const fileUpload = document.getElementById('fileUpload');
  const fileInput = document.getElementById('fileInput');
  const filePreview = document.getElementById('filePreview');
  const fileName = document.getElementById('fileName');
  const allowedExtensions = ['.doc', '.docx', '.pdf'];
  const maxSize = 10 * 1024 * 1024;

  if (fileUpload) {
    fileUpload.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) validateAndPreview(fileInput.files[0]);
    });

    fileUpload.addEventListener('dragover', (e) => {
      e.preventDefault(); e.stopPropagation();
      fileUpload.classList.add('dragover');
    });

    fileUpload.addEventListener('dragleave', (e) => {
      e.preventDefault(); e.stopPropagation();
      fileUpload.classList.remove('dragover');
    });

    fileUpload.addEventListener('drop', (e) => {
      e.preventDefault(); e.stopPropagation();
      fileUpload.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        validateAndPreview(e.dataTransfer.files[0]);
        fileInput.files = e.dataTransfer.files;
      }
    });
  }

  function validateAndPreview(file) {
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      alert('Invalid file format. Please upload .doc, .docx, or .pdf files only.');
      fileInput.value = '';
      return;
    }
    if (file.size > maxSize) {
      alert('File is too large. Maximum size is 10 MB.');
      fileInput.value = '';
      return;
    }
    fileName.textContent = file.name;
    filePreview.classList.add('show');
  }

  // ==========================================
  // FORM VALIDATION & SUBMISSION
  // ==========================================

  // Voice Form
  const voiceForm = document.getElementById('voiceForm');
  if (voiceForm) {
    voiceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('fullName').value.trim();
      const school = document.getElementById('school').value.trim();
      const topic = document.getElementById('topic').value.trim();
      const file = fileInput ? fileInput.files[0] : null;

      if (!fullName || !school || !topic) {
        alert('Please fill in all required fields.');
        return;
      }
      if (!file) {
        alert('Please upload your article, research paper, or essay (.doc, .docx, or .pdf).');
        return;
      }
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        alert('Invalid file format. Please upload .doc, .docx, or .pdf files only.');
        return;
      }
      if (file.size > maxSize) {
        alert('File is too large. Maximum size is 10 MB.');
        return;
      }

      alert(`Thank you, ${fullName}! Your contribution "${topic}" has been submitted for review. Our editorial team will reach out to you soon.`);
      voiceForm.reset();
      if (filePreview) filePreview.classList.remove('show');
    });
  }

  // Telegram Form
  const telegramForm = document.getElementById('telegramForm');
  if (telegramForm) {
    telegramForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('telegramUsername').value.trim();
      const pattern = /^@\w+$/;
      if (!pattern.test(username)) {
        alert('Please enter a valid Telegram username starting with @ (e.g., @username).');
        return;
      }
      alert(`Thanks for applying, ${username}! Our team will reach out to you on Telegram within 48 hours.`);
      telegramForm.reset();
    });
  }

  // School Partnership Form
  const schoolForm = document.getElementById('schoolForm');
  if (schoolForm) {
    schoolForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your partnership inquiry! Our collaborations team will contact you shortly.');
      schoolForm.reset();
    });
  }

  // Speaker Form
  const speakerForm = document.getElementById('speakerForm');
  if (speakerForm) {
    speakerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your interest! We will review your submission and reach out to discuss potential collaboration.');
      speakerForm.reset();
    });
  }

  // ==========================================
  // SMOOTH SCROLL ENHANCEMENT
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // RSS POLITICS NEWS FETCHER
  // ==========================================
  const newsContainer = document.getElementById('politics-news-container');
  const RSS_FEEDS = [
    'https://feeds.bbci.co.uk/news/world/rss.xml',
    'https://feeds.bbci.co.uk/news/politics/rss.xml',
    'https://www.theguardian.com/world/rss'
  ];
  const RSS2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';

  function fetchPoliticsNews() {
    if (!newsContainer) return;
    let feedIndex = 0;

    function tryNextFeed() {
      if (feedIndex >= RSS_FEEDS.length) {
        showNewsError();
        return;
      }

      const url = RSS2JSON + encodeURIComponent(RSS_FEEDS[feedIndex]);
      feedIndex++;

      fetch(url)
        .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(data => {
          if (data.status !== 'ok' || !data.items || data.items.length === 0) {
            return tryNextFeed();
          }
          renderNewsCards(data.items);
        })
        .catch(() => tryNextFeed());
    }

    tryNextFeed();
  }

  function renderNewsCards(items) {
    const cards = items.slice(0, 9).map((item, i) => {
      const img = item.enclosure && item.enclosure.link
        ? item.enclosure.link
        : (item.thumbnail || '');
      const source = new URL(item.link).hostname.replace('www.', '').split('.')[0].toUpperCase();
      const pubDate = item.pubDate ? timeAgo(new Date(item.pubDate)) : '';
      const desc = item.description
        ? item.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
        : '';
      const delay = i > 0 ? ` reveal-delay-${Math.min(i, 3)}` : '';

      return `
        <article class="news-card reveal${delay}">
          <img
            src="${img || 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?auto=format&fit=crop&w=600&q=60'}"
            alt="${item.title.replace(/"/g, '&quot;')}"
            class="news-card__image"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168d6c?auto=format&fit=crop&w=600&q=60'"
          >
          <div class="news-card__body">
            <span class="news-card__source">${source}</span>
            <h3 class="news-card__title">
              <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
            </h3>
            <p class="news-card__excerpt">${desc}</p>
            <div class="news-card__meta">
              <span>${pubDate}</span>
              ${pubDate ? '<span class="dot"></span>' : ''}
              <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="news-card__link">
                Read Full Article <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    newsContainer.innerHTML = cards;

    // Re-trigger reveal animations
    const newReveals = newsContainer.querySelectorAll('.reveal');
    newReveals.forEach(el => revealObserver.observe(el));
  }

  function showNewsError() {
    newsContainer.innerHTML = `
      <div class="news-card__error">
        <div class="news-card__error-icon"><i class="fas fa-exclamation-triangle"></i></div>
        <p class="news-card__error-text">
          Unable to fetch live news at this moment. Please check back later or visit our 
          <a href="#press" style="color:var(--color-electric);font-weight:600;">Press Room</a> 
          for official updates.
        </p>
      </div>
    `;
  }

  function timeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + 'm ago';
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + 'h ago';
    const days = Math.floor(hrs / 24);
    if (days < 7) return days + 'd ago';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  // ==========================================
  // PRESS TAB SWITCHING
  // ==========================================
  const pressTabs = document.querySelectorAll('.press__tab');
  const pressCategories = document.querySelectorAll('.press__category');

  pressTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      pressTabs.forEach(t => t.classList.remove('active'));
      pressCategories.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const cat = tab.dataset.category;
      const target = document.querySelector(`.press__category[data-category="${cat}"]`);
      if (target) target.classList.add('active');
    });
  });

  // ==========================================
  // INIT
  // ==========================================
  renderMap();
  fetchPoliticsNews();

  // ==========================================
  // KEYBOARD ACCESSIBILITY
  // ==========================================
  document.querySelectorAll('.icon-btn, .hamburger').forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

});
