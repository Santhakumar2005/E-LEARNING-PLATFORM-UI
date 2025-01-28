document.addEventListener('DOMContentLoaded', () => {
    const courseGrid = document.getElementById('courseGrid');
    const filterInput = document.getElementById('filterInput');
    const modal = document.getElementById('courseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalContent = document.getElementById('modalContent');
    const modalTime = document.getElementById('modalTime');
    const modalFee = document.getElementById('modalFee');
    const closeModal = document.querySelector('.close-btn');
  
    const termsModal = document.getElementById('termsModal');
    const acceptBtn = document.getElementById('acceptBtn');
  
    let courses = [];
  
    // Fetch courses from JSON file
    fetch('courses.json')
      .then(response => response.json())
      .then(data => {
        courses = data;
        displayCourses(courses);
      })
      .catch(error => console.error('Error loading courses:', error));
  
    // Display courses in grid
    function displayCourses(courseList) {
      courseGrid.innerHTML = '';  // Clear any existing content
      courseList.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        courseCard.innerHTML = `
          <img src="${course.image}" alt="${course.title}" />
          <div class="card-body">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <button class="details-btn" onclick="showDetails(${JSON.stringify(course)})">
              View Details
            </button>
          </div>
        `;
        courseGrid.appendChild(courseCard);
      });
    }
  
    // Show course details in the modal
    function showDetails(course) {
      modalTitle.textContent = course.title;
      modalDescription.textContent = `Description: ${course.description}`;
      modalContent.textContent = `Content: ${course.content}`;
      modalTime.textContent = `Duration: ${course.time}`;
      modalFee.textContent = `Fee: ${course.fee}`;
      modal.style.display = 'block';
    }
  
    // Close modal
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Filter courses based on search input
    filterInput.addEventListener('input', () => {
      const searchTerm = filterInput.value.toLowerCase();
      const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm)
      );
      displayCourses(filteredCourses);
    });
  
    // Show the terms modal on page load
    window.onload = function() {
      // Check if it's the user's first visit or if they have accepted the terms previously
      if (!localStorage.getItem('termsAccepted')) {
        termsModal.style.display = 'flex';
      }
    };
  
    // Close the terms modal when the user accepts
    acceptBtn.onclick = function() {
      termsModal.style.display = 'none';
      localStorage.setItem('termsAccepted', 'true'); // Store the acceptance in localStorage
    };
  
    // Close the terms modal if the user clicks outside the modal
    window.addEventListener('click', (event) => {
      if (event.target === termsModal) {
        termsModal.style.display = 'none';
      }
    });
  });
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const fullName = form.querySelector("input[placeholder='Full Name']").value.trim();
    const email = form.querySelector("input[placeholder='Email']").value.trim();
    const password = form.querySelector("input[placeholder='Password']").value.trim();
    const confirmPassword = form.querySelector("input[placeholder='Confirm Password']").value.trim();

    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Form submitted successfully!"); // For now, simulate success
    // You can redirect to a new page or send the data to a backend here
  });
