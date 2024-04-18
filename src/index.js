const handleClick = (ramen) => {
  // Display ramen details in #ramen-detail div
  const ramenDetail = document.getElementById('ramen-detail');
  ramenDetail.innerHTML = `
    <img src="${ramen.image}" alt="${ramen.name}">
    <h3>${ramen.name}</h3>
    <p>Rating: ${ramen.rating}</p>
    <p>Comment: ${ramen.comment}</p>
  `;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    // Handle form submission to add new ramen
    const formData = new FormData(form);
    const newRamen = {
      name: formData.get('name'),
      image: formData.get('image'),
      rating: formData.get('rating'),
      comment: formData.get('comment')
    };
    displayNewRamen(newRamen);
    form.reset();
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      // Display ramen images in #ramen-menu div
      const ramenMenu = document.getElementById('ramen-menu');
      data.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching ramen data:', error));
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
