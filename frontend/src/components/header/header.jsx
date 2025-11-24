import React from "react";
import { Pizza, CircleUserRound } from 'lucide-react';
import { NavLink } from "react-router-dom";
import styles from './header.module.css';
import { useAuth } from "../../hooks/useAuth";
import CartWidget from "../cart/CartWidget";

export default function Header () {

    const { user } = useAuth();

    return (
        <header className={styles.headerContainer}>
            <div className={styles.logo}>
                <Pizza/>
                <h1>Fastie</h1>
            </div>

            <nav className={styles.nav}>
                <ul className={styles.menu}>
                    <li><NavLink to="/home" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link }>Inicio</NavLink></li>
                    <li><NavLink to="/menu" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link }>Menú</NavLink></li>
                    <li><NavLink to="/sede" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link }>Sedes</NavLink></li>
                    <li><NavLink to="/nosotros" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link }>Sobre Nosotros</NavLink></li>
                </ul>
            </nav>

            <div className={styles.headerActions}>
                {/* Carrito - Solo aparece si hay usuario logueado */}
                {user && <CartWidget />}
                
                {/* Botón de Perfil/Ingresar */}
                {user 
                    ? (
                        <NavLink to="/profile"> {/*  Cambiado a /profile */}
                            <button className={styles.ingresar}>
                                <CircleUserRound />
                                <span>Perfil</span>
                            </button>
                        </NavLink>
                    ) : (
                        <NavLink to="/log-in">
                            <button className={styles.ingresar}>
                                <CircleUserRound />
                                <span>Ingresar</span>
                            </button>
                        </NavLink>
                    )
                }
            </div>
        </header>
    );
}