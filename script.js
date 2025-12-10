const gallery = document.querySelector(".gallery");

// Create modal container
const modal = document.createElement("div");
modal.className = "art-modal";
document.body.appendChild(modal);

// Show modal
function showModal(art) {
  modal.innerHTML = `
    <div class="art-modal-content">
    
    

      <div class="modal-left">
        <img src="Assets/Art/${art.image}" alt="${art.name}">
      </div>
      <div class="modal-right">
        <h2>${art.name}</h2>
        <p class="year">${art.date}</p>
        <p class="dimensions">${art.size}</p>
        <p class="description">${art.description}</p>

        <div class="price-and-buttons">
          <p class="price">$${art.price}</p>
          <div class="buttons">
            
            <button class="buy-btn">BUY</button>
            <button class="contact-btn">CONTACT</button>
            <div class="contact-form">
             <form>

  <!-- Name Field -->
 

  <!-- Contact Fields (row layout) -->
  <div class="contact-contacts">
   <div class="contact-name">
    <label for="artist-contact-name">Name</label>
    <input 
      type="text" 
      id="artist-contact-name" 
      name="name" 
      placeholder="Your Name" 
      required
    />
  </div>
    <div class="contact-email">
      <label for="artist-contact-email">Email</label>
      <input 
        type="email" 
        id="artist-contact-email" 
        name="email" 
        placeholder="you@email.com" 
        required
      />
    </div>

    <div class="contact-phone">
      <label for="artist-contact-phone">Phone</label>
      <input 
        type="tel" 
        id="artist-contact-phone" 
        name="phone" 
        placeholder="Optional" 
      />
    </div>
  </div>

  <!-- Message Field -->
  <div class="contact-message">
    <label for="artist-contact-message">Message</label>
    <textarea 
      id="artist-contact-message" 
      name="message" 
      placeholder="Write your message..."
      required
    ></textarea>
  </div>

  <!-- Send Button -->
  <div class="contact-message-send">
    <div class="sendbutton" type="submit">Send</div>
  </div>

</form>

            </div>
            


            </div></div>
          </div>
        </div>

   
      </div>
    </div>
    <span class="modal-close">&times;</span>
  `;

  modal.classList.add("show");

  // Get elements
  const modalContent = modal.querySelector(".art-modal-content");
  const modalLeft = modal.querySelector(".modal-left");
  const modalRight = modal.querySelector(".modal-right");
  const img = modalLeft.querySelector("img");
 

const contactBtn = document.querySelector('.contact-btn'); // your button
const contactForm = document.querySelector('.contact-form');

contactBtn.addEventListener('click', () => {
  contactForm.classList.toggle('show');
});


  function resizeModal() {
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.9;
    let modalWidth, modalHeight;

    if (window.innerWidth > 768) {
      // Desktop: width scales from image width*2
      modalHeight = maxHeight;
      modalWidth = (modalHeight / img.naturalHeight) * img.naturalWidth * 2;

      if (modalWidth > maxWidth) {
        const scale = maxWidth / modalWidth;
        modalWidth *= scale;
        modalHeight *= scale;
      }

      modalContent.style.flexDirection = 'row';
    } else {
      // Mobile: height scales from image height*2
      modalWidth = maxWidth;
      modalHeight = (modalWidth / img.naturalWidth) * img.naturalHeight * 2;

      if (modalHeight > maxHeight) {
        const scale = maxHeight / modalHeight;
        modalWidth *= scale;
        modalHeight *= scale;
      }

      modalContent.style.flexDirection = 'column';
    }

    modalContent.style.width = `${modalWidth}px`;
    modalContent.style.height = `${modalHeight}px`;

    modalLeft.style.width = window.innerWidth > 768 ? modalWidth / 2 + "px" : modalWidth + "px";
    modalLeft.style.height = "auto";

    modalRight.style.height = window.innerWidth > 768 ? modalHeight + "px" : `${modalHeight - modalLeft.offsetHeight}px`;
  }
  img.onload = resizeModal;
  window.addEventListener('resize', resizeModal);

  // Close modal
  const closeModal = () => {
    modal.classList.remove("show");
    window.removeEventListener('resize', resizeModal);
  };
  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });


}

// Load gallery
async function loadGallery() {
  const response = await fetch("artworks.json");
  const artworks = await response.json();
  gallery.innerHTML = "";

  artworks.forEach(art => {
    const card = document.createElement("div");
    card.className = "art-card";

    // Artwork image
    const img = document.createElement("img");
    img.src = `Assets/Art/${art.image}`;
    img.alt = art.name;

    // Overlay div
    const overlay = document.createElement("div");
    overlay.className = "art-overlay";

    // Artwork name inside overlay
    const name = document.createElement("span");
    name.className = "art-name";
    name.textContent = art.name;

    overlay.appendChild(name);
    card.appendChild(img);
    card.appendChild(overlay);
    gallery.appendChild(card);

    // Click to open modal
    card.addEventListener("click", () => showModal(art));
  });
}

window.addEventListener("load", () => {
    const headerCenter = document.querySelector(".header-center");
    const menuButton = document.querySelector(".header-right .menu");

    // Function to update menu based on window width
    function updateMenu() {
        if (window.innerWidth > 768) {
            headerCenter.classList.remove("active");
            headerCenter.style.display = "flex";  // Desktop layout
            menuButton.style.display = "none";
        } else {
            headerCenter.style.display = "flex";  // keep flex for mobile dropdown
            menuButton.style.display = "block";   // show hamburger
        }
    }

    // Initial check
    updateMenu();

    // Update on resize
    window.addEventListener("resize", updateMenu);

    // Toggle dropdown on click
    menuButton.addEventListener("click", () => {
        headerCenter.classList.toggle("active");
    });
});



loadGallery();