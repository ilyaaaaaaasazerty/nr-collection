import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiSearch, FiShoppingCart, FiTruck, FiCheck } from 'react-icons/fi'
import './HowItWorks.css'

const HowItWorks = () => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    })

    const steps = [
        {
            number: '01',
            icon: <FiSearch />,
            title: 'Choisissez',
            description: 'Parcourez notre collection et sélectionnez les articles qui vous plaisent.',
        },
        {
            number: '02',
            icon: <FiShoppingCart />,
            title: 'Commandez',
            description: 'Remplissez le formulaire avec vos informations de livraison.',
        },
        {
            number: '03',
            icon: <FiTruck />,
            title: 'Livraison',
            description: 'Nous préparons et livrons votre commande à votre domicile.',
        },
        {
            number: '04',
            icon: <FiCheck />,
            title: 'Payez à la Réception',
            description: 'Vérifiez votre commande et payez en espèces à la livraison.',
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    }

    return (
        <section id="how-it-works" className="how-it-works">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Comment ça Marche ?</h2>
                    <p className="section-subtitle">
                        Commander chez NR Collection, c'est simple, rapide et sécurisé.
                    </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    className="how-it-works__steps"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="step"
                            variants={itemVariants}
                        >
                            <div className="step__number">{step.number}</div>
                            <motion.div
                                className="step__icon"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                {step.icon}
                            </motion.div>
                            <h3 className="step__title">{step.title}</h3>
                            <p className="step__description">{step.description}</p>
                            {index < steps.length - 1 && (
                                <div className="step__connector" />
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="how-it-works__cta"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    <div className="how-it-works__badge">
                        <FiCheck />
                        <span>Paiement à la Livraison Garanti</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default HowItWorks
