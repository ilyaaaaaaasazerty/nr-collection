import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import './WhatsAppFloat.css'

const WhatsAppFloat = () => {
    const phoneNumber = '213561761020'
    const message = encodeURIComponent('Bonjour ! Je suis intéressé(e) par votre collection NR Collection. 🛍️')
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Contactez-nous sur WhatsApp"
        >
            <FaWhatsapp />
            <span className="whatsapp-float__tooltip">Besoin d'aide ?</span>
        </motion.a>
    )
}

export default WhatsAppFloat
