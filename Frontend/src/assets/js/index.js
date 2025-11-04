// Check if the .projects-section element exists

export function index(){
  const projectsSection = document.querySelector('.projects-section');
  if (projectsSection) {
    const tabs = projectsSection.querySelectorAll('.tab_btns');
    
    
  
    // Function to open the modal
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', (e) => {
        // Remove 'active' class from all tabs
        tabs.forEach(tab => {
          tab.classList.remove('active');
        });
  
        // Add 'active' class to the clicked tab
        tab.classList.add('active');
  
        // Move the line to the clicked tab
        const line = projectsSection.querySelector('.line');
        const tabWidth = tab.offsetWidth;
        
        const tabLeft = tab.offsetLeft;
        const lineWidth = line.offsetWidth;
        console.log(tabLeft);
        const lineLeft = tabLeft + (tabWidth - lineWidth) / 2;
        line.style.left = lineLeft + "px";
  
        all_content.forEach(content => {
          content.classList.remove('active')
        })
        all_content[index].classList.add('active')
      });
    });
  
    // Event listener for the create button
    
  }
}
