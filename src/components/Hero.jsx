import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { FiTruck, FiShield, FiHeart } from 'react-icons/fi'
import './Hero.css'

const Hero = () => {
    const heroRef = useRef(null)
    const sparklesRef = useRef(null)

    useEffect(() => {
        // Create floating sparkles animation
        const sparkles = sparklesRef.current?.querySelectorAll('.sparkle')
        if (sparkles) {
            sparkles.forEach((sparkle, i) => {
                gsap.to(sparkle, {
                    y: 'random(-20, 20)',
                    x: 'random(-20, 20)',
                    opacity: 'random(0.3, 1)',
                    duration: 'random(2, 4)',
                    repeat: -1,
                    yoyo: true,
                    ease: 'power1.inOut',
                    delay: i * 0.2,
                })
            })
        }
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    }

    const scrollToOrder = () => {
        const element = document.querySelector('#order')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const scrollToProducts = () => {
        const element = document.querySelector('#products')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section id="hero" className="hero" ref={heroRef}>
            {/* Background Decoration */}
            <div className="hero__bg-decoration" ref={sparklesRef}>
                <div className="sparkle" style={{ top: '20%', left: '10%' }} />
                <div className="sparkle" style={{ top: '30%', right: '15%' }} />
                <div className="sparkle" style={{ top: '60%', left: '20%' }} />
                <div className="sparkle" style={{ bottom: '30%', right: '25%' }} />
                <div className="sparkle" style={{ top: '15%', right: '30%' }} />
                <div className="sparkle" style={{ bottom: '40%', left: '8%' }} />
            </div>

            <div className="container hero__container">
                <motion.div
                    className="hero__content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="hero__badge-wrapper">
                        <span className="badge badge-gold">
                            <FiHeart size={12} />
                            Collection Printemps 2026
                        </span>
                    </motion.div>

                    {/* Logo Display */}
                    <motion.div variants={itemVariants} className="hero__logo-display">
                        <img src="/logo.png" alt="NR Collection" className="hero__logo-large" />
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 variants={itemVariants} className="hero__title">
                        Des Vêtements <span className="text-gold">Élégants</span>
                        <br />pour vos Petits Trésors
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p variants={itemVariants} className="hero__subtitle">
                        Découvrez notre collection exclusive de vêtements pour enfants.
                        Style, confort et qualité réunis pour habiller vos enfants avec élégance.
                    </motion.p>

                    {/* Trust Badges */}
                    <motion.div variants={itemVariants} className="hero__trust-badges">
                        <div className="hero__trust-item">
                            <div className="hero__trust-icon">
                                <FiTruck />
                            </div>
                            <span>Livraison à Domicile</span>
                        </div>
                        <div className="hero__trust-divider" />
                        <div className="hero__trust-item">
                            <div className="hero__trust-icon">
                                <FiShield />
                            </div>
                            <span>Paiement à la Livraison</span>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div variants={itemVariants} className="hero__cta-group">
                        <motion.button
                            className="btn btn-primary btn-lg"
                            onClick={scrollToOrder}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Commander Maintenant
                        </motion.button>
                        <motion.button
                            className="btn btn-secondary btn-lg"
                            onClick={scrollToProducts}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Voir la Collection
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Hero Visual - Decorative Side */}
                <motion.div
                    className="hero__visual"
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className="hero__image-wrapper">
                        <div className="hero__image-decoration" />
                        <div className="hero__image-glow" />
                        <div className="hero__image-placeholder">
                            <div className="hero__image-icon">👶</div>
                            <span>Collection Enfants</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="hero__scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={scrollToProducts}
            >
                <span>Découvrir</span>
                <motion.div
                    className="hero__scroll-arrow"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    ↓
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero
