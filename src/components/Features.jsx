import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiTruck, FiDollarSign, FiRefreshCw, FiPhone } from 'react-icons/fi'
import './Features.css'

const Features = () => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    })

    const features = [
        {
            icon: <FiTruck />,
            title: 'Livraison Rapide',
            description: 'Livraison à domicile partout en Algérie en 2-5 jours ouvrables.',
        },
        {
            icon: <FiDollarSign />,
            title: 'Paiement à la Livraison',
            description: 'Payez en espèces à la réception de votre commande. Simple et sécurisé.',
        },
        {
            icon: <FiRefreshCw />,
            title: 'Échange Facile',
            description: 'Échange possible sous 7 jours si la taille ne convient pas.',
        },
        {
            icon: <FiPhone />,
            title: 'Support WhatsApp',
            description: 'Une question ? Contactez-nous directement sur WhatsApp.',
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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
        <section className="features">
            <div className="container">
                <motion.div
                    ref={ref}
                    className="features__grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="features__item"
                            variants={itemVariants}
                            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(212, 168, 83, 0.15)' }}
                        >
                            <div className="features__icon">{feature.icon}</div>
                            <h3 className="features__title">{feature.title}</h3>
                            <p className="features__description">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Features
