//  carrusel de fondo
        const backgroundImages = [
            'assets/img0.jpg',
            'assets/img1.jpg', 
            'assets/img2.jpg',
            'assets/img3.jpg',
            'assets/img4.jpg',
            'assets/img5.jpg'
        ];

        let currentImageIndex = 0;
        let carouselInterval;

        // funcion para iniciar el carrusel de fondo
        const initializeBackgroundCarousel = () => {
            const carousel = document.getElementById('backgroundCarousel');
            
            
            backgroundImages.forEach((imageUrl, index) => {
                const imageDiv = document.createElement('div');
                imageDiv.classList.add('background-image');
                imageDiv.style.backgroundImage = `url(${imageUrl})`;
                
                
                if (index === 0) {
                    imageDiv.classList.add('active');
                }
                
                carousel.appendChild(imageDiv);
            });
            
            startCarousel();
        };

        // funcion para cambiar a la siguiente imagen
        const nextBackgroundImage = () => {
            const images = document.querySelectorAll('.background-image');
            
    
            images[currentImageIndex].classList.remove('active');
            

            currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
            
            // activa la nueva imagen
            images[currentImageIndex].classList.add('active');
        };

        // funcion para iniciar el carrusel automaticamente
        const startCarousel = () => {
            carouselInterval = setInterval(nextBackgroundImage, 3000); // Cambiar cada 4 segundos
        };

        // funcion para pausar el carrusel
        const pauseCarousel = () => {
            clearInterval(carouselInterval);
        };

        // funcion para reanudar el carrusel
        const resumeCarousel = () => {
            startCarousel();
        };

        // funcion para generar las estrellas 
        const generateStars = (rating) => {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                stars += i <= rating ? '⭐' : '☆';
            }
            return stars;
        };

        // funcipn para manejar la seleccion de las estrellas
        const handleStarSelection = () => {
            const stars = document.querySelectorAll('.star');
            const ratingInput = document.getElementById('rating');
            const ratingText = document.getElementById('ratingText');
            
            const ratingMessages = {
                1: '⭐ Muy mala',
                2: '⭐⭐ Mala',
                3: '⭐⭐⭐ Regular',
                4: '⭐⭐⭐⭐ Buena',
                5: '⭐⭐⭐⭐⭐ Excelente'
            };

            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    const rating = index + 1;
                    ratingInput.value = rating;
                    ratingText.textContent = ratingMessages[rating];
                    
                    // actualiza la apariencia de estrellas
                    stars.forEach((s, i) => {
                        s.classList.remove('active', 'inactive');
                        if (i < rating) {
                            s.classList.add('active');
                        } else {
                            s.classList.add('inactive');
                        }
                    });
                });

                // el efecto hover
                star.addEventListener('mouseenter', () => {
                    const hoverRating = index + 1;
                    stars.forEach((s, i) => {
                        s.classList.remove('active', 'inactive');
                        if (i < hoverRating) {
                            s.classList.add('active');
                        } else {
                            s.classList.add('inactive');
                        }
                    });
                });
            });

            // restaura eñ estado original cuado sale del hover
            const starRating = document.getElementById('starRating');
            starRating.addEventListener('mouseleave', () => {
                const currentRating = parseInt(ratingInput.value);
                stars.forEach((s, i) => {
                    s.classList.remove('active', 'inactive');
                    if (currentRating > 0) {
                        if (i < currentRating) {
                            s.classList.add('active');
                        } else {
                            s.classList.add('inactive');
                        }
                    }
                });
            });
        };

        // array para almacenar las películas
        let movies = [];

        // funcion para agregar la pelicula
        const addMovie = (movieData) => {
            const newMovie = {
                id: Date.now(),
                title: movieData.title,
                year: parseInt(movieData.year),
                genre: movieData.genre,
                rating: parseInt(movieData.rating)
            };
            movies.push(newMovie);
            renderMovies();
            updateMovieCount();
        };

        // funcion para eliminar ña pelicula
        const deleteMovie = (movieId) => {
            movies = movies.filter(movie => movie.id !== movieId);
            renderMovies();
            updateMovieCount();
        };

        // funciom para renderizar /la películas usando .map()
        const renderMovies = () => {
            const moviesGrid = document.getElementById('moviesGrid');
            
            if (movies.length === 0) {
                moviesGrid.innerHTML = `
                    <div class="empty-state">
                        <p>¡No tienes películas aún! Agrega tu primera película usando el formulario de arriba.</p>
                    </div>
                `;
                return;
            }

            // uso de .map() para crear las tarjetas
            const moviesHTML = movies.map(movie => `
                <div class="movie-card">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-info">
                        <div class="movie-detail">
                            <span class="movie-label">Año:</span>
                            <span class="movie-value">${movie.year}</span>
                        </div>
                        <div class="movie-detail">
                            <span class="movie-label">Género:</span>
                            <span class="movie-value"><span class="genre">${movie.genre}</span></span>
                        </div>
                        <div class="movie-detail">
                            <span class="movie-label">Calificación:</span>
                            <span class="movie-value">
                                <div class="movie-rating-stars">${generateStars(movie.rating)}</div>
                            </span>
                        </div>
                    </div>
                    <button class="delete-btn" onclick="deleteMovie(${movie.id})">
                        🗑️ Eliminar
                    </button>
                </div>
            `).join('');

            moviesGrid.innerHTML = moviesHTML;
        };

        // funcion para actualizar el contador
        const updateMovieCount = () => {
            const count = movies.length;
            const movieCount = document.getElementById('movieCount');
            movieCount.textContent = `Tienes ${count} ${count === 1 ? 'película' : 'películas'} en tu colección`;
        };

        document.getElementById('movieForm').addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir recarga de página
            
            //  captura datos del formulario
            const formData = new FormData(e.target);
            const movieData = {
                title: formData.get('title'),
                year: formData.get('year'),
                genre: formData.get('genre'),
                rating: formData.get('rating')
            };

            // agrega pelicula
            addMovie(movieData);
            
            // limpia el form 
            e.target.reset();
            
            // resetea .as estrellas
            const stars = document.querySelectorAll('.star');
            const ratingText = document.getElementById('ratingText');
            stars.forEach(star => {
                star.classList.remove('active', 'inactive');
            });
            ratingText.textContent = 'Selecciona tu calificación';
            
            //  feedback visual
            const submitBtn = e.target.querySelector('.btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '¡Agregada!';
            submitBtn.style.background = '#2ed573';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 1500);
        });

        //películas cargadas
        const initializeApp = () => {
            const exampleMovies = [
                { title: "El Padrino", year: 1972, genre: "Drama", rating: 5 },
                { title: "Avengers: Endgame", year: 2019, genre: "Acción", rating: 4 },
                { title: "Coco", year: 2017, genre: "Aventura", rating: 5 }
            ];

            exampleMovies.forEach(movie => {
                addMovie(movie);
            });
        };

        // inicializa la app
        document.addEventListener('DOMContentLoaded', () => {
            initializeBackgroundCarousel();
            initializeApp();
            handleStarSelection();
            
            // ausar carrusel cuando se esta interactuando
            // document.addEventListener('mouseenter', pauseCarousel);
            // document.addEventListener('mouseleave', resumeCarousel);
        });