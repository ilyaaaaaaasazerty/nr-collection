import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const whatsappLink = 'https://wa.me/213561761020'

    const scrollToSection = (href) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__content">
                    {/* Logo & Description */}
                    <div className="footer__brand">
                        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero') }}>
                            <img src="/logo.png" alt="NR Collection" className="footer__logo" />
                        </a>
                        <p className="footer__description">
                            Vêtements élégants et de qualité pour vos enfants.
                            Livraison partout en Algérie avec paiement à la livraison.
                        </p>
                        <div className="footer__social">
                            <motion.a
                                href="#"
                                className="footer__social-link"
                                whileHover={{ scale: 1.1, y: -3 }}
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </motion.a>
                            <motion.a
                                href="#"
                                className="footer__social-link"
                                whileHover={{ scale: 1.1, y: -3 }}
                                aria-label="Facebook"
                            >
                                <FaFacebookF />
                            </motion.a>
                            <motion.a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer__social-link footer__social-link--whatsapp"
                                whileHover={{ scale: 1.1, y: -3 }}
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer__links">
                        <h4>Navigation</h4>
                        <ul>
                            <li>
                                <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero') }}>
                                    Accueil
                                </a>
                            </li>
                            <li>
                                <a href="#products" onClick={(e) => { e.preventDefault(); scrollToSection('#products') }}>
                                    Collection
                                </a>
                            </li>
                            <li>
                                <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('#how-it-works') }}>
                                    Comment ça marche
                                </a>
                            </li>
                            <li>
                                <a href="#order" onClick={(e) => { e.preventDefault(); scrollToSection('#order') }}>
                                    Commander
                                </a>
                            </li>
                            <li>
                                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('#contact') }}>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer__links">
                        <h4>Nos Services</h4>
                        <ul>
                            <li>
                                <span>✓ Livraison à Domicile</span>
                            </li>
                            <li>
                                <span>✓ Paiement à la Livraison</span>
                            </li>
                            <li>
                                <span>✓ Échange sous 7 jours</span>
                            </li>
                            <li>
                                <span>✓ Support WhatsApp</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer__contact">
                        <h4>Contact Rapide</h4>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__whatsapp-btn"
                        >
                            <FaWhatsapp />
                            +213 561 761 020
                        </a>
                        <p className="footer__hours">
                            Sam - Jeu: 9h - 18h<br />
                            Vendredi: Fermé
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer__bottom">
                    <p>
                        © {currentYear} NR Collection. Tous droits réservés.
                    </p>
                    <p className="footer__credit">
                        Fait avec <FiHeart className="footer__heart" /> en Algérie
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
