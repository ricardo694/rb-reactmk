import React from "react";
import { useNavigate } from "react-router-dom";
//----Css
import styles from './home.module.css';
//----Components
import Footer from "../../components/footer/footer.jsx";
import Header from "../../components/header/header.jsx";
import Carousel from '../../components/carousel/Carousel.jsx';

export default function Home() {
    const navigate = useNavigate();

    const handleNavigateToMenu = () => {
        navigate('/menu');
    };

    return (
        <div>
            <Header />
            {/* Sección de Bienvenida */}
            <section className={styles.welcomeSection}>
                <h2 className={styles.welcomeTitle}>¡Bienvenido a Fastie!</h2>
                <p className={styles.welcomeText}>
                    La mejor comida rápida de la ciudad. Ingredientes frescos, 
                    sabor auténtico y servicio veloz que te encantará.
                </p>
                <button className={styles.heroButton} onClick={handleNavigateToMenu}>
                    Ordena Ahora
                </button>
            </section>
            <div>
                <Carousel />
            </div>
            {/* Sección de Productos */}
            <h3 className={styles.title}>Conoce nuestros deliciosos productos</h3>
            
            <div className={styles.targetsContainer}>
                {/* Card 1 - Hamburguesas */}
                <div className={styles.productCard} onClick={handleNavigateToMenu}>
                    <div className={styles.productImage}>🍔</div>
                    <h4 className={styles.productTitle}>Hamburguesas</h4>
                    <p className={styles.productDescription}>
                        Jugosas hamburguesas con carne premium y vegetales frescos. 
                        Más de 10 variedades para elegir.
                    </p>
                    <span className={styles.productPrice}>Desde $12.000</span>
                </div>

                {/* Card 2 - Pizzas */}
                <div className={styles.productCard} onClick={handleNavigateToMenu}>
                    <div className={styles.productImage}>🍕</div>
                    <h4 className={styles.productTitle}>Pizzas</h4>
                    <p className={styles.productDescription}>
                        Pizzas artesanales con masa crujiente y queso fundido. 
                        Tamaños personal, mediana y familiar.
                    </p>
                    <span className={styles.productPrice}>Desde $15.000</span>
                </div>

                {/* Card 3 - Hot Dogs */}
                <div className={styles.productCard} onClick={handleNavigateToMenu}>
                    <div className={styles.productImage}>🌭</div>
                    <h4 className={styles.productTitle}>Hot Dogs</h4>
                    <p className={styles.productDescription}>
                        Hot dogs gourmet con toppings únicos y deliciosos. 
                        Perfectos para cualquier ocasión.
                    </p>
                    <span className={styles.productPrice}>Desde $8.000</span>
                </div>

                {/* Card 4 - Papas */}
                <div className={styles.productCard} onClick={handleNavigateToMenu}>
                    <div className={styles.productImage}>🍟</div>
                    <h4 className={styles.productTitle}>Papas Fritas</h4>
                    <p className={styles.productDescription}>
                        Papas crujientes por fuera, suaves por dentro. 
                        Con salsas especiales de la casa.
                    </p>
                    <span className={styles.productPrice}>Desde $5.000</span>
                </div>

                {/* Card 5 - Bebidas */}
                <div className={styles.productCard} onClick={handleNavigateToMenu}>
                    <div className={styles.productImage}>🥤</div>
                    <h4 className={styles.productTitle}>Bebidas</h4>
                    <p className={styles.productDescription}>
                        Refrescos, malteadas y bebidas para acompañar tu comida. 
                        ¡Combos con descuento!
                    </p>
                    <span className={styles.productPrice}>Desde $3.000</span>
                </div>

                {/* Card 6 - Postres */}
                <div className={styles.productCard} onClick={handleNavigateToMenu}>
                    <div className={styles.productImage}>🍰</div>
                    <h4 className={styles.productTitle}>Postres</h4>
                    <p className={styles.productDescription}>
                        Dulces tentaciones para cerrar con broche de oro. 
                        Helados, brownies y más.
                    </p>
                    <span className={styles.productPrice}>Desde $6.000</span>
                </div>
            </div>

            {/* Sección de Combos Especiales */}
            <section className={styles.combosSection}>
                <h3 className={styles.title}>Combos Especiales</h3>
                <p className={styles.combosSubtitle}>¡Ahorra ordenando nuestros combos!</p>
                
                <div className={styles.combosContainer}>
                    <div className={styles.comboCard}>
                        <div className={styles.comboBadge}>POPULAR</div>
                        <h4 className={styles.comboTitle}>Combo Clásico</h4>
                        <ul className={styles.comboList}>
                            <li>Hamburguesa doble</li>
                            <li>Papas medianas</li>
                            <li>Bebida de 500ml</li>
                        </ul>
                        <p className={styles.comboPrice}>$18.000</p>
                        <p className={styles.comboSavings}>Ahorras $4.000</p>
                        <button className={styles.comboButton} onClick={handleNavigateToMenu}>
                            Ordenar Ahora
                        </button>
                    </div>

                    <div className={styles.comboCard}>
                        <div className={styles.comboBadge}>MEJOR VALOR</div>
                        <h4 className={styles.comboTitle}>Combo Familiar</h4>
                        <ul className={styles.comboList}>
                            <li>2 Hamburguesas</li>
                            <li>Pizza mediana</li>
                            <li>Papas grandes</li>
                            <li>2 Bebidas de 500ml</li>
                        </ul>
                        <p className={styles.comboPrice}>$45.000</p>
                        <p className={styles.comboSavings}>Ahorras $10.000</p>
                        <button className={styles.comboButton} onClick={handleNavigateToMenu}>
                            Ordenar Ahora
                        </button>
                    </div>

                    <div className={styles.comboCard}>
                        <div className={styles.comboBadge}>NUEVO</div>
                        <h4 className={styles.comboTitle}>Combo Kids</h4>
                        <ul className={styles.comboList}>
                            <li>Mini hamburguesa</li>
                            <li>Papas pequeñas</li>
                            <li>Jugo natural</li>
                            <li>Juguete sorpresa</li>
                        </ul>
                        <p className={styles.comboPrice}>$12.000</p>
                        <p className={styles.comboSavings}>¡Incluye juguete!</p>
                        <button className={styles.comboButton} onClick={handleNavigateToMenu}>
                            Ordenar Ahora
                        </button>
                    </div>
                </div>
            </section>

            {/* Sección Por Qué Elegirnos */}
            <section className={styles.whyUsSection}>
                <h3 className={styles.title}>¿Por qué elegir Fastie?</h3>
                <div className={styles.featuresContainer}>
                    <div className={styles.featureItem}>
                        <span className={styles.featureIcon}>⚡</span>
                        <h4>Servicio Rápido</h4>
                        <p>Tu comida lista en 15 minutos o menos</p>
                    </div>
                    <div className={styles.featureItem}>
                        <span className={styles.featureIcon}>🌟</span>
                        <h4>Calidad Premium</h4>
                        <p>Ingredientes frescos seleccionados diariamente</p>
                    </div>
                    <div className={styles.featureItem}>
                        <span className={styles.featureIcon}>💰</span>
                        <h4>Mejores Precios</h4>
                        <p>Calidad excepcional sin gastar de más</p>
                    </div>
                    <div className={styles.featureItem}>
                        <span className={styles.featureIcon}>🚚</span>
                        <h4>Delivery Gratis</h4>
                        <p>En compras mayores a $30.000</p>
                    </div>
                </div>
            </section>

            {/* Sección de Testimonios */}
            <section className={styles.testimonialsSection}>
                <h3 className={styles.title}>Lo que dicen nuestros clientes</h3>
                <div className={styles.testimonialsContainer}>
                    <div className={styles.testimonialCard}>
                        <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                        <p className={styles.testimonialText}>
                            "Las mejores hamburguesas de Bogotá. Siempre frescas y el servicio es excelente. 
                            ¡Mi lugar favorito para comer!"
                        </p>
                        <p className={styles.testimonialAuthor}>- María González</p>
                    </div>

                    <div className={styles.testimonialCard}>
                        <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                        <p className={styles.testimonialText}>
                            "El combo familiar es perfecto para los viernes en casa. Buena relación calidad-precio 
                            y el delivery siempre llega caliente."
                        </p>
                        <p className={styles.testimonialAuthor}>- Carlos Rodríguez</p>
                    </div>

                    <div className={styles.testimonialCard}>
                        <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                        <p className={styles.testimonialText}>
                            "A mis hijos les encanta el combo kids. Las papas son deliciosas y siempre están 
                            emocionados por el juguete sorpresa."
                        </p>
                        <p className={styles.testimonialAuthor}>- Ana Martínez</p>
                    </div>
                </div>
            </section>

            {/* Sección de Horarios */}
            <section className={styles.scheduleSection}>
                <h3 className={styles.title}>Horarios de Atención</h3>
                <div className={styles.scheduleContent}>
                    <div className={styles.scheduleCard}>
                        <h4>🕐 Lunes a Viernes</h4>
                        <p>11:00 AM - 11:00 PM</p>
                    </div>
                    <div className={styles.scheduleCard}>
                        <h4>🕐 Sábados y Domingos</h4>
                        <p>10:00 AM - 12:00 AM</p>
                    </div>
                    <div className={styles.scheduleCard}>
                        <h4>📞 Línea de Pedidos</h4>
                        <p>601 234 5678</p>
                    </div>
                    <div className={styles.scheduleCard}>
                        <h4>📍 Ubicación</h4>
                        <p>Bogotá, Colombia</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className={styles.ctaSection}>
                <h3 className={styles.ctaTitle}>¿Listo para ordenar?</h3>
                <p className={styles.ctaText}>
                    Disfruta de la mejor comida rápida desde la comodidad de tu hogar. 
                    Delivery gratis en compras mayores a $30.000
                </p>
                <button className={styles.ctaButton} onClick={handleNavigateToMenu}>
                    Ver Menú Completo
                </button>
            </section>

            <Footer />
        </div>
    );
}