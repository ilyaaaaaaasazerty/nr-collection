import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiPhone, FiMapPin, FiClock, FiMail } from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    })

    const phoneNumber = '+213561761020'
    const whatsappLink = `https://wa.me/213561761020`

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    }

    return (
        <section id="contact" className="contact">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Contactez-Nous</h2>
                    <p className="section-subtitle">
                        Besoin d'aide ou de conseils ? Notre équipe est là pour vous accompagner.
                    </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    className="contact__content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* Contact Cards */}
                    <div className="contact__cards">
                        <motion.a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact__card contact__card--whatsapp"
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <div className="contact__card-icon">
                                <FaWhatsapp />
                            </div>
                            <h3>WhatsApp</h3>
                            <p>Réponse rapide garantie</p>
                            <span className="contact__card-action">Discuter maintenant →</span>
                        </motion.a>

                        <motion.a
                            href={`tel:${phoneNumber}`}
                            className="contact__card"
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <div className="contact__card-icon">
                                <FiPhone />
                            </div>
                            <h3>Téléphone</h3>
                            <p>{phoneNumber}</p>
                            <span className="contact__card-action">Appeler →</span>
                        </motion.a>

                        <motion.div
                            className="contact__card"
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                        >
                            <div className="contact__card-icon">
                                <FiClock />
                            </div>
                            <h3>Horaires</h3>
                            <p>Sam - Jeu: 9h - 18h</p>
                            <span className="contact__card-note">Vendredi: Fermé</span>
                        </motion.div>
                    </div>

                    {/* Info & Social */}
                    <motion.div
                        className="contact__info"
                        variants={itemVariants}
                    >
                        <div className="contact__location">
                            <FiMapPin />
                            <div>
                                <h4>Livraison Nationale</h4>
                                <p>Nous livrons partout en Algérie - 48 Wilayas</p>
                            </div>
                        </div>

                        <div className="contact__social">
                            <span>Suivez-nous:</span>
                            <div className="contact__social-links">
                                <motion.a
                                    href="#"
                                    className="contact__social-link"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    aria-label="Instagram"
                                >
                                    <FaInstagram />
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="contact__social-link"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    aria-label="Facebook"
                                >
                                    <FaFacebookF />
                                </motion.a>
                                <motion.a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact__social-link contact__social-link--whatsapp"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    aria-label="WhatsApp"
                                >
                                    <FaWhatsapp />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact
