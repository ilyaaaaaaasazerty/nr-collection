import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiShoppingBag, FiUser, FiPhone, FiMapPin, FiCheck, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import './OrderForm.css'

const OrderForm = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        wilaya: '',
        address: '',
        product: '',
        size: '',
        quantity: 1,
        notes: '',
    })

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    // Product data matching Products.jsx
    const products = [
        { id: 1, name: 'Robe Princesse Florale', price: 3500, sizes: ['2-3 ans', '4-5 ans', '6-7 ans'] },
        { id: 2, name: 'Ensemble Costume Chic', price: 5500, sizes: ['2-3 ans', '4-5 ans', '6-7 ans', '8-9 ans'] },
        { id: 3, name: 'Pyjama Coton Doux', price: 2200, sizes: ['2-3 ans', '4-5 ans', '6-7 ans'] },
        { id: 4, name: 'Veste Hiver Tendance', price: 4800, sizes: ['3-4 ans', '5-6 ans', '7-8 ans', '9-10 ans'] },
        { id: 5, name: 'Robe Tutu Pailletée', price: 4200, sizes: ['2-3 ans', '4-5 ans', '6-7 ans'] },
        { id: 6, name: 'Jogging Sport Confort', price: 2800, sizes: ['4-5 ans', '6-7 ans', '8-9 ans', '10-11 ans'] },
        { id: 7, name: 'Chemise Élégante', price: 2500, sizes: ['3-4 ans', '5-6 ans', '7-8 ans'] },
        { id: 8, name: 'Jupe Volantée', price: 2000, sizes: ['2-3 ans', '4-5 ans', '6-7 ans', '8-9 ans'] },
        { id: 9, name: 'Pull-over Tricoté', price: 3200, sizes: ['3-4 ans', '5-6 ans', '7-8 ans', '9-10 ans'] },
        { id: 10, name: 'Ensemble Bébé Premium', price: 3800, sizes: ['0-6 mois', '6-12 mois', '12-18 mois'] },
    ]

    const wilayas = [
        'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
        'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
        'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
        'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
        'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
        'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
        'Ghardaïa', 'Relizane'
    ]

    // Listen for product selection from Products component
    useEffect(() => {
        const handleProductSelected = (event) => {
            const product = event.detail
            setSelectedProduct(product)
            setFormData(prev => ({
                ...prev,
                product: product.id.toString(),
                size: product.sizes[0],
            }))
        }

        window.addEventListener('productSelected', handleProductSelected)

        // Check sessionStorage for pre-selected product
        const storedProduct = sessionStorage.getItem('selectedProduct')
        if (storedProduct) {
            const product = JSON.parse(storedProduct)
            setSelectedProduct(product)
            setFormData(prev => ({
                ...prev,
                product: product.id.toString(),
                size: product.sizes[0],
            }))
            sessionStorage.removeItem('selectedProduct')
        }

        return () => {
            window.removeEventListener('productSelected', handleProductSelected)
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

        if (name === 'product') {
            const product = products.find(p => p.id.toString() === value)
            setSelectedProduct(product)
            if (product) {
                setFormData(prev => ({ ...prev, size: product.sizes[0] }))
            }
        }
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-DZ').format(price) + ' DA'
    }

    const calculateTotal = () => {
        if (!selectedProduct) return 0
        return selectedProduct.price * formData.quantity
    }

    const generateWhatsAppMessage = () => {
        const product = products.find(p => p.id.toString() === formData.product)
        const total = calculateTotal()

        const message = `🛍️ *Nouvelle Commande - NR Collection*

👤 *Client:* ${formData.name}
📱 *Téléphone:* ${formData.phone}
📍 *Wilaya:* ${formData.wilaya}
🏠 *Adresse:* ${formData.address}

📦 *Commande:*
• Produit: ${product?.name}
• Taille: ${formData.size}
• Quantité: ${formData.quantity}
• Prix unitaire: ${formatPrice(product?.price || 0)}

💰 *Total:* ${formatPrice(total)}

${formData.notes ? `📝 *Notes:* ${formData.notes}` : ''}

💳 *Mode de paiement:* À la livraison`

        return encodeURIComponent(message)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Open WhatsApp with pre-filled message
        const phoneNumber = '213561761020' // Without the +
        const message = generateWhatsAppMessage()
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

        window.open(whatsappUrl, '_blank')

        // Show success message
        setTimeout(() => {
            setIsSubmitting(false)
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 5000)
        }, 1000)
    }

    const isFormValid = formData.name && formData.phone && formData.wilaya && formData.address && formData.product && formData.size

    return (
        <section id="order" className="order-form">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Passez Votre Commande</h2>
                    <p className="section-subtitle">
                        Remplissez le formulaire ci-dessous et nous vous contacterons pour confirmer votre commande.
                    </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    className="order-form__wrapper"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <form className="order-form__form" onSubmit={handleSubmit}>
                        <div className="order-form__grid">
                            {/* Personal Info */}
                            <div className="order-form__section">
                                <h3 className="order-form__section-title">
                                    <FiUser />
                                    Vos Informations
                                </h3>

                                <div className="input-group">
                                    <label htmlFor="name">Nom Complet *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Votre nom et prénom"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="phone">Numéro de Téléphone *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="0X XX XX XX XX"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="wilaya">Wilaya *</label>
                                    <select
                                        id="wilaya"
                                        name="wilaya"
                                        value={formData.wilaya}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Sélectionnez votre wilaya</option>
                                        {wilayas.map((wilaya, i) => (
                                            <option key={i} value={wilaya}>{wilaya}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="address">Adresse de Livraison *</label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Votre adresse complète"
                                        rows="3"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Order Details */}
                            <div className="order-form__section">
                                <h3 className="order-form__section-title">
                                    <FiShoppingBag />
                                    Votre Commande
                                </h3>

                                <div className="input-group">
                                    <label htmlFor="product">Produit *</label>
                                    <select
                                        id="product"
                                        name="product"
                                        value={formData.product}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Sélectionnez un produit</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name} - {formatPrice(product.price)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {selectedProduct && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="order-form__size-section"
                                    >
                                        <div className="input-group">
                                            <label htmlFor="size">Taille *</label>
                                            <select
                                                id="size"
                                                name="size"
                                                value={formData.size}
                                                onChange={handleChange}
                                                required
                                            >
                                                {selectedProduct.sizes.map((size, i) => (
                                                    <option key={i} value={size}>{size}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="input-group">
                                            <label htmlFor="quantity">Quantité</label>
                                            <div className="order-form__quantity">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({
                                                        ...prev,
                                                        quantity: Math.max(1, prev.quantity - 1)
                                                    }))}
                                                    className="order-form__qty-btn"
                                                >
                                                    -
                                                </button>
                                                <span className="order-form__qty-value">{formData.quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({
                                                        ...prev,
                                                        quantity: prev.quantity + 1
                                                    }))}
                                                    className="order-form__qty-btn"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="input-group">
                                    <label htmlFor="notes">Notes (Optionnel)</label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Instructions spéciales, couleur préférée, etc."
                                        rows="2"
                                    />
                                </div>

                                {/* Order Summary */}
                                {selectedProduct && (
                                    <motion.div
                                        className="order-form__summary"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="order-form__summary-row">
                                            <span>Produit</span>
                                            <span>{selectedProduct.name}</span>
                                        </div>
                                        <div className="order-form__summary-row">
                                            <span>Taille</span>
                                            <span>{formData.size}</span>
                                        </div>
                                        <div className="order-form__summary-row">
                                            <span>Quantité</span>
                                            <span>× {formData.quantity}</span>
                                        </div>
                                        <div className="order-form__summary-row order-form__summary-row--total">
                                            <span>Total</span>
                                            <span>{formatPrice(calculateTotal())}</span>
                                        </div>
                                        <div className="order-form__cod-badge">
                                            <FiCheck />
                                            Paiement à la Livraison
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            className="btn btn-whatsapp btn-lg order-form__submit"
                            disabled={!isFormValid || isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaWhatsapp size={24} />
                            {isSubmitting ? 'Envoi...' : 'Commander via WhatsApp'}
                        </motion.button>
                    </form>

                    {/* Success Message */}
                    {showSuccess && (
                        <motion.div
                            className="order-form__success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <FiCheck />
                            <p>Votre commande a été envoyée ! Nous vous contacterons bientôt pour confirmer.</p>
                            <button onClick={() => setShowSuccess(false)}>
                                <FiX />
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}

export default OrderForm
