import React from "react";
//----Css
import styles from './home.module.css';
//----Components
import Footer from "../../components/footer/footer.jsx";
// import CardContainer from "../../components/card/cardContainer.jsx";
import Header from "../../components/header/header.jsx";
import Carousel from '../../components/carousel/Carousel.jsx';

export default function Home (){

    return(
        <div >

            <Header/>

            <div > 
              <Carousel/>
            </div>


            <h3 className={styles.title}>Conoce nuestro deliciosos productos</h3>

            <Footer/>

        </div>
    );
};