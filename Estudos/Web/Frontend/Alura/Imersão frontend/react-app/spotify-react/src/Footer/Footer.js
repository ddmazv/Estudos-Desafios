import React from "react";
import './Footer.css';

const Footer = () => {
    return(
        <footer className="disclaimer-premium">
        <div className="text">
            <p className="disclaimer-premium__tittle">TESTAR O PREMIUM DE GRAÇA</p>
            <p className="disclaimer-premium__subtittle">
                Inscreva-se para curtir música ilimitada e podcasts só com alguns anúncios. Não prescisa de cartão de
                crédito.
            </p>
        </div>

        <div className="button">
            <button type="button">Inscreva-se grátis</button>
        </div>

    </footer>
    )
};

export default Footer;