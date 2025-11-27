import React, { useState } from "react";
import styles from "./Establecimientos.module.css";
// Components
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import SedesButton from "./SedesButton"; 

export default function Establecimientos({ sedes = [], loading }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSede, setSelectedSede] = useState(null);

  // Filtrar sedes según búsqueda
  const filteredSedes = sedes.filter((sede) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      sede.Nombre_sede?.toLowerCase().includes(searchLower) ||
      sede.Ciudad?.toLowerCase().includes(searchLower) ||
      sede.Responsable?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      <Header />
    
    <div className={styles.sedeContainer}>
      

      {/* Banner Hero */}
      <div className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Nuestras Sedes</h1>
          <p className={styles.heroSubtitle}>
            Encuentra el restaurante Fastie más cercano a ti. 
            Contamos con {sedes.length} sedes en toda la ciudad para servirte mejor.
          </p>
        </div>
      </div>

      {/* Sección de Estadísticas */}
      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏪</div>
          <h3 className={styles.statNumber}>{sedes.length}+</h3>
          <p className={styles.statLabel}>Sedes Disponibles</p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🕐</div>
          <h3 className={styles.statNumber}>7 días</h3>
          <p className={styles.statLabel}>Abierto Toda la Semana</p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🚚</div>
          <h3 className={styles.statNumber}>30 min</h3>
          <p className={styles.statLabel}>Delivery Promedio</p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <h3 className={styles.statNumber}>4.8</h3>
          <p className={styles.statLabel}>Calificación Promedio</p>
        </div>
      </div>

      <div className={styles.content}>
        {/* Columna izquierda */}
        <div className={styles.locations}>
          <h2 className={styles.title}>Encuentra tu restaurante</h2>
          
          {/* Barra de búsqueda */}
          <div className={styles.searchContainer}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Busca por nombre, ciudad o dirección..."
              className={styles.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className={styles.clearButton}
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>

          {/* Contador de resultados */}
          <div className={styles.resultsCount}>
            {searchTerm ? (
              <p>
                {filteredSedes.length} {filteredSedes.length === 1 ? 'resultado' : 'resultados'} encontrado{filteredSedes.length !== 1 ? 's' : ''}
              </p>
            ) : (
              <p>Mostrando todas las sedes ({sedes.length})</p>
            )}
          </div>

          {/* Lista de sedes */}
          <div className={styles.sedesList}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Cargando sedes...</p>
              </div>
            ) : filteredSedes.length > 0 ? (
              filteredSedes.map((s) => (
                <div 
                  key={s.Id_Establecimiento}
                  onClick={() => setSelectedSede(s)}
                  className={selectedSede?.Id_Establecimiento === s.Id_Establecimiento ? styles.selectedSede : ''}
                >
                  <SedesButton
                    place={s.Nombre_sede}
                    adress={s.Ciudad}
                    localidad={s.Responsable}
                  />
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <p className={styles.noResultsIcon}>🔍</p>
                <h3>No se encontraron sedes</h3>
                <p>Intenta con otro término de búsqueda</p>
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha (Mapa) */}
        <div className={styles.mapSection}>
          {/* Información de sede seleccionada */}
          {selectedSede && (
            <div className={styles.sedeInfo}>
              <h3>{selectedSede.Nombre_sede}</h3>
              <p><strong>📍 Ciudad:</strong> {selectedSede.Ciudad}</p>
              <p><strong>👤 Responsable:</strong> {selectedSede.Responsable}</p>
              <button className={styles.directionsButton}>
                Cómo llegar
              </button>
            </div>
          )}
          
          <iframe
            className={styles.map}
            src="https://www.openstreetmap.org/export/embed.html?bbox=-74.1%2C4.6%2C-74.05%2C4.75&layer=mapnik"
            allowFullScreen
          ></iframe>
          
          {/* Botón para abrir en mapa externo */}
          <div className={styles.mapFooter}>
            <a 
              href="https://www.openstreetmap.org/#map=12/4.6/-74.08" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.openMapLink}
            >
              Abrir en mapa completo →
            </a>
          </div>
        </div>
      </div>

      {/* Sección de Servicios */}
      <div className={styles.servicesSection}>
        <h2 className={styles.servicesTitle}>Servicios en Todas Nuestras Sedes</h2>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <span className={styles.serviceIcon}>🍔</span>
            <h4>Comida para Llevar</h4>
            <p>Ordena y recoge en minutos</p>
          </div>
          <div className={styles.serviceCard}>
            <span className={styles.serviceIcon}>🚗</span>
            <h4>Auto Servicio</h4>
            <p>Drive-thru disponible</p>
          </div>
          <div className={styles.serviceCard}>
            <span className={styles.serviceIcon}>📱</span>
            <h4>Pedidos Online</h4>
            <p>App y página web</p>
          </div>
          <div className={styles.serviceCard}>
            <span className={styles.serviceIcon}>🎉</span>
            <h4>Eventos y Fiestas</h4>
            <p>Reserva tu celebración</p>
          </div>
          <div className={styles.serviceCard}>
            <span className={styles.serviceIcon}>💳</span>
            <h4>Pagos Digitales</h4>
            <p>Todos los métodos aceptados</p>
          </div>
          <div className={styles.serviceCard}>
            <span className={styles.serviceIcon}>♿</span>
            <h4>Accesibilidad</h4>
            <p>Instalaciones inclusivas</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>¿No encuentras una sede cerca?</h2>
        <p className={styles.ctaText}>
          Contáctanos y conoce nuestros planes de expansión. 
          Pronto podríamos llegar a tu zona.
        </p>
        <div className={styles.ctaButtons}>
          <button className={styles.ctaButtonPrimary}>Contáctanos</button>
          <button className={styles.ctaButtonSecondary}>Ver Delivery</button>
        </div>
      </div>

      <Footer />
    </div>
  </div>
  );
}